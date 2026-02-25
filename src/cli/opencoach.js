#!/usr/bin/env node
/**
 * OpenCoach CLI Tool
 * A command-line tool for managing goals, tasks, and workflow states.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

// Import init functions
const { initProject, devInit, devInitAll } = require('./init');

// Configuration
const OPENCOACH_DIR = path.join(os.homedir(), 'OpenCoach');
const GOALS_DIR = path.join(OPENCOACH_DIR, 'goals');
const STATE_FILE = path.join(OPENCOACH_DIR, '.opencoach', 'state.json');
const DATA_FILE = path.join(OPENCOACH_DIR, '.opencoach', 'data.json');

// Helper functions
function ensureDirs() {
  fs.mkdirSync(path.dirname(STATE_FILE), { recursive: true });
  fs.mkdirSync(GOALS_DIR, { recursive: true });
}

function loadState() {
  if (fs.existsSync(STATE_FILE)) {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
  }
  return {};
}

function saveState(state) {
  ensureDirs();
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function loadData() {
  if (fs.existsSync(DATA_FILE)) {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  }
  return {};
}

function saveData(data) {
  ensureDirs();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function generateSlug(name) {
  if (!name) return '';
  return name.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[-\s]+/g, '-')
    .trim('-');
}

// State commands
function stateGet(args) {
  const workflow = args._[0] || args.workflow;
  const state = loadState();
  if (workflow && state[workflow]) {
    console.log(`${workflow}: ${state[workflow]}`);
  } else if (workflow) {
    console.log(`No state found for workflow: ${workflow}`);
    process.exit(1);
  } else {
    console.log('Usage: opencoach state get <workflow>');
    process.exit(1);
  }
}

function stateSet(args) {
  ensureDirs();
  const workflow = args._[0] || args.workflow;
  const stateValue = args._[1] || args.state;
  if (!workflow || !stateValue) {
    console.log('Usage: opencoach state set <workflow> <state>');
    process.exit(1);
  }
  const state = loadState();
  state[workflow] = stateValue;
  saveState(state);
  console.log(`Set ${workflow} -> ${stateValue}`);
}

function stateClear(args) {
  const workflow = args._[0] || args.workflow;
  const state = loadState();
  if (workflow && state[workflow]) {
    delete state[workflow];
    saveState(state);
    console.log(`Cleared state for: ${workflow}`);
  } else if (workflow) {
    console.log(`No state to clear for: ${workflow}`);
  } else {
    console.log('Usage: opencoach state clear <workflow>');
  }
}

// Data commands
function dataSet(args) {
  const data = loadData();
  if (args.key) {
    data[args.key] = args.value || args._[0] || '';
  } else if (args.json) {
    Object.assign(data, JSON.parse(args.json));
  } else if (args._[0] && args._[1]) {
    // Support positional args: data set key value
    data[args._[0]] = args._[1];
  } else {
    console.log('Usage: opencoach data set --key <key> --value <value>');
    console.log('   or: opencoach data set <key> <value>');
    console.log('   or: opencoach data set --json <json>');
    process.exit(1);
  }
  saveData(data);
  console.log('Data stored');
}

function dataGet(args) {
  const data = loadData();
  const key = args.key || args._[0];
  if (key) {
    if (data[key] !== undefined) {
      console.log(JSON.stringify(data[key], null, 2));
    } else {
      console.log(`Key not found: ${key}`);
      process.exit(1);
    }
  } else {
    console.log(JSON.stringify(data, null, 2));
  }
}

function dataClear() {
  if (fs.existsSync(DATA_FILE)) {
    fs.unlinkSync(DATA_FILE);
    console.log('Cleared all workflow data');
  } else {
    console.log('No data to clear');
  }
}

// Goals commands
function goalsList() {
  if (!fs.existsSync(GOALS_DIR)) {
    console.log('No goals directory found');
    return;
  }

  const dirs = fs.readdirSync(GOALS_DIR).filter(d =>
    fs.statSync(path.join(GOALS_DIR, d)).isDirectory()
  );

  if (dirs.length > 0) {
    console.log('Goals:');
    dirs.forEach(d => console.log(`  - ${d}`));
  } else {
    console.log('No goals found');
  }
}

function goalsCreate(args) {
  // Support both --name "value" and positional "value"
  const name = args.name || args._[0];
  if (!name) {
    console.log('Usage: opencoach goals create <name>');
    console.log('   or: opencoach goals create --name <name>');
    process.exit(1);
  }

  ensureDirs();
  const slug = args.slug || generateSlug(name);
  const goalDir = path.join(GOALS_DIR, slug);

  if (fs.existsSync(goalDir) && !args.force) {
    console.log(`Goal already exists: ${slug}`);
    console.log('Use --force to overwrite');
    process.exit(1);
  }

  fs.mkdirSync(goalDir, { recursive: true });

  const goalFile = path.join(goalDir, 'goal.md');
  const content = `---
created: ${new Date().toISOString().split('T')[0]}
status: active
---

# ${name}

## 目标描述

（在此填写目标描述）

## 重要性与动机

（在此填写目标的重要性和动机）

## SMART 评估

- **S**pecific (具体性):
- **M**easurable (可衡量性):
- **A**chievable (可实现性):
- **R**elevant (相关性):
- **T**ime-bound (时限性):

## 行动方针

（在此填写行动方针）

`;

  fs.writeFileSync(goalFile, content, 'utf-8');
  console.log(`Created goal: ${slug}`);
  console.log(`Location: ${goalDir}`);
}

function goalsGet(args) {
  const goalDir = path.join(GOALS_DIR, args.goal);
  if (!fs.existsSync(goalDir)) {
    console.log(`Goal not found: ${args.goal}`);
    process.exit(1);
  }

  const files = fs.readdirSync(goalDir).filter(f => f.endsWith('.md'));
  console.log(`Goal: ${args.goal}`);
  console.log(`Files: ${files.join(', ')}`);
}

// Tasks commands
function tasksList(args) {
  const goalDir = path.join(GOALS_DIR, args.goal);
  const tasksFile = path.join(goalDir, 'tasks.md');

  if (!fs.existsSync(tasksFile)) {
    console.log(`No tasks found for goal: ${args.goal}`);
    return;
  }

  const content = fs.readFileSync(tasksFile, 'utf-8');
  const taskRegex = /-\s*\[([ x])\]\s*(.+?)(?:\n|$)/g;
  const tasks = [];
  let match;

  while ((match = taskRegex.exec(content)) !== null) {
    tasks.push({ status: match[1], desc: match[2] });
  }

  if (tasks.length > 0) {
    console.log(`Tasks for ${args.goal}:`);
    tasks.forEach((t, i) => console.log(`  ${i + 1}. [${t.status.toUpperCase()}] ${t.desc}`));
  } else {
    console.log('No tasks found');
  }
}

function tasksCreate(args) {
  const goalDir = path.join(GOALS_DIR, args.goal);
  if (!fs.existsSync(goalDir)) {
    console.log(`Goal not found: ${args.goal}`);
    process.exit(1);
  }

  const tasksFile = path.join(goalDir, 'tasks.md');
  if (fs.existsSync(tasksFile) && !args.force) {
    console.log(`Tasks file already exists: ${args.goal}`);
    process.exit(1);
  }

  const start = args.start || new Date().toISOString().split('T')[0];
  const content = `---
period:
  start: ${start}
  end: ${args.end || 'YYYY-MM-DD'}
next_review: ${args.review || 'YYYY-MM-DD'}
---

# 任务清单

## 当前周期
${start} - ${args.end || '结束日期'}

## 任务列表

- [ ] 任务1描述
- [ ] 任务2描述
- [ ] 任务3描述

## 优先级说明

- P1: 高优先级 - 必须完成
- P2: 中优先级 - 应该完成
- P3: 低优先级 - 可以完成

`;

  fs.writeFileSync(tasksFile, content, 'utf-8');
  console.log(`Created tasks for goal: ${args.goal}`);
}

// Reviews commands
function reviewsList(args) {
  const goalDir = path.join(GOALS_DIR, args.goal);
  const reviewsDir = path.join(goalDir, 'reviews');

  if (!fs.existsSync(reviewsDir)) {
    console.log(`No reviews found for goal: ${args.goal}`);
    return;
  }

  const reviews = fs.readdirSync(reviewsDir).filter(f => f.endsWith('.md'));
  if (reviews.length > 0) {
    console.log(`Reviews for ${args.goal}:`);
    reviews.forEach(r => console.log(`  - ${path.basename(r, '.md')}`));
  } else {
    console.log('No reviews found');
  }
}

// Export command
function exportGoal(args) {
  const goalDir = path.join(GOALS_DIR, args.goal);
  if (!fs.existsSync(goalDir)) {
    console.log(`Goal not found: ${args.goal}`);
    process.exit(1);
  }

  const data = {
    goal: args.goal,
    exported: new Date().toISOString(),
    files: {}
  };

  fs.readdirSync(goalDir).filter(f => f.endsWith('.md')).forEach(f => {
    data.files[f] = fs.readFileSync(path.join(goalDir, f), 'utf-8');
  });

  const reviewsDir = path.join(goalDir, 'reviews');
  if (fs.existsSync(reviewsDir)) {
    data.reviews = {};
    fs.readdirSync(reviewsDir).filter(f => f.endsWith('.md')).forEach(f => {
      data.reviews[path.basename(f, '.md')] = fs.readFileSync(path.join(reviewsDir, f), 'utf-8');
    });
  }

  if (args.output) {
    fs.writeFileSync(args.output, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`Exported to: ${args.output}`);
  } else {
    console.log(JSON.stringify(data, null, 2));
  }
}

// CLI parser
function parseArgs(args) {
  const commands = {
    state: {
      get: (a) => stateGet(a),
      set: (a) => stateSet(a),
      clear: (a) => stateClear(a)
    },
    data: {
      set: (a) => dataSet(a),
      get: (a) => dataGet(a),
      clear: () => dataClear()
    },
    goals: {
      list: () => goalsList(),
      create: (a) => goalsCreate(a),
      get: (a) => goalsGet(a)
    },
    tasks: {
      list: (a) => tasksList(a),
      create: (a) => tasksCreate(a)
    },
    reviews: {
      list: (a) => reviewsList(a)
    },
    export: (a) => exportGoal(a)
  };

  let cmd = args[2];
  let subcmd = args[3];
  let remaining = args.slice(4);

  if (!cmd) {
    printHelp();
    return;
  }

  // Handle top-level commands
  if (cmd === 'init') {
    const opts = parseOptions(remaining);
    const cwd = opts.cwd || opts._[0];
    initProject(cwd);
    return;
  }

  if (cmd === 'export') {
    const opts = parseOptions(remaining);
    exportGoal({ goal: opts._[0], output: opts.o });
    return;
  }

  // Parse subcommands
  if (cmd === 'state' || cmd === 'data' || cmd === 'goals' || cmd === 'tasks' || cmd === 'reviews') {
    if (!subcmd) {
      console.log(`Usage: opencoach ${cmd} <subcommand>`);
      return;
    }

    const opts = parseOptions(remaining);
    const fn = commands[cmd]?.[subcmd];

    if (fn) {
      fn(opts);
    } else {
      console.log(`Unknown subcommand: ${subcmd}`);
    }
  } else {
    printHelp();
  }
}

function parseOptions(args) {
  const opts = { _: [] };
  let i = 0;
  while (i < args.length) {
    const arg = args[i];
    if (arg === '--force') {
      opts.force = true;
    } else if (arg === '-o' && args[i + 1]) {
      opts.o = args[i + 1];
      i++;
    } else if (arg.startsWith('--') && args[i + 1] && !args[i + 1].startsWith('-')) {
      opts[arg.slice(2)] = args[i + 1];
      i++;
    } else if (arg.startsWith('--')) {
      opts[arg.slice(2)] = true;
    } else {
      opts._.push(arg);
    }
    i++;
  }
  return opts;
}

function printHelp() {
  console.log(`
OpenCoach CLI - Goal management and workflow tool

Usage:
  opencoach init [--cwd <path>]   Initialize OpenCoach in current directory
                                      Creates .claude/skills with workflow skills

  opencoach state get <workflow>     Get workflow state
  opencoach state set <workflow> <state>  Set workflow state
  opencoach state clear <workflow>   Clear workflow state

  opencoach data set --key <k> --value <v>  Store data
  opencoach data set --json <json>          Store JSON data
  opencoach data get [--key <k>]    Get data
  opencoach data clear              Clear all data

  opencoach goals list              List all goals
  opencoach goals create <name>     Create new goal
  opencoach goals get <goal>         Get goal details

  opencoach tasks list <goal>        List tasks
  opencoach tasks create <goal>      Create tasks file

  opencoach reviews list <goal>      List reviews

  opencoach export <goal> [-o <file>]  Export goal as JSON
`);
}

// Main
parseArgs(process.argv);
