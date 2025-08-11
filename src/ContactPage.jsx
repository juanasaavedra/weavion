import React from 'react';
import ContactForm from './ContactForm';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import StarryBackground from './StarryBackground';

export default function ContactPage() {
  const { t } = useTranslation();
  
  return (
    <>
      <div className="fixed inset-0 z-0 bg-black">
        <StarryBackground />
      </div>
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-4 text-white">
        <div className="w-full max-w-4xl mx-auto">
          <ContactForm />
        </div>
        <div className="mt-8 text-center">
          <Link to="/" className="hover:underline font-semibold transition-colors">
            {t('common.backHome') || 'Volver al inicio'}
          </Link>
        </div>
      </div>
    </>
  );
}
