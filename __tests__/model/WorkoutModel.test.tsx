import { WorkoutModel } from '../../src/model/WorkoutModel';

test('Add Exercise', () => {
  const executionsDay1 = executionTestData.filter((i) => i.day === 1);
  const executionsDay2 = executionTestData.filter((i) => i.day === 2);
  const executionsDay3 = executionTestData.filter((i) => i.day === 3);
  new WorkoutModel(executionsDay1);
  expect(true).toBeTruthy();
});

test('Remove Exercise', () => {});
test('Alternate Order', () => {});
test('Alternate Reps and Weight', () => {});
