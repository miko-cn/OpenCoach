/**
 * State management tests
 */
const { setup, teardown } = require('./setup');
const { stateSet, stateGet, stateClear } = require('./helpers');

beforeAll(setup);
afterAll(teardown);

describe('state management', () => {
  beforeEach(() => {
    stateClear('test-workflow');
  });

  test('set and get state', () => {
    stateSet('test-workflow', 'INIT');
    expect(stateGet('test-workflow')).toBe('INIT');
  });

  test('get non-existent state returns null', () => {
    expect(stateGet('nonexistent')).toBeNull();
  });

  test('clear state', () => {
    stateSet('test-workflow', 'INIT');
    stateClear('test-workflow');
    expect(stateGet('test-workflow')).toBeNull();
  });

  test('multiple workflows independent', () => {
    stateSet('workflow-a', 'STATE-A');
    stateSet('workflow-b', 'STATE-B');
    expect(stateGet('workflow-a')).toBe('STATE-A');
    expect(stateGet('workflow-b')).toBe('STATE-B');
  });
});
