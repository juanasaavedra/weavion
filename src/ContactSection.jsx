import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ActionButton from './ActionButton';

export default function ContactSection() {
  const { t } = useTranslation();
  
  return (
    <section className="py-20 px-4 md:px-8 bg-[var(--color-dark-bg)] pb-32" id="contactSection">
      <div className="max-w-5xl mx-auto text-center container-rounded bg-[var(--color-slate)] p-6 md:p-10 shadow-xl">
        <h2 className="headline text-[var(--color-text)] mb-6">
          {t('contact.cta.title') || '¿Listo para dar el siguiente paso?'}
        </h2>
        <p className="subtitle text-[var(--color-accent)] mb-8">
          {t('contact.cta.subtitle') || 'Impulsa tu agencia hoy'}
        </p>
        <p className="body-text text-[var(--color-text)] mb-12 max-w-3xl mx-auto">
          {t('contact.cta.description') || 'Contáctanos hoy para comenzar a trabajar en tu proyecto. Nuestro equipo está listo para ayudarte a alcanzar tus objetivos.'}
        </p>
        <Link
          to="/contact"
          className="inline-block btn-rounded text-2xl font-bold button-text hover:transform hover:scale-105 transition-all duration-300 shadow-lg"
        >
          {t('contact.cta.button') || 'Contáctanos'}
        </Link>
      </div>
    </section>
  );
}
