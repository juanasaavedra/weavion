import DotGrid from './DotGrid';
import Folder from './Folder';
import StarBorder from './StarBorder';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

export default function App() {
  const { t } = useTranslation();
  const [folderOpen, setFolderOpen] = useState(false);
  const folderRef = useRef(null);

  // Scroll a servicios
  const scrollToServices = () => {
    const el = document.getElementById('servicios');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Manejar click en el botón
  const handleExploreClick = () => {
    if (!folderOpen) {
      setFolderOpen(true);
      setTimeout(() => {
        if (folderRef.current) {
          folderRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 350);
    } else {
      scrollToServices();
    }
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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <DotGrid
          dotSize={10}
          gap={32}
          baseColor="#3B82F6"
          activeColor="#fff"
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
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-2xl md:text-3xl mb-10 text-gray-300 max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>
            <StarBorder as="button" onClick={scrollToServices} className="cursor-pointer text-lg md:text-xl px-10 py-4">
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
          className="py-16 md:py-40 px-2 md:px-8 flex flex-col items-center"
        >
          <div className="w-full max-w-lg sm:max-w-2xl md:max-w-5xl mx-auto flex flex-col items-center mt-6 mx-2">
            <h2 className="text-4xl md:text-7xl font-bold mb-8 md:mb-20 text-center text-white drop-shadow-lg">
              Nuestros Servicios
            </h2>
            <div className="flex justify-center w-full">
              <div ref={folderRef} className="bg-[#0a1124] bg-opacity-95 backdrop-blur-xl rounded-3xl p-6 sm:p-12 md:p-16 border-2 border-blue-500 shadow-[0_0_64px_0_rgba(59,130,246,0.5)] text-center w-full max-w-lg sm:max-w-2xl md:max-w-3xl flex flex-col items-center mx-auto my-6 md:my-12">
                <div className="mb-8 md:mb-12 flex justify-center w-full">
                  <Folder
                    color="#111827"
                    size={window.innerWidth < 640 ? 1.1 : 2.0}
                    items={folderItems}
                    open={folderOpen}
                    setOpen={setFolderOpen}
                  />
                </div>
                <h3 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 text-white">Soluciones Digitales</h3>
                <p className="text-gray-200 mb-6 md:mb-12 leading-relaxed text-base md:text-2xl max-w-2xl mx-auto">
                  Ofrecemos tres servicios principales que cubren todas las necesidades digitales de tu empresa. Haz clic en el folder para explorar nuestras soluciones.
                </p>
                <StarBorder className="text-base md:text-2xl px-8 md:px-16 py-3 md:py-5" onClick={handleExploreClick}>
                  Explorar Servicios
                </StarBorder>
              </div>
            </div>
          </div>
        </motion.section>

        {/* About Us Section */}
        <motion.section
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="py-32 px-4"
        >
          <div className="max-w-6xl mx-auto">
            <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-12 md:p-16 border border-gray-800 shadow-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white">
                Sobre Nosotros
              </h2>
              <div className="grid md:grid-cols-2 gap-20 items-center">
                <div>
                  <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                    Somos una empresa especializada en el desarrollo de soluciones digitales para pequeñas y medianas empresas. Nuestro objetivo es democratizar el acceso a tecnología de calidad, permitiendo que empresas de todos los tamaños puedan competir en el mercado digital actual.
                  </p>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    Creemos que la tecnología debe ser accesible, escalable y sostenible. Por eso trabajamos con metodologías ágiles, tecnologías modernas y un enfoque centrado en el usuario para asegurar que cada proyecto sea un éxito.
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="w-72 h-72 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-gray-700 shadow-lg">
                    <div className="text-center">
                      {/* SVG de innovación */}
                      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="30" cy="30" r="28" stroke="#3B82F6" strokeWidth="4" fill="#111827" />
                        <path d="M30 15 L30 35" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round"/>
                        <circle cx="30" cy="40" r="5" fill="#3B82F6" />
                      </svg>
                      <div className="text-sm text-gray-400 mt-2">Innovación</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Pricing Section */}
        <motion.section
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="py-32 px-4"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-white">
              Paquetes & Precios
            </h2>
            <div className="grid md:grid-cols-3 gap-16">
              <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 shadow-2xl transform transition-all duration-300 hover:scale-105">
                <h3 className="text-2xl font-bold mb-4 text-white">Básico</h3>
                <p className="text-3xl font-bold mb-6 text-blue-400">$999</p>
                <ul className="text-gray-300 mb-8 space-y-3">
                  <li>• Sitio web responsivo</li>
                  <li>• 5 páginas</li>
                  <li>• SEO básico</li>
                  <li>• Formulario de contacto</li>
                  <li>• Soporte por email</li>
                  <li>• Entrega en 2 semanas</li>
                </ul>
                <StarBorder>
                  Seleccionar Plan
                </StarBorder>
              </div>
              <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-8 border border-blue-500 shadow-2xl transform transition-all duration-300 hover:scale-105">
                <h3 className="text-2xl font-bold mb-4 text-white">Profesional</h3>
                <p className="text-3xl font-bold mb-6 text-blue-400">$2,499</p>
                <ul className="text-gray-300 mb-8 space-y-3">
                  <li>• Todo del plan Básico</li>
                  <li>• 10 páginas</li>
                  <li>• Panel de administración</li>
                  <li>• Integración con redes sociales</li>
                  <li>• Blog integrado</li>
                  <li>• Soporte prioritario</li>
                  <li>• Entrega en 3 semanas</li>
                </ul>
                <StarBorder>
                  Seleccionar Plan
                </StarBorder>
              </div>
              <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 shadow-2xl transform transition-all duration-300 hover:scale-105">
                <h3 className="text-2xl font-bold mb-4 text-white">Enterprise</h3>
                <p className="text-3xl font-bold mb-6 text-blue-400">$4,999</p>
                <ul className="text-gray-300 mb-8 space-y-3">
                  <li>• Todo del plan Profesional</li>
                  <li>• Páginas ilimitadas</li>
                  <li>• E-commerce completo</li>
                  <li>• Integración con CRM</li>
                  <li>• Sistema de usuarios</li>
                  <li>• API personalizada</li>
                  <li>• Soporte 24/7</li>
                  <li>• Entrega en 4 semanas</li>
                </ul>
                <StarBorder>
                  Seleccionar Plan
                </StarBorder>
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
          className="py-32 px-4"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-white">
              Beneficios Clave
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 shadow-2xl text-center transform transition-all duration-300 hover:scale-105 flex flex-col items-center">
                {/* SVG Rápido */}
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 24h32M24 8v32" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round"/>
                  <circle cx="24" cy="24" r="20" stroke="#3B82F6" strokeWidth="4" fill="#111827" />
                </svg>
                <h3 className="text-xl font-bold mb-2 text-white mt-4">Rápido</h3>
                <p className="text-gray-300">Entregas en tiempo récord sin comprometer la calidad. Metodologías ágiles para resultados inmediatos.</p>
              </div>
              <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 shadow-2xl text-center transform transition-all duration-300 hover:scale-105 flex flex-col items-center">
                {/* SVG Económico */}
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="8" y="16" width="32" height="16" rx="8" fill="#3B82F6" />
                  <circle cx="24" cy="24" r="8" fill="white" />
                  <text x="24" y="28" textAnchor="middle" fontSize="12" fill="#3B82F6" fontWeight="bold">$</text>
                </svg>
                <h3 className="text-xl font-bold mb-2 text-white mt-4">Económico</h3>
                <p className="text-gray-300">Precios justos para empresas de todos los tamaños. Sin costos ocultos ni sorpresas.</p>
              </div>
              <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 shadow-2xl text-center transform transition-all duration-300 hover:scale-105 flex flex-col items-center">
                {/* SVG Seguro */}
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="12" y="20" width="24" height="16" rx="8" fill="#3B82F6" />
                  <rect x="20" y="12" width="8" height="16" rx="4" fill="white" />
                </svg>
                <h3 className="text-xl font-bold mb-2 text-white mt-4">Seguro</h3>
                <p className="text-gray-300">Implementamos las mejores prácticas de seguridad. Protección de datos y cumplimiento normativo.</p>
              </div>
              <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 shadow-2xl text-center transform transition-all duration-300 hover:scale-105 flex flex-col items-center">
                {/* SVG Escalable */}
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="8" y="32" width="8" height="8" rx="2" fill="#3B82F6" />
                  <rect x="20" y="24" width="8" height="16" rx="2" fill="#3B82F6" />
                  <rect x="32" y="16" width="8" height="24" rx="2" fill="#3B82F6" />
                </svg>
                <h3 className="text-xl font-bold mb-2 text-white mt-4">Escalable</h3>
                <p className="text-gray-300">Soluciones que crecen con tu negocio. Arquitectura flexible para el futuro.</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Process Section */}
        <motion.section
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="py-32 px-4"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-white">
              Nuestro Proceso
            </h2>
            <div className="grid md:grid-cols-4 gap-12">
              <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 shadow-2xl text-center transform transition-all duration-300 hover:scale-105 flex flex-col items-center">
                {/* SVG Consulta */}
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="24" r="20" stroke="#3B82F6" strokeWidth="4" fill="#111827" />
                  <rect x="18" y="18" width="12" height="12" rx="6" fill="#3B82F6" />
                </svg>
                <h3 className="text-xl font-bold mb-2 text-white mt-4">Consulta</h3>
                <p className="text-gray-300">Analizamos tus necesidades, objetivos y presupuesto para crear la estrategia perfecta.</p>
              </div>
              <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 shadow-2xl text-center transform transition-all duration-300 hover:scale-105 flex flex-col items-center">
                {/* SVG Diseño */}
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="12" y="12" width="24" height="24" rx="6" fill="#3B82F6" />
                  <rect x="18" y="18" width="12" height="12" rx="3" fill="white" />
                </svg>
                <h3 className="text-xl font-bold mb-2 text-white mt-4">Diseño</h3>
                <p className="text-gray-300">Creamos prototipos, mockups y wireframes detallados para visualizar el resultado final.</p>
              </div>
              <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 shadow-2xl text-center transform transition-all duration-300 hover:scale-105 flex flex-col items-center">
                {/* SVG Desarrollo */}
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="8" y="32" width="32" height="8" rx="2" fill="#3B82F6" />
                  <rect x="16" y="16" width="16" height="16" rx="4" fill="white" />
                </svg>
                <h3 className="text-xl font-bold mb-2 text-white mt-4">Desarrollo</h3>
                <p className="text-gray-300">Construimos tu solución paso a paso con revisiones continuas y feedback constante.</p>
              </div>
              <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 shadow-2xl text-center transform transition-all duration-300 hover:scale-105 flex flex-col items-center">
                {/* SVG Lanzamiento */}
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="24" r="20" stroke="#3B82F6" strokeWidth="4" fill="#111827" />
                  <rect x="20" y="12" width="8" height="24" rx="4" fill="#3B82F6" />
                </svg>
                <h3 className="text-xl font-bold mb-2 text-white mt-4">Lanzamiento</h3>
                <p className="text-gray-300">Desplegamos tu proyecto, realizamos pruebas exhaustivas y damos soporte continuo.</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="py-32 px-4"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-12 md:p-16 border border-gray-800 shadow-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
                {t('contact.title')}
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                ¿Listo para transformar tu negocio? Contáctanos hoy mismo y comienza tu viaje hacia la digitalización exitosa.
              </p>
              <StarBorder className="text-lg px-8 py-3">
                {t('hero.cta')}
              </StarBorder>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
} 