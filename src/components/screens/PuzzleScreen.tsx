import { useState, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useGame } from '../../context/GameContext.tsx';
import { ChainRow } from '../puzzle/ChainRow.tsx';
import { AnswerSlots } from '../puzzle/AnswerSlots.tsx';
import { StartBanner } from '../puzzle/StartBanner.tsx';
import { HintButton } from '../puzzle/HintButton.tsx';
import { getDisplayableLinks } from '../../hooks/usePuzzle.ts';
import { AUTO_HINT_THRESHOLD } from '../../types/index.ts';
import confetti from 'canvas-confetti';
import { initAudio, playCorrectSound, playWrongSound, playCompletionSound } from '../../lib/audio.ts';

interface PuzzleScreenProps {
  onComplete: () => void;
  onBackToLevels: () => void;
}

export function PuzzleScreen({ onComplete, onBackToLevels }: PuzzleScreenProps) {
  const { t } = useTranslation();
  const { state, selectRow, useHint: applyHint, currentTarget } = useGame();
  const [shakingRow, setShakingRow] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  const displayable = getDisplayableLinks(state.puzzle.chain);
  const solvedLefts = useMemo(() => new Set(
    displayable.slice(0, state.currentStep).map((link) => link.left)
  ), [displayable, state.currentStep]);

  useEffect(() => {
    if (state.status === 'completed') {
      playCompletionSound();

      // A nice confetti burst in the middle of the screen
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444']
      });

      const timer = setTimeout(onComplete, 1200);
      return () => clearTimeout(timer);
    }
  }, [state.status, onComplete]);

  // Auto-hint after repeated mistakes on the same step (free — doesn't count)
  useEffect(() => {
    if (state.stepMistakes >= AUTO_HINT_THRESHOLD && !showHint && state.status === 'playing') {
      setShowHint(true);
    }
  }, [state.stepMistakes, showHint, state.status]);

  const handleTap = useCallback(
    (left: string, e: React.MouseEvent<HTMLButtonElement>) => {
      initAudio();

      if (state.status === 'completed') return;
      if (solvedLefts.has(left)) return;

      const expected = displayable[state.currentStep];
      if (left === expected.left) {
        selectRow(left);
        setShowHint(false);

        playCorrectSound();

        // Minor local confetti for a specific button tap
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        confetti({
          particleCount: 8,
          spread: 25,
          origin: { x, y },
          colors: ['#10B981', '#34D399'] // Greenish confetti
        });
      } else {
        selectRow(left);
        setShakingRow(left);

        playWrongSound();

        setTimeout(() => {
          setShakingRow(null);
        }, 800);
      }
    },
    [state.status, state.currentStep, displayable, selectRow, solvedLefts],
  );

  const handleHint = useCallback(() => {
    applyHint();
    setShowHint(true);
  }, [applyHint]);

  return (
    <div className="flex flex-col gap-4 px-8 md:px-12 py-4 max-w-lg mx-auto" role="main" aria-label={state.puzzle.title}>
      <button
        type="button"
        onClick={onBackToLevels}
        className="self-start text-sm text-gray-500 hover:text-gray-700 transition-colors
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded"
        aria-label={t('result.backToLevels')}
      >
        {'\u2190'} {t('result.backToLevels')}
      </button>
      <StartBanner
        phrase={state.puzzle.startPhrase}
        currentTarget={currentTarget}
        currentStep={state.currentStep}
      />

      <AnswerSlots
        answer={state.puzzle.answer}
        collectedSyllables={state.collectedSyllables}
      />

      <div className="flex flex-col gap-2" role="group" aria-label={t('puzzle.answerLabel')}>
        {state.displayOrder.map((link) => (
          <ChainRow
            key={link.left}
            link={link}
            solved={solvedLefts.has(link.left)}
            shaking={shakingRow === link.left}
            highlighted={showHint && link.left === currentTarget}
            onTap={handleTap}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <HintButton onHint={handleHint} disabled={state.status === 'completed' || showHint} />
      </div>
    </div>
  );
}
