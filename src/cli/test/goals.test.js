/**
 * Goal management tests
 */
const { setup, teardown } = require('./setup');
const { goalsList, goalsCreate, getGoalsDir, goalDelete } = require('./helpers');
const fs = require('fs');
const path = require('path');

beforeAll(setup);
afterAll(teardown);

describe('goal management', () => {
  beforeEach(() => {
    // Clean up goals directory
    const goalsDir = getGoalsDir();
    if (fs.existsSync(goalsDir)) {
      fs.rmSync(goalsDir, { recursive: true, force: true });
    }
  });

  afterEach(() => {
    // Clean up
    goalDelete('test-goal');
    goalDelete('learn-python');
    goalDelete('python');
  });

  test('list empty goals', () => {
    expect(goalsList()).toEqual([]);
  });

  test('create goal', () => {
    const slug = goalsCreate('Learn Python');
    expect(slug).toBe('learn-python');
    expect(fs.existsSync(path.join(getGoalsDir(), 'learn-python'))).toBe(true);
  });

  test('create goal with chinese name', () => {
    const slug = goalsCreate('学习Python编程');
    // Current implementation strips non-ASCII characters
    expect(slug).toBe('python');
  });

  test('list goals after creation', () => {
    goalsCreate('Goal One');
    goalsCreate('Goal Two');
    expect(goalsList()).toEqual(['goal-one', 'goal-two']);
  });

  test('create goal with custom slug', () => {
    const slug = goalsCreate('My Goal', { slug: 'custom-slug' });
    expect(slug).toBe('custom-slug');
  });

  test('fail to create duplicate goal', () => {
    goalsCreate('Test Goal');
    expect(() => goalsCreate('Test Goal')).toThrow();
  });

  test('force overwrite existing goal', () => {
    goalsCreate('Test Goal', { slug: 'test-goal' });
    const slug = goalsCreate('Test Goal', { slug: 'test-goal', force: true });
    expect(slug).toBe('test-goal');
  });
});
