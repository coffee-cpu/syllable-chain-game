import { useTranslation } from 'react-i18next';

export function Header() {
  const { t, i18n } = useTranslation();

  const toggleLang = () => {
    const next = i18n.language === 'en' ? 'ru' : 'en';
    i18n.changeLanguage(next);
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-gray-100" role="banner">
      <h1 className="text-lg font-bold text-gray-800">{t('app.title')}</h1>
      <button
        type="button"
        onClick={toggleLang}
        aria-label={`${t('settings.language')}: ${i18n.language === 'en' ? 'English' : 'Русский'}`}
        className="px-3 py-1 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        {i18n.language === 'en' ? 'RU' : 'EN'}
      </button>
    </header>
  );
}
