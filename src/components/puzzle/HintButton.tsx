import { useTranslation } from 'react-i18next';

interface HintButtonProps {
  onHint: () => void;
  disabled: boolean;
}

export function HintButton({ onHint, disabled }: HintButtonProps) {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={onHint}
      disabled={disabled}
      aria-label={t('puzzle.hint')}
      className="px-4 py-2 text-sm rounded-lg bg-amber-100 text-amber-700 border border-amber-300
        hover:bg-amber-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
    >
      {t('puzzle.hint')}
    </button>
  );
}
