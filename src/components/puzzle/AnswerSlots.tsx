import { useTranslation } from 'react-i18next';

interface AnswerSlotsProps {
  answer: string;
  collectedSyllables: string[];
}

export function AnswerSlots({ answer, collectedSyllables }: AnswerSlotsProps) {
  const wordLengths = answer.split(' ').map((word) => word.length);
  const { t } = useTranslation();
  const allLetters = collectedSyllables.join('');
  let letterIndex = 0;

  return (
    <div className="space-y-2" role="status" aria-label={t('puzzle.answerLabel')}>
      <div className="text-xs uppercase tracking-wide text-gray-400 text-center" aria-hidden="true">
        {t('puzzle.answerLabel')}
      </div>
      <div className="flex flex-wrap justify-center gap-3" aria-live="polite">
        {wordLengths.map((len, wordIdx) => (
          <div key={wordIdx} className="flex gap-0.5">
            {Array.from({ length: len }).map((_, charIdx) => {
              const char = allLetters[letterIndex] ?? '';
              const filled = letterIndex < allLetters.length;
              const isNew = letterIndex === allLetters.length - 1 && filled;
              letterIndex++;
              return (
                <div
                  key={charIdx}
                  className={`
                    w-8 h-10 flex items-center justify-center rounded-md border-2 text-base font-bold
                    transition-all duration-200
                    ${filled
                      ? 'bg-indigo-100 border-indigo-400 text-indigo-800'
                      : 'bg-gray-50 border-gray-200 text-transparent'
                    }
                    ${isNew ? 'animate-pop' : ''}
                  `}
                >
                  {char}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
