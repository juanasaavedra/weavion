import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function StatsSection() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  useEffect(() => {
    const elements = sectionRef.current.querySelectorAll('.stat-animate');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-4"
    >
      <h2 className="stat-title stat-animate text-4xl md:text-6xl font-bold mb-16 text-center font-sans">
        {t('whyus.title', '¿Por qué nuestros servicios?')}
      </h2>
      <div className="stats-container grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <div className="stat-item stat-animate flex flex-col items-center p-8 rounded-3xl bg-gradient-to-br from-purple-700 via-purple-800 to-black shadow-lg">
          <span className="number text-white font-bold text-5xl md:text-7xl mb-4 number-glow">
            {t('whyus.stat1.number', '20 %')}
          </span>
          <p className="text-gray-300 text-center text-lg">
            {t('whyus.stat1.text', 'De empresas pierden más de 2 500 USD/mes por downtime')}
          </p>
        </div>
        <div className="stat-item stat-animate flex flex-col items-center p-8 rounded-3xl bg-gradient-to-br from-purple-700 via-purple-800 to-black shadow-lg">
          <span className="number text-white font-bold text-5xl md:text-7xl mb-4 number-glow">
            {t('whyus.stat2.number', '42 %')}
          </span>
          <p className="text-gray-300 text-center text-lg">
            {t('whyus.stat2.text', 'Mejora de ventas gracias al rendimiento web')}
          </p>
        </div>
      </div>
    </section>
  );
}
