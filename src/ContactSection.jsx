import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import StarryBackground from './StarryBackground';

export default function ContactSection() {
  const { t } = useTranslation();

  return (
    <section className="relative py-20 px-4 md:px-8 pb-32" id="contactSection">
      <div className="absolute inset-0 z-0">
        <StarryBackground />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto text-center container-rounded bg-purple-800/40 backdrop-blur-md p-6 md:p-10 shadow-xl text-white">
        <h2 className="headline text-white mb-6">
          {t('contact.cta.title') || '¿Listo para dar el siguiente paso?'}
        </h2>
        <p className="subtitle text-white mb-8">
          {t('contact.cta.subtitle') || 'Impulsa tu agencia hoy'}
        </p>
        <p className="body-text text-white mb-12 max-w-3xl mx-auto">
          {t('contact.cta.description') || 'Contáctanos hoy para comenzar a trabajar en tu proyecto. Nuestro equipo está listo para ayudarte a alcanzar tus objetivos.'}
        </p>
        <Link
          to="/contact"
          className="inline-block btn-rounded text-2xl font-bold text-white bg-purple-600 hover:bg-purple-500 transition-all duration-300 shadow-lg"
        >
          {t('contact.cta.button') || 'Contáctanos'}
        </Link>
      </div>
    </section>
  );
}
