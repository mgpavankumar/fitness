import { FitnessTracker } from "./FitnessTracker.js";


const fitnessTracker = new FitnessTracker();

const userId = fitnessTracker.addUser('John Doe', 30, 75, 180);

fitnessTracker.logWorkout(userId, {
    type: 'running',
    duration: 30,
    caloriesBurned: 300,
    date: new Date(),
});

fitnessTracker.logWorkout(userId, {
    type: 'yoga',
    duration: 60,
    caloriesBurned: 200,
    date: new Date(),
});

console.log('All workouts:', fitnessTracker.getAllWorkoutsOf(userId));
console.log('Running workouts:', fitnessTracker.getAllWorkoutsByType(userId, 'running'));
console.log('All users:', fitnessTracker.getUsers());
console.log('User details:', fitnessTracker.getUser(userId));

fitnessTracker.updateUser(userId, { weight: 76 });
console.log('Updated user details:', fitnessTracker.getUser(userId));
