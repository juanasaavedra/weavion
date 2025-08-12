// src/App.jsx
// src/App.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

// Layout
import DotGrid from "./DotGrid";
import StarryBackground from "./StarryBackground";
import StatsSection from "./StatsSection";
import ProcessTimeline from "./ProcessTimeline";
import ContactSection from "./ContactSection";
import ServiciosPinnedSlider from "./ServiciosPinnedSlider.jsx";

/* -------------------------------------------------------
   Hook: carga el web component de Spline sin tocar index.html
------------------------------------------------------- */
const SPLINE_SRC =
  "https://unpkg.com/@splinetool/viewer@1.10.45/build/spline-viewer.js";

function useSplineScript() {
  const [ready, setReady] = useState(() => !!customElements.get("spline-viewer"));

  useEffect(() => {
    if (ready) return;
    // Si ya está registrado, marcar listo
    if (customElements.get("spline-viewer")) {
      setReady(true);
      return;
    }
    // Inyectar script module
    const s = document.createElement("script");
    s.type = "module";
    s.src = SPLINE_SRC;
    s.onload = () => setReady(true);
    s.onerror = () => console.error("No se pudo cargar spline-viewer:", SPLINE_SRC);
    document.head.appendChild(s);
    return () => {
      // no removemos si ya registró el customElement; dejar el script es seguro
      // s.remove(); // opcional
    };
  }, [ready]);

  return ready;
}

/* -------------------------------------------------------
   Componente reutilizable para el visor
------------------------------------------------------- */
function SplineViewerBox({
  url = "https://prod.spline.design/XKb4wzOQ2b05Zhac/scene.splinecode",
  className = "",
  style,
  showFallback = true,
}) {
  const ready = useSplineScript();

  return (
    <div
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {!ready ? (
        showFallback ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              color: "#cbd5e1",
              background: "#05070c",
            }}
          >
            Cargando visor 3D…
          </div>
        ) : null
      ) : (
        <spline-viewer
          url={url}
          style={{ display: "block", width: "100%", height: "100%" }}
        />
      )}
    </div>
  );
}

/* -------------------------------------------------------
   Fondo
------------------------------------------------------- */
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

/* -------------------------------------------------------
   Partículas del cursor (como ya lo tenías)
------------------------------------------------------- */
function CursorStars() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    let w = 0,
      h = 0,
      dpr = 1;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (x, y) => {
      const count = 1 + Math.floor(Math.random() * 2);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.2 + Math.random() * 0.4;
        particlesRef.current.push({
          x,
          y,
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
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02;
        p.life -= p.decay;
        p.pulseFactor += p.pulse;
        if (p.life <= 0) {
          arr.splice(i, 1);
          continue;
        }
        const pulseOpacity = 0.8 + Math.sin(p.pulseFactor) * 0.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(p.life * pulseOpacity, 1)})`;
        ctx.fill();
        if (p.glow) {
          const gradient = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.radius * 4
          );
          gradient.addColorStop(0, `rgba(111, 71, 255, ${0.4 * p.life})`);
          gradient.addColorStop(1, "transparent");
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      particlesRef.current = [];
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-8 pointer-events-none"
      style={{ width: "100vw", height: "100vh" }}
      aria-hidden="true"
    />
  );
}

/* -------------------------------------------------------
   Hero / Landing
------------------------------------------------------- */
function Landing() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen px-4 md:px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center min-h-screen gap-8">
        {/* IZQUIERDA: titulares */}
        <div className="md:pr-10 w-full md:w-[50vw] max-w-3xl text-left">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-argent text-5xl md:text-7xl text-[#D6D6D6] mb-6 leading-tight"
          >
            Aumenta tu{" "}
            <h1 className="font-ars text-4x1">presencia digital</h1>, sin trabajar de más
          </motion.h1>

          <Link
            to="/services"
            className="transition group mt-4 flex h-12 w-44 items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-purple-700 p-[1.5px] text-white duration-300 hover:bg-gradient-to-l hover:shadow-2xl hover:shadow-purple-600/30"
          >
            <div className="flex h-full w-full items-center justify-center rounded-full bg-[#010207] transition duration-300 ease-in-out group-hover:bg-gradient-to-br group-hover:from-gray-700 group-hover:to-gray-900 font-argent">
              {t("hero.cta", "Descúbrelo")}
            </div>
          </Link>
        </div>

        {/* DERECHA: modelo 3D (altura controlada) */}
        <div className="w-full h-[50vh] md:h-[150vh] rounded-xl overflow-hidden bg-black/60">
          <SplineViewerBox />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------
   App principal
------------------------------------------------------- */
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
          {/* Contenido adicional aquí */}
        </section>
      </div>
    </>
  );
}
