import { v4 as uuidv4 } from 'uuid';

export interface User {
    id: string;
    name: string;
    age: number;
    weight: number;
    height: number;
}

export interface Workout {
    type: string;
    duration: number; // in minutes
    caloriesBurned: number;
    date: Date;
}

export class FitnessTracker {
    private users: Map<string, User> = new Map();
    private workouts: Map<string, Workout[]> = new Map();

    addUser(name: string, age: number, weight: number, height: number): string {
        if (!name.trim() || ![age, weight, height].every(value => Number.isFinite(value) && value > 0)) {
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

        if (!workout.type.trim() || ![workout.duration, workout.caloriesBurned].every(value => Number.isFinite(value) && value > 0) || !Number.isFinite(workout.date.getTime())) {
            throw new Error('Invalid workout details. Please provide a valid type, duration, and calories burned.');
        }

        const userWorkouts = this.workouts.get(userId)!;
        userWorkouts.push({ ...workout, date: new Date(workout.date) });
    }

    getAllWorkoutsOf(userId: string): Workout[] {
        if (!this.users.has(userId)) {
            throw new Error('User not found. Cannot retrieve workouts.');
        }

        return this.workouts.get(userId)!.map(workout => ({ ...workout, date: new Date(workout.date) }));
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
        return Array.from(this.users.values()).map(user => ({ ...user }));
    }

    getUser(id: string): User | undefined {
        if (!this.users.has(id)) {
            throw new Error('User not found.');
        }

        return { ...this.users.get(id)! };
    }

    updateUser(id: string, updatedFields: Partial<Omit<User, 'id'>>): void {
        if (!this.users.has(id)) {
            throw new Error('User not found. Cannot update details.');
        }

        const user = this.users.get(id)!;
        const updatedUser = { ...user, ...updatedFields };

        if (!updatedUser.name.trim() || ![updatedUser.age, updatedUser.weight, updatedUser.height].every(value => Number.isFinite(value) && value > 0)) {
            throw new Error("Invalid user details.");
        }
        this.users.set(id, updatedUser);
    }
}

