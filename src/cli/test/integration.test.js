/**
 * Integration tests - simulate complete workflow execution
 */
const { setup, teardown } = require('./setup');
const {
  stateSet, stateGet, stateClear,
  dataSet, dataGet, dataClear,
  goalsCreate, goalsGet, tasksCreate, goalDelete
} = require('./helpers');

beforeAll(setup);
afterAll(teardown);

describe('create-goal workflow simulation', () => {
  beforeEach(() => {
    goalDelete('integration-goal');
    dataClear();
    stateClear('create-goal');
  });

  afterEach(() => {
    goalDelete('integration-goal');
    dataClear();
    stateClear('create-goal');
  });

  test('complete goal creation workflow', () => {
    // Step 1: Start workflow
    stateSet('create-goal', 'INIT');
    expect(stateGet('create-goal')).toBe('INIT');

    // Step 2: User confirms, move to PRE_CHECK
    stateSet('create-goal', 'PRE_CHECK');
    expect(stateGet('create-goal')).toBe('PRE_CHECK');

    // Step 3: Pre-check passes, move to GOAL_ELICITATION
    stateSet('create-goal', 'GOAL_ELICITATION');
    expect(stateGet('create-goal')).toBe('GOAL_ELICITATION');

    // Step 4: Collect goal data from user
    dataSet('goal_description', 'Learn Python Programming');
    dataSet('goal_importance', 'Career growth and skill development');
    expect(dataGet('goal_description')).toBe('Learn Python Programming');

    // Step 5: Move to IMPORTANCE_EXPLORATION
    stateSet('create-goal', 'IMPORTANCE_EXPLORATION');
    expect(stateGet('create-goal')).toBe('IMPORTANCE_EXPLORATION');

    // Step 6: Collect motivation data
    dataSet('motivation', 'Personal interest and career advancement');
    expect(dataGet('motivation')).toBe('Personal interest and career advancement');

    // Step 7: Move to SMART_EVALUATION
    stateSet('create-goal', 'SMART_EVALUATION');
    expect(stateGet('create-goal')).toBe('SMART_EVALUATION');

    // Step 8: Store SMART evaluation
    dataSet('smart_specific', 'Complete Python bootcamp course');
    dataSet('smart_measurable', 'Finish 50 coding exercises');
    dataSet('smart_achievable', 'Difficulty: 6/10');
    dataSet('smart_timelimit', '2026-06-30');

    // Step 9: Move to ACTION_PLANNING
    stateSet('create-goal', 'ACTION_PLANNING');
    stateSet('create-goal', 'FILE_CREATION');

    // Step 10: Create actual goal file
    const slug = goalsCreate('Learn Python Programming', { slug: 'integration-goal' });
    expect(slug).toBe('integration-goal');

    // Step 11: Verify goal files created
    const files = goalsGet('integration-goal');
    expect(files).toContain('goal.md');

    // Step 12: Move to COMPLETE
    stateSet('create-goal', 'COMPLETE');

    // Step 13: Cleanup
    stateClear('create-goal');
    dataClear();

    expect(stateGet('create-goal')).toBeNull();
  });

  test('workflow state transitions are tracked', () => {
    const states = ['INIT', 'PRE_CHECK', 'GOAL_ELICITATION', 'IMPORTANCE_EXPLORATION',
                   'SMART_EVALUATION', 'ACTION_PLANNING', 'FILE_CREATION',
                   'MILESTONE_PLANNING', 'PREFERENCES_COLLECTION', 'COMPLETE'];

    states.forEach(state => {
      stateSet('create-goal', state);
      expect(stateGet('create-goal')).toBe(state);
    });

    // Clear and verify
    stateClear('create-goal');
    expect(stateGet('create-goal')).toBeNull();
  });

  test('data persists across state transitions', () => {
    // Set initial data
    dataSet('user_name', 'Boss');
    dataSet('goal_theme', 'Programming');

    // Simulate state transitions
    stateSet('create-goal', 'GOAL_ELICITATION');
    dataSet('goal', 'Learn Python');

    stateSet('create-goal', 'IMPORTANCE_EXPLORATION');
    dataSet('motivation', 'Career growth');

    stateSet('create-goal', 'SMART_EVALUATION');
    dataSet('smart', 'Complete course in 3 months');

    // Verify all data still exists
    expect(dataGet('user_name')).toBe('Boss');
    expect(dataGet('goal_theme')).toBe('Programming');
    expect(dataGet('goal')).toBe('Learn Python');
    expect(dataGet('motivation')).toBe('Career growth');
    expect(dataGet('smart')).toBe('Complete course in 3 months');
  });
});

describe('create-task workflow simulation', () => {
  beforeEach(() => {
    goalDelete('task-test');
    goalsCreate('Task Test Goal', { slug: 'task-test' });
    stateClear('create-task');
    dataClear();
  });

  afterEach(() => {
    goalDelete('task-test');
    stateClear('create-task');
    dataClear();
  });

  test('complete task creation workflow', () => {
    // Start workflow
    stateSet('create-task', 'INIT');
    stateSet('create-task', 'PRE_CHECK');
    stateSet('create-task', 'CONTEXT_REVIEW');

    // Store context data
    dataSet('goal_name', 'Task Test Goal');
    dataSet('period', '2026-02-01 to 2026-02-28');

    // Move to task decomposition
    stateSet('create-task', 'PERIOD_DEFINITION');
    stateSet('create-task', 'TASK_DECOMPOSITION');

    // Store tasks
    dataSet('tasks', JSON.stringify([
      { id: 1, desc: 'Task 1', milestone: 'Milestone 1' },
      { id: 2, desc: 'Task 2', milestone: 'Milestone 1' }
    ]));

    // Move to priority setting
    stateSet('create-task', 'PRIORITY_SETTING');
    dataSet('priorities', JSON.stringify([
      { id: 1, priority: 'P1' },
      { id: 2, priority: 'P2' }
    ]));

    // Move to feasibility check
    stateSet('create-task', 'FEASIBILITY_CHECK');

    // Move to file creation
    stateSet('create-task', 'FILE_CREATION');
    tasksCreate('task-test', { start: '2026-02-01', end: '2026-02-28' });

    // Verify tasks file created
    const tasks = require('./helpers').tasksList('task-test');
    expect(tasks.length).toBeGreaterThan(0);

    // Complete workflow
    stateSet('create-task', 'TRACKING_SETUP');
    stateSet('create-task', 'COMPLETE');

    // Cleanup
    stateClear('create-task');

    expect(stateGet('create-task')).toBeNull();
  });
});

describe('error handling simulation', () => {
  beforeEach(() => {
    goalDelete('error-test');
    stateClear('create-goal');
    dataClear();
  });

  afterEach(() => {
    goalDelete('error-test');
    stateClear('create-goal');
    dataClear();
  });

  test('cancel workflow saves state', () => {
    stateSet('create-goal', 'INIT');
    stateSet('create-goal', 'GOAL_ELICITATION');

    // User decides to cancel
    dataSet('cancel_reason', 'Need more time to think');
    stateSet('create-goal', 'ERROR');

    // Verify error state saved
    expect(stateGet('create-goal')).toBe('ERROR');
    expect(dataGet('cancel_reason')).toBe('Need more time to think');
  });

  test('resume workflow after error', () => {
    // Simulate error state
    stateSet('create-goal', 'GOAL_ELICITATION');
    dataSet('partial_goal', 'Learn something');

    // User wants to resume
    stateSet('create-goal', 'GOAL_ELICITATION');

    // Continue workflow
    dataSet('goal_description', 'Learn Python');
    stateSet('create-goal', 'IMPORTANCE_EXPLORATION');

    expect(stateGet('create-goal')).toBe('IMPORTANCE_EXPLORATION');
    expect(dataGet('goal_description')).toBe('Learn Python');
  });
});
