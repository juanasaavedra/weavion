import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const PALETTE = {
  purpleDark: "#39166F",
  purpleBright: "#7328E8",
  blackPurple: "#170E26",
  grayLight: "#F5EBFF",
};

export default function ServiciosPinnedSlider() {
  const { t } = useTranslation();
    const items = [
      {
        title: t('servicesSlider.items.web.title', 'Diseño & Desarrollo Web'),
        desc: t('servicesSlider.items.web.desc', 'Sitios ultra-rápidos y accesibles. Microinteracciones, SEO y performance 90+ en Lighthouse.'),
        bg: `radial-gradient(60% 80% at 20% 20%, rgba(255,255,255,.08), rgba(0,0,0,0) 60%), linear-gradient(120deg, ${PALETTE.blackPurple}, ${PALETTE.purpleDark})`,
        href: t('routes.services.web', '/services/web'),
      },
      {
        title: t('servicesSlider.items.servicetitan.title', 'Integración a ServiceTitan'),
        desc: t('servicesSlider.items.servicetitan.desc', 'De lead a ingreso sin fricción: captura limpia, asignación automática y control total de la operación.'),
        bg: `radial-gradient(60% 80% at 80% 30%, rgba(255,255,255,.15), rgba(0,0,0,0) 60%), linear-gradient(120deg, #352a6e, ${PALETTE.purpleDark})`,
        href: t('routes.services.crm', '/services/crm-servicetitan'),
      },
      {
        title: t('servicesSlider.items.analytics.title', 'Analíticas de Negocio'),
        desc: t('servicesSlider.items.analytics.desc', 'Paneles en tiempo real: CAC, ROAS y revenue por canal para decidir con datos.'),
        bg: `radial-gradient(60% 80% at 20% 70%, rgba(255,255,255,.12), rgba(0,0,0,0) 60%), linear-gradient(120deg, #3a3272, ${PALETTE.purpleBright})` ,
        href: t('routes.services.analytics', '/services/analiticas-negocio'),
      },
      {
        title: t('servicesSlider.items.automation.title', 'Automatizaciones'),
        desc: t('servicesSlider.items.automation.desc', 'Flujos que trabajan por ti: recordatorios, inventario y más.'),
        bg: `radial-gradient(60% 80% at 80% 70%, rgba(255,255,255,.12), rgba(0,0,0,0) 60%), linear-gradient(120deg, #261241, #3b1b6a)`,
        href: t('routes.automation.appointments', '/services/genera-citas'),
      },
    ];

    const [dims, setDims] = useState({ vw: 0, vh: 0 });
    const [progress, setProgress] = useState(0); // 0..1 a lo largo de la sección
    const [index, setIndex] = useState(0); // índice del panel activo
    const sectionRef = useRef(null);
    const wheelDeltaRef = useRef(0);

  // Ajustes de sensación
  const THIN_MIN_BASE = 68;     // ancho min de tiras comprimidas en desktop
  const THIN_MAX_BASE = 104;    // ancho max de tiras comprimidas en desktop
  const THIN_MIN_MOBILE = 24;   // ancho min en dispositivos móviles
  const THIN_MAX_MOBILE = 40;   // ancho max en dispositivos móviles

  useLayoutEffect(() => {
    const onResize = () => setDims({ vw: window.innerWidth, vh: window.innerHeight });
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let startX = 0;
    let startY = 0;
    const handleWheel = (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      wheelDeltaRef.current += e.deltaX;
      if (Math.abs(wheelDeltaRef.current) > 50) {
        setIndex((i) => clamp(i + Math.sign(wheelDeltaRef.current), 0, items.length - 1));
        wheelDeltaRef.current = 0;
      }
    };
    const onTouchStart = (e) => {
      if (e.touches.length !== 1) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      if (e.touches.length !== 1) return;
      const dx = startX - e.touches[0].clientX;
      const dy = startY - e.touches[0].clientY;
      if (Math.abs(dx) <= Math.abs(dy)) return;
      e.preventDefault();
      if (Math.abs(dx) > 50) {
        setIndex((i) => clamp(i + Math.sign(dx), 0, items.length - 1));
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: false });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, [items.length]);

  // Actualizar progreso cuando cambia el índice
  useEffect(() => {
    const steps = items.length - 1;
    setProgress(steps > 0 ? index / steps : 0);
  }, [index, items.length]);

  // Derivar estado: cuál panel está activo y cuánto llevamos de su transición
  const steps = items.length - 1;
  const stepProgress = steps > 0 ? progress * steps : 0; // 0..(n-1)
  const active = Math.floor(stepProgress);
  const local = stepProgress - active; // 0..1 dentro de la transición actual

  // Limitar a transición entre activo y el siguiente (evita saltos)
  const renderIndex = active;

  const vertical = dims.vh > dims.vw;
  const THIN_MIN = vertical ? THIN_MIN_MOBILE : THIN_MIN_BASE;
  const THIN_MAX = vertical ? THIN_MAX_MOBILE : THIN_MAX_BASE;
  const THIN = Math.round(Math.max(THIN_MIN, Math.min(THIN_MAX, dims.vw * 0.07)));
  const widths = items.map((_, j) => {
    if (j < renderIndex) return THIN; // ya pasados → tiras
    if (j === renderIndex) {
      const baseActiveW = dims.vw - renderIndex * THIN;
      return clamp(lerp(baseActiveW, THIN, local), THIN, dims.vw);
    }
    if (j === renderIndex + 1) {
      const nextActiveW = dims.vw - (renderIndex + 1) * THIN;
      return clamp(lerp(0, nextActiveW, local), 0, dims.vw);
    }
    return 0; // futuros aún no visibles
  });

    const wrapperHeight = vertical ? dims.vh * 0.8 : dims.vh;

  return (
    <>
      <section
        ref={sectionRef}
        style={{ height: wrapperHeight, overflow: "hidden", background: `linear-gradient(120deg, ${PALETTE.blackPurple}, ${PALETTE.purpleDark})` }}
      >
        <div style={{ display: "flex", height: "100%", width: "100%" }}>
          {items.map((it, j) => {
              const w = Math.round(widths[j] || 0);
              const thin = w <= THIN + 1;
              return (
                <div
                  key={it.title}
                  style={{
                    flex: `0 0 ${w}px`,
                    height: "100%",
                    position: "relative",
                    overflow: "hidden",
                    transition: "width 0.3s ease",
                    borderRight: j < renderIndex ? `1px solid rgba(172,172,172,.15)` : "none",
                  }}
                >
                  <Panel item={it} thin={thin} palette={PALETTE} vertical={vertical} />
                </div>
              );
          })}
        </div>
      </section>
    </>
  );
}

    function Panel({ item, thin, palette, vertical }) {
      const { t } = useTranslation();
      const ref = useRef(null);
      const [pos, setPos] = useState({ x: 50, y: 50 });

      useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const onMove = (e) => {
          const r = el.getBoundingClientRect();
          const x = ((e.clientX - r.left) / r.width) * 100;
          const y = ((e.clientY - r.top) / r.height) * 100;
          setPos({ x, y });
        };
        el.addEventListener('mousemove', onMove);
        return () => el.removeEventListener('mousemove', onMove);
      }, []);

      return (
        <div
          ref={ref}
          style={{ height: "100%", background: item.bg, display: "grid", placeItems: "center", padding: thin ? 0 : vertical ? "3rem 4vw" : "6rem 8vw", position: "relative", overflow: "hidden" }}
        >
        <div
          className="pointer-events-none"
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(800px 600px at ${pos.x}% ${pos.y}%, rgba(115,40,232,.2), transparent 70%)`,
            transition: "background-position .15s linear",
          }}
        />
        {thin && (
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, rgba(115,40,232,.7), rgba(115,40,232,.2))`, opacity: 0.25, pointerEvents: "none" }} />
        )}
        <div style={{ maxWidth: 920, opacity: thin ? 0.0 : 1.0, transition: "opacity .15s linear", color: palette.grayLight, textAlign: "left", background: "rgba(255,255,255,0.07)", backdropFilter: "blur(8px)", padding: vertical ? "2rem" : "3rem", borderRadius: 20 }}>
          <h2 style={{ margin: 0, fontWeight: 800, fontSize: "clamp(36px, 7vw, 84px)", letterSpacing: "-0.02em", background:'#F3EDFF', WebkitBackgroundClip: "text", color: "transparent", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{item.title}</h2>
          <p style={{ marginTop: "1.1rem", fontSize: "clamp(16px, 2.1vw, 22px)", lineHeight: 1.45, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{item.desc}</p>
          <Link to={item.href} style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: "2rem", border: `2px solid ${palette.purpleBright}`, color: '#fff', textDecoration: "none", padding: ".9rem 1.2rem", borderRadius: 999 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: palette.purpleBright, display: "inline-block" }} />
            {t('servicesSlider.learnMore', 'Conocer más')}
          </Link>
        </div>
        {thin && !vertical && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontSize: "clamp(16px, 6vh, 40px)",
              letterSpacing: "0.1em",
              color: "#fff",
              opacity: 0.75,
              padding: "1rem 0",
              fontFamily: "var(--font-display)",
              overflow: "hidden",
            }}
            aria-hidden
          >
            {item.title}
          </div>
        )}
      </div>
    );
  }

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
function lerp(a, b, t) { return a + (b - a) * t; }

/* Uso:
import ServiciosPinnedSlider from "./ServiciosPinnedSlider";
// En tu Home o página principal, colócalo al inicio:
// <ServiciosPinnedSlider />
// Agrega contenido arriba y abajo como normal; el scroll volverá a ser vertical al salir de la sección.
*/
