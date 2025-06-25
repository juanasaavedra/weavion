import DotGrid from './DotGrid';
import Folder from './Folder';
import StarBorder from './StarBorder';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import DecryptedText from './DecryptedText';
import Stack from './Folder';
import ProcessTimeline from './ProcessTimeline';
import ContactForm from './ContactForm';
import backgroundBlur from '../dist/assets/backgroundBlur.png';

export default function App() {
  const { t } = useTranslation();
  const [folderOpen, setFolderOpen] = useState(false);
  const folderRef = useRef(null);
  const [folderSize, setFolderSize] = useState(2.0);
  const [showLanding, setShowLanding] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const updateSize = () => {
      setFolderSize(window.innerWidth < 640 ? 1.1 : 2.0);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Scroll a servicios
  const scrollToServices = () => {
    const el = document.getElementById('servicios');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Manejar click en el botón
  const handleExploreClick = () => {
    setShowLanding(true);
    setSelectedService(services[0]);
  };

  // Handler to select a service from landing
  const handleSelectService = (service) => {
    setSelectedService(service);
  };

  // Handler to go back
  const handleBack = () => {
    setShowLanding(false);
    setSelectedService(null);
  };

  // Datos de las cards
  const folderItems = [
    {
      title: 'Desarrollo Web',
      description: 'Sitios web modernos, rápidos y responsivos para tu negocio.',
      svg: <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="10" width="30" height="20" rx="4" fill="#3B82F6"/><rect x="10" y="15" width="20" height="10" rx="2" fill="white"/><circle cx="20" cy="25" r="2" fill="#3B82F6"/></svg>,
    },
    {
      title: 'Apps Móviles',
      description: 'Aplicaciones móviles nativas y multiplataforma para iOS y Android.',
      svg: <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="13" y="8" width="14" height="24" rx="3" fill="#3B82F6"/><rect x="15" y="12" width="10" height="16" rx="1" fill="white"/><circle cx="20" cy="28" r="1.5" fill="#3B82F6"/></svg>,
    },
    {
      title: 'Inteligencia Artificial',
      description: 'Soluciones de IA para automatizar y potenciar tu empresa.',
      svg: <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="12" fill="#3B82F6"/><rect x="14" y="14" width="12" height="12" rx="6" fill="white"/><circle cx="20" cy="20" r="3" fill="#3B82F6"/></svg>,
    },
  ];

  const services = [
    {
      id: 1,
      title: 'Desarrollo web',
      description: 'Creamos sitios web modernos, rápidos y responsivos, adaptados a las necesidades de tu negocio.',
      icon: (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="16" width="48" height="32" rx="6" fill="#FFD100"/>
          <rect x="16" y="24" width="32" height="16" rx="3" fill="#202020"/>
          <circle cx="32" cy="40" r="3" fill="#FFD100"/>
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Diseño web',
      description: 'Diseñamos interfaces atractivas, intuitivas y centradas en el usuario.',
      icon: (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="12" width="40" height="40" rx="8" fill="#FFD100"/>
          <rect x="20" y="20" width="24" height="24" rx="6" fill="#fff"/>
          <circle cx="32" cy="32" r="4" fill="#FFD100"/>
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Integración a ServiceTitan',
      description: 'Integramos tu negocio con ServiceTitan para automatizar procesos y conectar tus sistemas.',
      icon: (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="16" y="16" width="32" height="32" rx="8" fill="#FFD100"/>
          <rect x="24" y="24" width="16" height="16" rx="4" fill="#202020"/>
          <path d="M32 16v-6M32 54v-6M16 32h-6M54 32h-6" stroke="#FFD100" strokeWidth="3"/>
        </svg>
      ),
    },
    {
      id: 4,
      title: 'Analíticas de negocio y predicción de inventario',
      description: 'Implementamos sistemas de analítica avanzada y predicción de inventario usando IA.',
      icon: (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="36" width="8" height="18" rx="3" fill="#FFD100"/>
          <rect x="26" y="24" width="8" height="30" rx="3" fill="#FFD100"/>
          <rect x="42" y="12" width="8" height="42" rx="3" fill="#FFD100"/>
          <circle cx="46" cy="10" r="4" fill="#FFD100"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#202020] text-[#D6D6D6] font-sans">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <DotGrid
          dotSize={3}
          gap={12}
          baseColor="rgba(214, 214, 214, 0.2)"
          activeColor="#FFD100"
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
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen flex items-center justify-center px-4"
        >
          <div className="text-center max-w-3xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[#D6D6D6] leading-tight font-sans">
              <DecryptedText text={t('hero.title')} animateOn="view" />
            </h1>
            <p className="text-2xl md:text-3xl mb-10 text-[#D6D6D6] max-w-2xl mx-auto font-sans">
              <DecryptedText text={t('hero.subtitle')} animateOn="view" speed={20} />
            </p>
            <StarBorder as="button" onClick={scrollToServices} starColor="#FFD100" backgroundColor="#FFEE32" textColor="#202020" className="cursor-pointer text-lg md:text-xl px-10 py-4 font-bold rounded-full shadow-lg hover:bg-[#FFD100] transition">
              {t('hero.cta')}
            </StarBorder>
          </div>
        </motion.section>

        {/* Services Section with Single Folder */}
        <motion.section
          id="servicios"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="py-10 md:py-20 px-2 md:px-8 flex flex-col items-center"
        >
          <div className="w-full max-w-lg sm:max-w-2xl md:max-w-5xl mx-auto flex flex-col items-center mt-6 mx-2">
            <h2 className="text-4xl md:text-7xl font-bold mb-8 md:mb-20 text-center text-[#D6D6D6] drop-shadow-lg font-sans">
              Nuestros Servicios
            </h2>
            <div className="flex justify-center w-full">
              <div ref={folderRef} className="bg-[#333533]/70 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_0_64px_0_rgba(255,221,0,0.2)] text-center w-full max-w-sm md:max-w-md flex flex-col items-center mx-auto mt-0 mb-0">
                <div className="mb-8 md:mb-12 flex justify-center w-full mt-0">
                  <Stack
                    randomRotation={true}
                    sensitivity={180}
                    sendToBackOnClick={false}
                    cardDimensions={{ width: 260, height: 320 }}
                    fontSizeTitle="text-xl md:text-3xl"
                    fontSizeShort="text-base md:text-xl"
                    fontSizeDetail="text-base md:text-xl"
                  />
                </div>
                <h3 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 text-[#FFEE32] font-sans mt-[10rem]">Soluciones Digitales</h3>
                <p className="text-[#D6D6D6] mb-6 md:mb-12 leading-relaxed text-base md:text-2xl max-w-2xl mx-auto font-sans">
                  Ofrecemos cuatro servicios principales que cubren todas las necesidades digitales de tu empresa. Haz clic en las tarjetas para ver más detalles.
                </p>
                <StarBorder className="text-base md:text-2xl px-8 md:px-16 py-3 md:py-5 font-bold rounded-full shadow-lg hover:bg-[#FFEE32] transition" onClick={handleExploreClick} starColor="#FFD100" backgroundColor="#FFEE32" textColor="#202020">
                  Explorar Servicios
                </StarBorder>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Modal/landing de servicio */}
        {showLanding && selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl">
            <div className="bg-[#333533] rounded-3xl shadow-2xl p-10 md:p-16 max-w-lg w-full relative flex flex-col items-center">
              <button onClick={handleBack} className="absolute top-4 right-4 text-[#FFD100] text-2xl font-bold">×</button>
              <div className="mb-8">{selectedService.icon}</div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-[#FFD100] text-center">{selectedService.title}</h3>
              <p className="text-lg md:text-2xl text-[#D6D6D6] text-center mb-8">{selectedService.description}</p>
              <StarBorder className="text-base md:text-xl px-8 py-3 font-bold rounded-full shadow-lg hover:bg-[#FFEE32] transition" onClick={handleBack} starColor="#FFD100" backgroundColor="#FFEE32" textColor="#202020">
                Volver
              </StarBorder>
            </div>
          </div>
        )}

        {/* About Us Section */}
        <motion.section
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="py-16 relative"
        >
          <div className="absolute inset-0 w-full h-full z-0" style={{ backgroundImage: `url(${backgroundBlur})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(8px)' }} />
          <div className="relative z-10 max-w-6xl mx-auto px-4">
            <div className="p-12 md:p-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-[#D6D6D6] font-sans">
                Sobre Nosotros
              </h2>
              <div className="grid md:grid-cols-2 gap-20 items-center">
                <div>
                  <p className="text-lg text-[#D6D6D6] mb-8 leading-relaxed font-sans">
                    Somos una empresa especializada en el desarrollo de soluciones digitales para pequeñas y medianas empresas. Nuestro objetivo es democratizar el acceso a tecnología de calidad, permitiendo que empresas de todos los tamaños puedan competir en el mercado digital actual.
                  </p>
                  <p className="text-lg text-[#D6D6D6] leading-relaxed font-sans">
                    Creemos que la tecnología debe ser accesible, escalable y sostenible. Por eso trabajamos con metodologías ágiles, tecnologías modernas y un enfoque centrado en el usuario para asegurar que cada proyecto sea un éxito.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Benefits Section */}
        <motion.section
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="py-16 px-4"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-[#D6D6D6] font-sans">
              Beneficios Clave
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="bg-[#333533] backdrop-blur-sm rounded-2xl p-8 border border-black shadow-2xl text-center transform transition-all duration-300 hover:scale-105 flex flex-col items-center">
                {/* SVG Rápido */}
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 24h32M24 8v32" stroke="#FFD100" strokeWidth="4" strokeLinecap="round"/>
                  <circle cx="24" cy="24" r="20" stroke="#FFD100" strokeWidth="4" fill="#202020" />
                </svg>
                <h3 className="text-xl font-bold mb-2 text-[#FFEE32] mt-4 font-sans">Rápido</h3>
                <p className="text-white">Entregas en tiempo récord sin comprometer la calidad. Metodologías ágiles para resultados inmediatos.</p>
              </div>
              <div className="bg-[#333533] backdrop-blur-sm rounded-2xl p-8 border border-black shadow-2xl text-center transform transition-all duration-300 hover:scale-105 flex flex-col items-center">
                {/* SVG Económico */}
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="8" y="16" width="32" height="16" rx="8" fill="#FFD100" />
                  <circle cx="24" cy="24" r="8" fill="#fff" />
                  <text x="24" y="28" textAnchor="middle" fontSize="12" fill="#FFD100" fontWeight="bold">$</text>
                </svg>
                <h3 className="text-xl font-bold mb-2 text-[#FFEE32] mt-4 font-sans">Económico</h3>
                <p className="text-white">Precios justos para empresas de todos los tamaños. Sin costos ocultos ni sorpresas.</p>
              </div>
              <div className="bg-[#333533] backdrop-blur-sm rounded-2xl p-8 border border-black shadow-2xl text-center transform transition-all duration-300 hover:scale-105 flex flex-col items-center">
                {/* SVG Seguro */}
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="12" y="20" width="24" height="16" rx="8" fill="#FFD100" />
                  <rect x="20" y="12" width="8" height="16" rx="4" fill="#fff" />
                </svg>
                <h3 className="text-xl font-bold mb-2 text-[#FFEE32] mt-4 font-sans">Seguro</h3>
                <p className="text-white">Implementamos las mejores prácticas de seguridad. Protección de datos y cumplimiento normativo.</p>
              </div>
              <div className="bg-[#333533] backdrop-blur-sm rounded-2xl p-8 border border-black shadow-2xl text-center transform transition-all duration-300 hover:scale-105 flex flex-col items-center">
                {/* SVG Escalable */}
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="8" y="32" width="8" height="8" rx="2" fill="#FFD100" />
                  <rect x="20" y="24" width="8" height="16" rx="2" fill="#FFD100" />
                  <rect x="32" y="16" width="8" height="24" rx="2" fill="#FFD100" />
                </svg>
                <h3 className="text-xl font-bold mb-2 text-[#FFEE32] mt-4 font-sans">Escalable</h3>
                <p className="text-white">Soluciones que crecen con tu negocio. Arquitectura flexible para el futuro.</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Process Section */}
        <section className="py-16 px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-[#D6D6D6] font-sans">
            Nuestro Proceso
          </h2>
          <ProcessTimeline />
        </section>

        {/* Contact Section */}
        <section className="py-16 w-full relative">
           <div className="absolute inset-0 w-full h-full z-0" style={{ backgroundImage: `url(${backgroundBlur})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(8px)' }} />
            <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
              <ContactForm />
            </div>
        </section>
      </div>
    </div>
  );
} 