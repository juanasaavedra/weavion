import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ContactSection() {
  const { t } = useTranslation();

  return (
    <section
      className="relative flex items-center justify-center py-20 px-4 md:px-8 pb-32 overflow-hidden"
      id="contactSection"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/60 via-purple-700/40 to-purple-900/60 bg-[length:200%_200%] animate-gradient-slow" />
      {/* Glass card with animated gradient border */}
      <div className="relative z-10 w-full max-w-5xl text-center group">
        <div className="p-[1px] rounded-2xl bg-gradient-to-r from-purple-500 via-purple-700 to-purple-500 animate-gradient-slow">
          <div className="rounded-2xl bg-black backdrop-blur-lg p-6 md:p-10 shadow-[0_8px_40px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:scale-[1.02] group-hover:shadow-purple-500/20">
            <h2 className="text-3xl font-bold mb-6 text-purple-200">
              {t('contact.cta.title') || '¿Listo para dar el siguiente paso?'}
            </h2>
            <p className="mt-3 text-lg font-semibold mb-8 text-purple-300">
              {t('contact.cta.subtitle') || 'Impulsa tu agencia hoy'}
            </p>
            <p className="mt-3 text-sm text-white/80 mb-12 max-w-3xl mx-auto">
              {t('contact.cta.description') || 'Contáctanos hoy para comenzar a trabajar en tu proyecto. Nuestro equipo está listo para ayudarte a alcanzar tus objetivos.'}
            </p>
            <Link
              to="/contact"
              className="mt-6 mb-8 inline-block px-8 py-4 rounded-full font-semibold text-white bg-black hover:bg-gray-900 shadow-lg transition-all"
            >
              {t('contact.cta.button') || 'Contáctanos'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

