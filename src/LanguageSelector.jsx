import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
    console.log('Language changed to:', newLang);
  };

  return (
    <div className="fixed top-8 right-8 z-50">
      <button
        onClick={changeLanguage}
        className="text-2xl font-bold bg-[#FFD100] text-[#202020] px-6 py-3 rounded-lg cursor-pointer border-2 border-[#202020]"
      >
        <option value="es">ES</option>
        <option value="en">EN</option>
      </select>
    </div>
  );
}
