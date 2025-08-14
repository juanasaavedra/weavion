import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function ProductInterestSection() {
  const { t, i18n } = useTranslation();
  const products = ['web', 'analytics', 'servicetitan', 'automation'];
  return (
    <section key={i18n.language} className="mt-16 text-center">
      <h2 className="text-2xl font-bold mb-4">{t('products.interestTitle')}</h2>
      <p className="mb-6">{t('products.interestSubtitle')}</p>
      <div className="grid md:grid-cols-2 gap-4 text-left">
        {products.map((key) => (
          <div key={key} className="p-4 rounded-lg bg-white/10 text-white">
            <h3 className="font-semibold">{t(`products.${key}.title`)}</h3>
            <p className="text-sm mt-2">{t(`products.${key}.desc`)}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link
          to="/contact"
          className="inline-block px-8 py-4 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-semibold text-lg"
        >
          {t('products.contact')}
        </Link>
      </div>
    </section>
  );
}
