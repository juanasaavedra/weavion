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
    <div className="fixed top-8 inset-x-0 z-50 flex justify-end px-8">
      <button
        onClick={toggleLang}
        className="btn rounded-full text-lg md:text-2xl shadow-md active:shadow-lg"
      >
        {i18n.language === 'es' ? 'EN' : 'ES'}
      </button>
    </div>
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
      {/* Hero Section con fondo de estrellas visible */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center"
      >
        {/* Overlay suave para mejorar legibilidad sobre las estrellas */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none" />

        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-[#D6D6D6] mb-6"
          >
            {t('hero.title', 'Take your company to space and beyond')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-2xl md:text-3xl text-[#D6D6D6] max-w-2xl mb-8 mx-auto"
          >
            {t(
              'hero.subtitle',
              'Your business deserves a stellar online presence. We’ll help you reach for the stars.'
            )}
          </motion.p>

          {/* Botón ➜ /services (mantiene tus estilos) */}
          <Link to="/services" className="inline-block">
            <button
              type="button"
              className="transition group mt-4 flex h-10 w-32 items-center justify-center rounded-full
                         bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 p-[2.5px]
                         text-white duration-300 hover:bg-gradient-to-l hover:shadow-2xl hover:shadow-purple-600/30"
            >
              <div
                className="flex h-full w-full items-center justify-center rounded-full
                           bg-transparent transition duration-300 ease-in-out
                           group-hover:bg-gradient-to-br group-hover:from-gray-700/60 group-hover:to-gray-900/60"
              >
                {t('hero.cta', 'Descúbrelo')}
              </div>
            </button>
          </Link>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-12 md:h-24" />

      {/* Stats Section */}
      <section className="py-24 px-4 bg-black rounded-xl overflow-hidden">
        <StatsSection />
      </section>

      {/* Spacer */}
      <div className="h-12 md:h-24" />

      {/* Process Section */}
      <section className="py-24 px-4 bg-black rounded-xl overflow-hidden">
        <ProcessTimeline />
      </section>

      {/* Spacer */}
      <div className="h-12 md:h-24" />

      {/* Contact Section */}
      <section className="py-24 px-4 bg-black rounded-xl overflow-hidden">
        <ContactSection />
      </section>
    </>
  );
}
