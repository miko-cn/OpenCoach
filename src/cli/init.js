#!/usr/bin/env node

/**
 * OpenCoach Workflow & Skill Manager
 * Converts workflows to skills and initializes OpenCoach in project directories
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Configuration
// Dynamically find workflows directory
// Production: cli/workflows (shipped with npm)
// Development: src/workflows (for npm link)
function getWorkflowsDir() {
  // Try production location first
  const prodDir = path.join(__dirname, 'workflows');
  if (fs.existsSync(prodDir)) {
    return prodDir;
  }

  // Fall back to development location
  const devDir = path.join(__dirname, '../workflows');
  if (fs.existsSync(devDir)) {
    return devDir;
  }

  throw new Error(
    'Workflows directory not found. Please run from within the OpenCoach project ' +
    'or ensure the package is properly installed.'
  );
}

const PACKAGE_WORKFLOWS_DIR = getWorkflowsDir();

/**
 * Get the project root directory (where .claude should be created)
 * Defaults to current working directory
 */
function getProjectRoot(cwd) {
  return cwd || process.cwd();
}

/**
 * Initialize OpenCoach in a project directory
 * Creates .claude/skills and links all workflow skills
 */
function initProject(cwd) {
  const projectRoot = getProjectRoot(cwd);
  const skillsDir = path.join(projectRoot, '.claude', 'skills');

  console.log(`Initializing OpenCoach in: ${projectRoot}`);

  // Create .claude/skills directory
  if (!fs.existsSync(skillsDir)) {
    fs.mkdirSync(skillsDir, { recursive: true });
    console.log(`Created: ${skillsDir}`);
  }

  // Link all workflow skills
  const workflows = fs.readdirSync(PACKAGE_WORKFLOWS_DIR)
    .filter(f => fs.statSync(path.join(PACKAGE_WORKFLOWS_DIR, f)).isDirectory());

  for (const workflow of workflows) {
    const workflowDir = path.join(PACKAGE_WORKFLOWS_DIR, workflow);
    const skillDir = path.join(skillsDir, `opencoach-${workflow}`);

    // Create skill directory if not exists
    if (!fs.existsSync(skillDir)) {
      fs.mkdirSync(skillDir, { recursive: true });

      // Generate SKILL.md from workflow
      const skillFile = path.join(skillDir, 'SKILL.md');
      const content = generateSkillFile(workflowDir, workflow);
      fs.writeFileSync(skillFile, content, 'utf8');
      console.log(`Created skill: opencoach-${workflow}`);

      // Copy scripts directory if exists
      const scriptsDir = path.join(workflowDir, 'scripts');
      if (fs.existsSync(scriptsDir)) {
        const targetScriptsDir = path.join(skillDir, 'scripts');
        fs.mkdirSync(targetScriptsDir, { recursive: true });
        const scriptFiles = fs.readdirSync(scriptsDir).filter(f => f.endsWith('.md'));
        for (const file of scriptFiles) {
          fs.copyFileSync(
            path.join(scriptsDir, file),
            path.join(targetScriptsDir, file)
          );
        }
      }
    } else {
      console.log(`Skill already exists: opencoach-${workflow} (skipped)`);
    }
  }

  console.log('');
  console.log('OpenCoach initialized successfully!');
  console.log(`Skills location: ${skillsDir}`);
  console.log('');
  console.log('Available workflows:');
  for (const workflow of workflows) {
    console.log(`  - opencoach-${workflow}`);
  }
}

/**
 * Read and parse YAML file
 */
function readYaml(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return yaml.load(content);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Read markdown file content
 */
function readMarkdown(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return '';
  }
}

/**
 * Generate SKILL.md frontmatter
 */
function generateFrontmatter(meta, workflowId) {
  const lines = [
    '---',
    `name: ${workflowId}`,
    `description: ${meta.workflow_type || 'OpenCoach workflow'}`,
    'user-invocable: true',
    '---'
  ];
  return lines.join('\n');
}

/**
 * Generate skill content from states
 */
function generateSkillContent(meta, states) {
  const lines = [];

  // Workflow header
  lines.push(`# ${meta.workflow_id} Workflow`);
  lines.push('');
  lines.push(`**Version:** ${meta.workflow_version}`);
  lines.push(`**Type:** ${meta.workflow_type}`);
  lines.push(`**Duration:** ${meta.estimated_duration}`);
  lines.push('');

  // Initial state
  lines.push('## State Machine');
  lines.push('');
  lines.push('You are executing a structured workflow. Follow the state machine below:');
  lines.push('');
  lines.push('| State | Description | Exit Conditions | Next State |');
  lines.push('|-------|-------------|----------------|------------|');

  for (const state of states.states) {
    const desc = state.description.replace(/\|/g, '\\|');
    const exitConditions = state.exit_condition
      .map(c => `${c.type}${c.max_attempts ? ` (${c.max_attempts} max)` : ''}`)
      .join(', ');
    const nextStates = state.exit_condition
      .map(c => c.goto)
      .join(', ');

    lines.push(`| ${state.id} | ${desc} | ${exitConditions} | ${nextStates} |`);
  }

  lines.push('');

  // Transition rules
  lines.push('## Transition Rules');
  lines.push('');
  lines.push('Check exit conditions in order. Move to the first matching next state.');
  lines.push('');

  // CLI Commands Usage
  lines.push('## CLI Commands Usage');
  lines.push('');
  lines.push('**IMPORTANT: You MUST use OpenCoach CLI commands for all state and data operations**');
  lines.push('');
  lines.push('### State Management');
  lines.push('- Update state: `opencoach state set <workflow> <state>`');
  lines.push('- Get state: `opencoach state get <workflow>`');
  lines.push('- Clear state: `opencoach state clear <workflow>`');
  lines.push('');
  lines.push('### Data Storage');
  lines.push('- Store data: `opencoach data set --key <k> --value <v>`');
  lines.push('- Store JSON: `opencoach data set --json <json>`');
  lines.push('- Get data: `opencoach data get [--key <k>]`');
  lines.push('- Clear data: `opencoach data clear`');
  lines.push('');
  lines.push('### Goal/Task Operations');
  lines.push('- Create goal: `opencoach goals create <name>`');
  lines.push('- Create tasks: `opencoach tasks create <goal-slug>`');
  lines.push('- List goals: `opencoach goals list`');
  lines.push('');
  lines.push('**Do NOT use Write/Edit tools directly for workflow outputs. Use CLI commands only.**');
  lines.push('');

  // Outputs
  if (meta.outputs) {
    lines.push('## Output Files');
    lines.push('');
    for (const output of meta.outputs) {
      const required = output.required ? 'Required' : 'Optional';
      lines.push(`- \`${output.path}\` (${required})`);
      if (output.template) {
        lines.push(`  Template: ${output.template}`);
      }
    }
    lines.push('');
  }

  return lines.join('\n');
}

/**
 * Read all script files and append to skill
 */
function appendScripts(lines, scriptsDir) {
  if (!fs.existsSync(scriptsDir)) {
    return lines;
  }

  const scriptFiles = fs.readdirSync(scriptsDir)
    .filter(f => f.endsWith('.md'))
    .sort();

  if (scriptFiles.length === 0) {
    return lines;
  }

  lines.push('## Scripts');
  lines.push('');
  lines.push('Use these scripts as guidance for each state:');
  lines.push('');

  for (const file of scriptFiles) {
    const scriptName = path.basename(file, '.md');
    const scriptPath = path.join(scriptsDir, file);
    const content = readMarkdown(scriptPath);

    lines.push(`### ${scriptName.toUpperCase()}`);
    lines.push('');
    lines.push(content);
    lines.push('');
    lines.push('---');
    lines.push('');
  }

  return lines;
}

/**
 * Generate complete skill file from workflow directory
 */
function generateSkillFile(workflowDir, workflowId) {
  // Read meta and states
  const meta = readYaml(path.join(workflowDir, 'meta.yaml'));
  const states = readYaml(path.join(workflowDir, 'states.yaml'));

  if (!meta || !states) {
    throw new Error(`Failed to read workflow: ${workflowId}`);
  }

  // Generate skill content
  const lines = [generateFrontmatter(meta, workflowId)];
  lines.push('');
  lines.push(generateSkillContent(meta, states));

  const scriptsDir = path.join(workflowDir, 'scripts');
  const finalLines = appendScripts(lines, scriptsDir);

  return finalLines.join('\n');
}

/**
 * Developer mode: Convert workflow and link to src/skills (for development)
 */
function devInit(workflowId) {
  const projectRoot = path.join(__dirname, '../..');
  const skillsDir = path.join(projectRoot, 'src', 'skills');
  const repoSkillsDir = path.join(projectRoot, '.claude', 'skills');

  const workflowDir = path.join(projectRoot, 'src', 'workflows', workflowId);
  const skillDir = path.join(skillsDir, workflowId);

  // Read meta and states
  const meta = readYaml(path.join(workflowDir, 'meta.yaml'));
  const states = readYaml(path.join(workflowDir, 'states.yaml'));

  if (!meta || !states) {
    console.error(`Failed to read workflow: ${workflowId}`);
    return false;
  }

  // Create skill directory
  const dirs = [skillDir, path.join(skillDir, 'scripts')];
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  // Copy scripts directory
  const sourceScriptsDir = path.join(workflowDir, 'scripts');
  if (fs.existsSync(sourceScriptsDir)) {
    const targetScriptsDir = path.join(skillDir, 'scripts');
    const scriptFiles = fs.readdirSync(sourceScriptsDir).filter(f => f.endsWith('.md'));
    for (const file of scriptFiles) {
      fs.copyFileSync(
        path.join(sourceScriptsDir, file),
        path.join(targetScriptsDir, file)
      );
    }
  }

  // Generate skill content
  const lines = [generateFrontmatter(meta, workflowId)];
  lines.push('');
  lines.push(generateSkillContent(meta, states));

  const finalLines = appendScripts(lines, sourceScriptsDir);

  // Write SKILL.md
  const skillFile = path.join(skillDir, 'SKILL.md');
  fs.writeFileSync(skillFile, finalLines.join('\n'), 'utf8');

  console.log(`Generated: ${skillFile}`);

  // Create symbolic link
  const linkPath = path.join(repoSkillsDir, `opencoach-${workflowId}`);
  if (!fs.existsSync(repoSkillsDir)) {
    fs.mkdirSync(repoSkillsDir, { recursive: true });
  }
  if (fs.existsSync(linkPath)) {
    fs.rmSync(linkPath, { recursive: true, force: true });
  }
  fs.symlinkSync(skillDir, linkPath, 'dir');
  console.log(`Linked: ${linkPath} -> ${skillDir}`);

  return true;
}

/**
 * Developer mode: Convert all workflows
 */
function devInitAll() {
  const projectRoot = path.join(__dirname, '../..');
  const workflowsDir = path.join(projectRoot, 'src', 'workflows');

  const workflows = fs.readdirSync(workflowsDir)
    .filter(f => fs.statSync(path.join(workflowsDir, f)).isDirectory());

  console.log(`Found ${workflows.length} workflows to convert...`);
  console.log('');

  for (const workflow of workflows) {
    console.log(`Converting ${workflow}...`);
    devInit(workflow);
    console.log('');
  }

  console.log('Skill conversion complete!');
  console.log(`Skills directory: ${path.join(projectRoot, 'src', 'skills')}`);
  console.log(`Repo skills: ${path.join(projectRoot, '.claude', 'skills')}`);
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);

  // Check for dev mode flag
  if (args.includes('--dev')) {
    devInitAll();
  } else {
    initProject();
  }
}

module.exports = {
  initProject,
  devInit,
  devInitAll,
  generateSkillFile
};