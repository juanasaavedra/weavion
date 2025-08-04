import DotGrid from './DotGrid';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DecryptedText from './DecryptedText';
import ProcessTimeline from './ProcessTimeline';
import ContactSection from './ContactSection';
import logo from './assets/weavion.logo.png';
import StarryBackground from './StarryBackground';
import StatsSection from './StatsSection';

export default function App() {
  const { t, i18n } = useTranslation();
  const [folderOpen, setFolderOpen] = useState(false);
  const folderRef = useRef(null);
  const [folderSize, setFolderSize] = useState(2.0);
  const [currentSection, setCurrentSection] = useState('hero');
  
  // Referencias para las secciones
  const heroRef = useRef(null);

  const aboutRef = useRef(null);
  const statsRef = useRef(null);
  const processRef = useRef(null);
  const contactRef = useRef(null);
  
  // Para el scroll y animaciones
  const { scrollY } = useScroll();

  useEffect(() => {
      const updateSize = () => {
        setFolderSize(window.innerWidth < 640 ? 1.1 : 2.0);
      };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  
  // Detectar la sección actual basada en el scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      const sections = [
        { ref: heroRef, id: 'hero' },
        { ref: aboutRef, id: 'about' },
        { ref: statsRef, id: 'benefits' },
        { ref: processRef, id: 'process' },
        { ref: contactRef, id: 'contact' }
      ];
      
      for (const section of sections) {
        if (section.ref.current) {
          const { top, bottom } = section.ref.current.getBoundingClientRect();
          if (top <= scrollPosition && bottom >= scrollPosition) {
            setCurrentSection(section.id);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  // Handler para cambiar idioma
  const handleLang = () => {
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');
  };

  return (
    <div className="min-h-screen bg-[var(--color-dark-bg)] text-[var(--color-text)] font-sans">
      {/* Logo y selector de idioma */}
      <div className="fixed top-8 left-8 md:left-8 z-50 flex items-center">
        <button className="w-16 h-16 md:w-18 md:h-18 rounded-full bg-[var(--color-slate)] flex items-center justify-center shadow-xl border border-[var(--color-slate)]">
          <img src={logo} alt="Logo" className="md:w-16 md:h-16 w-14 h-14 object-cover rounded-full" />
        </button>
      </div>
      <div className="fixed top-8 right-8 md:right-8 z-50 flex items-center gap-4">
        <Link
          to="/services"
          replace
          aria-label={t('common.exploreServices', 'Explore services')}
          className="md:text-2xl text-lg font-bold btn-rounded md:px-6 px-4 md:py-3 py-2 hover:transform hover:scale-105 shadow-lg"
        >
          {t('common.exploreServices', 'Explore services')}
        </Link>
        <button
          onClick={handleLang}
          className="md:text-2xl text-lg font-bold btn-rounded md:px-6 px-4 md:py-3 py-2 hover:transform hover:scale-105 shadow-lg"
        >
          {i18n.language === 'es' ? 'EN' : 'ES'}
        </button>
      </div>

      {/* Background */}
      <div className="fixed inset-0 z-0" style={{ backgroundColor: '#000000' }}>
        <StarryBackground />
      </div>
      <div className="fixed inset-0 z-5" style={{ pointerEvents: 'none' }}>
        <DotGrid
          dotSize={3}
          gap={12}
          baseColor="#000000"
          activeColor="#6F47FF"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen flex flex-col items-center justify-center px-4"
        >
          <div className="text-center max-w-3xl mx-auto space-y-8 mt-16 mb-2">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[#D6D6D6] leading-tight font-sans">
              <DecryptedText text={t('hero.title', "Take your company to space and beyond")} animateOn="view" />
            </h1>
            <p className="text-2xl md:text-3xl mb-10 text-[#D6D6D6] max-w-2xl mx-auto font-sans">
              <DecryptedText text={t('hero.subtitle', "Your business deserves a stellar online presence. We'll help you reach for the stars.")} animateOn="view" speed={20} />
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-xl text-[#6F47FF] mb-10 font-semibold"
            >
              {t('hero.motivational', "The universe of digital possibilities awaits your brand")}
            </motion.div>
            <Link
              to="/services"
              replace
              aria-label={t('hero.cta', 'Discover how')}
              className="inline-block btn-rounded text-2xl font-bold button-text mt-4 shadow-lg"
            >
              {t('hero.cta', "Discover how")}
            </Link>
          </div>
        </motion.section>

        {/* About Us Section */}
        <motion.section
          ref={aboutRef}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="py-24 md:py-32 relative mt-8"
        >
          <div className="absolute inset-0 w-full h-full z-0 bg-black bg-opacity-90" />
          <div className="relative z-10 max-w-6xl mx-auto px-4">
            <div className="p-12 md:p-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-[#D6D6D6] font-sans">
                {t('about.title', "About Us")}
              </h2>
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <p className="text-lg text-[#D6D6D6] mb-8 leading-relaxed font-sans font-medium">
                    {t('about.paragraph1', "We're a team of passionate digital creators dedicated to launching your business into the digital stratosphere.")}
                  </p>
                  <p className="text-lg text-[#D6D6D6] leading-relaxed font-sans font-medium">
                    {t('about.paragraph2', "Our mission is to help businesses of all sizes achieve orbital success with cutting-edge web solutions and service integrations.")}
                  </p>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-8 text-[#6F47FF] text-lg font-bold"
                  >
                    {t('about.quote', "Your vision, our mission - reaching for the stars together.")}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Why Us Stats Section */}
        <section ref={statsRef} className="py-24 md:py-32 px-4">
          <StatsSection />
        </section>

        {/* Process Section */}
        <section ref={processRef} className="py-24 md:py-32 px-4 bg-[var(--color-dark-bg)] mt-24" style={{ minHeight: 'auto' }}>
          <h2 className="headline mb-10 text-center text-[var(--color-text)]">
            {t('process.title', "Our Process")}
          </h2>
          <ProcessTimeline />
        </section>
        
        {/* Contact Section */}
        <div ref={contactRef}>
          <ContactSection />
        </div>
        
        {/* Extra space for mobile view */}
        <div className="h-16 md:h-0"></div>
      </div>
    </div>
  );
}

