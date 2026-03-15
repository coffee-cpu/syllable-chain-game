import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface HelpModalProps {
  open: boolean;
  onClose: () => void;
}

export function HelpModal({ open, onClose }: HelpModalProps) {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => onClose();
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0
        rounded-2xl shadow-xl max-w-md w-[calc(100%-2rem)] p-0 backdrop:bg-black/40
        max-h-[90dvh] flex flex-col z-50"
      aria-label={t('help.title')}
    >
      <div className="p-6 space-y-4 overflow-y-auto flex-1">
        <h2 className="text-xl font-bold text-gray-800">{t('help.title')}</h2>

        <p className="text-gray-600">{t('help.goal')}</p>

        <section>
          <h3 className="font-semibold text-gray-700 mb-1">{t('help.steps.title')}</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
            <li>{t('help.steps.1')}</li>
            <li>{t('help.steps.2')}</li>
            <li>{t('help.steps.3')}</li>
            <li>{t('help.steps.4')}</li>
          </ol>
        </section>

        <section>
          <h3 className="font-semibold text-gray-700 mb-1">{t('help.hints.title')}</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            <li>{t('help.hints.1')}</li>
            <li>{t('help.hints.2')}</li>
            <li>{t('help.hints.3')}</li>
          </ul>
        </section>

        <section>
          <h3 className="font-semibold text-gray-700 mb-1">{t('help.scoring.title')}</h3>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>&#11088;&#11088;&#11088; {t('help.scoring.stars3')}</li>
            <li>&#11088;&#11088; {t('help.scoring.stars2')}</li>
            <li>&#11088; {t('help.scoring.stars1')}</li>
          </ul>
        </section>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-indigo-500 text-white font-medium
            hover:bg-indigo-600 active:scale-[0.98] transition-all
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          {t('help.close')}
        </button>
      </div>
    </dialog>
  );
}
