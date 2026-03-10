# Syllable Chain Puzzle — Technical Specification

## Overview

An interactive educational puzzle app where players follow a chain of phrase pairs to collect syllables and decode a hidden message.

**Core mechanic:** The screen shows a starting phrase and several shuffled rows. Each row has a left phrase, a visible syllable in a box, and a right phrase. The player finds the row whose left phrase matches the current target, taps it to collect the syllable, then follows the right phrase to the next row. Collected syllables spell out a secret phrase.

---

## Architecture

### Stack

- **Framework:** React 18+ with TypeScript
- **Build tool:** Vite
- **Styling:** Tailwind CSS 4
- **State management:** React context + useReducer (no external library needed)
- **i18n:** react-i18next
- **Storage:** localStorage for progress persistence
- **Testing:** Vitest + React Testing Library
- **Linting:** ESLint + Prettier
- **PWA:** Vite PWA plugin for offline support + installability

### Project Structure

```
syllable-chain/
├── public/
│   └── locales/
│       ├── en/
│       │   └── translation.json
│       └── ru/
│           └── translation.json
├── src/
│   ├── components/
│   │   ├── App.tsx                  # Root: router between screens
│   │   ├── screens/
│   │   │   ├── HomeScreen.tsx       # Level select + progress overview
│   │   │   ├── PuzzleScreen.tsx     # Main gameplay screen
│   │   │   └── ResultScreen.tsx     # Post-puzzle celebration + stats
│   │   ├── puzzle/
│   │   │   ├── ChainRow.tsx         # Single row: left phrase | syllable box | → | right phrase
│   │   │   ├── AnswerSlots.tsx      # Bottom area showing collected letters
│   │   │   ├── StartBanner.tsx      # "Starting phrase: ___" display
│   │   │   └── HintButton.tsx       # Hint trigger with cooldown
│   │   ├── layout/
│   │   │   ├── Header.tsx           # App title + language switcher + settings icon
│   │   │   └── ProgressBar.tsx      # Visual progress through current puzzle
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Modal.tsx
│   │       └── StarRating.tsx       # 1-3 star display for level completion
│   ├── config/
│   │   ├── puzzles/
│   │   │   ├── index.ts             # Aggregates and exports all packs
│   │   │   ├── ru/
│   │   │   │   ├── pack-greetings.ts
│   │   │   │   ├── pack-animals.ts
│   │   │   │   └── ...
│   │   │   └── en/
│   │   │       ├── pack-greetings.ts
│   │   │       ├── pack-colors.ts
│   │   │       └── ...
│   │   └── schema.ts               # Puzzle config TypeScript types + Zod validation schema
│   ├── context/
│   │   ├── GameContext.tsx           # Current puzzle state (step, collected syllables, mistakes)
│   │   └── ProgressContext.tsx       # Cross-session progress (completed levels, stars, streaks)
│   ├── hooks/
│   │   ├── usePuzzle.ts             # Puzzle logic: init, shuffle, check answer, advance step
│   │   ├── useProgress.ts           # Read/write progress from localStorage
│   │   └── useHint.ts               # Hint logic with cooldown timer
│   ├── i18n/
│   │   └── index.ts                 # react-i18next configuration
│   ├── lib/
│   │   ├── shuffle.ts               # Fisher-Yates shuffle utility
│   │   ├── scoring.ts               # Star rating calculation from mistakes + hints
│   │   └── validate.ts              # Runtime validation of puzzle configs at dev time
│   ├── types/
│   │   └── index.ts                 # Shared type definitions
│   └── main.tsx
├── tests/
│   ├── puzzle-logic.test.ts         # Unit tests for chain traversal, scoring
│   ├── puzzle-config.test.ts        # Validates all puzzle configs are well-formed
│   └── components/
│       └── PuzzleScreen.test.tsx    # Integration test: full puzzle playthrough
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── vite-pwa.config.ts              # PWA plugin configuration
└── README.md
```

---

## Puzzle Configuration Format

Each puzzle is a plain object conforming to `PuzzleConfig`. Adding a new level means adding a new config object — no code changes required.

### TypeScript Types

```typescript
// src/config/schema.ts

interface ChainLink {
  /** Phrase shown on the left side of the row */
  left: string;
  /** The syllable/fragment displayed in the box — collected when this row is selected */
  syllable: string;
  /** Phrase shown on the right side of the row — becomes the next search target */
  right: string;
  /** Optional emoji displayed to the left of the left phrase */
  emojiLeft?: string;
  /** Optional emoji displayed to the right of the right phrase */
  emojiRight?: string;
}

interface PuzzleConfig {
  /** Unique identifier, e.g. "ru-greetings-01" */
  id: string;
  /** Language code: "ru" | "en" — must match the pack's directory */
  lang: string;
  /** Pack/category this puzzle belongs to, e.g. "greetings", "animals" */
  pack: string;
  /** Display name for the puzzle (shown in level select), already translated */
  title: string;
  /** Difficulty tier — affects level select grouping and unlock order */
  difficulty: "easy" | "medium" | "hard";
  /** The phrase the player is trying to decode (uppercase, may contain spaces) */
  answer: string;
  /**
   * Word lengths for rendering answer slots.
   * Positive number = character count for that word.
   * Use one entry per word in `answer`.
   * Spaces between words are rendered automatically.
   * Example: answer "ДОБРОЕ УТРО" → wordLengths: [6, 4]
   */
  wordLengths: number[];
  /** The phrase the player starts searching for (must match chain[0].left) */
  startPhrase: string;
  /**
   * Ordered chain of links. The player traverses these in order:
   * chain[0].left === startPhrase,
   * chain[n].right === chain[n+1].left.
   * Rows are displayed in shuffled order.
   */
  chain: ChainLink[];
}

interface PuzzlePack {
  /** Pack identifier, e.g. "greetings" */
  id: string;
  /** Display name (i18n key, e.g. "packs.greetings") */
  titleKey: string;
  /** Emoji/icon for the pack card */
  icon: string;
  /** Ordered list of puzzles in this pack */
  puzzles: PuzzleConfig[];
}
```

### Validation Rules

Enforce these at test time (and optionally at dev startup) via Zod or a custom validator:

1. `chain[0].left === startPhrase`
2. For every consecutive pair: `chain[n].right === chain[n+1].left`
3. Concatenating all `chain[*].syllable` values equals `answer` with spaces removed
4. `wordLengths` entries sum to `answer.replace(/\s/g, '').length`
5. `wordLengths.length` equals the number of words in `answer`
6. All `id` values are unique across all packs and languages
7. No duplicate `left` values within a single puzzle (each row must be uniquely identifiable)

### Example Config

```typescript
// src/config/puzzles/ru/pack-greetings.ts

import { PuzzlePack } from "../../schema";

export const ruGreetings: PuzzlePack = {
  id: "ru-greetings",
  titleKey: "packs.greetings",
  icon: "👋",
  puzzles: [
    {
      id: "ru-greetings-good-morning",
      lang: "ru",
      pack: "ru-greetings",
      title: "Доброе утро",
      difficulty: "easy",
      answer: "ДОБРОЕ УТРО",
      wordLengths: [6, 4],
      startPhrase: "рано проснулся",
      chain: [
        { left: "рано проснулся",  syllable: "до", right: "открыть глаза",    emojiLeft: "🌅", emojiRight: "👀" },
        { left: "открыть глаза",   syllable: "б",  right: "сделать зарядку",  emojiLeft: "👀", emojiRight: "🏋️" },
        { left: "сделать зарядку", syllable: "ро", right: "вкусный завтрак",  emojiLeft: "🏋️", emojiRight: "🥣" },
        { left: "вкусный завтрак", syllable: "е",  right: "отличное настроение", emojiLeft: "🥣", emojiRight: "😊" },
        { left: "отличное настроение", syllable: "у", right: "светит солнце", emojiLeft: "😊", emojiRight: "☀️" },
        { left: "светит солнце",   syllable: "т",  right: "душистое мыло",    emojiLeft: "☀️", emojiRight: "🧼" },
        { left: "душистое мыло",   syllable: "ро", right: "весёлая игра",     emojiLeft: "🧼", emojiRight: "🎮" },
      ],
    },
    // ... more puzzles
  ],
};
```

> **Note:** Chains do not need to form a loop. The chain ends at the last entry. Every row should contribute a syllable — empty-syllable rows are not needed.

---

## Internationalization (i18n)

### Approach

- All UI strings (buttons, instructions, feedback messages) live in `public/locales/{lang}/translation.json`
- Puzzle content (phrases, answers) is **not** run through i18n — it is inherently language-specific and lives in the config files under `src/config/puzzles/{lang}/`
- Pack titles use i18n keys (`titleKey`) so the same pack concept (e.g. "Greetings") has a translated name in the UI
- The language switcher sets both the UI locale and filters which puzzle packs are available

### Translation File Structure

```jsonc
// public/locales/en/translation.json
{
  "app": {
    "title": "Decode the Phrase!",
    "subtitle": "Follow the chain and collect the hidden message"
  },
  "instructions": {
    "step1": "Read the phrase at the top — that's the start of the chain.",
    "step2": "Find it on the <strong>left</strong> side of one of the rows. Next to it is a syllable in a box.",
    "step3": "Tap that row! The syllable gets added to the answer.",
    "step4": "Now read the phrase on the <strong>right</strong> side of the arrow — that's the next link. Find it on the left in another row.",
    "step5": "Keep going until you've collected all the syllables!"
  },
  "puzzle": {
    "startLabel": "Start of chain:",
    "step": "Step {{current}} of {{total}}",
    "answerLabel": "Hidden phrase:",
    "hint": "Hint",
    "hintText": "Look for on the left: \"{{phrase}}\"",
    "correct": "Correct!",
    "wrongRow": "Not that row! Look for the right phrase on the left side.",
    "nextSearch": "Now look for: \"{{phrase}}\""
  },
  "result": {
    "complete": "Well done! You decoded the phrase!",
    "newPuzzle": "Next Puzzle",
    "backToLevels": "Back to Levels",
    "stars1": "Completed!",
    "stars2": "Great job!",
    "stars3": "Perfect!"
  },
  "home": {
    "levelSelect": "Choose a Puzzle",
    "locked": "Locked",
    "completed": "Completed"
  },
  "packs": {
    "greetings": "Greetings",
    "animals": "Animals",
    "food": "Food & Drink"
  },
  "settings": {
    "language": "Language"
  }
}
```

### Language Switching

- `Header.tsx` renders a simple toggle/dropdown: 🇬🇧 / 🇷🇺
- Changing language:
  1. Updates `i18next.language`
  2. Filters displayed packs to those matching the selected `lang`
  3. Progress is stored per-puzzle-id, so it persists across language switches (each language has its own puzzle IDs)

---

## Game State

### Puzzle State (GameContext)

```typescript
interface PuzzleState {
  /** The active puzzle config */
  puzzle: PuzzleConfig;
  /** Current step index (0-based) into puzzle.chain */
  currentStep: number;
  /** Syllables collected so far */
  collectedSyllables: string[];
  /** Shuffled order of chain links for display */
  displayOrder: ChainLink[];
  /** Number of wrong row taps this attempt */
  mistakes: number;
  /** Number of hints used this attempt */
  hintsUsed: number;
  /** Timestamp when puzzle started (reserved for future timed challenge mode) */
  startedAt: number;
  /** Puzzle status */
  status: "playing" | "completed";
}

type PuzzleAction =
  | { type: "INIT"; puzzle: PuzzleConfig }
  | { type: "SELECT_ROW"; selectedLeft: string }
  | { type: "USE_HINT" }
  | { type: "RESET" };
```

### Progress State (ProgressContext)

```typescript
interface LevelProgress {
  /** Best star rating achieved (1-3) */
  stars: number;
  /** Whether the level has been completed at least once */
  completed: boolean;
  /** Best completion time in ms */
  bestTimeMs: number;
  /** Fewest mistakes in any attempt */
  bestMistakes: number;
}

interface ProgressState {
  /** Map of puzzle ID → level progress */
  levels: Record<string, LevelProgress>;
  /** Current daily streak count */
  streak: number;
  /** ISO date string of last completion */
  lastPlayedDate: string;
}
```

### Persistence

- `ProgressState` is serialized to `localStorage` under key `syllable-chain-progress`
- Read on app mount, written on every level completion
- If localStorage is unavailable (e.g. incognito), the app works fine — progress just doesn't persist

---

## Scoring

Star rating per level (1-3 stars):

| Stars | Criteria |
|-------|----------|
| ⭐⭐⭐ | 0 mistakes, 0 hints |
| ⭐⭐ | ≤ 2 mistakes total, ≤ 1 hint |
| ⭐ | Completed (any number of mistakes/hints) |

Calculation lives in `src/lib/scoring.ts` as a pure function:

```typescript
function calculateStars(mistakes: number, hintsUsed: number): 1 | 2 | 3;
```

> **Note:** Time is tracked in `PuzzleState.startedAt` but does **not** affect star rating in V1. It is reserved for a future timed challenge mode.

---

## Gamification (Progressive Enhancement)

These features add engagement but are lower priority than the core puzzle loop. Implement them incrementally.

### Level Select & Packs

- Home screen shows packs as cards with icon + title + progress bar (e.g. "3/5 completed")
- Tapping a pack shows its puzzles as a list/grid with star ratings and lock states
- **Unlock logic:** Within a pack, completing puzzle N unlocks puzzles N+1 and N+2 (skip-one unlocking). This prevents a single frustrating puzzle from blocking all progress. All "easy" difficulty puzzles in a pack are unlocked by default.

### Streak Counter

- Displayed on the home screen: "🔥 3-day streak!"
- Increments if the player completes at least one puzzle on consecutive calendar days
- Resets if a day is missed
- Stored in `ProgressState`

### Completion Animation

- On puzzle completion, show a brief celebration: the answer phrase scales up, confetti particles (CSS-only or lightweight), and the star rating animates in
- Keep it short (< 2 seconds) so it doesn't block replay

### Future Gamification Ideas (Out of Scope for V1)

- Timed challenge mode (infrastructure exists: `startedAt` in PuzzleState)
- Achievements/badges
- Sound effects
- User-generated puzzles (puzzle editor) — this is the main scaling bottleneck since all puzzle content must be manually authored

---

## Key UX Behaviours

### Row Interaction

- **Tap correct row:** Row slides into "solved" state (faded, green left border, checkmark). Syllable animates into the next empty answer slot. Feedback text shows "Correct!" briefly, then shows the next target phrase.
- **Tap wrong row:** Row flashes red briefly (shake animation). Feedback shows "Not that row!" message. Mistake counter increments. Row returns to normal state.
- **Tap already-solved row:** No response (cursor: default, no hover effects).

### Hint System

- Tapping "Hint" highlights which phrase to search for in the feedback area
- Each hint use increments `hintsUsed` (affects star rating)
- Optional: after 3 wrong taps on the same step, auto-show a hint for free (doesn't count)

### Answer Slots

- Rendered as a grid of boxes with spaces between words (derived from `wordLengths`)
- Letters fill left-to-right as syllables are collected
- Each new letter animates in with a brief pop/scale effect

### Shuffle

- Chain rows are displayed in random order (Fisher-Yates) on puzzle init
- The order is fixed for the duration of an attempt (no re-shuffle mid-puzzle)
- Rows with empty syllables (loop-closing rows) are excluded from the shuffled display (see "Empty-Syllable Rows" above)

---

## Testing Strategy

### Config Validation Tests (`puzzle-config.test.ts`)

- Iterates over every puzzle config in every pack
- Asserts all 8 validation rules from the "Validation Rules" section above
- This is the most important test — it prevents broken puzzles from shipping

### Puzzle Logic Tests (`puzzle-logic.test.ts`)

- Tests the `usePuzzle` reducer: init → correct tap → advance → ... → completion
- Tests wrong tap increments mistakes
- Tests hint usage tracking
- Tests star rating calculation edge cases

### Component Tests (`PuzzleScreen.test.tsx`)

- Renders a known puzzle config
- Simulates tapping rows in correct order
- Asserts answer slots fill correctly
- Asserts completion state is reached
- Simulates wrong tap and asserts feedback

---

## Initial Content Plan

### Russian Packs

**Приветствия (Greetings) — easy**
1. ДОБРОЕ УТРО (Good morning) — 8 chain links
2. СПОКОЙНОЙ НОЧИ (Good night) — 5 chain links
3. ДОБРО ПОЖАЛОВАТЬ (Welcome) — 6 chain links

**Еда и напитки (Food & Drink) — easy**
1. ПРИЯТНОГО АППЕТИТА (Bon appetit) — 8 chain links
2. ВКУСНЫЙ ЗАВТРАК (Tasty breakfast) — 6 chain links

**Пожелания (Well-Wishes) — medium**
1. УДАЧНОГО ДНЯ (Have a good day) — 5 chain links
2. СЧАСТЛИВОГО ПУТИ (Have a safe trip) — 7 chain links
3. С ДНЁМ РОЖДЕНИЯ (Happy birthday) — 6 chain links

### English Packs

**Greetings — easy**
1. GOOD MORNING — 5 chain links
2. SWEET DREAMS — 5 chain links
3. WELCOME HOME — 5 chain links

**Animals — easy**
1. BUTTERFLY — 4 chain links
2. ELEPHANT — 4 chain links

**Encouragement — medium**
1. HAPPY BIRTHDAY — 6 chain links
2. WELL DONE — 4 chain links
3. GOOD LUCK TODAY — 6 chain links

> **Note for content creation:** Each puzzle must be manually authored. The chain phrases should be thematically related to the answer (e.g. bedtime phrases for "СПОКОЙНОЙ НОЧИ", food phrases for "ПРИЯТНОГО АППЕТИТА"). Emojis are optional but strongly encouraged — they help pre-readers orient themselves visually.

---

## Development Phases

### Phase 1 — Core (MVP)

- [ ] Project scaffolding: Vite + React + TS + Tailwind + i18n
- [ ] Puzzle config types + Zod validation
- [ ] `usePuzzle` hook with reducer
- [ ] `PuzzleScreen` with `ChainRow`, `AnswerSlots`, `StartBanner`
- [ ] Basic feedback (correct/wrong/hint)
- [ ] Completion screen with answer reveal
- [ ] 2 working puzzles (1 Russian, 1 English)
- [ ] Config validation test suite
- [ ] Language switcher

### Phase 2 — Content & Polish

- [ ] All puzzle content from the content plan above
- [ ] Home screen with pack/level select
- [ ] Star rating system
- [ ] Progress persistence (localStorage)
- [ ] Animations: row solve, letter pop-in, completion celebration
- [ ] Responsive design: mobile-first, works on tablets
- [ ] PWA support: service worker, web app manifest, offline capability

### Phase 3 — Gamification

- [ ] Streak tracking
- [ ] Level unlock progression
- [ ] Pack progress bars
- [ ] Auto-hint after repeated mistakes
- [ ] Accessibility pass: focus management, ARIA labels, keyboard navigation
