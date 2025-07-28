import React from 'react';
import ContactForm from './ContactForm';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function ContactPage() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-[var(--color-dark-bg)] flex flex-col items-center justify-center px-4 py-4">
      <div className="w-full max-w-4xl mx-auto">
        <ContactForm />
      </div>
      <div className="mt-8 text-center">
        <Link to="/" className="text-[var(--color-accent)] hover:underline font-semibold transition-colors">
          {t('common.backHome') || 'Volver al inicio'}
        </Link>
      </div>
    </div>
  );
}
