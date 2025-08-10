// src/App.jsx
import React, { useEffect, useRef, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// 3D
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';

// Layout
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
      <CursorStars />
      <div className="relative z-10">
        <Landing />

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
      </div>
    </>
  );
}

function Header() {
  const { t, i18n } = useTranslation();
  const toggleLang = () =>
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');

  const servicesItems = [
    t('header.servicesItems.webDev', 'Diseño y Desarrollo web'),
    t('header.servicesItems.crm', 'Integración a CRM o Service Titan'),
    t('header.servicesItems.analytics', 'Analíticas de negocio'),
  ];

  const automationItems = [
    t('header.automationItems.appointments', 'Genera citas'),
    t('header.automationItems.inventoryChat', 'Charla con tu inventario y modifícalo'),
    t('header.automationItems.leads', 'Captura y califica tus leads'),
    t('header.automationItems.quotes', 'Entrega cotizaciones inmediatas y ten una postventa inteligente'),
    t('header.automationItems.contact', '¿Buscas algo más? Contáctanos'),
  ];

  return (
    <div className="fixed top-8 inset-x-0 z-50 flex items-center px-8">
      {/* Logo izquierda */}
      <Link to="/" className="mr-8">
        <img src={logo} alt="Logo" className="w-14 h-14 object-contain" />
      </Link>

      {/* Menús intermedios */}
      <div className="flex-1 flex items-center justify-center space-x-8">
        <DropdownMenu title={t('header.services', 'Servicios')} items={servicesItems} />
        <DropdownMenu title={t('header.automation', 'Automatiza tu operación')} items={automationItems} />
      </div>

      {/* Selector idioma con borde degradado */}
      <button
        onClick={toggleLang}
        className="transition group flex h-10 w-20 items-center justify-center rounded-full
                   bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 p-[2px] text-white
                   duration-300 hover:bg-gradient-to-l hover:shadow-2xl hover:shadow-purple-600/30"
      >
        <div className="flex h-full w-full items-center justify-center rounded-full bg-black">
          {i18n.language === 'es' ? 'EN' : 'ES'}
        </div>
      </button>
    </div>
  );
}

function DropdownMenu({ title, items }) {
  const sizeClasses = ['w-28 h-28', 'w-32 h-32', 'w-36 h-36', 'w-40 h-40', 'w-44 h-44'];
  return (
    <div className="relative group">
      <div className="cursor-pointer text-white px-2 py-1 rounded-md">
        {title}
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 mt-2 hidden group-hover:flex flex-wrap gap-4 p-4 rounded-xl glass-high text-white shadow-lg">
        {items.map((item, idx) => (
          <div key={idx} className={`gradient-border rounded-xl ${sizeClasses[idx % sizeClasses.length]} group/item flex items-center justify-center cursor-pointer`}>
            <div className="glass rounded-xl w-full h-full flex items-center justify-center text-center p-2 transition-all duration-300 group-hover/item:bg-gradient-to-br group-hover/item:from-purple-500/30 group-hover/item:via-pink-500/30 group-hover/item:to-purple-500/30 group-hover/item:shadow-[0_0_15px_rgba(111,71,255,0.7)]">
              {item}
            </div>
          </div>
        ))}
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

/** Partículas que siguen el cursor */
function CursorStars() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    let w = 0, h = 0, dpr = 1;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (x, y) => {
      const count = 6 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.6 + Math.random() * 1.2;
        particlesRef.current.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.4,
          life: 1,
          decay: 0.015 + Math.random() * 0.02,
          size: 3 + Math.random() * 3,
          hue: Math.random() < 0.6 ? 0 : 270,
          sat: Math.random() < 0.6 ? 0 : 70,
          light: 100,
          spin: Math.random() * Math.PI,
          spikes: 5,
        });
      }
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      spawn(e.clientX - rect.left, e.clientY - rect.top);
    };

    const drawStar = (cx, cy, spikes, outerRadius, innerRadius, rotation) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      ctx.beginPath();
      let rot = Math.PI / 2 * 3;
      const step = Math.PI / spikes;
      ctx.moveTo(0, -outerRadius);
      for (let i = 0; i < spikes; i++) {
        ctx.lineTo(Math.cos(rot) * outerRadius, Math.sin(rot) * outerRadius);
        rot += step;
        ctx.lineTo(Math.cos(rot) * innerRadius, Math.sin(rot) * innerRadius);
        rot += step;
      }
      ctx.closePath();
      ctx.restore();
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      const arr = particlesRef.current;

      for (let i = arr.length - 1; i >= 0; i--) {
        const p = arr[i];
        p.x += p.vx; p.y += p.vy; p.vy += 0.02; p.life -= p.decay;
        if (p.life <= 0) { arr.splice(i, 1); continue; }

        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.fillStyle = p.sat === 0
          ? `rgba(255,255,255,${Math.max(p.life, 0)})`
          : `hsla(${p.hue} ${p.sat}% ${p.light}% / ${Math.max(p.life, 0.9)})`;

        drawStar(p.x, p.y, p.spikes, p.size, p.size * 0.5, p.spin);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      particlesRef.current = [];
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-8 pointer-events-none"
      style={{ width: '100vw', height: '100vh' }}
      aria-hidden="true"
    />
  );
}

  function Landing() {
    const { t } = useTranslation();

  // Modelo GLB que reacciona al cursor
  const MODEL_URL = `${import.meta.env.BASE_URL}models/phone_with_leads_optimized.glb`;

  function PhoneModel() {
    const { scene } = useGLTF(MODEL_URL); // pon el .glb en /public/models/
    const ref = useRef();

    useFrame((state) => {
      const { x, y } = state.pointer; // -1..1
      const rx = y * 0.35;
      const ry = x * 0.7;
      const py = -y * 0.2;

      if (!ref.current) return;
      ref.current.rotation.x += (rx - ref.current.rotation.x) * 0.12;
      ref.current.rotation.y += (ry - ref.current.rotation.y) * 0.12;
      ref.current.position.y += (py - ref.current.position.y) * 0.12;
      ref.current.rotation.z += (Math.sin(state.clock.elapsedTime * 0.3) * 0.05 - ref.current.rotation.z) * 0.05;
    });

    return <primitive ref={ref} object={scene} scale={1.1} position={[0, 0, 0]} />;
  }

  return (
    <>
      <section className="relative min-h-screen px-4 md:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center min-h-screen gap-8">
          {/* IZQUIERDA: ahora base sans-serif (font-clean) y frase en Pixelscript (font-script) */}
          <div className="md:pr-10 w-full md:w-[50vw] max-w-3xl text-left">
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-clean text-5xl md:text-7xl text-[#D6D6D6] mb-6 leading-tight"
            >
              Aumenta tu{' '}
              <span className="font-script text-white">presencia digital</span>, sin trabajar de más
            </motion.h1>

            {/* Botón: solo borde degradado + punto negro; texto del botón en Pixelscript */}
            <Link
              to="/services"
              className="transition group mt-4 flex h-12 w-44 items-center justify-center rounded-full
                         bg-gradient-to-r from-purple-400 to-purple-700 p-[1.5px] text-white duration-300
                         hover:bg-gradient-to-l hover:shadow-2xl hover:shadow-purple-600/30"
>
              <div className="flex h-full w-full items-center justify-center rounded-full bg-[#010207]
                              transition duration-300 ease-in-out group-hover:bg-gradient-to-br
                              group-hover:from-gray-700 group-hover:to-gray-900">
                {t('hero.cta', 'Descúbrelo')}
              </div>
            </Link>
          </div>

          {/* DERECHA: modelo 3D */}
          <div className="md:pl-6 w-full h-[45vh] md:h-[75vh]">
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 2.6], fov: 35 }} gl={{ antialias: true, alpha: true }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 5, 5]} intensity={0.8} />
              <directionalLight position={[-5, -3, 2]} intensity={0.3} />
              <Suspense fallback={null}>
                <PhoneModel />
                <Environment preset="night" />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </section>

      {/* Separador para que no pegue con la siguiente sección */}
      <div className="h-12 md:h-24" />
    </>
  );
}
