export interface ChainLink {
  left: string;
  syllable: string;
  right: string;
  emojiLeft?: string;
  emojiRight?: string;
}

export interface PuzzleConfig {
  id: string;
  lang: string;
  pack: string;
  title: string;
  answer: string;
  startPhrase: string;
  chain: ChainLink[];
}

export interface PuzzlePack {
  id: string;
  titleKey: string;
  icon: string;
  puzzles: PuzzleConfig[];
}

export interface PuzzleState {
  puzzle: PuzzleConfig;
  currentStep: number;
  collectedSyllables: string[];
  displayOrder: ChainLink[];
  mistakes: number;
  /** Mistakes on the current step (resets on advance) — used for auto-hint */
  stepMistakes: number;
  hintsUsed: number;
  startedAt: number;
  status: 'playing' | 'completed';
}

export type PuzzleAction =
  | { type: 'INIT'; puzzle: PuzzleConfig }
  | { type: 'SELECT_ROW'; selectedLeft: string }
  | { type: 'USE_HINT' }
  | { type: 'RESET' };

/** Number of consecutive wrong taps on same step before auto-hint triggers */
export const AUTO_HINT_THRESHOLD = 3;

export interface LevelProgress {
  stars: number;
  completed: boolean;
  bestMistakes: number;
}

export interface ProgressState {
  levels: Record<string, LevelProgress>;
  streak: number;
  lastPlayedDate: string;
}
