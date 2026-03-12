import { useTranslation } from 'react-i18next';
import type { PuzzleConfig, PuzzlePack } from '../../types/index.ts';
import { getPacksByLang } from '../../config/puzzles/index.ts';
import { useProgress } from '../../context/ProgressContext.tsx';
import { getDifficulty } from '../../lib/scoring.ts';

interface HomeScreenProps {
  onSelectPuzzle: (puzzle: PuzzleConfig) => void;
}

function StarRating({ stars }: { stars: number }) {
  return (
    <span className="inline-flex gap-0.5 ml-auto text-sm shrink-0" aria-label={`${stars} out of 3 stars`}>
      {Array.from({ length: 3 }).map((_, i) => (
        <span key={i} className={i < stars ? 'opacity-100' : 'opacity-20'}>
          &#11088;
        </span>
      ))}
    </span>
  );
}

function PackProgressBar({ completed, total }: { completed: number; total: number }) {
  const pct = total > 0 ? (completed / total) * 100 : 0;
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow={completed} aria-valuemin={0} aria-valuemax={total}>
        <div
          className="h-full bg-indigo-500 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-gray-400 shrink-0">{completed}/{total}</span>
    </div>
  );
}

/**
 * Determines if a puzzle is unlocked based on pack progress.
 * Rules:
 * - All "easy" puzzles are always unlocked
 * - Completing puzzle at index N unlocks N+1 and N+2
 * - First puzzle in any pack is always unlocked
 */
function isPuzzleUnlocked(
  puzzleIndex: number,
  puzzles: PuzzleConfig[],
  getProgress: (id: string) => { completed: boolean } | undefined,
): boolean {
  const puzzle = puzzles[puzzleIndex];
  // Easy puzzles and first puzzle are always unlocked
  if (getDifficulty(puzzle.chain.length) === 'easy' || puzzleIndex === 0) return true;

  // Check if any of the two preceding puzzles are completed
  for (let i = Math.max(0, puzzleIndex - 2); i < puzzleIndex; i++) {
    if (getProgress(puzzles[i].id)?.completed) return true;
  }
  return false;
}

export function HomeScreen({ onSelectPuzzle }: HomeScreenProps) {
  const { t, i18n } = useTranslation();
  const { getProgress, progressState } = useProgress();
  const packs = getPacksByLang(i18n.language);

  return (
    <div className="p-4 max-w-lg mx-auto space-y-6">
      <h2 className="text-xl font-bold text-gray-800 text-center">
        {t('home.levelSelect')}
      </h2>

      {progressState.streak > 0 && (
        <div className="text-center text-sm font-medium text-orange-600" role="status">
          {t('home.streak', { count: progressState.streak })}
        </div>
      )}

      {packs.map((pack: PuzzlePack) => {
        const completedCount = pack.puzzles.filter(
          (p) => getProgress(p.id)?.completed
        ).length;

        return (
          <div key={pack.id} className="space-y-2" role="region" aria-label={pack.title}>
            <h3 className="text-lg font-semibold text-gray-700">
              {pack.icon} {pack.title}
            </h3>
            <PackProgressBar completed={completedCount} total={pack.puzzles.length} />
            <div className="flex flex-col gap-2" role="list">
              {pack.puzzles.map((puzzle, idx) => {
                const progress = getProgress(puzzle.id);
                const unlocked = isPuzzleUnlocked(idx, pack.puzzles, getProgress);

                return (
                  <button
                    key={puzzle.id}
                    type="button"
                    onClick={() => unlocked && onSelectPuzzle(puzzle)}
                    disabled={!unlocked}
                    role="listitem"
                    aria-label={
                      !unlocked
                        ? `${puzzle.startPhrase} - ${t('home.locked')}`
                        : progress?.completed
                          ? `${puzzle.startPhrase} - ${progress.stars} stars`
                          : puzzle.startPhrase
                    }
                    className={`w-full flex items-center px-4 py-3 rounded-xl border-2 transition-all
                      ${unlocked
                        ? 'bg-white border-gray-200 hover:border-indigo-300 hover:shadow-md active:scale-[0.98] cursor-pointer'
                        : 'bg-gray-50 border-gray-100 opacity-50 cursor-not-allowed'
                      }`}
                  >
                    {!unlocked && <span className="mr-2 text-gray-400" aria-hidden="true">&#128274;</span>}
                    <span className={`font-medium ${unlocked ? 'text-gray-800' : 'text-gray-400'}`}>
                      {puzzle.startPhrase}
                    </span>
                    <span className="text-xs text-gray-400 ml-2">{getDifficulty(puzzle.chain.length)}</span>
                    {progress?.completed && <StarRating stars={progress.stars} />}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
