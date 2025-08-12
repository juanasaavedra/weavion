import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Language selector dropdown that toggles between Spanish and English.
 * The current language code is shown as the selected option.
 */
export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  return (
    <select
      value={i18n.language}
      onChange={handleChange}
      className="cursor-pointer h-10 w-20 text-center text-white text-lg font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 p-[2px] rounded-full hover:bg-gradient-to-l hover:shadow-2xl hover:shadow-purple-600/30"
    >
      <option value="es">ES</option>
      <option value="en">EN</option>
    </select>
  );
}

