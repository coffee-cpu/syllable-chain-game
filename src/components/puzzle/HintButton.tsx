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
      className="px-4 py-2 text-sm rounded-lg bg-amber-100 text-amber-700 border border-amber-300
        hover:bg-amber-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
    >
      {t('puzzle.hint')}
    </button>
  );
}
