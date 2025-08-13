import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Language selector button that toggles between Spanish and English.
 */
export default function LanguageSelector() {
  const { i18n } = useTranslation();

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

