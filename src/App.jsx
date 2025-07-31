import DotGrid from './DotGrid';
import Folder from './Folder';
import StarBorder from './StarBorder';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DecryptedText from './DecryptedText';
import ProcessTimeline from './ProcessTimeline';
import ContactForm from './ContactForm';
import ContactSection from './ContactSection';
import backgroundBlur from './assets/backgroundBlur.png';
import logo from './assets/weavion.logo.png';
import StarryBackground from './StarryBackground';

export default function App() {
  const { t, i18n } = useTranslation();
  const [folderOpen, setFolderOpen] = useState(false);
  const folderRef = useRef(null);
  const [folderSize, setFolderSize] = useState(2.0);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [currentSection, setCurrentSection] = useState('hero');
  
  // Referencias para las secciones
  const heroRef = useRef(null);

  const aboutRef = useRef(null);
  const benefitsRef = useRef(null);
  const processRef = useRef(null);
  const contactRef = useRef(null);
  
  // Para el scroll y animaciones
  const { scrollY } = useScroll();

  useEffect(() => {
    const updateSize = () => {
      setFolderSize(window.innerWidth < 640 ? 1.1 : 2.0);
      setIsMobile(window.innerWidth < 768);
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
        { ref: benefitsRef, id: 'benefits' },
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

  // Services are now handled on a dedicated page


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
      <div className="fixed top-8 left-1/2 -translate-x-1/2 transform z-50">
        <Link
          to="/services"
          className="text-lg md:text-xl font-bold uppercase text-[var(--color-highlight)] bg-transparent px-4 py-2 hover:text-[var(--color-accent)] transition-colors"
        >
          {t('services.exploreButton')}
        </Link>
      </div>
      <div className="fixed top-8 right-8 md:right-8 z-50">
        <button
          onClick={handleLang}
          className="md:text-2xl text-lg font-bold bg-[var(--color-accent)] text-[var(--color-text)] md:px-6 px-4 md:py-3 py-2 btn-rounded border-0 hover:bg-[var(--color-highlight)] hover:transform hover:scale-105 transition-all duration-300 shadow-lg"
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
      
      {/* Luna que se mueve entre secciones */}
      {!isMobile && (
        <Moon
          position={{
            x: currentSection === 'hero' ? '85vw' : // Derecha en home
               currentSection === 'about' ? '100vw' : // Totalmente a la derecha en Sobre Nosotros
               currentSection === 'benefits' ? '85vw' : // Esquina en beneficios
               currentSection === 'process' ? '50vw' : // Centro abajo en proceso
               currentSection === 'contact' ? '85vw' : // En el último div a la derecha
               '50vw',
            y: currentSection === 'hero' ? '35vh' :
               currentSection === 'about' ? '50vh' : // Centrado vertical en Sobre Nosotros
               currentSection === 'benefits' ? '25vh' :
               currentSection === 'process' ? '85vh' :
               currentSection === 'contact' ? '90vh' : // Abajo del todo en contacto
              '80vh'
          }}
          size={
            currentSection === 'hero' ? '250px' : // Más pequeño en inicio
            currentSection === 'about' ? '300px' : // A la derecha en Sobre Nosotros
          currentSection === 'benefits' ? '250px' : // Grande en beneficios
          currentSection === 'process' ? '400px' : // Grande en proceso
          currentSection === 'contact' ? '300px' : // Tamaño mediano en contacto
          '200px'
          }
          opacity={
            currentSection === 'benefits' || currentSection === 'contact' ? 0.7 : // Menos opacidad cuando hay poco espacio
            1
          }
          zIndex={
            currentSection === 'contact' ? 10 : // Debajo de los contenedores pero encima del fondo
            20
          }
          transition={{ duration: 1, ease: "easeInOut" }}
          alignRight={currentSection === 'about'}
        />
      )}

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
              className="text-2xl font-bold bg-[var(--color-accent)] text-[var(--color-text)] px-6 py-3 rounded-xl border-0 hover:bg-[var(--color-highlight)] transition-colors"
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
          className="py-24 md:py-32 relative mt-24"
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

        {/* Benefits Section */}
        <motion.section
          ref={benefitsRef}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="py-24 md:py-32 px-4"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-[#D6D6D6] font-sans">
              {t('benefits.title')}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-[var(--color-gunmetal)] backdrop-blur-sm container-rounded p-6 border-0 shadow-2xl text-center flex flex-col items-center mb-6">
                <h3 className="text-xl font-bold mb-1 text-[var(--color-accent)] mt-2 subtitle">{t('benefits.fast.title')}</h3>
                <p className="text-[var(--color-text)] text-sm body-text">{t('benefits.fast.description')}</p>
              </div>
              <div className="bg-[var(--color-gunmetal)] backdrop-blur-sm container-rounded p-6 border-0 shadow-2xl text-center flex flex-col items-center mb-6">
                <h3 className="text-xl font-bold mb-1 text-[var(--color-accent)] mt-2 subtitle">{t('benefits.economic.title')}</h3>
                <p className="text-[var(--color-text)] text-sm body-text">{t('benefits.economic.description')}</p>
              </div>
              <div className="bg-[var(--color-gunmetal)] backdrop-blur-sm container-rounded p-6 border-0 shadow-2xl text-center flex flex-col items-center mb-6">
                <h3 className="text-xl font-bold mb-1 text-[var(--color-accent)] mt-2 subtitle">{t('benefits.secure.title')}</h3>
                <p className="text-[var(--color-text)] text-sm body-text">{t('benefits.secure.description')}</p>
              </div>
              <div className="bg-[var(--color-gunmetal)] backdrop-blur-sm container-rounded p-6 border-0 shadow-2xl text-center flex flex-col items-center mb-6">
                <h3 className="text-xl font-bold mb-1 text-[var(--color-accent)] mt-2 subtitle">{t('benefits.scalable.title')}</h3>
                <p className="text-[var(--color-text)] text-sm body-text">{t('benefits.scalable.description')}</p>
              </div>
            </div>
          </div>
        </motion.section>

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

// Formulario de contacto real
function ProjectForm() {
  const { t } = useTranslation();
  
  return (
    <form
      className="w-full max-w-2xl mx-auto bg-[var(--color-gunmetal)] container-rounded p-8 md:p-12 text-[var(--color-accent)] text-base md:text-lg shadow-lg flex flex-col gap-6"
      style={{ marginTop: 40, marginBottom: 40 }}
      action="https://formspree.io/f/your-form-id" // Cambia esto por tu endpoint real
      method="POST"
      autoComplete="off"
    >
      <div className="mb-2 text-white font-semibold">
        Gracias por confiar en nosotros. Este formulario nos ayudará a entender tu visión y ofrecerte una solución a la medida. Ya sea que necesites un sitio web desde cero, rediseño, o integrar herramientas como ServiceTitan o CRMs, estamos listos para ayudarte.
      </div>
      <div className="flex flex-col gap-4">
        <label>
          Nombre completo o razón social:
          <input name="nombre" required className="mt-1 w-full rounded-lg px-4 py-3 bg-[var(--color-slate)] text-[var(--color-text)] border-0" />
        </label>
        <label>
          Nombre del contacto (si aplica):
          <input name="contacto" className="mt-1 w-full rounded-lg px-4 py-3 bg-[var(--color-slate)] text-[var(--color-text)] border-0" />
        </label>
        <label>
          Correo electrónico:
          <input name="email" type="email" required className="mt-1 w-full rounded-lg px-4 py-3 bg-[var(--color-slate)] text-[var(--color-text)] border-0" />
        </label>
        <label>
          Teléfono:
          <input name="telefono" className="mt-1 w-full rounded-lg px-4 py-3 bg-[var(--color-slate)] text-[var(--color-text)] border-0" />
        </label>
        <label>
          ¿Tienes sitio web actualmente?
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2 custom-radio">
              <input type="radio" name="tiene_sitio" value="si" />
              Sí
            </label>
            <input name="url" placeholder="URL" className="rounded-lg px-4 py-3 bg-[var(--color-slate)] text-[var(--color-text)] border-0 flex-1" />
            <label className="flex items-center gap-2 custom-radio">
              <input type="radio" name="tiene_sitio" value="no" />
              No
            </label>
          </div>
        </label>
      </div>
      <div>
        <div className="font-semibold mb-2">¿Qué necesitas? Selecciona los servicios que deseas cotizar:</div>
        <div className="grid grid-cols-1 gap-2">
          <label className="custom-checkbox"><input type="checkbox" name="servicios" value="Diseño web completo" /> Diseño web completo</label>
          <label className="custom-checkbox"><input type="checkbox" name="servicios" value="Rediseño de sitio actual" /> Rediseño de sitio actual</label>
          <label className="custom-checkbox"><input type="checkbox" name="servicios" value="Integración de CRM" /> Integración de CRM</label>
          <label className="custom-checkbox"><input type="checkbox" name="servicios" value="HubSpot" /> HubSpot</label>
          <label className="custom-checkbox"><input type="checkbox" name="servicios" value="Salesforce" /> Salesforce</label>
          <label className="custom-checkbox"><input type="checkbox" name="servicios" value="Zoho" /> Zoho</label>
          <label className="custom-checkbox"><input type="checkbox" name="servicios" value="ServiceTitan" /> ServiceTitan</label>
          <label className="flex items-center gap-2 custom-checkbox">
            <input type="checkbox" name="servicios" value="Otro" />
            Otro: <input name="servicio_otro" className="rounded-lg px-4 py-3 bg-[var(--color-slate)] text-[var(--color-text)] border-0 flex-1" />
          </label>
          <label className="custom-checkbox"><input type="checkbox" name="servicios" value="Automatización de procesos" /> Automatización de procesos</label>
          <label className="custom-checkbox"><input type="checkbox" name="servicios" value="Conexión con herramientas de marketing/ventas" /> Conexión con herramientas de marketing/ventas</label>
          <label className="custom-checkbox"><input type="checkbox" name="servicios" value="Optimización SEO & rendimiento" /> Optimización SEO & rendimiento</label>
          <label className="custom-checkbox"><input type="checkbox" name="servicios" value="Alojamiento y mantenimiento" /> Alojamiento y mantenimiento</label>
          <label className="flex items-center gap-2 custom-checkbox">
            <input type="checkbox" name="servicios" value="Otro2" />
            Otro (especificar): <input name="servicio_otro2" className="rounded-lg px-4 py-3 bg-[var(--color-slate)] text-[var(--color-text)] border-0 flex-1" />
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <label>
          ¿Cuál es el objetivo principal del proyecto?
          <textarea name="objetivo" className="mt-1 w-full rounded-lg px-4 py-3 bg-[var(--color-slate)] text-[var(--color-text)] border-0" rows={2} />
        </label>
        <label>
          ¿Qué funcionalidades específicas necesitas?
          <textarea name="funcionalidades" className="mt-1 w-full rounded-lg px-4 py-3 bg-[var(--color-slate)] text-[var(--color-text)] border-0" rows={2} />
        </label>
        <label>
          ¿Hay una fecha ideal para lanzar este proyecto?
          <input name="fecha_lanzamiento" className="mt-1 w-full rounded-lg px-4 py-3 bg-[var(--color-slate)] text-[var(--color-text)] border-0" />
        </label>
        <label>
          Presupuesto estimado:
          <select name="presupuesto" className="mt-1 w-full rounded-lg px-4 py-3 bg-[var(--color-slate)] text-[var(--color-text)] border-0">
            <option>Menos de USD 2.000</option>
            <option>USD 2.000 – 5.000</option>
            <option>USD 5.000 – 10.000</option>
            <option>Más de USD 10.000</option>
            <option>A definir</option>
          </select>
        </label>
        <label>
          ¿Te interesa soporte técnico o capacitación post-lanzamiento?
          <div className="flex gap-4 mt-1">
            <label className="custom-radio"><input type="radio" name="soporte" value="Sí" /> Sí</label>
            <label className="custom-radio"><input type="radio" name="soporte" value="No" /> No</label>
            <label className="custom-radio"><input type="radio" name="soporte" value="Necesito más información" /> Necesito más información</label>
          </div>
        </label>
      </div>
      <div>
        <div className="font-semibold mb-2">Contexto técnico</div>
        <div className="flex flex-col gap-2">
          <label>
            ¿Tu sitio actual usa algún CMS?
            <div className="flex flex-wrap gap-4 mt-1">
              <label className="custom-radio"><input type="radio" name="cms" value="WordPress" /> WordPress</label>
              <label className="custom-radio"><input type="radio" name="cms" value="Shopify" /> Shopify</label>
              <label className="custom-radio"><input type="radio" name="cms" value="Webflow" /> Webflow</label>
              <label className="flex items-center gap-2 custom-radio">
                <input type="radio" name="cms" value="Otro" />
                Otro: <input name="cms_otro" className="rounded-lg px-4 py-3 bg-[var(--color-slate)] text-[var(--color-text)] border-0 flex-1" />
              </label>
              <label className="custom-radio"><input type="radio" name="cms" value="No lo sé" /> No lo sé</label>
              <label className="custom-radio"><input type="radio" name="cms" value="No tengo sitio web" /> No tengo sitio web</label>
            </div>
          </label>
          <label>
            ¿Cuentas con dominio y hosting?
            <div className="flex flex-wrap gap-4 mt-1">
              <label className="custom-radio"><input type="radio" name="dominio_hosting" value="Sí, ambos" /> Sí, ambos</label>
              <label className="custom-radio"><input type="radio" name="dominio_hosting" value="Solo dominio" /> Solo dominio</label>
              <label className="custom-radio"><input type="radio" name="dominio_hosting" value="Solo hosting" /> Solo hosting</label>
              <label className="custom-radio"><input type="radio" name="dominio_hosting" value="Aún no" /> Aún no</label>
            </div>
          </label>
          <label>
            ¿Tienes actualmente un CRM o estás migrando a uno nuevo?
            <input name="crm_actual" className="mt-1 w-full rounded-lg px-4 py-3 bg-[var(--color-slate)] text-[var(--color-text)] border-0" />
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <label>
          ¿Algo más que debamos saber?
          <textarea name="extra" className="mt-1 w-full rounded-lg px-4 py-3 bg-[var(--color-slate)] text-[var(--color-text)] border-0" rows={2} />
        </label>
      </div>
      <div>
        <div className="font-semibold mb-2">Consentimiento</div>
        <label className="flex items-center gap-2 custom-checkbox">
          <input type="checkbox" name="consentimiento" value="Sí" required />
          Autorizo a Weavion a contactarme para presentarme una propuesta personalizada.
        </label>
        <div className="flex flex-col md:flex-row gap-4 mt-2">
          <label className="flex-1">
            Firma (opcional):
            <input name="firma" className="mt-1 w-full rounded-lg px-4 py-3 bg-[var(--color-slate)] text-[var(--color-text)] border-0" />
          </label>
          <label className="flex-1">
            Fecha:
            <input name="fecha" type="date" className="mt-1 w-full rounded-lg px-4 py-3 bg-[var(--color-slate)] text-[var(--color-text)] border-0" />
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 bg-[var(--color-accent)] text-[var(--color-text)] font-bold rounded-xl border-0 px-6 py-3 text-2xl"
      >
        {t('contact.submitButton')}
      </button>
    </form>
  );
}