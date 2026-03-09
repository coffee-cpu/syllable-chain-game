import { useReducer, useCallback } from 'react';
import type { PuzzleState, PuzzleAction, PuzzleConfig, ChainLink } from '../types/index.ts';
import { shuffle } from '../lib/shuffle.ts';

function getDisplayableLinks(chain: ChainLink[]): ChainLink[] {
  return chain.filter((link) => link.syllable !== '');
}

function puzzleReducer(state: PuzzleState, action: PuzzleAction): PuzzleState {
  switch (action.type) {
    case 'INIT': {
      const displayable = getDisplayableLinks(action.puzzle.chain);
      return {
        puzzle: action.puzzle,
        currentStep: 0,
        collectedSyllables: [],
        displayOrder: shuffle(displayable),
        mistakes: 0,
        hintsUsed: 0,
        startedAt: Date.now(),
        status: 'playing',
      };
    }
    case 'SELECT_ROW': {
      if (state.status === 'completed') return state;

      const displayable = getDisplayableLinks(state.puzzle.chain);
      const expectedLink = displayable[state.currentStep];
      if (!expectedLink) return state;

      if (action.selectedLeft !== expectedLink.left) {
        return { ...state, mistakes: state.mistakes + 1 };
      }

      const newSyllables = [...state.collectedSyllables, expectedLink.syllable];
      const nextStep = state.currentStep + 1;
      const isComplete = nextStep >= displayable.length;

      return {
        ...state,
        currentStep: nextStep,
        collectedSyllables: newSyllables,
        status: isComplete ? 'completed' : 'playing',
      };
    }
    case 'USE_HINT': {
      if (state.status === 'completed') return state;
      return { ...state, hintsUsed: state.hintsUsed + 1 };
    }
    case 'RESET': {
      const displayable = getDisplayableLinks(state.puzzle.chain);
      return {
        puzzle: state.puzzle,
        currentStep: 0,
        collectedSyllables: [],
        displayOrder: shuffle(displayable),
        mistakes: 0,
        hintsUsed: 0,
        startedAt: Date.now(),
        status: 'playing',
      };
    }
    default:
      return state;
  }
}

const emptyPuzzle: PuzzleConfig = {
  id: '',
  lang: '',
  pack: '',
  title: '',
  difficulty: 'easy',
  answer: '',
  wordLengths: [],
  startPhrase: '',
  chain: [],
};

const initialState: PuzzleState = {
  puzzle: emptyPuzzle,
  currentStep: 0,
  collectedSyllables: [],
  displayOrder: [],
  mistakes: 0,
  hintsUsed: 0,
  startedAt: 0,
  status: 'playing',
};

export function usePuzzle() {
  const [state, dispatch] = useReducer(puzzleReducer, initialState);

  const initPuzzle = useCallback((puzzle: PuzzleConfig) => {
    dispatch({ type: 'INIT', puzzle });
  }, []);

  const selectRow = useCallback((selectedLeft: string) => {
    dispatch({ type: 'SELECT_ROW', selectedLeft });
  }, []);

  const useHint = useCallback(() => {
    dispatch({ type: 'USE_HINT' });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const displayable = getDisplayableLinks(state.puzzle.chain);
  const currentTarget = displayable[state.currentStep]?.left ?? '';
  const totalSteps = displayable.length;

  return {
    state,
    initPuzzle,
    selectRow,
    useHint,
    reset,
    currentTarget,
    totalSteps,
  };
}

export { puzzleReducer, getDisplayableLinks };
