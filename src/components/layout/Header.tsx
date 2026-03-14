import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { HelpModal } from './HelpModal.tsx';

export function Header() {
  const { t, i18n } = useTranslation();
  const [helpOpen, setHelpOpen] = useState(false);

  const toggleLang = () => {
    const next = i18n.language === 'en' ? 'ru' : 'en';
    i18n.changeLanguage(next);
  };

  const openHelp = useCallback(() => setHelpOpen(true), []);
  const closeHelp = useCallback(() => setHelpOpen(false), []);

  return (
    <>
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-100" role="banner">
        <h1 className="text-lg font-bold text-gray-800">{t('app.title')}</h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openHelp}
            aria-label={t('help.button')}
            className="w-8 h-8 flex items-center justify-center text-sm rounded-full bg-gray-100 hover:bg-gray-200 transition-colors font-bold text-gray-600"
          >
            ?
          </button>
          <button
            type="button"
            onClick={toggleLang}
            aria-label={`${t('settings.language')}: ${i18n.language === 'en' ? 'English' : 'Русский'}`}
            className="px-3 py-1 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors uppercase"
          >
            {i18n.language === 'en' ? 'EN' : 'RU'}
          </button>
        </div>
      </header>
      <HelpModal open={helpOpen} onClose={closeHelp} />
    </>
  );
}
