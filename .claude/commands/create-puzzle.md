Create one or more syllable-chain puzzles based on this request: $ARGUMENTS

## What you must do

Parse the request to identify:
- **Language**: detect from the answer/category text (Cyrillic → `ru`, Latin → `en`). Default to `ru` if ambiguous.
- **Category / pack**: e.g. "Space", "Animals", "Food". Normalise to lowercase-kebab-case for file/id names.
- **Answer(s)**: explicit (e.g. `"палочник"`) or to be invented when only a category is given (create 2–3 thematically fitting answers).

---

## Puzzle format (TypeScript)

Each pack file lives at `src/config/puzzles/{lang}/pack-{category}.ts` and looks like this:

```typescript
import type { PuzzlePack } from '../../../types/index.ts';

export const ruSpace: PuzzlePack = {
  id: 'ru-space',
  titleKey: 'packs.space',
  icon: '🚀',                // pick a relevant emoji
  puzzles: [
    {
      id: 'ru-space-cosmonaut',   // {lang}-{category}-{slug-of-answer}
      lang: 'ru',
      pack: 'ru-space',
      title: 'Космонавт',         // human-readable title (original case)
      difficulty: 'medium',       // 'easy' | 'medium' | 'hard'
      answer: 'КОСМОНАВТ',        // UPPERCASE, spaces preserved between words
      startPhrase: 'звёздное небо',  // must equal chain[0].left
      chain: [
        { left: 'звёздное небо',  syllable: 'КОС', right: 'ракета взлетает', emojiLeft: '🌌', emojiRight: '🚀' },
        { left: 'ракета взлетает', syllable: 'МО',  right: 'невесомость',     emojiLeft: '🚀', emojiRight: '🌀' },
        { left: 'невесомость',    syllable: 'НА',   right: 'далёкие планеты', emojiLeft: '🌀', emojiRight: '🪐' },
        { left: 'далёкие планеты', syllable: 'ВТ',  right: 'лунный грунт',   emojiLeft: '🪐', emojiRight: '🌑' },
      ],
    },
  ],
};
```

---

## Strict validation rules — you MUST satisfy all of them

1. `chain[0].left === startPhrase`
2. For every consecutive pair: `chain[n].right === chain[n+1].left` (exact string match)
3. Joining all `chain[*].syllable` values gives exactly `answer` with its spaces removed (case-insensitive comparison; store syllables in the same case as the answer — UPPERCASE for Russian/English answers)
4. No two links within one puzzle share the same `left` value
5. All `id` values must be unique across the whole codebase — check existing packs before naming
6. Each `left`/`right` phrase should be thematically related to the answer (imagery, associations)
7. Syllable split must be linguistically natural for the language
8. Chain length: 3–8 links per puzzle (aim for one syllable per link; a single link may carry 2–3 letters if needed)

Before writing the file, mentally trace the chain and verify rules 1–4 by stepping through each link.

---

## File creation steps

### Step 1 — Determine the target file

- Check if `src/config/puzzles/{lang}/pack-{category}.ts` already exists.
  - **Exists** → read it and append the new puzzle(s) to the `puzzles` array.
  - **Does not exist** → create a new file with a fresh `PuzzlePack` export.

### Step 2 — Write / update the pack file

Write valid TypeScript following the format above. Use `import type { PuzzlePack } from '../../../types/index.ts';`.

Export name convention: camelCase of `{lang}{CategoryPascalCase}` (e.g. `ruSpace`, `enSpace`).

### Step 3 — Register in the index (only when creating a new pack file)

Open `src/config/puzzles/index.ts` and:
1. Add an import for the new export at the top (keep imports grouped by language).
2. Add the new variable to the `allPacks` array.

If you are only appending to an existing pack, the index does not need to change.

### Step 4 — Verify

After writing, re-read the file you created/modified and mentally re-check the validation rules. If any rule is violated, fix the file before finishing.

---

## Output to the user

After completing the changes, print a brief summary:
- Which file(s) were created or modified
- List of puzzle(s) added with their answer and chain length
- A reminder to run `npm test` to validate the new puzzles against the automated test suite
