import React from "react";
import { motion } from "framer-motion";
import { GradientBg, CTAButton, PALETTE } from "./common";

export default function CapturaCalificaLeads() {
  const scores = [65, 72, 82, 91, 77, 88];
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
            Leads que valen la pena.
          </motion.h1>
          <p className="max-w-3xl" style={{ color: PALETTE.grayLight }}>
            Enriquecimiento, deduplicación, filtros anti-spam y un score de
            intención para priorizar al equipo.
          </p>
          <div className="mt-6">
            <CTAButton>Empezar a calificar</CTAButton>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {["Enriquecimiento automático", "Score por comportamiento", "Ruteo según SLA"].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl border bg-white/5 p-6 backdrop-blur-xl"
              style={{
                borderColor: "rgba(115,40,232,.35)",
                color: PALETTE.grayLight,
              }}
            >
              <div className="text-white">{t}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {scores.map((s, i) => (
            <div
              key={i}
              className="rounded-xl border bg-white/5 p-4"
              style={{ borderColor: "rgba(115,40,232,.25)" }}
            >
              <div className="mb-1 text-xs" style={{ color: PALETTE.grayLight }}>
                Lead #{i + 1}
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-black/40">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="h-full"
                  style={{ background: PALETTE.purpleBright }}
                />
              </div>
              <div className="mt-1 text-sm text-white">Score {s}%</div>
            </div>
          ))}
        </div>
      </section>
    </GradientBg>
  );
}

