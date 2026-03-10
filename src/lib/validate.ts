import type { PuzzleConfig } from '../types/index.ts';

export interface ValidationError {
  puzzleId: string;
  rule: string;
  message: string;
}

export function validatePuzzle(puzzle: PuzzleConfig): ValidationError[] {
  const errors: ValidationError[] = [];
  const { id, chain, startPhrase, answer, wordLengths } = puzzle;

  // Rule 1: chain[0].left === startPhrase
  if (chain.length > 0 && chain[0].left !== startPhrase) {
    errors.push({
      puzzleId: id,
      rule: 'start-phrase',
      message: `chain[0].left "${chain[0].left}" !== startPhrase "${startPhrase}"`,
    });
  }

  // Rule 2: chain[n].right === chain[n+1].left
  for (let i = 0; i < chain.length - 1; i++) {
    if (chain[i].right !== chain[i + 1].left) {
      errors.push({
        puzzleId: id,
        rule: 'chain-continuity',
        message: `chain[${i}].right "${chain[i].right}" !== chain[${i + 1}].left "${chain[i + 1].left}"`,
      });
    }
  }

  // Rule 4: syllables concatenate to answer (without spaces)
  const collected = chain.map((link) => link.syllable).join('');
  const expected = answer.replace(/\s/g, '');
  if (collected !== expected) {
    errors.push({
      puzzleId: id,
      rule: 'syllable-concat',
      message: `Syllables "${collected}" !== answer without spaces "${expected}"`,
    });
  }

  // Rule 5: wordLengths sum matches answer length
  const lengthSum = wordLengths.reduce((a, b) => a + b, 0);
  if (lengthSum !== expected.length) {
    errors.push({
      puzzleId: id,
      rule: 'word-lengths-sum',
      message: `wordLengths sum ${lengthSum} !== answer length ${expected.length}`,
    });
  }

  // Rule 6: wordLengths count matches word count
  const wordCount = answer.split(/\s+/).length;
  if (wordLengths.length !== wordCount) {
    errors.push({
      puzzleId: id,
      rule: 'word-lengths-count',
      message: `wordLengths.length ${wordLengths.length} !== word count ${wordCount}`,
    });
  }

  // Rule 8: no duplicate left values
  const lefts = chain.map((link) => link.left);
  const seen = new Set<string>();
  for (const left of lefts) {
    if (seen.has(left)) {
      errors.push({
        puzzleId: id,
        rule: 'unique-lefts',
        message: `Duplicate left value: "${left}"`,
      });
    }
    seen.add(left);
  }

  return errors;
}

export function validateUniqueIds(puzzles: PuzzleConfig[]): ValidationError[] {
  const errors: ValidationError[] = [];
  const ids = new Set<string>();
  for (const puzzle of puzzles) {
    if (ids.has(puzzle.id)) {
      errors.push({
        puzzleId: puzzle.id,
        rule: 'unique-id',
        message: `Duplicate puzzle id: "${puzzle.id}"`,
      });
    }
    ids.add(puzzle.id);
  }
  return errors;
}
