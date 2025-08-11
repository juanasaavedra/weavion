import { motion, useMotionValue, useTransform } from "framer-motion";
import { Zap, MousePointer2, Rocket } from "lucide-react";
import { GradientBg, CTAButton, PALETTE } from "./ServiceCommon";

export default function DisenoDesarrolloWeb() {
  return (
    <GradientBg>
      <section className="mx-auto max-w-[1180px] px-6 py-20 md:py-28">
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
            Sitios ultra-rápidos que convierten.
          </motion.h1>
          <p className="max-w-2xl text-balance" style={{ color: PALETTE.grayLight }}>
            Performance 90+ en Lighthouse, accesibles, SEO-ready y con microinteracciones que elevan tu marca.
          </p>
          <div className="mt-6"><CTAButton>Quiero mi web <Rocket size={16} /></CTAButton></div>
        </header>

        {/* Cards con tilt 3D */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Rendimiento", desc: "Hydration mínima, imágenes optimizadas, CDN y edge caching.", Icon: Zap },
            { title: "UX que vende", desc: "Animaciones sutiles, jerarquía tipográfica y pruebas A/B.", Icon: MousePointer2 },
            { title: "E-commerce listo", desc: "Carritos, checkouts y analítica de conversión integrada.", Icon: Rocket },
          ].map((f, i) => (
            <TiltCard key={i}>
              <f.Icon className="mb-3 opacity-90" />
              <h3 className="text-xl font-semibold" style={{ color: "#fff" }}>{f.title}</h3>
              <p className="mt-1 text-sm" style={{ color: PALETTE.grayLight }}>{f.desc}</p>
            </TiltCard>
          ))}
        </div>

        {/* Marquee de tecnologías */}
        <div className="relative mt-14 overflow-hidden rounded-2xl border bg-white/5 p-4 backdrop-blur" style={{ borderColor: "rgba(115,40,232,.35)" }}>
          <div className="animate-marquee whitespace-nowrap text-sm tracking-wider opacity-80" style={{ color: PALETTE.grayLight }}>
            Next.js • React • Astro • Tailwind • Cloudflare • Vercel • Shopify • Stripe • n8n • Postgres • Supabase • ServiceTitan API • GA4 • Segment • BigQuery • Recharts • Clerk • Auth.js • SEO • Web Vitals •
          </div>
        </div>
      </section>
    </GradientBg>
  );
}

function TiltCard({ children }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [0, 1], [8, -8]);
  const rotateY = useTransform(x, [0, 1], [-8, 8]);

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(px);
    y.set(py);
  };

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={() => { x.set(0.5); y.set(0.5); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative rounded-3xl p-[2px]"
    >
      <div className="absolute inset-0 rounded-3xl opacity-70 blur-[6px] transition-opacity group-hover:opacity-100" style={{ background: `linear-gradient(135deg, ${PALETTE.purpleBright}, transparent 60%)` }} />
      <div className="relative rounded-3xl bg-white/5 p-6 backdrop-blur-xl" style={{ border: `1px solid rgba(172,172,172,.15)` }}>
        {children}
      </div>
    </motion.div>
  );
}

