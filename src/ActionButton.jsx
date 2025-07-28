import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ActionButton({ to, children, plain = false, className = '', rounded = true }) {
  const { t } = useTranslation();
  
  return (
    <Link
      to={to}
      className={`
        inline-block text-2xl font-bold button-text
        ${rounded ? 'btn-rounded' : 'btn-primary'}
        ${plain ? 'text-[var(--color-accent)]' : 'bg-[var(--color-accent)] text-[var(--color-text)]'}
        ${className}
      `}
    >
      {children}
    </Link>
  );
}
