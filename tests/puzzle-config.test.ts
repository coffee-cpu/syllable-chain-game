import { describe, it, expect } from 'vitest';
import { getAllPuzzles } from '../src/config/puzzles/index.ts';
import { validatePuzzle, validateUniqueIds } from '../src/lib/validate.ts';

const allPuzzles = getAllPuzzles();

describe('puzzle config validation', () => {
  it('has at least one puzzle', () => {
    expect(allPuzzles.length).toBeGreaterThan(0);
  });

  for (const puzzle of allPuzzles) {
    describe(`puzzle: ${puzzle.id}`, () => {
      it('passes all validation rules', () => {
        const errors = validatePuzzle(puzzle);
        if (errors.length > 0) {
          const msgs = errors.map((e) => `[${e.rule}] ${e.message}`).join('\n');
          expect.fail(`Validation errors:\n${msgs}`);
        }
      });
    });
  }

  it('has unique IDs across all puzzles', () => {
    const errors = validateUniqueIds(allPuzzles);
    expect(errors).toEqual([]);
  });
});
