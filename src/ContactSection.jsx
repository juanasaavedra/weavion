import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ContactSection() {
  const { t } = useTranslation();
  const ref = React.useRef(null);
  const [pos, setPos] = React.useState({ x: 50, y: 50 });

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      setPos({ x, y });
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-20 px-4 md:px-8 pb-32 overflow-hidden"
      id="contactSection"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(800px 600px at ${pos.x}% ${pos.y}%, rgba(124,58,237,0.25), rgba(30,9,53,0.8))`,
          transition: 'background-position .15s linear',
        }}
      />
      <div className="relative z-10 max-w-5xl mx-auto text-center container-rounded bg-white/10 backdrop-blur-xl p-6 md:p-10 shadow-xl text-white">
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
