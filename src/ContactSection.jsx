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
      className="relative flex items-center justify-center py-20 px-4 md:px-8 pb-32 overflow-hidden"
      id="contactSection"
    >
      {/* Radial cursor-follow gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(800px 600px at ${pos.x}% ${pos.y}%, rgba(124,58,237,0.25), rgba(30,9,53,0.8))`,
          transition: 'background-position .15s linear',
        }}
      />

      {/* Glass card with animated gradient border */}
      <div className="relative z-10 w-full max-w-5xl text-center group">
        <div className="p-[1px] rounded-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 animate-gradient-slow">
          <div className="rounded-2xl bg-white/5 backdrop-blur-lg p-6 md:p-10 shadow-[0_8px_40px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:scale-[1.02] group-hover:shadow-purple-500/20">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-400 to-pink-400">
              {t('contact.cta.title') || '¿Listo para dar el siguiente paso?'}
            </h2>
            <p className="mt-3 text-lg font-semibold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-300">
              {t('contact.cta.subtitle') || 'Impulsa tu agencia hoy'}
            </p>
            <p className="mt-3 text-sm text-white/80 mb-12 max-w-3xl mx-auto">
              {t('contact.cta.description') || 'Contáctanos hoy para comenzar a trabajar en tu proyecto. Nuestro equipo está listo para ayudarte a alcanzar tus objetivos.'}
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-block px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-[length:200%_200%] animate-gradient-slow hover:shadow-purple-500/50 shadow-lg transition-all"
            >
              {t('contact.cta.button') || 'Contáctanos'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
