import { motion } from "framer-motion";
import { Workflow } from "lucide-react";
import { GradientBg, CTAButton, PALETTE } from "./ServiceCommon";

export default function IntegracionCRM() {
  return (
    <GradientBg>
      <section className="mx-auto max-w-[1200px] px-6 py-20 md:py-28">
        <header className="mb-12 md:mb-16">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-extrabold tracking-tight"
            style={{
              fontSize: "clamp(36px,7vw,84px)",
              letterSpacing: "-0.02em",
              backgroundImage: `linear-gradient(90deg, ${PALETTE.purpleBright}, #fff)`,
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            De lead a ingreso, sin fricción.
          </motion.h1>
          <p className="max-w-3xl" style={{ color: PALETTE.grayLight }}>
            Conectamos tu web con ServiceTitan/CRM: formularios → leads limpios → tareas automáticas → técnicos asignados → ventas cerradas.
          </p>
          <div className="mt-6"><CTAButton>Integrar ahora <Workflow size={16} /></CTAButton></div>
        </header>

        {/* Pipeline animado */}
        <div className="relative grid grid-cols-1 items-center gap-6 md:grid-cols-5">
          {[
            { name: "Web", sub: "Captura", color: "#6f3bd6" },
            { name: "Lead", sub: "Validado", color: "#5b2cc0" },
            { name: "CRM", sub: "Enriquecido", color: "#4a24a5" },
            { name: "Auto", sub: "Tareas", color: "#391c86" },
            { name: "$", sub: "Cerrado", color: "#7328E8" },
          ].map((n, i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: i * 0.08 }}
              className="relative rounded-2xl p-[2px]"
            >
              <div className="absolute inset-0 rounded-2xl opacity-70 blur-[8px]" style={{ background: `linear-gradient(135deg, ${n.color}, transparent 60%)` }} />
              <div className="relative rounded-2xl bg-white/5 p-6 text-center backdrop-blur-xl" style={{ border: `1px solid rgba(172,172,172,.15)` }}>
                <h3 className="text-lg font-bold" style={{ color: "#fff" }}>{n.name}</h3>
                <p className="text-sm" style={{ color: PALETTE.grayLight }}>{n.sub}</p>
              </div>
            </motion.div>
          ))}

          {/* Conectores */}
          <svg className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block" width="980" height="160" viewBox="0 0 980 160" fill="none">
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.path
                key={i}
                d={`M ${120 + i * 190} 80 C ${160 + i * 190} 20, ${220 + i * 190} 140, ${270 + i * 190} 80`}
                stroke={PALETTE.purpleBright}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: i * 0.15 }}
                strokeLinecap="round"
              />
            ))}
          </svg>
        </div>

        {/* Beneficios */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            "Asignación automática de técnicos",
            "Seguimiento por etapa y SLA",
            "Cálculo de costo por trabajo en tiempo real",
          ].map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border bg-white/5 p-6 backdrop-blur-xl"
              style={{ borderColor: "rgba(115,40,232,.35)", color: PALETTE.grayLight }}
            >
              {b}
            </motion.div>
          ))}
        </div>
      </section>
    </GradientBg>
  );
}

