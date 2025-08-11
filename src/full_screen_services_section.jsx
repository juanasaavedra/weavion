import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HorizontalSnapSections() {
  const sections = [
    {
      title: "Diseño y Desarrollo web",
      blurb:
        "Sitios rápidos, accesibles y listos para convertir. Desde landing pages hasta e-commerce con performance 90+ en Lighthouse.",
      path: "/services/web",
    },
    {
      title: "Integración a CRM o ServiceTitan",
      blurb:
        "Conecta tu web al flujo comercial: leads entran limpios al CRM, disparan tareas, asignan técnicos y cierran más ventas.",
      path: "/services/crm",
    },
    {
      title: "Email Marketing",
      blurb:
        "Automatizaciones que venden: secuencias, carritos abandonados, newsletters y segmentación basada en comportamiento.",
      path: "/contact",
    },
    {
      title: "Analíticas de tu operación",
      blurb:
        "Paneles en tiempo real: costo por lead, tasa de agendamiento, revenue por técnico y ROI de cada canal.",
      path: "/services/analiticas",
    },
    {
      title: "Automatiza tu operación",
      blurb:
        "BOTS y flujos con n8n/Python para cotizaciones, recordatorios, inventario y postventa 24/7.",
      path: "/contact",
    },
  ];

  const palette = {
    purpleDark: "#39166F",
    purpleBright: "#7328E8",
    blackPurple: "#170E26",
    grayLight: "#ACACAC",
    grayDark: "#565758",
  };

  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const snapTo = (i) => {
    const clamped = Math.max(0, Math.min(i, sections.length - 1));
    setIndex(clamped);
    const container = containerRef.current;
    if (container) {
      container.scrollTo({
        left: clamped * container.clientWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const onResize = () => snapTo(index);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [index]);

  useEffect(() => {
    let cooldown = false;
    const container = containerRef.current;

    const wheelHandler = (e) => {
      e.preventDefault();
      if (cooldown) return;
      cooldown = true;
      if (e.deltaY > 0 || e.deltaX > 0) snapTo(index + 1);
      else snapTo(index - 1);
      setTimeout(() => (cooldown = false), 450);
    };

    const keyHandler = (e) => {
      if (["ArrowRight", "PageDown"].includes(e.key)) snapTo(index + 1);
      if (["ArrowLeft", "PageUp"].includes(e.key)) snapTo(index - 1);
    };

    container.addEventListener("wheel", wheelHandler, { passive: false });
    window.addEventListener("keydown", keyHandler);

    return () => {
      container.removeEventListener("wheel", wheelHandler);
      window.removeEventListener("keydown", keyHandler);
    };
  }, [index]);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      <section ref={containerRef} style={{ height: "100%", width: "100%", overflow: "hidden" }}>
        <div style={{ display: "flex", height: "100%", width: `${sections.length * 100}vw` }}>
          {sections.map((s, i) => (
            <article
              key={s.title}
              style={{
                minWidth: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "6rem 8vw",
                background: i % 2 === 0 ? palette.purpleDark : palette.blackPurple,
                color: palette.grayLight,
              }}
            >
              <div style={{ maxWidth: 920 }}>
                <h2
                  style={{
                    fontSize: "clamp(32px, 6vw, 64px)",
                    margin: 0,
                    color: palette.purpleBright,
                  }}
                >
                  {s.title}
                </h2>
                <p
                  style={{
                    marginTop: "1.2rem",
                    fontSize: "clamp(16px, 2.2vw, 22px)",
                    lineHeight: 1.45,
                  }}
                >
                  {s.blurb}
                </p>
                <button
                  onClick={() => s.path && navigate(s.path)}
                  style={{
                    marginTop: "2rem",
                    border: `2px solid ${palette.purpleBright}`,
                    background: "transparent",
                    color: palette.purpleBright,
                    padding: "0.9rem 1.2rem",
                    fontSize: 16,
                    borderRadius: 999,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    transition: "all .2s ease",
                  }}
                >
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: palette.purpleBright,
                      display: "inline-block",
                    }}
                  />
                  Conocer más
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

