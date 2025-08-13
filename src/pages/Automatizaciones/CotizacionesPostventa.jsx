import React from "react";
import { motion } from "framer-motion";
import { GradientBg, CTAButton, PALETTE } from "./common";
import ProductInterestSection from "../../components/ProductInterestSection";

export default function CotizacionesPostventa() {
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
            Cotiza en segundos. Mantén al cliente para siempre.
          </motion.h1>
          <p className="max-w-3xl" style={{ color: PALETTE.grayLight }}>
            Configuradores, precios dinámicos, envío de propuestas con un clic y
            postventa automatizada.
          </p>
          <div className="mt-6">
            <CTAButton>Ver configurador</CTAButton>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {["Variantes y combos", "Aprobación por firma digital", "Encuestas post-servicio + NPS"].map((t, i) => (
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

        <div
          className="relative mt-12 rounded-3xl border bg-white/5 p-6 backdrop-blur-xl"
          style={{ borderColor: "rgba(115,40,232,.35)" }}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {["Configuración", "Precio", "Propuesta", "Seguimiento"].map(
              (s, i) => (
                <div
                  key={i}
                  className="rounded-2xl border bg-black/30 p-4 text-center"
                  style={{
                    borderColor: "rgba(172,172,172,.15)",
                    color: "#fff",
                  }}
                >
                  {s}
                </div>
              )
            )}
          </div>
        </div>
      </section>
      <ProductInterestSection />
    </GradientBg>
  );
}

