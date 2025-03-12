import { v4 as uuidv4 } from 'uuid';

interface User {
    id: string;
    name: string;
    age: number;
    weight: number;
    height: number;
}

interface Workout {
    type: string;
    duration: number; // in minutes
    caloriesBurned: number;
    date: Date;
}

class FitnessTracker {
    private users: Map<string, User> = new Map();
    private workouts: Map<string, Workout[]> = new Map();

    addUser(name: string, age: number, weight: number, height: number): string {
        if (!name || age <= 0 || weight <= 0 || height <= 0) {
            throw new Error('Invalid user details. Please provide a valid name, age, weight, and height.');
        }

        const id = uuidv4();
        const user: User = { id, name, age, weight, height };

        this.users.set(id, user);
        this.workouts.set(id, []);

        return id;
    }

    logWorkout(userId: string, workout: Workout): void {
        if (!this.users.has(userId)) {
            throw new Error('User not found. Cannot log workout.');
        }

        if (!workout.type || workout.duration <= 0 || workout.caloriesBurned <= 0) {
            throw new Error('Invalid workout details. Please provide a valid type, duration, and calories burned.');
        }

        const userWorkouts = this.workouts.get(userId)!;
        userWorkouts.push(workout);
    }

    getAllWorkoutsOf(userId: string): Workout[] {
        if (!this.users.has(userId)) {
            throw new Error('User not found. Cannot retrieve workouts.');
        }

        return this.workouts.get(userId)!;
    }

    getAllWorkoutsByType(userId: string, type: string): Workout[] {
        if (!this.users.has(userId)) {
            throw new Error('User not found. Cannot retrieve workouts.');
        }

        if (!type) {
            throw new Error('Invalid workout type. Please provide a valid type.');
        }

        return this.getAllWorkoutsOf(userId).filter(workout => workout.type === type);
    }

    getUsers(): User[] {
        return Array.from(this.users.values());
    }

    getUser(id: string): User | undefined {
        if (!this.users.has(id)) {
            throw new Error('User not found.');
        }

        return this.users.get(id);
    }

    updateUser(id: string, updatedFields: Partial<Omit<User, 'id'>>): void {
        if (!this.users.has(id)) {
            throw new Error('User not found. Cannot update details.');
        }

        const user = this.users.get(id)!;
        const updatedUser = { ...user, ...updatedFields };

        this.users.set(id, updatedUser);
    }
}

// Example usage
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