// src/App.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// Componentes de layout
import DotGrid from './DotGrid';
import StarryBackground from './StarryBackground';
import StatsSection from './StatsSection';
import ProcessTimeline from './ProcessTimeline';
import ContactSection from './ContactSection';
import logo from './assets/weavion.logo.png';

export default function App() {
  return (
    <>
      <Header />
      <BackgroundLayers />
      <div className="relative z-10">
        <Landing />
      </div>
    </>
  );
}

function Header() {
  const { i18n } = useTranslation();
  const toggleLang = () =>
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');

  return (
    <header className="fixed top-8 inset-x-0 z-50 flex justify-end px-8">
      <button
        onClick={toggleLang}
        className="btn rounded-full text-lg md:text-2xl shadow active:shadow-lg"
      >
        {i18n.language === 'es' ? 'EN' : 'ES'}
      </button>
    </header>
  );
}

function BackgroundLayers() {
  return (
    <>
      <div className="fixed inset-0 z-0 bg-black">
        <StarryBackground />
      </div>
      <div className="fixed inset-0 z-5 pointer-events-none">
        <DotGrid
          dotSize={4}
          gap={12}
          baseColor="#000"
          activeColor="#6F47FF"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>
    </>
  );
}

function Landing() {
  const { t } = useTranslation();
  return (
    <>
      {/* Hero */}
      <section
        className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
        style={{ backgroundColor: '#010207' }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#D6D6D6] mb-4"
        >
          {t(
            'hero.title',
            'Impulsa tu empresa con soluciones web orbitadas en innovación y seguridad.'
          )}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-base sm:text-lg md:text-2xl text-[#D6D6D6] max-w-2xl mb-8"
        >
          {t(
            'hero.subtitle',
            'Tu negocio merece una presencia estelar en línea. Te ayudaremos a alcanzar las estrellas.'
          )}
        </motion.p>

        {/* Botón grande que lleva a /services */}
        <Link
          to="services"
          className="btn-lg glass flex items-center space-x-3 px-8 py-4 rounded-full"
        >
          <span>Nuestros Servicios</span>
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </Link>
      </section>

      <div className="h-12 md:h-24" />

      {/* About Us */}
      <section className="py-24 px-4 rounded-xl overflow-hidden bg-[var(--color-slate)]">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#D6D6D6] mb-6">
          {t('about.title', 'About Us')}
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-[#D6D6D6] max-w-3xl mx-auto text-center">
          {t(
            'about.paragraph1',
            "Somos un equipo de creadores digitales apasionados por lanzar tu negocio a la estratosfera."
          )}
        </p>
      </section>

      <div className="h-12 md:h-24" />

      {/* Stats */}
      <section className="py-24 px-4 bg-black rounded-xl overflow-hidden">
        <StatsSection />
      </section>

      <div className="h-12 md:h-24" />

      {/* Process */}
      <section className="py-24 px-4 bg-black rounded-xl overflow-hidden">
        <ProcessTimeline />
      </section>

      <div className="h-12 md:h-24" />

      {/* Contact */}
      <section className="py-24 px-4 bg-black rounded-xl overflow-hidden">
        <ContactSection />
      </section>
    </>
  );
}
