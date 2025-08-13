import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Language selector button that toggles between Spanish and English.
 */
export default function LanguageSelector() {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = i18n.language;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', t('meta.description'));
      document.title = t('meta.title');
    }
  }, [i18n.language, t]);

  const toggleLanguage = () => {
    const next = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', next);
    }
  };

  return (
    <button
      onClick={toggleLanguage}
      className="cursor-pointer h-10 w-20 text-center text-white text-lg font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 p-[2px] rounded-full hover:bg-gradient-to-l hover:shadow-2xl hover:shadow-purple-600/30"
    >
      {i18n.language.toUpperCase()}
    </button>
  );
}

