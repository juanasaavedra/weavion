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
import backgroundBlur from './assets/backgroundBlur.png';
import logo from './assets/logo.png';

export default function App() {
  const { t, i18n } = useTranslation();
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

  // Handler para cambiar idioma
  const handleLang = () => {
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');
  };

  return (
    <div className="min-h-screen bg-[#202020] text-[#D6D6D6] font-sans">
      {/* Logo y selector de idioma */}
      <div className="fixed top-4 left-4 z-50 flex items-center gap-3">
        <button className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center shadow-lg" style={{ opacity: 0.7 }}>
          <img src={logo} alt="Logo" className="w-7 h-7 object-contain" />
        </button>
      </div>
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={handleLang}
          className="bg-[#333533] text-[#FFD100] px-4 py-2 rounded-full font-bold shadow hover:bg-[#FFD100] hover:text-[#202020] transition"
        >
          {i18n.language === 'es' ? 'EN' : 'ES'}
        </button>
      </div>

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
          className="min-h-screen flex flex-col items-center justify-center px-4"
        >
          <div className="text-center max-w-3xl mx-auto space-y-8 mt-16 mb-2">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[#D6D6D6] leading-tight font-sans">
              <DecryptedText text={t('hero.title')} animateOn="view" />
            </h1>
            <p className="text-2xl md:text-3xl mb-10 text-[#D6D6D6] max-w-2xl mx-auto font-sans">
              <DecryptedText text={t('hero.subtitle')} animateOn="view" speed={20} />
            </p>
            <StarBorder
              as="button"
              onClick={scrollToServices}
              starColor="#FFD100"
              backgroundColor="#FFEE32"
              textColor="#202020"
              className="cursor-pointer text-2xl md:text-3xl px-6 py-2 font-bold rounded-full shadow-lg hover:bg-[#FFD100] transition"
              style={{ fontSize: '2rem', padding: '0.5rem 1.5rem' }}
            >
              {t('hero.cta')}
            </StarBorder>
          </div>
        </motion.section>

        {/* Services Section - mobile optimized, mejor espaciado y tarjetas grandes */}
        <motion.section
          id="servicios"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="py-10 md:py-20 px-2 md:px-8 flex flex-col items-center mb-32"
        >
          <div className="w-full max-w-lg mx-auto flex flex-col items-center mt-6 mx-2">
            <h2 className="text-4xl md:text-7xl font-bold mb-8 md:mb-12 text-center text-[#D6D6D6] drop-shadow-lg font-sans">
              Nuestros Servicios
            </h2>
            <div className="flex flex-col gap-8 w-full">
              <Stack
                randomRotation={false}
                sensitivity={180}
                sendToBackOnClick={false}
                cardDimensions={{ width: 320, height: 340 }}
                fontSizeTitle="text-2xl"
                fontSizeShort="text-lg"
                fontSizeDetail="text-base"
              />
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-[#FFEE32] font-sans">
                Soluciones Digitales para tu empresa
              </h3>
              <p className="text-[#D6D6D6] mb-4 leading-relaxed text-base max-w-xs mx-auto font-sans">
                Ofrecemos servicios principales que cubren todas las necesidades digitales de tu empresa. Haz clic en las tarjetas para ver más detalles.
              </p>
              <StarBorder
                className="relative z-10 py-1 px-3 rounded-[28px] font-bold"
                style={{ backgroundColor: "#FFEE32", color: "#202020", fontSize: '1.3rem', padding: '0.25rem 1rem' }}
                onClick={handleExploreClick}
                starColor="#FFD100"
                backgroundColor="#FFEE32"
                textColor="#202020"
              >
                <span className="text-2xl font-bold">Explorar Servicios</span>
              </StarBorder>
            </div>
          </div>
        </motion.section>

        {/* Modal/landing de servicio */}
        {showLanding && selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl">
            <div className="bg-[#333533] rounded-3xl shadow-2xl p-8 max-w-sm w-full relative flex flex-col items-center">
              <button onClick={handleBack} className="absolute top-4 right-4 text-[#FFD100] text-2xl font-bold">×</button>
              <div className="mb-8">{selectedService.icon}</div>
              <h3 className="text-3xl font-bold mb-4 text-[#FFD100] text-center">{selectedService.title}</h3>
              <p className="text-lg text-[#D6D6D6] text-center mb-8">{selectedService.description}</p>
              <div
                className="relative z-1 text-center rounded-[20px] font-bold select-none"
                style={{
                  backgroundColor: "rgb(255, 238, 50)",
                  color: "rgb(32, 32, 32)",
                  fontSize: "2.5rem",
                  padding: "2rem 3rem",
                  cursor: "pointer",
                  userSelect: "none"
                }}
              >
                Descúbrelo
              </div>
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
          <div className="absolute inset-0 w-full h-full z-0" style={{ backgroundImage: `url(${backgroundBlur})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
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
          className="py-8 px-4"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-[#D6D6D6] font-sans">
              ¿Qué ventajas obtienes con nosotros?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-[#333533] backdrop-blur-sm rounded-2xl p-4 border border-black shadow-2xl text-center flex flex-col items-center mb-6">
                <h3 className="text-xl font-bold mb-1 text-[#FFEE32] mt-2 font-sans">Rápido</h3>
                <p className="text-white text-sm">Entregas en tiempo récord sin comprometer la calidad. Metodologías ágiles para resultados inmediatos.</p>
              </div>
              <div className="bg-[#333533] backdrop-blur-sm rounded-2xl p-4 border border-black shadow-2xl text-center flex flex-col items-center mb-6">
                <h3 className="text-xl font-bold mb-1 text-[#FFEE32] mt-2 font-sans">Económico</h3>
                <p className="text-white text-sm">Precios justos para empresas de todos los tamaños. Sin costos ocultos ni sorpresas.</p>
              </div>
              <div className="bg-[#333533] backdrop-blur-sm rounded-2xl p-4 border border-black shadow-2xl text-center flex flex-col items-center mb-6">
                <h3 className="text-xl font-bold mb-1 text-[#FFEE32] mt-2 font-sans">Seguro</h3>
                <p className="text-white text-sm">Implementamos las mejores prácticas de seguridad. Protección de datos y cumplimiento normativo.</p>
              </div>
              <div className="bg-[#333533] backdrop-blur-sm rounded-2xl p-4 border border-black shadow-2xl text-center flex flex-col items-center mb-6">
                <h3 className="text-xl font-bold mb-1 text-[#FFEE32] mt-2 font-sans">Escalable</h3>
                <p className="text-white text-sm">Soluciones que crecen con tu negocio. Arquitectura flexible para el futuro.</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Process Section */}
        <section className="py-12 px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center text-[#D6D6D6] font-sans">
            ¿Cómo es nuestro proceso de trabajo?
          </h2>
          <ProcessTimeline />
        </section>

        {/* Contact Section - más grande y con formulario real */}
        <section className="py-32 md:py-[10rem] w-full relative">
          <div
            className="absolute inset-0 w-full h-full z-0"
            style={{
              backgroundImage: `url(${backgroundBlur})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(8px)'
            }}
          />
          <div className="relative z-10 w-full max-w-4xl mx-auto px-4 flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-center text-[#FFD100] font-sans">
              ¿Quieres impulsar tu empresa con tecnología? Completa el formulario y recibe una propuesta exclusiva.
            </h2>
            <ProjectForm />
          </div>
        </section>
      </div>
    </div>
  );
}

// Formulario de contacto real
function ProjectForm() {
  return (
    <form
      className="w-full max-w-2xl mx-auto bg-[#232323] rounded-2xl p-8 md:p-12 text-[#FFD100] text-base md:text-lg shadow-lg flex flex-col gap-6"
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
          <input name="nombre" required className="mt-1 w-full rounded px-3 py-2 bg-[#181818] text-white" />
        </label>
        <label>
          Nombre del contacto (si aplica):
          <input name="contacto" className="mt-1 w-full rounded px-3 py-2 bg-[#181818] text-white" />
        </label>
        <label>
          Correo electrónico:
          <input name="email" type="email" required className="mt-1 w-full rounded px-3 py-2 bg-[#181818] text-white" />
        </label>
        <label>
          Teléfono:
          <input name="telefono" className="mt-1 w-full rounded px-3 py-2 bg-[#181818] text-white" />
        </label>
        <label>
          ¿Tienes sitio web actualmente?
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2">
              <input type="radio" name="tiene_sitio" value="si" className="accent-[#FFD100]" />
              Sí
            </label>
            <input name="url" placeholder="URL" className="rounded px-3 py-2 bg-[#181818] text-white flex-1" />
            <label className="flex items-center gap-2">
              <input type="radio" name="tiene_sitio" value="no" className="accent-[#FFD100]" />
              No
            </label>
          </div>
        </label>
      </div>
      <div>
        <div className="font-semibold mb-2">¿Qué necesitas? Selecciona los servicios que deseas cotizar:</div>
        <div className="grid grid-cols-1 gap-2">
          <label><input type="checkbox" name="servicios" value="Diseño web completo" className="accent-[#FFD100]" /> Diseño web completo</label>
          <label><input type="checkbox" name="servicios" value="Rediseño de sitio actual" className="accent-[#FFD100]" /> Rediseño de sitio actual</label>
          <label><input type="checkbox" name="servicios" value="Integración de CRM" className="accent-[#FFD100]" /> Integración de CRM</label>
          <label><input type="checkbox" name="servicios" value="HubSpot" className="accent-[#FFD100]" /> HubSpot</label>
          <label><input type="checkbox" name="servicios" value="Salesforce" className="accent-[#FFD100]" /> Salesforce</label>
          <label><input type="checkbox" name="servicios" value="Zoho" className="accent-[#FFD100]" /> Zoho</label>
          <label><input type="checkbox" name="servicios" value="ServiceTitan" className="accent-[#FFD100]" /> ServiceTitan</label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="servicios" value="Otro" className="accent-[#FFD100]" />
            Otro: <input name="servicio_otro" className="rounded px-2 py-1 bg-[#181818] text-white flex-1" />
          </label>
          <label><input type="checkbox" name="servicios" value="Automatización de procesos" className="accent-[#FFD100]" /> Automatización de procesos</label>
          <label><input type="checkbox" name="servicios" value="Conexión con herramientas de marketing/ventas" className="accent-[#FFD100]" /> Conexión con herramientas de marketing/ventas</label>
          <label><input type="checkbox" name="servicios" value="Optimización SEO & rendimiento" className="accent-[#FFD100]" /> Optimización SEO & rendimiento</label>
          <label><input type="checkbox" name="servicios" value="Alojamiento y mantenimiento" className="accent-[#FFD100]" /> Alojamiento y mantenimiento</label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="servicios" value="Otro2" className="accent-[#FFD100]" />
            Otro (especificar): <input name="servicio_otro2" className="rounded px-2 py-1 bg-[#181818] text-white flex-1" />
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <label>
          ¿Cuál es el objetivo principal del proyecto?
          <textarea name="objetivo" className="mt-1 w-full rounded px-3 py-2 bg-[#181818] text-white" rows={2} />
        </label>
        <label>
          ¿Qué funcionalidades específicas necesitas?
          <textarea name="funcionalidades" className="mt-1 w-full rounded px-3 py-2 bg-[#181818] text-white" rows={2} />
        </label>
        <label>
          ¿Hay una fecha ideal para lanzar este proyecto?
          <input name="fecha_lanzamiento" className="mt-1 w-full rounded px-3 py-2 bg-[#181818] text-white" />
        </label>
        <label>
          Presupuesto estimado:
          <select name="presupuesto" className="mt-1 w-full rounded px-3 py-2 bg-[#181818] text-white">
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
            <label><input type="radio" name="soporte" value="Sí" className="accent-[#FFD100]" /> Sí</label>
            <label><input type="radio" name="soporte" value="No" className="accent-[#FFD100]" /> No</label>
            <label><input type="radio" name="soporte" value="Necesito más información" className="accent-[#FFD100]" /> Necesito más información</label>
          </div>
        </label>
      </div>
      <div>
        <div className="font-semibold mb-2">Contexto técnico</div>
        <div className="flex flex-col gap-2">
          <label>
            ¿Tu sitio actual usa algún CMS?
            <div className="flex flex-wrap gap-4 mt-1">
              <label><input type="radio" name="cms" value="WordPress" className="accent-[#FFD100]" /> WordPress</label>
              <label><input type="radio" name="cms" value="Shopify" className="accent-[#FFD100]" /> Shopify</label>
              <label><input type="radio" name="cms" value="Webflow" className="accent-[#FFD100]" /> Webflow</label>
              <label className="flex items-center gap-2">
                <input type="radio" name="cms" value="Otro" className="accent-[#FFD100]" />
                Otro: <input name="cms_otro" className="rounded px-2 py-1 bg-[#181818] text-white flex-1" />
              </label>
              <label><input type="radio" name="cms" value="No lo sé" className="accent-[#FFD100]" /> No lo sé</label>
              <label><input type="radio" name="cms" value="No tengo sitio web" className="accent-[#FFD100]" /> No tengo sitio web</label>
            </div>
          </label>
          <label>
            ¿Cuentas con dominio y hosting?
            <div className="flex flex-wrap gap-4 mt-1">
              <label><input type="radio" name="dominio_hosting" value="Sí, ambos" className="accent-[#FFD100]" /> Sí, ambos</label>
              <label><input type="radio" name="dominio_hosting" value="Solo dominio" className="accent-[#FFD100]" /> Solo dominio</label>
              <label><input type="radio" name="dominio_hosting" value="Solo hosting" className="accent-[#FFD100]" /> Solo hosting</label>
              <label><input type="radio" name="dominio_hosting" value="Aún no" className="accent-[#FFD100]" /> Aún no</label>
            </div>
          </label>
          <label>
            ¿Tienes actualmente un CRM o estás migrando a uno nuevo?
            <input name="crm_actual" className="mt-1 w-full rounded px-3 py-2 bg-[#181818] text-white" />
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <label>
          ¿Algo más que debamos saber?
          <textarea name="extra" className="mt-1 w-full rounded px-3 py-2 bg-[#181818] text-white" rows={2} />
        </label>
      </div>
      <div>
        <div className="font-semibold mb-2">Consentimiento</div>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="consentimiento" value="Sí" required className="accent-[#FFD100]" />
          Autorizo a Weavion a contactarme para presentarme una propuesta personalizada.
        </label>
        <div className="flex flex-col md:flex-row gap-4 mt-2">
          <label className="flex-1">
            Firma (opcional):
            <input name="firma" className="mt-1 w-full rounded px-3 py-2 bg-[#181818] text-white" />
          </label>
          <label className="flex-1">
            Fecha:
            <input name="fecha" type="date" className="mt-1 w-full rounded px-3 py-2 bg-[#181818] text-white" />
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 bg-[#FFD100] text-[#202020] font-bold rounded-full px-8 py-4 shadow hover:bg-[#FFEE32] transition text-xl"
      >
        Enviar
      </button>
    </form>
  );
}