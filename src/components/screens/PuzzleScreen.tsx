import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useGame } from '../../context/GameContext.tsx';
import { ChainRow } from '../puzzle/ChainRow.tsx';
import { AnswerSlots } from '../puzzle/AnswerSlots.tsx';
import { StartBanner } from '../puzzle/StartBanner.tsx';
import { HintButton } from '../puzzle/HintButton.tsx';
import { getDisplayableLinks } from '../../hooks/usePuzzle.ts';
import { AUTO_HINT_THRESHOLD } from '../../types/index.ts';

interface PuzzleScreenProps {
  onComplete: () => void;
  onBackToLevels: () => void;
}

export function PuzzleScreen({ onComplete, onBackToLevels }: PuzzleScreenProps) {
  const { t } = useTranslation();
  const { state, selectRow, useHint, currentTarget, totalSteps } = useGame();
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'wrong' | 'hint'; text: string } | null>(null);
  const [shakingRow, setShakingRow] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  const displayable = getDisplayableLinks(state.puzzle.chain);
  const solvedLefts = new Set(
    displayable.slice(0, state.currentStep).map((link) => link.left)
  );

  useEffect(() => {
    if (state.status === 'completed') {
      const timer = setTimeout(onComplete, 600);
      return () => clearTimeout(timer);
    }
  }, [state.status, onComplete]);

  // Auto-hint after repeated mistakes on the same step (free — doesn't count)
  useEffect(() => {
    if (state.stepMistakes >= AUTO_HINT_THRESHOLD && !showHint && state.status === 'playing') {
      setShowHint(true);
      setFeedback({
        type: 'hint',
        text: t('puzzle.hintText', { phrase: currentTarget }),
      });
    }
  }, [state.stepMistakes, showHint, state.status, currentTarget, t]);

  const handleTap = useCallback(
    (left: string) => {
      if (state.status === 'completed') return;
      if (solvedLefts.has(left)) return;

      const expected = displayable[state.currentStep];
      if (left === expected.left) {
        selectRow(left);
        setShowHint(false);
        setFeedback({ type: 'correct', text: t('puzzle.correct') });
        setTimeout(() => setFeedback(null), 1200);
      } else {
        selectRow(left);
        setShakingRow(left);
        setFeedback({ type: 'wrong', text: t('puzzle.wrongRow') });
        setTimeout(() => {
          setShakingRow(null);
          setFeedback(null);
        }, 800);
      }
    },
    [state.status, state.currentStep, displayable, selectRow, solvedLefts, t],
  );

  const handleHint = useCallback(() => {
    useHint();
    setShowHint(true);
    setFeedback({
      type: 'hint',
      text: t('puzzle.hintText', { phrase: currentTarget }),
    });
  }, [useHint, currentTarget, t]);

  return (
    <div className="flex flex-col gap-4 p-4 max-w-lg mx-auto" role="main" aria-label={state.puzzle.title}>
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
        totalSteps={totalSteps}
      />

      <AnswerSlots
        answer={state.puzzle.answer}
        collectedSyllables={state.collectedSyllables}
      />

      <div aria-live="polite" aria-atomic="true" className="min-h-[2.5rem]">
        {feedback && (
          <div
            className={`text-center text-sm font-medium px-3 py-2 rounded-lg transition-all ${feedback.type === 'correct'
                ? 'bg-green-100 text-green-700'
                : feedback.type === 'wrong'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-blue-100 text-blue-700'
              }`}
          >
            {feedback.text}
          </div>
        )}
      </div>

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
