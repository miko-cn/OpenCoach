/**
 * Data storage tests
 */
const { setup, teardown } = require('./setup');
const { dataSet, dataGet, dataClear } = require('./helpers');

beforeAll(setup);
afterAll(teardown);

describe('data storage', () => {
  beforeEach(() => {
    dataClear();
  });

  test('set and get string value', () => {
    dataSet('goal_name', 'Learn Python');
    expect(dataGet('goal_name')).toBe('Learn Python');
  });

  test('set and get object value', () => {
    const obj = { key: 'value', nested: { a: 1 } };
    dataSet('complex', obj);
    expect(dataGet('complex')).toEqual(obj);
  });

  test('get non-existent key returns undefined', () => {
    expect(dataGet('nonexistent')).toBeUndefined();
  });

  test('get all data', () => {
    dataSet('key1', 'value1');
    dataSet('key2', 'value2');
    expect(dataGet()).toEqual({ key1: 'value1', key2: 'value2' });
  });

  test('clear all data', () => {
    dataSet('key1', 'value1');
    dataClear();
    expect(dataGet('key1')).toBeUndefined();
  });
});
