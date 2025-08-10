import { motion } from "framer-motion";
import { Gauge } from "lucide-react";
import { GradientBg, CTAButton, PALETTE } from "./ServiceCommon";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

export default function AnaliticasNegocio() {
  const data = [
    { m: "Ene", leads: 120, ventas: 24 },
    { m: "Feb", leads: 180, ventas: 31 },
    { m: "Mar", leads: 210, ventas: 38 },
    { m: "Abr", leads: 260, ventas: 46 },
    { m: "May", leads: 310, ventas: 54 },
    { m: "Jun", leads: 370, ventas: 66 },
  ];

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
            Decisiones con datos, no con corazonadas.
          </motion.h1>
          <p className="max-w-3xl" style={{ color: PALETTE.grayLight }}>
            KPI en tiempo real: CPL, tasa de agendamiento, revenue por técnico, fuentes que sí convierten y ROI por canal.
          </p>
          <div className="mt-6"><CTAButton>Ver demo <Gauge size={16} /></CTAButton></div>
        </header>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Mini dashboard */}
          <div className="rounded-2xl border bg-white/5 p-6 backdrop-blur-xl lg:col-span-3" style={{ borderColor: "rgba(115,40,232,.35)" }}>
            <h3 className="mb-2 text-sm" style={{ color: PALETTE.grayLight }}>Leads vs Ventas</h3>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={PALETTE.purpleBright} stopOpacity={0.7} />
                      <stop offset="95%" stopColor={PALETTE.purpleBright} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
                  <XAxis dataKey="m" stroke={PALETTE.grayLight} tickLine={false} axisLine={false} />
                  <YAxis stroke={PALETTE.grayLight} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "#111", border: `1px solid ${PALETTE.purpleBright}`, color: "#fff" }} />
                  <Area type="monotone" dataKey="leads" stroke={PALETTE.purpleBright} fill="url(#g1)" />
                  <Line type="monotone" dataKey="ventas" stroke="#ffffff" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid gap-6 lg:col-span-2">
            {[{ k: "+42%", d: "Mejora de conversión con web rápida" }, { k: "-35%", d: "CPL al optimizar fuentes" }, { k: "+1.8x", d: "Revenue por técnico con ruteo" }].map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border bg-white/5 p-6 backdrop-blur-xl"
                style={{ borderColor: "rgba(115,40,232,.35)", color: "#fff" }}
              >
                <div className="text-3xl font-extrabold" style={{ color: PALETTE.purpleBright }}>{c.k}</div>
                <div className="mt-1 text-sm" style={{ color: PALETTE.grayLight }}>{c.d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </GradientBg>
  );
}

