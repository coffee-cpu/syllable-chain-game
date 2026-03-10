# Syllable Chain Puzzle

An interactive educational puzzle app where players follow a chain of phrase pairs to collect syllables and decode a hidden message.

## Overview

**Core mechanic:** The screen shows a starting phrase and several shuffled rows. Each row has a left phrase, a visible syllable in a box, and a right phrase. The player finds the row whose left phrase matches the current target, taps it to collect the syllable, then follows the right phrase to the next row. Collected syllables spell out a secret phrase.

## Features

- **Puzzle Mechanics:** Engaging matching game to piece together hidden messages.
- **Bi-lingual Packs:** English and Russian puzzle sets carefully crafted.
- **Internationalization (i18n):** User interface translated seamlessly using `react-i18next`.
- **Gamification:** Star rating system (1-3 stars), daily streak tracking, and mistake/hint tracking. Auto-hint drops after consecutive mistakes.
- **Progress Persistence:** Cross-session progress is automatically tracked and saved in your browser via `localStorage`. 

## Architecture & Tech Stack

- **Framework:** React 19 + TypeScript
- **Build tool:** Vite
- **Styling:** Tailwind CSS 4
- **State management:** React Context API + `useReducer`
- **i18n:** `i18next` & `react-i18next`
- **Testing:** Vitest + React Testing Library (logic & config validation)
- **Validation:** Zod for puzzle pack configuration schema checks

## Project Structure

- `src/components/`: Modular React components divided into layout, screens, ui, and puzzle-specific elements.
- `src/config/puzzles/`: Contains plain object configurations for English (`en/`) and Russian (`ru/`) puzzle packs. Adding new puzzles is as simple as adding a new collection!
- `src/context/`: Contains `GameContext` (active game loop state) and `ProgressContext` (global save data and streaks).
- `src/hooks/`: Contains central application hooks such as `usePuzzle` processing gameplay logic.
- `tests/`: Features test suites validating config integrities and complex component test scenarios.

## Scripts & Operations

Install dependencies:
```bash
npm install
```

Run the development server natively:
```bash
npm run dev
```

Create a production build:
```bash
npm run build
```

Run unit tests & configuration validations:
```bash
npm run test
```

Run linter:
```bash
npm run lint
```

## Adding New Puzzles

Puzzles are plain objects conforming to the `PuzzleConfig` specification stored inside `src/config/puzzles/{lang}/{pack-name}.ts`.
Simply create a valid `PuzzleConfig` explicitly asserting logic paths, export it inside the language package aggregator `index.ts`, and run the test suite to validate links.
