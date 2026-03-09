import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useGame } from '../../context/GameContext.tsx';
import { ChainRow } from '../puzzle/ChainRow.tsx';
import { AnswerSlots } from '../puzzle/AnswerSlots.tsx';
import { StartBanner } from '../puzzle/StartBanner.tsx';
import { HintButton } from '../puzzle/HintButton.tsx';
import { getDisplayableLinks } from '../../hooks/usePuzzle.ts';

interface PuzzleScreenProps {
  onComplete: () => void;
}

export function PuzzleScreen({ onComplete }: PuzzleScreenProps) {
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
    <div className="flex flex-col gap-4 p-4 max-w-lg mx-auto">
      <StartBanner
        phrase={state.puzzle.startPhrase}
        currentTarget={currentTarget}
        currentStep={state.currentStep}
        totalSteps={totalSteps}
      />

      <AnswerSlots
        wordLengths={state.puzzle.wordLengths}
        collectedSyllables={state.collectedSyllables}
      />

      {feedback && (
        <div
          className={`text-center text-sm font-medium px-3 py-2 rounded-lg transition-all ${
            feedback.type === 'correct'
              ? 'bg-green-100 text-green-700'
              : feedback.type === 'wrong'
                ? 'bg-red-100 text-red-700'
                : 'bg-blue-100 text-blue-700'
          }`}
        >
          {feedback.text}
        </div>
      )}

      <div className="flex flex-col gap-2">
        {state.displayOrder.map((link) => (
          <ChainRow
            key={link.left}
            link={link}
            solved={solvedLefts.has(link.left)}
            shaking={shakingRow === link.left}
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
