import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function DiscoverButton({ to, className = '', rounded = true }) {
  const { t } = useTranslation();
  
  return (
    <Link
      to={to}
      className={`
        inline-block text-2xl font-bold button-text
        ${rounded ? 'btn-rounded' : 'btn-primary'}
        hover:transform hover:scale-105 transition-all duration-300
        ${className}
      `}
    >
      {t('common.discover') || 'Descúbrelo'}
    </Link>
  );
}
