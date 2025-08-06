// src/App.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// Componentes de layout
import DotGrid from './DotGrid';
import StarryBackground from './StarryBackground';
import StatsSection from './StatsSection';
import ProcessTimeline from './ProcessTimeline';
import ContactSection from './ContactSection';
import DiscoverButton from './DiscoverButton'; // Solo para el Hero
import logo from './assets/weavion.logo.png';

export default function App() {
  return (
    <>
      <Header />
      <BackgroundLayers />
      <main className="relative z-10">
        <Landing />
      </main>
    </>
  );
}

function Header() {
  const { t, i18n } = useTranslation();
  const toggleLang = () =>
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');

  return (
    <header className="fixed top-8 inset-x-0 z-50 flex justify-end px-8">
      <button
        onClick={toggleLang}
        className="btn rounded-full text-lg md:text-2xl"
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
    <section className="flex flex-col items-center text-center text-white">
      {/* Hero */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6"
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
          className="text-base sm:text-lg md:text-2xl max-w-2xl mb-8 sm:mb-10"
        >
          {t(
            'hero.subtitle',
            'Tu negocio merece una presencia estelar en línea. Te ayudaremos a alcanzar las estrellas.'
          )}
        </motion.p>
        {/* El botón “Descúbrelo” se quita del Hero */}
      </div>

      {/* Separador extra en móvil y desktop */}
      <div className="h-12 md:h-24" />

      {/* About Us */}
      <div className="py-16 md:py-24 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6"
        >
          {t('about.title', 'About Us')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto"
        >
          {t(
            'about.paragraph1',
            "We're a team of passionate digital creators dedicated to launching your business into the digital stratosphere."
          )}
        </motion.p>
      </div>

      <div className="h-12 md:h-24" />

      {/* Stats Section */}
      <div className="py-16 md:py-24 px-4">
        <StatsSection />
      </div>

      <div className="h-12 md:h-24" />

      {/* Process Section */}
      <div className="py-16 md:py-24 px-4 bg-black">
        <ProcessTimeline />
      </div>

      <div className="h-12 md:h-24" />

      {/* Contact Section */}
      <div className="py-16 md:py-24 px-4">
        <ContactSection />
      </div>
    </section>
  );
}
