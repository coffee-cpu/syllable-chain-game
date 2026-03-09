import { useTranslation } from 'react-i18next';
import { useGame } from '../../context/GameContext.tsx';
import { calculateStars } from '../../lib/scoring.ts';

interface ResultScreenProps {
  onReplay: () => void;
}

export function ResultScreen({ onReplay }: ResultScreenProps) {
  const { t } = useTranslation();
  const { state } = useGame();

  const stars = calculateStars(state.mistakes, state.hintsUsed);
  const starLabels = { 1: t('result.stars1'), 2: t('result.stars2'), 3: t('result.stars3') };

  return (
    <div className="flex flex-col items-center gap-6 p-8 max-w-lg mx-auto text-center">
      <div className="text-4xl tracking-widest">
        {Array.from({ length: 3 }).map((_, i) => (
          <span key={i} className={i < stars ? 'opacity-100' : 'opacity-20'}>
            &#11088;
          </span>
        ))}
      </div>

      <div className="text-2xl font-bold text-indigo-700 tracking-wide">
        {state.puzzle.answer}
      </div>

      <p className="text-gray-500">{starLabels[stars]}</p>

      <p className="text-green-600 font-medium">{t('result.complete')}</p>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onReplay}
          className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium
            hover:bg-indigo-700 active:scale-95 transition-all"
        >
          {t('result.replay')}
        </button>
      </div>
    </div>
  );
}
