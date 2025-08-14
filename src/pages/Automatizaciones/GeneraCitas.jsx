import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { GradientBg, CTAButton, PALETTE } from "./common";
import ProductInterestSection from "../../components/ProductInterestSection";

export default function GeneraCitas() {
  const { t } = useTranslation();
  const features = t("pages.appointments.features", { returnObjects: true });
  const flowSteps = t("pages.appointments.flow.steps", { returnObjects: true });
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
            {t("pages.appointments.hero.title")}
          </motion.h1>
          <p className="max-w-3xl" style={{ color: PALETTE.grayLight }}>
            {t("pages.appointments.hero.subtitle")}
          </p>
          <div className="mt-6">
            <CTAButton>{t("pages.appointments.hero.cta")}</CTAButton>
          </div>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((c, i) => (
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
              <div className="text-xl font-semibold text-white">{c.title}</div>
              <div className="mt-1 text-sm">{c.desc}</div>
            </motion.div>
          ))}
        </div>

        <div
          className="relative mt-14 rounded-3xl border bg-white/5 p-6 backdrop-blur-xl"
          style={{ borderColor: "rgba(115,40,232,.35)" }}
        >
          <h3 className="mb-3 text-sm" style={{ color: PALETTE.grayLight }}>
            {t("pages.appointments.flow.title")}
          </h3>
          <svg width="100%" height="160" viewBox="0 0 1200 160" className="opacity-90">
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.circle
                key={i}
                cx={120 + i * 260}
                cy={80}
                r="18"
                fill={PALETTE.purpleBright}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              />
            ))}
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.path
                key={i}
                d={`M ${138 + i * 260} 80 H ${240 + i * 260}`}
                stroke={PALETTE.purpleBright}
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: i * 0.15 }}
              />
            ))}
          </svg>
          <div
            className="grid grid-cols-4 gap-4 text-center text-xs"
            style={{ color: PALETTE.grayLight }}
          >
            {flowSteps.map((s, i) => (
              <div key={i}>{s}</div>
            ))}
          </div>
        </div>
      </section>
      <ProductInterestSection />
    </GradientBg>
  );
}

