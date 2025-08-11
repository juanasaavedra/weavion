import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

const PALETTE = {
  purpleDark: "#39166F",
  purpleBright: "#7328E8",
  blackPurple: "#170E26",
  grayLight: "#ACACAC",
  grayDark: "#565758",
};

const GradientBg = ({ children }) => (
  <div className="min-h-screen w-full overflow-hidden bg-[radial-gradient(60%_80%_at_20%_20%,rgba(255,255,255,.06),rgba(0,0,0,0)_60%),linear-gradient(120deg,#170E26,#39166F)] text-white">
    {children}
  </div>
);

const CTAButton = ({ children }) => (
  <motion.button
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.98 }}
    className="group relative inline-flex items-center gap-2 rounded-full border-2 px-5 py-3 text-base"
    style={{ borderColor: PALETTE.purpleBright, color: PALETTE.grayLight }}
  >
    <span className="h-2 w-2 rounded-full" style={{ background: PALETTE.purpleBright }} />
    {children}
    <ArrowRight className="transition-transform group-hover:translate-x-0.5" size={18} />
  </motion.button>
);

export default function HorizontalPinnedSlider() {
  const items = [
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
      title: "Integración a CRM o Service Titan",
      desc: "De lead a ingreso sin fricción: captura limpia, enriquecimiento, tareas automáticas y asignación de técnicos.",
      bg: `radial-gradient(60% 80% at 80% 30%, rgba(255,255,255,.08), rgba(0,0,0,0) 60%), linear-gradient(120deg, #1a1530, ${PALETTE.purpleDark})`,
    },
    {
      title: "Automatiza tu operación",
      blurb:
        "BOTS y flujos con n8n/Python para cotizaciones, recordatorios, inventario y postventa 24/7.",
      path: "/contact",
    },
  ];

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${100 * (items.length - 1)}%`]);

  return (
    <GradientBg>
      <section ref={targetRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div style={{ x }} className="flex h-full">
            {items.map((item) => (
              <div
                key={item.title}
                className="w-screen flex items-center justify-center p-8"
                style={{ background: item.bg }}
              >
                <div className="max-w-xl">
                  <h2 className="text-4xl font-bold" style={{ color: PALETTE.purpleBright }}>
                    {item.title}
                  </h2>
                  <p className="mt-4 text-lg" style={{ color: PALETTE.grayLight }}>
                    {item.desc}
                  </p>
                  <div className="mt-8">
                    <CTAButton>Conocer más</CTAButton>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </GradientBg>
  );
}

