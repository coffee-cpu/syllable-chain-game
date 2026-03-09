import { createContext, useContext, type ReactNode } from 'react';
import { usePuzzle } from '../hooks/usePuzzle.ts';
import type { PuzzleConfig } from '../types/index.ts';

interface GameContextValue {
  state: ReturnType<typeof usePuzzle>['state'];
  currentTarget: string;
  totalSteps: number;
  initPuzzle: (puzzle: PuzzleConfig) => void;
  selectRow: (selectedLeft: string) => void;
  useHint: () => void;
  reset: () => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const puzzle = usePuzzle();

  return (
    <GameContext.Provider value={puzzle}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
