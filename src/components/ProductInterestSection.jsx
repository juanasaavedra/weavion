import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function ProductInterestSection() {
  const { t } = useTranslation();
  const products = ['web', 'analytics', 'servicetitan', 'automation'];
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-4">{t('products.interestTitle')}</h2>
      <p className="mb-6">{t('products.interestSubtitle')}</p>
      <div className="grid md:grid-cols-2 gap-4">
        {products.map((key) => (
          <div key={key} className="p-4 rounded-lg bg-white/10 text-white">
            <h3 className="font-semibold">{t(`products.${key}.title`)}</h3>
            <p className="text-sm mt-2">{t(`products.${key}.desc`)}</p>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <Link to="/contact" className="text-purple-300 underline">
          {t('products.contact')}
        </Link>
      </div>
    </section>
  );
}
