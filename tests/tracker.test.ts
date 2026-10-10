import test from 'node:test';
import assert from 'node:assert/strict';
import { FitnessTracker } from '../src/FitnessTracker.js';

test('user and workout lifecycle', () => {
  const tracker = new FitnessTracker();
  const id = tracker.addUser('Test User', 25, 70, 175);
  tracker.logWorkout(id, { type: 'running', duration: 30, caloriesBurned: 250, date: new Date() });
  assert.equal(tracker.getAllWorkoutsByType(id, 'running').length, 1);
  tracker.updateUser(id, { weight: 71 });
  assert.equal(tracker.getUser(id)?.weight, 71);
});
test('reject invalid creation, updates, and workouts', () => {
  const tracker = new FitnessTracker();
  assert.throws(() => tracker.addUser('Test', NaN, 70, 175));
  const id = tracker.addUser('Test', 25, 70, 175);
  assert.throws(() => tracker.updateUser(id, { weight: -1 }));
  assert.equal(tracker.getUser(id)?.weight, 70);
  assert.throws(() => tracker.logWorkout(id, { type: 'run', duration: Infinity, caloriesBurned: 100, date: new Date() }));
  assert.throws(() => tracker.getUser('missing'));
});
test('retrieving a user returns a defensive copy', () => {
  const tracker = new FitnessTracker();
  const id = tracker.addUser('Test', 25, 70, 175);
  tracker.getUser(id)!.weight = -5;
  assert.equal(tracker.getUser(id)?.weight, 70);
});
