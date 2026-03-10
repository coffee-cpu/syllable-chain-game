import { describe, it, expect } from 'vitest';
import { puzzleReducer, getDisplayableLinks } from '../src/hooks/usePuzzle.ts';
import { calculateStars } from '../src/lib/scoring.ts';
import type { PuzzleConfig, PuzzleState } from '../src/types/index.ts';

const testPuzzle: PuzzleConfig = {
  id: 'test-puzzle',
  lang: 'en',
  pack: 'test',
  title: 'Test',
  difficulty: 'easy',
  answer: 'GOOD MORNING',
  startPhrase: 'alarm clock rings',
  chain: [
    { left: 'alarm clock rings', syllable: 'GO', right: 'stretch and yawn' },
    { left: 'stretch and yawn', syllable: 'OD', right: 'brush your teeth' },
    { left: 'brush your teeth', syllable: 'MOR', right: 'eat breakfast' },
    { left: 'eat breakfast', syllable: 'NING', right: 'open the curtains' },
  ],
};

function initState(): PuzzleState {
  const displayable = getDisplayableLinks(testPuzzle.chain);
  return {
    puzzle: testPuzzle,
    currentStep: 0,
    collectedSyllables: [],
    displayOrder: displayable, // no shuffle for testing
    mistakes: 0,
    stepMistakes: 0,
    hintsUsed: 0,
    startedAt: Date.now(),
    status: 'playing',
  };
}

describe('getDisplayableLinks', () => {
  it('returns all links when none have empty syllables', () => {
    const links = getDisplayableLinks(testPuzzle.chain);
    expect(links).toHaveLength(4);
    expect(links.every((l) => l.syllable !== '')).toBe(true);
  });

  it('filters out empty-syllable links', () => {
    const chainWithEmpty = [
      ...testPuzzle.chain,
      { left: 'extra', syllable: '', right: 'loop' },
    ];
    const links = getDisplayableLinks(chainWithEmpty);
    expect(links).toHaveLength(4);
  });
});

describe('puzzleReducer', () => {
  it('INIT sets up fresh state', () => {
    const state = puzzleReducer(initState(), { type: 'INIT', puzzle: testPuzzle });
    expect(state.currentStep).toBe(0);
    expect(state.collectedSyllables).toEqual([]);
    expect(state.status).toBe('playing');
    expect(state.displayOrder).toHaveLength(4);
  });

  it('correct SELECT_ROW advances step and collects syllable', () => {
    const state = initState();
    const next = puzzleReducer(state, { type: 'SELECT_ROW', selectedLeft: 'alarm clock rings' });
    expect(next.currentStep).toBe(1);
    expect(next.collectedSyllables).toEqual(['GO']);
    expect(next.mistakes).toBe(0);
  });

  it('wrong SELECT_ROW increments mistakes', () => {
    const state = initState();
    const next = puzzleReducer(state, { type: 'SELECT_ROW', selectedLeft: 'eat breakfast' });
    expect(next.currentStep).toBe(0);
    expect(next.collectedSyllables).toEqual([]);
    expect(next.mistakes).toBe(1);
  });

  it('completing all steps sets status to completed', () => {
    let state = initState();
    const displayable = getDisplayableLinks(testPuzzle.chain);
    for (const link of displayable) {
      state = puzzleReducer(state, { type: 'SELECT_ROW', selectedLeft: link.left });
    }
    expect(state.status).toBe('completed');
    expect(state.collectedSyllables.join('')).toBe('GOODMORNING');
  });

  it('USE_HINT increments hintsUsed', () => {
    const state = initState();
    const next = puzzleReducer(state, { type: 'USE_HINT' });
    expect(next.hintsUsed).toBe(1);
  });

  it('RESET clears state', () => {
    let state = initState();
    state = puzzleReducer(state, { type: 'SELECT_ROW', selectedLeft: 'alarm clock rings' });
    state = puzzleReducer(state, { type: 'USE_HINT' });
    const reset = puzzleReducer(state, { type: 'RESET' });
    expect(reset.currentStep).toBe(0);
    expect(reset.collectedSyllables).toEqual([]);
    expect(reset.mistakes).toBe(0);
    expect(reset.hintsUsed).toBe(0);
  });
});

describe('calculateStars', () => {
  it('returns 3 for perfect run', () => {
    expect(calculateStars(0, 0)).toBe(3);
  });

  it('returns 2 for minor mistakes', () => {
    expect(calculateStars(1, 0)).toBe(2);
    expect(calculateStars(2, 1)).toBe(2);
    expect(calculateStars(0, 1)).toBe(2);
  });

  it('returns 1 for many mistakes', () => {
    expect(calculateStars(3, 0)).toBe(1);
    expect(calculateStars(0, 2)).toBe(1);
    expect(calculateStars(5, 3)).toBe(1);
  });
});
