/**
 * Task management tests
 */
const { setup, teardown } = require('./setup');
const { goalsCreate, goalDelete, tasksList, tasksCreate, getGoalsDir } = require('./helpers');
const fs = require('fs');

beforeAll(setup);
afterAll(teardown);

describe('task management', () => {
  beforeEach(() => {
    goalDelete('test-goal');
    goalsCreate('Test Goal', { slug: 'test-goal' });
  });

  afterEach(() => {
    goalDelete('test-goal');
  });

  test('list empty tasks', () => {
    const tasks = tasksList('test-goal');
    expect(tasks).toEqual([]);
  });

  test('create tasks file', () => {
    tasksCreate('test-goal', { start: '2026-02-01', end: '2026-02-28' });
    const tasks = tasksList('test-goal');
    expect(tasks.length).toBeGreaterThan(0);
  });

  test('tasks file contains period info', () => {
    tasksCreate('test-goal', {
      start: '2026-02-01',
      end: '2026-02-28',
      review: '2026-02-14'
    });

    const content = fs.readFileSync(`${getGoalsDir()}/test-goal/tasks.md`, 'utf-8');

    expect(content).toContain('2026-02-01');
    expect(content).toContain('2026-02-28');
    expect(content).toContain('2026-02-14');
  });

  test('fail to create duplicate tasks', () => {
    tasksCreate('test-goal');
    expect(() => tasksCreate('test-goal')).toThrow();
  });

  test('force overwrite tasks', () => {
    tasksCreate('test-goal');
    const result = tasksCreate('test-goal', { force: true });
    expect(result).toBe(true);
  });

  test('fail on non-existent goal', () => {
    expect(() => tasksCreate('nonexistent')).toThrow();
  });
});
