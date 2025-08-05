import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// Componentes de layout
import DotGrid from './DotGrid';
import StarryBackground from './StarryBackground';
import StatsSection from './StatsSection';
import ProcessTimeline from './ProcessTimeline';
import ContactSection from './ContactSection';
import DiscoverButton from './DiscoverButton';
import ServicesSection from './full_screen_services_section';
import logo from './assets/weavion.logo.png';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <BackgroundLayers />
      <main className="relative z-10">
        <Routes>
          <Route path="/services" element={<ServicesSection />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

function Header() {
  const { t, i18n } = useTranslation();
  const toggleLang = () => i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');

  return (
    <div className="fixed top-8 inset-x-0 z-50 flex items-center justify-between px-8">
      <Link to="/">
        <img src={logo} alt="Logo" className="w-14 h-14 rounded-full" />
      </Link>
      <div className="flex items-center gap-6">
        <DiscoverButton to="/services" />
        <Link to="/create" className="text-2xl font-bold text-[#6F47FF]">
          {t('header.create', 'Crear')}
        </Link>
        <button onClick={toggleLang} className="text-lg md:text-2xl font-bold">
          {i18n.language === 'es' ? 'EN' : 'ES'}
        </button>
      </div>
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
      <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
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
          className="text-2xl md:text-3xl text-[#D6D6D6] max-w-2xl mb-8"
        >
          {t('hero.subtitle', 'Your business deserves a stellar online presence. We’ll help you reach for the stars.')}
        </motion.p>
        <DiscoverButton to="/services" />
      </section>

      <section className="py-24 px-4">
        <h2 className="text-4xl font-bold text-center text-[#D6D6D6] mb-6">
          {t('about.title', 'About Us')}
        </h2>
        <p className="text-lg text-[#D6D6D6] max-w-3xl mx-auto text-center">
          {t(
            'about.paragraph1',
            'We’re a team of passionate digital creators dedicated to launching your business into the digital stratosphere.'
          )}
        </p>
      </section>

      <section className="py-24 px-4">
        <StatsSection />
      </section>

      <section className="py-24 px-4 bg-black">
        <ProcessTimeline />
      </section>

      <section className="py-24 px-4">
        <ContactSection />
      </section>
    </>
  );
}

function CreatePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <h1 className="text-4xl">Página de creación en construcción</h1>
    </div>
  );
}
