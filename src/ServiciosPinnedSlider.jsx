import React, { useLayoutEffect, useRef, useState } from "react";

const PALETTE = {
  purpleDark: "#39166F",
  purpleBright: "#7328E8",
  blackPurple: "#170E26",
  grayLight: "#F5EBFF",
};

export default function ServiciosPinnedSlider() {
  const items = [
    {
      title: "Diseño y Desarrollo web",
      desc: "Sitios ultra-rápidos y accesibles. Microinteracciones, SEO y performance 90+ en Lighthouse.",
      bg: `radial-gradient(60% 80% at 20% 20%, rgba(255,255,255,.08), rgba(0,0,0,0) 60%), linear-gradient(120deg, ${PALETTE.blackPurple}, ${PALETTE.purpleDark})`,
      href: "/services/web",
    },
    {
      title: "Integración a CRM o ServiceTitan",
      desc: "De lead a ingreso sin fricción: captura limpia, enriquecimiento, tareas automáticas y asignación de técnicos.",
      bg: `radial-gradient(60% 80% at 80% 30%, rgba(255,255,255,.08), rgba(0,0,0,0) 60%), linear-gradient(120deg, #21183e, ${PALETTE.purpleDark})`,
      href: "/services/crm",
    },
    {
      title: "Email Marketing",
      desc: "Automatizaciones que venden: onboarding, carritos abandonados, newsletters y triggers por comportamiento.",
      bg: `radial-gradient(60% 80% at 20% 70%, rgba(255,255,255,.06), rgba(0,0,0,0) 60%), linear-gradient(120deg, #1a1530, #2a2146)` ,
      href: "/services/email",
    },
    {
      title: "Integración a CRM o Service Titan",
      desc: "Formularios → leads limpios → tareas automáticas → técnicos asignados.",
      bg: `radial-gradient(60% 80% at 70% 30%, rgba(255,255,255,.06), rgba(0,0,0,0) 60%), linear-gradient(120deg, #2a2146, #331d5f)` ,
      href: "/services/crm",
    },
    {
      title: "Automatiza tu operación",
      desc: "Bots y flujos con n8n/Python para cotizaciones, recordatorios, inventario y postventa 24/7.",
      bg: `radial-gradient(60% 80% at 50% 50%, rgba(255,255,255,.06), rgba(0,0,0,0) 60%), linear-gradient(120deg, #232032, ${PALETTE.blackPurple})` ,
      href: "/automatizaciones/genera-citas",
    },
  ];

    const [dims, setDims] = useState({ vw: 0, vh: 0 });
    const [progress, setProgress] = useState(0); // 0..1 a lo largo de la sección
    const scrollX = useRef(0);

  // Ajustes de sensación
  const SLOW_FACTOR = 1.8; // >1 = más lenta cada transición
  const THIN_MIN = 68;     // ancho min de tiras comprimidas
  const THIN_MAX = 104;    // ancho max de tiras comprimidas

  useLayoutEffect(() => {
    const onResize = () => setDims({ vw: window.innerWidth, vh: window.innerHeight });
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleWheel = (e) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    e.preventDefault();
    const perPanel = dims.vw * SLOW_FACTOR;
    const totalWidth = dims.vw + (items.length - 1) * perPanel;
    const maxScroll = totalWidth - dims.vw;
    scrollX.current = clamp(scrollX.current + e.deltaX, 0, maxScroll);
    const raw = scrollX.current / Math.max(1, maxScroll);
    setProgress(raw);
  };

  // Derivar estado: cuál panel está activo y cuánto llevamos de su transición
  const steps = items.length - 1;
  const t = steps > 0 ? progress * steps : 0; // 0..(n-1)
  const active = Math.floor(t);
  const local = t - active; // 0..1 dentro de la transición actual

  // Limitar a transición entre activo y el siguiente (evita saltos)
  const renderIndex = active;

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

    const vertical = dims.vh > dims.vw;
    const wrapperHeight = vertical ? dims.vh * 0.8 : dims.vh;

  return (
    <section
      onWheel={handleWheel}
      style={{ height: wrapperHeight, overflow: "hidden", background: `linear-gradient(120deg, ${PALETTE.blackPurple}, ${PALETTE.purpleDark})` }}
    >
      <div style={{ display: "flex", height: "100%", width: "100%" }}>
        {items.map((it, j) => {
            const w = Math.round(widths[j] || 0);
            const thin = w <= THIN + 1;
            return (
              <div key={it.title} style={{ flex: `0 0 ${w}px`, height: "100%", position: "relative", overflow: "hidden", transition: "none", borderRight: j < renderIndex ? `1px solid rgba(172,172,172,.15)` : "none" }}>
                <Panel item={it} thin={thin} palette={PALETTE} vertical={vertical} />
              </div>
            );
        })}
      </div>
    </section>
  );
}

  function Panel({ item, thin, palette, vertical }) {
    return (
      <div style={{ height: "100%", background: item.bg, display: "grid", placeItems: "center", padding: thin ? 0 : vertical ? "3rem 4vw" : "6rem 8vw", position: "relative" }}>
      {thin && (
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, rgba(115,40,232,.7), rgba(115,40,232,.2))`, opacity: 0.25, pointerEvents: "none" }} />
      )}
      <div style={{ maxWidth: 920, opacity: thin ? 0.0 : 1.0, transition: "opacity .15s linear", color: palette.grayLight, textAlign: "left" }}>
        <h2 style={{ margin: 0, fontWeight: 800, fontSize: "clamp(36px, 7vw, 84px)", letterSpacing: "-0.02em", background:'#F3EDFF', WebkitBackgroundClip: "text", color: "transparent", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{item.title}</h2>
        <p style={{ marginTop: "1.1rem", fontSize: "clamp(16px, 2.1vw, 22px)", lineHeight: 1.45, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{item.desc}</p>
        <a href={item.href} style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: "2rem", border: `2px solid ${palette.purpleBright}`, color: palette.purpleBright, textDecoration: "none", padding: ".9rem 1.2rem", borderRadius: 999 }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: palette.purpleBright, display: "inline-block" }} />
          Conocer más
        </a>
      </div>
      {thin && (
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
            fontSize: "clamp(20px, 8vh, 48px)",
            letterSpacing: "0.1em",
            color: "#fff",
            opacity: 0.75,
            padding: "1rem 0",
            fontFamily: "'argent-pixel-cf', sans-serif",
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
