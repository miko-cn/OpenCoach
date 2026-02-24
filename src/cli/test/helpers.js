/**
 * Test helpers - re-export CLI functions for testing
 */
const fs = require('fs');
const path = require('path');
const os = require('os');

// Dynamic resolution - not cached at module load time
function getOpenCoachDir() {
  return process.env.OPENCOACH_DIR || path.join(os.homedir(), 'OpenCoach');
}

function getGoalsDir() {
  return path.join(getOpenCoachDir(), 'goals');
}

function getStateFile() {
  return path.join(getOpenCoachDir(), '.opencoach', 'state.json');
}

function getDataFile() {
  return path.join(getOpenCoachDir(), '.opencoach', 'data.json');
}

// Legacy exports for compatibility
const OPENCOACH_DIR = getOpenCoachDir();
const GOALS_DIR = getGoalsDir();
const STATE_FILE = getStateFile();
const DATA_FILE = getDataFile();

function ensureDirs() {
  fs.mkdirSync(path.dirname(getStateFile()), { recursive: true });
  fs.mkdirSync(getGoalsDir(), { recursive: true });
}

function loadState() {
  const stateFile = getStateFile();
  if (fs.existsSync(stateFile)) {
    return JSON.parse(fs.readFileSync(stateFile, 'utf-8'));
  }
  return {};
}

function saveState(state) {
  ensureDirs();
  fs.writeFileSync(getStateFile(), JSON.stringify(state, null, 2));
}

function loadData() {
  const dataFile = getDataFile();
  if (fs.existsSync(dataFile)) {
    return JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
  }
  return {};
}

function saveData(data) {
  ensureDirs();
  fs.writeFileSync(getDataFile(), JSON.stringify(data, null, 2));
}

function generateSlug(name) {
  return name.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[-\s]+/g, '-')
    .trim('-');
}

function stateSet(workflow, state) {
  ensureDirs();
  const s = loadState();
  s[workflow] = state;
  saveState(s);
}

function stateGet(workflow) {
  const s = loadState();
  return s[workflow] || null;
}

function stateClear(workflow) {
  const s = loadState();
  delete s[workflow];
  saveState(s);
}

function dataSet(key, value) {
  const d = loadData();
  d[key] = value;
  saveData(d);
}

function dataGet(key) {
  const d = loadData();
  return key ? d[key] : d;
}

function dataClear() {
  const dataFile = getDataFile();
  if (fs.existsSync(dataFile)) {
    fs.unlinkSync(dataFile);
  }
}

function goalsList() {
  const goalsDir = getGoalsDir();
  if (!fs.existsSync(goalsDir)) return [];
  return fs.readdirSync(goalsDir).filter(d =>
    fs.statSync(path.join(goalsDir, d)).isDirectory()
  );
}

function goalsCreate(name, options = {}) {
  const slug = options.slug || generateSlug(name);
  const goalDir = path.join(getGoalsDir(), slug);

  if (fs.existsSync(goalDir) && !options.force) {
    throw new Error(`Goal already exists: ${slug}`);
  }

  fs.mkdirSync(goalDir, { recursive: true });
  const goalFile = path.join(goalDir, 'goal.md');
  fs.writeFileSync(goalFile, `# ${name}\n`, 'utf-8');

  return slug;
}

function goalsGet(goal) {
  const goalDir = path.join(getGoalsDir(), goal);
  if (!fs.existsSync(goalDir)) return null;
  return fs.readdirSync(goalDir).filter(f => f.endsWith('.md'));
}

function tasksList(goal) {
  const goalDir = path.join(getGoalsDir(), goal);
  const tasksFile = path.join(goalDir, 'tasks.md');

  if (!fs.existsSync(tasksFile)) return [];

  const content = fs.readFileSync(tasksFile, 'utf-8');
  const taskRegex = /-\s*\[([ x])\]\s*(.+?)(?:\n|$)/g;
  const tasks = [];
  let match;

  while ((match = taskRegex.exec(content)) !== null) {
    tasks.push({ status: match[1], desc: match[2] });
  }

  return tasks;
}

function tasksCreate(goal, options = {}) {
  const goalDir = path.join(getGoalsDir(), goal);
  if (!fs.existsSync(goalDir)) {
    throw new Error(`Goal not found: ${goal}`);
  }

  const tasksFile = path.join(goalDir, 'tasks.md');
  if (fs.existsSync(tasksFile) && !options.force) {
    throw new Error(`Tasks file already exists: ${goal}`);
  }

  const start = options.start || new Date().toISOString().split('T')[0];
  const content = `---
period:
  start: ${start}
  end: ${options.end || 'YYYY-MM-DD'}
next_review: ${options.review || 'YYYY-MM-DD'}
---

# 任务清单

## 当前周期
${start} - ${options.end || '结束日期'}

## 任务列表

- [ ] 任务1描述
- [ ] 任务2描述

`;

  fs.writeFileSync(tasksFile, content, 'utf-8');
  return true;
}

function reviewsList(goal) {
  const goalDir = path.join(getGoalsDir(), goal);
  const reviewsDir = path.join(goalDir, 'reviews');

  if (!fs.existsSync(reviewsDir)) return [];

  return fs.readdirSync(reviewsDir).filter(f => f.endsWith('.md'));
}

function reviewsCreate(goal, date) {
  const goalDir = path.join(getGoalsDir(), goal);
  const reviewsDir = path.join(goalDir, 'reviews');

  fs.mkdirSync(reviewsDir, { recursive: true });
  const reviewFile = path.join(reviewsDir, `${date}.md`);
  fs.writeFileSync(reviewFile, `# Review ${date}\n`, 'utf-8');

  return true;
}

function goalDelete(goal) {
  const goalDir = path.join(getGoalsDir(), goal);
  if (fs.existsSync(goalDir)) {
    fs.rmSync(goalDir, { recursive: true, force: true });
  }
}

module.exports = {
  ensureDirs, loadState, saveState, loadData, saveData,
  generateSlug,
  stateSet, stateGet, stateClear,
  dataSet, dataGet, dataClear,
  goalsList, goalsCreate, goalsGet,
  tasksList, tasksCreate,
  reviewsList, reviewsCreate,
  goalDelete,
  // Dynamic getters
  getOpenCoachDir, getGoalsDir, getStateFile, getDataFile,
  // Legacy exports (deprecated - use getters)
  OPENCOACH_DIR, GOALS_DIR, STATE_FILE, DATA_FILE
};
