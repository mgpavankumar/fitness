# Fitness & Workout Tracker · TypeScript

[![CI](https://github.com/mgpavankumar/fitness/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/mgpavankumar/fitness/actions/workflows/ci.yml)

An in-memory tracker for user profiles and workout logs.

**Author:** [M. G. Pavan Kumar](https://github.com/mgpavankumar)
**Status:** Educational project

## Features

- Create and update validated user profiles
- Log workouts and filter them by type
- Protect stored user and workout records from external mutation

## Getting started

Install Node.js 22 or newer and npm. Clone this repository:

```bash
git clone https://github.com/mgpavankumar/fitness.git
cd fitness
```

```bash
npm ci
```

```bash
npm run build
npm start
```

`npm start` runs the TypeScript entry point with the Node.js `tsx` loader. `npm run build` emits JavaScript into `dist/src`. `npm run dev` watches source files.

## Tests

```bash
npm run typecheck
npm test
```

See [TEST_RESULTS.md](TEST_RESULTS.md) for recorded local verification and its limits.

## Project structure

| Path | Purpose |
| --- | --- |
| `src/FitnessTracker.ts` | Application logic and/or demonstration |
| `src/tracker.ts` | Application logic and/or demonstration |
| `tests/` | Automated regression checks |
| `tsconfig.json` | Strict ESM compilation settings |

## Current behavior and limitations

Records are held in memory and disappear when the process stops.

## Demonstration

`npm start` creates a synthetic user, logs running and yoga workouts, filters running workouts, and updates the profile's weight from 75 to 76. IDs and timestamps vary between runs. The reusable class is [FitnessTracker](src/FitnessTracker.ts).

## Contributing

Keep changes focused, use synthetic data, and include steps or tests demonstrating the fix. Do not commit local configuration or credentials.
