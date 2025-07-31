import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function ServicesPage() {
  const { t } = useTranslation();
  const services = [
    { key: 'webDevelopment', bg: 'bg-[var(--color-slate)]' },
    { key: 'webDesign', bg: 'bg-[var(--color-gunmetal)]' },
    { key: 'serviceTitan', bg: 'bg-[var(--color-slate)]' },
    { key: 'analytics', bg: 'bg-[var(--color-gunmetal)]' },
    { key: 'emailMarketing', bg: 'bg-[var(--color-slate)]' }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-dark-bg)] text-[var(--color-text)] font-sans">
      <header className="text-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-highlight)] mb-4">
          {t('services.title')}
        </h1>
        <Link to="/" className="text-[var(--color-accent)] hover:underline font-semibold">
          {t('common.backHome') || 'Volver al inicio'}
        </Link>
      </header>
      {services.map(({ key, bg }) => (
        <section key={key} className={`${bg} py-16 px-4`}>
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-highlight)]">
              {t(`folder.${key}.title`)}
            </h2>
            <p className="text-lg">{t(`folder.${key}.detail`)}</p>
          </div>
        </section>
      ))}
    </div>
  );
}
