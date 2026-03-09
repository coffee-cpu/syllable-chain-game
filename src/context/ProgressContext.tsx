import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import type { LevelProgress, ProgressState } from '../types/index.ts';

const STORAGE_KEY = 'syllable-chain-progress';

const defaultState: ProgressState = {
  levels: {},
  streak: 0,
  lastPlayedDate: '',
};

function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed === 'object' &&
      typeof parsed.levels === 'object' &&
      typeof parsed.streak === 'number' &&
      typeof parsed.lastPlayedDate === 'string'
    ) {
      return parsed as ProgressState;
    }
    return defaultState;
  } catch {
    return defaultState;
  }
}

function saveProgress(state: ProgressState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or unavailable — silently ignore
  }
}

function computeStreak(prev: ProgressState): { streak: number; lastPlayedDate: string } {
  const today = new Date().toISOString().slice(0, 10);
  if (prev.lastPlayedDate === today) {
    return { streak: prev.streak, lastPlayedDate: today };
  }

  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
  if (prev.lastPlayedDate === yesterday) {
    return { streak: prev.streak + 1, lastPlayedDate: today };
  }

  return { streak: 1, lastPlayedDate: today };
}

interface ProgressContextValue {
  progressState: ProgressState;
  markCompleted: (puzzleId: string, stars: number, mistakes: number) => void;
  getProgress: (puzzleId: string) => LevelProgress | undefined;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progressState, setProgressState] = useState<ProgressState>(defaultState);

  // Load from localStorage on mount
  useEffect(() => {
    setProgressState(loadProgress());
  }, []);

  const markCompleted = useCallback(
    (puzzleId: string, stars: number, mistakes: number) => {
      setProgressState((prev) => {
        const existing = prev.levels[puzzleId];
        const levelProgress: LevelProgress = {
          completed: true,
          stars: existing ? Math.max(existing.stars, stars) : stars,
          bestMistakes: existing
            ? Math.min(existing.bestMistakes, mistakes)
            : mistakes,
        };

        const { streak, lastPlayedDate } = computeStreak(prev);

        const next: ProgressState = {
          levels: { ...prev.levels, [puzzleId]: levelProgress },
          streak,
          lastPlayedDate,
        };

        saveProgress(next);
        return next;
      });
    },
    [],
  );

  const getProgress = useCallback(
    (puzzleId: string): LevelProgress | undefined => {
      return progressState.levels[puzzleId];
    },
    [progressState],
  );

  return (
    <ProgressContext.Provider value={{ progressState, markCompleted, getProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
