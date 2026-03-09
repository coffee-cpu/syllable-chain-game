import { useTranslation } from 'react-i18next';

interface StartBannerProps {
  phrase: string;
  currentTarget: string;
  currentStep: number;
  totalSteps: number;
}

export function StartBanner({ phrase, currentTarget, currentStep, totalSteps }: StartBannerProps) {
  const { t } = useTranslation();

  return (
    <div className="text-center space-y-2">
      <div className="text-sm text-gray-500">
        {t('puzzle.step', { current: currentStep + 1, total: totalSteps })}
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
        <span className="text-xs uppercase tracking-wide text-blue-400 block mb-1">
          {t('puzzle.startLabel')}
        </span>
        <span className="text-lg font-semibold text-blue-700">{phrase}</span>
      </div>
      {currentStep > 0 && (
        <div className="text-sm text-indigo-600 font-medium">
          {t('puzzle.nextSearch', { phrase: currentTarget })}
        </div>
      )}
    </div>
  );
}
