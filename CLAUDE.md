# Syllable Chain Game — Developer Notes

## Difficulty

Puzzle difficulty is **calculated automatically** from the chain length — do **not** add a `difficulty` property to puzzle configs.

The `getDifficulty(chainLength)` function in `src/lib/scoring.ts` derives it at runtime:

| Chain length | Difficulty |
|---|---|
| ≤ 4 links | easy |
| 5–6 links | medium |
| ≥ 7 links | hard |

`PuzzleConfig` does not have a `difficulty` field. When creating new puzzles (via the `/create-puzzle` skill or manually), omit difficulty — it will be inferred from how many links are in the chain.
