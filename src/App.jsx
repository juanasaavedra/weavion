// src/App.jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// Componentes de layout
import DotGrid from './DotGrid';
import StarryBackground from './StarryBackground';
import StatsSection from './StatsSection';
import ProcessTimeline from './ProcessTimeline';
import ContactSection from './ContactSection';
// import logo from './assets/weavion.logo.png'; // si lo necesitas, descomenta

export default function App() {
  return (
    <>
      <Header />
      <BackgroundLayers />
      {/* Canvas de estrellitas que siguen el cursor */}
      <CursorStars />
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
        className="btn glass text-lg md:text-2xl shadow-md active:shadow-lg rounded-full"
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

/**
 * Canvas de partículas: dibuja "estrellas" (polígonos) en la posición del mouse.
 * Eficiente con requestAnimationFrame, soporta HiDPI y se limpia solo.
 */
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
      // Genera 5–8 partículas por movimiento
      const count = 6 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.6 + Math.random() * 1.2;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.4, // un poco hacia arriba
          life: 1,               // 1 → 0
          decay: 0.015 + Math.random() * 0.02,
          size: 3 + Math.random() * 3,
          hue: Math.random() < 0.6 ? 0 : 270, // 0=blanco, 270≈morado
          sat: Math.random() < 0.6 ? 0 : 70,  // blanco puro o morado saturado
          light: 100,           // brillo alto
          spin: Math.random() * Math.PI, // rotación del star path
          spikes: 5,            // puntas de estrella
        });
      }
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spawn(x, y);
    };

    const drawStar = (cx, cy, spikes, outerRadius, innerRadius, rotation) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      ctx.beginPath();
      let rot = Math.PI / 2 * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.moveTo(0, -outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = Math.cos(rot) * outerRadius;
        y = Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = Math.cos(rot) * innerRadius;
        y = Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(0, -outerRadius);
      ctx.closePath();
      ctx.restore();
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      const arr = particlesRef.current;
      for (let i = arr.length - 1; i >= 0; i--) {
        const p = arr[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02; // gravedad suave
        p.life -= p.decay;

        if (p.life <= 0) {
          arr.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = Math.max(p.life, 0);
        // Color: blanco o morado
        if (p.sat === 0) {
          ctx.fillStyle = `rgba(255,255,255,${Math.max(p.life, 0)})`;
        } else {
          ctx.fillStyle = `hsla(${p.hue} ${p.sat}% ${p.light}% / ${Math.max(p.life, 0.9)})`;
        }

        // Estrella de 5 puntas
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

  return (
    <>
      {/* Hero Section con estrellas visibles */}
      <section className="relative min-h-screen px-4 md:px-8">
        {/* Overlay suave para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center min-h-screen">
          {/* Columna izquierda vacía */}
          <div className="hidden md:block" />

          {/* Columna derecha: texto a la derecha ocupando ~media pantalla */}
          <div className="md:col-start-2 md:pl-10 md:justify-self-end text-right w-full md:w-[50vw] max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-[#D6D6D6] mb-4 md:mb-6"
            >
              {t('hero.title', 'Take your company to space and beyond')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xl md:text-3xl text-[#D6D6D6] md:ml-auto md:max-w-none max-w-2xl mb-8 md:mb-10"
            >
              {t(
                'hero.subtitle',
                'Your business deserves a stellar online presence. We’ll help you reach for the stars.'
              )}
            </motion.p>

            {/* Botón grande con SOLO borde degradado e indicador negro antes del texto */}
            <Link to="/services" className="inline-block">
              <span
                className="
                  group inline-flex items-center rounded-full
                  p-[3px]
                  bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500
                  hover:from-pink-500 hover:via-purple-500 hover:to-purple-500
                  transition
                "
              >
                {/* Interior transparente para ver las estrellas (solo borde) */}
                <span
                  className="
                    inline-flex items-center gap-4
                    rounded-full
                    px-10 py-4 md:px-14 md:py-5
                    bg-transparent backdrop-blur-sm
                  "
                >
                  {/* Div negro antes del texto */}
                  <span className="inline-block w-4 h-4 md:w-5 md:h-5 rounded-full bg-black" />
                  <span className="text-white text-lg md:text-2xl font-semibold">
                    {t('hero.cta', 'Descúbrelo')}
                  </span>
                </span>
              </span>
            </Link>
          </div>
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
