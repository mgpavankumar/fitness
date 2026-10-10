# Fitness & Workout Tracker · TypeScript

An in-memory fitness tracker for user profiles and workout logs, built as a TypeScript learning project.

**Author:** [M. G. Pavan Kumar](https://github.com/mgpavankumar)  
**Status:** Educational project

## Features

- Create user profiles with UUID identifiers
- Log workout type, duration, calories, and date
- Retrieve workouts and filter them by type
- View and update user details

## Getting started

Install Node.js and npm. Clone this repository:

```bash
git clone https://github.com/mgpavankumar/fitness.git
cd fitness
```

```bash
npm install
npm exec --package=tsx -- tsx src/tracker.ts
```

## Project structure

| Path | Purpose |
| --- | --- |
| `src/tracker.ts` | User types, tracker class, and running/yoga demonstration |
| `package.json` | UUID dependency and existing start script |
| `tsconfig.json` | Compiler configuration |

## Current behavior and limitations

The command uses a temporary `tsx` runner because the current start script calls `ts-node`, which is not declared in package.json. The compiler configuration includes source patterns that do not match the files and references Node types that are not declared as a direct dependency. Profile updates do not repeat creation-time validation. All records exist only in memory.

## Planned improvements

- Declare a local runner and compiler dependencies
- Repair TypeScript source inclusion
- Validate profile updates and add persistent storage

## Contributing

Open an issue describing the problem or proposed improvement. Keep pull requests focused and include the steps used to verify changes. Use sample data and keep credentials out of commits.

## Verification

This documentation was checked against the committed source files, dependency declarations, and route definitions. Installation, compilation, database setup, and runtime behavior have not been verified by this documentation update. There is no automated test suite in the current repository.
