import { useTranslation } from 'react-i18next';
import type { PuzzleConfig, PuzzlePack } from '../../types/index.ts';
import { getPacksByLang } from '../../config/puzzles/index.ts';
import { useProgress } from '../../context/ProgressContext.tsx';

interface HomeScreenProps {
  onSelectPuzzle: (puzzle: PuzzleConfig) => void;
}

function StarRating({ stars }: { stars: number }) {
  return (
    <span className="inline-flex gap-0.5 ml-auto text-sm shrink-0" aria-label={`${stars} stars`}>
      {Array.from({ length: 3 }).map((_, i) => (
        <span key={i} className={i < stars ? 'opacity-100' : 'opacity-20'}>
          &#11088;
        </span>
      ))}
    </span>
  );
}

export function HomeScreen({ onSelectPuzzle }: HomeScreenProps) {
  const { t, i18n } = useTranslation();
  const { getProgress } = useProgress();
  const packs = getPacksByLang(i18n.language);

  return (
    <div className="p-4 max-w-lg mx-auto space-y-6">
      <h2 className="text-xl font-bold text-gray-800 text-center">
        {t('home.levelSelect')}
      </h2>

      {packs.map((pack: PuzzlePack) => (
        <div key={pack.id} className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-700">
            {pack.icon} {t(pack.titleKey)}
          </h3>
          <div className="flex flex-col gap-2">
            {pack.puzzles.map((puzzle) => {
              const progress = getProgress(puzzle.id);
              return (
                <button
                  key={puzzle.id}
                  type="button"
                  onClick={() => onSelectPuzzle(puzzle)}
                  className="w-full flex items-center px-4 py-3 rounded-xl border-2 border-gray-200
                    bg-white hover:border-indigo-300 hover:shadow-md transition-all
                    active:scale-[0.98]"
                >
                  <span className="font-medium text-gray-800">{puzzle.title}</span>
                  <span className="text-xs text-gray-400 ml-2">{puzzle.difficulty}</span>
                  {progress?.completed && <StarRating stars={progress.stars} />}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
