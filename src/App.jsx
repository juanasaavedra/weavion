// src/App.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// 3D
// The Next.js-specific entry point returns a Promise-based component which
// causes React to try to render a Promise and crash. Use the standard
// package export instead so Spline renders normally in the browser.
import {useEffect, useState} from "react";

// Layout
import DotGrid from './DotGrid';
import StarryBackground from './StarryBackground';
import StatsSection from './StatsSection';
import ProcessTimeline from './ProcessTimeline';
import ContactSection from './ContactSection';
import ServiciosPinnedSlider from './ServiciosPinnedSlider.jsx';
import { fromHalfFloat } from 'three/src/extras/DataUtils.js';

export default function App() {
  return (
    <>
      <BackgroundLayers />
      <CursorStars />
      <div className="relative z-10">
        <Landing />
        {/* Services Section */}
        <ServiciosPinnedSlider />

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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            ¿Cómo funciona nuestro proceso?
          </h2>
          <ProcessTimeline />
        </section>

        {/* Spacer */}
        <div className="h-12 md:h-24" />

        {/* Contact Section */}
        <section className="py-24 px-4 rounded-xl overflow-hidden bg-transparent">
          <ContactSection />
        </section>

        {/* Spacer */}
        <div className="h-12 md:h-24" />

        {/* Sección: Por qué nosotros? */}
        <section className="py-24 px-4 bg-black rounded-xl overflow-hidden">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            ¿Por qué nosotros?
          </h2>
          {/* Aquí puedes agregar el contenido de la sección */}
        </section>
      </div>
    </>
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
      const count = 1 + Math.floor(Math.random() * 2); // much fewer stars
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.2 + Math.random() * 0.4;
        particlesRef.current.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.1,
          life: 1,
          decay: 0.01 + Math.random() * 0.02,
          radius: Math.random() * 1.2 + 0.6,
          pulse: Math.random() * 0.02 + 0.005,
          pulseFactor: Math.random() * Math.PI * 2,
          glow: Math.random() < 0.2,
        });
      }
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      spawn(e.clientX - rect.left, e.clientY - rect.top);
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      const arr = particlesRef.current;

      for (let i = arr.length - 1; i >= 0; i--) {
        const p = arr[i];
        p.x += p.vx; p.y += p.vy; p.vy += 0.02; p.life -= p.decay; p.pulseFactor += p.pulse;
        if (p.life <= 0) { arr.splice(i, 1); continue; }
        const pulseOpacity = 0.8 + Math.sin(p.pulseFactor) * 0.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(p.life * pulseOpacity, 1)})`;
        ctx.fill();
        if (p.glow) {
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
          gradient.addColorStop(0, `rgba(111, 71, 255, ${0.4 * p.life})`);
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      }
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
        <section className="relative min-h-screen px-4 md:px-8">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center min-h-screen gap-8">
            {/* IZQUIERDA: titulares en Argent Pixel CF */}
            <div className="md:pr-10 w-full md:w-[50vw] max-w-3xl text-left">
              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-argent text-5xl md:text-7xl text-[#D6D6D6] mb-6 leading-tight"
              >
                Aumenta tu{' '}
                <span className="font-argent-italic text-white">presencia digital</span>, sin trabajar de más
              </motion.h1>

              {/* Botón: solo borde degradado + punto negro; texto del botón en Argent Pixel CF */}
              <Link
                to="/services"
                className="transition group mt-4 flex h-12 w-44 items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-purple-700 p-[1.5px] text-white duration-300 hover:bg-gradient-to-l hover:shadow-2xl hover:shadow-purple-600/30"
              >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-[#010207] transition duration-300 ease-in-out group-hover:bg-gradient-to-br group-hover:from-gray-700 group-hover:to-gray-900 font-argent">
                  {t('hero.cta', 'Descúbrelo')}
                </div>
              </Link>
            </div>

            {/* DERECHA: modelo 3D */}
            function SplineEmbed({
  url = "https://prod.spline.design/XKb4wzOQ2b05Zhac/scene.splinecode",
  full = true,     // pantalla completa si true
  height = 560,    // si full=false, usa este alto
  title = "Weavion — Modelo 3D",
  showOverlay = true,
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // Carga el web component sin modificar index.html
        await import("https://unpkg.com/@splinetool/viewer@1.10.45/build/spline-viewer.js");
        if (mounted) setReady(true);
      } catch (e) {
        console.error("No se pudo cargar spline-viewer:", e);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: full ? "100vh" : height,
        overflow: "hidden",
        // Fondo oscuro con degradé tipo metálico
        background: "radial-gradient(120% 120% at 50% 0%, #0b0f16 0%, #05070c 60%, #000 100%)",
        borderRadius: full ? 0 : 24,
        boxShadow: full ? "none" : "0 20px 60px rgba(0,0,0,.4)",
      }}
    >
      {!ready && (
        <div
          style={{
            position: "absolute", inset: 0,
            display: "grid", placeItems: "center",
            color: "#cbd5e1",
            fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial",
          }}
        >
          Cargando visor 3D…
        </div>
      )}

      {ready && (
        <spline-viewer
          url={url}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        ></spline-viewer>
      )}

      {showOverlay && (
        <div
          style={{
            position: "absolute",
            top: 16, left: 16, right: 16,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: 12, padding: "12px 16px",
            borderRadius: 16,
            background: "linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.02))",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,.12)",
            color: "white",
            fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial",
          }}
        >
          <span style={{ fontSize: 14, opacity: 0.9 }}>{title}</span>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: 12, padding: "8px 12px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,.2)",
              color: "white", textDecoration: "none",
            }}
          >
            Abrir en pestaña
          </a>
        </div>
      )}
    </section>
  );
}

export default function App() {
  return (
    <main style={{ background: "#05070c" }}>
      {/* Hero full-screen */}
      <SplineEmbed
        url="https://prod.spline.design/XKb4wzOQ2b05Zhac/scene.splinecode"
        full
        title="Weavion — Modelo 3D"
      />

      {/* Sección con alto fijo (ejemplo) */}
      <section style={{ padding: 24, maxWidth: 1200, margin: "0 auto", color: "white" }}>
        <h2 style={{ margin: "24px 0" }}>Vista embebida</h2>
        <SplineEmbed
          url="https://prod.spline.design/XKb4wzOQ2b05Zhac/scene.splinecode"
          full={false}
          height={520}
          title="Detalle"
        />
      </section>
    </main>
  );
}

        {/* Separador para que no pegue con la siguiente sección */}
        <div className="h-12 md:h-24" />
      </>
    ();
  {}
