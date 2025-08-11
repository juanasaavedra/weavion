import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, MousePointer2, Rocket, Workflow, Gauge } from "lucide-react";

const PALETTE = {
  purpleDark: "#39166F",
  purpleBright: "#7328E8",
  blackPurple: "#170E26",
  grayLight: "#ACACAC",
};

const GradientBg = ({ children }) => (
  <div className="min-h-screen w-full overflow-hidden text-white" style={{
    background: `radial-gradient(60% 80% at 20% 20%, rgba(255,255,255,.06), rgba(0,0,0,0) 60%), linear-gradient(120deg, ${PALETTE.blackPurple}, ${PALETTE.purpleDark})`
  }}>{children}</div>
);

const CTAButton = ({ children }) => (
  <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} className="group inline-flex items-center gap-2 rounded-full border-2 px-5 py-3 text-base" style={{ borderColor: PALETTE.purpleBright, color: PALETTE.grayLight }}>
    <span className="h-2 w-2 rounded-full" style={{ background: PALETTE.purpleBright }} />{children}
    <ArrowRight className="transition-transform group-hover:translate-x-0.5" size={18} />
  </motion.button>
);

function SectionTitle({ children, caption }) {
  return (
    <header className="mb-12 md:mb-16">
      <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="font-extrabold tracking-tight" style={{ fontSize: "clamp(36px,7vw,84px)", letterSpacing: "-0.02em", backgroundImage: `linear-gradient(90deg, ${PALETTE.purpleBright}, #fff)`, WebkitBackgroundClip: "text", color: "transparent" }}>{children}</motion.h1>
      {caption && <p className="max-w-3xl" style={{ color: PALETTE.grayLight }}>{caption}</p>}
    </header>
  );
}

const Card = ({ children }) => (
  <div className="rounded-3xl border bg-white/5 p-6 backdrop-blur-xl" style={{ borderColor: "rgba(115,40,232,.35)", color: PALETTE.grayLight }}>{children}</div>
);

/* Utilidades SVG */
function Donut({ value = 90, size = 120, stroke = 14 }) {
  const r = (size - stroke) / 2; const c = Math.PI * 2 * r; const off = c - (value / 100) * c;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} stroke="rgba(255,255,255,.15)" strokeWidth={stroke} fill="none" />
      <circle cx={size/2} cy={size/2} r={r} stroke={PALETTE.purpleBright} strokeWidth={stroke} fill="none" strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="18" fill="#fff">{value}%</text>
    </svg>
  );
}
function Bars({ data = [], max = 100, height = 130 }) {
  const W = 420; const H = height; const P = 24; const bw = (W - P * 2) / data.length - 12;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H}>
      {data.map((d, i) => { const h = (d.value / max) * (H - P * 2); const x = P + i * (bw + 12); const y = H - P - h; return (
        <g key={i}><rect x={x} y={y} width={bw} height={h} rx={6} fill={PALETTE.purpleBright} opacity={0.85} />
        <text x={x + bw / 2} y={H - 6} textAnchor="middle" fontSize="10" fill={PALETTE.grayLight}>{d.label}</text>
        <text x={x + bw / 2} y={y - 6} textAnchor="middle" fontSize="11" fill="#fff">{d.value}{d.suffix||''}</text></g> ); })}
    </svg>
  );
}

/* ===================================================================
   1) Diseño y Desarrollo Web — Vitals y UX explicados
   =================================================================== */
function DisenoDesarrolloWebExt() {
  return (
    <GradientBg>
      <section className="mx-auto max-w-[1180px] px-6 py-20 md:py-28">
        <SectionTitle caption="Performance 90+, accesibilidad y SEO listos. Microinteracciones que convierten y UI consistente.">Sitios ultra‑rápidos que convierten.</SectionTitle>
        <div className="mt-6"><CTAButton>Quiero mi web <Rocket size={16} /></CTAButton></div>

        {/* Vitals */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[{k:"LCP",v:92,d:"Tiempo de carga percibido"},{k:"INP",v:95,d:"Interacción rápida"},{k:"CLS",v:98,d:"Estabilidad visual"}].map((m,i)=> (
            <Card key={i}>
              <div className="flex items-center gap-4">
                <Donut value={m.v} />
                <div>
                  <div className="text-white text-xl font-semibold">{m.k}</div>
                  <p className="text-sm">{m.d}. <b className="text-white">¿Por qué aquí?</b> Es lo que Google y tus usuarios sienten primero: impacto directo en SEO y ventas.</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* UX & componentes */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Card>
            <div className="mb-2 flex items-center gap-2 text-sm" style={{ color: PALETTE.grayLight }}><Zap size={16}/> Interacciones que guían, no distraen</div>
            <p className="text-sm">Hover states, carga progresiva y foco de teclado. <b className="text-white">¿Qué muestran estas ilustraciones?</b> Elementos que responden al usuario y dan feedback claro (micro‑animaciones y accesibilidad). Evitamos motion innecesario.</p>
          </Card>
          <Card>
            <div className="mb-2 flex items-center gap-2 text-sm" style={{ color: PALETTE.grayLight }}><MousePointer2 size={16}/> Jerarquía tipográfica</div>
            <Bars data={[{label:"H1",value:100},{label:"H2",value:70},{label:"Body",value:40}]} max={100} />
            <p className="mt-2 text-sm">Proporciones reales entre títulos y párrafos para lograr escaneo rápido. <b className="text-white">¿Por qué importa?</b> Mejora comprensión y tasa de scroll.</p>
          </Card>
        </div>
      </section>
    </GradientBg>
  );
}

/* ===================================================================
   2) Integración a CRM o ServiceTitan — Pipeline y SLA
   =================================================================== */
function IntegracionCRMExt() {
  return (
    <GradientBg>
      <section className="mx-auto max-w-[1200px] px-6 py-20 md:py-28">
        <SectionTitle caption="Formularios → leads limpios → tareas automáticas → técnicos asignados → ventas cerradas.">De lead a ingreso, sin fricción.</SectionTitle>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <div className="mb-2 flex items-center gap-2 text-sm" style={{ color: PALETTE.grayLight }}><Workflow size={16}/> Pipeline (etapas)</div>
            <svg viewBox="0 0 560 170" width="100%" height="170">
              {[[70,"Web"],[190,"Lead"],[310,"CRM"],[430,"Tareas"],[520,"$ Venta"]].map(([x,t],i)=> (
                <g key={i}><rect x={x-44} y={60} width="88" height="46" rx="10" fill="rgba(255,255,255,.06)" stroke="rgba(172,172,172,.2)" /><text x={x} y={88} textAnchor="middle" fill="#fff" fontSize="12">{t}</text></g>
              ))}
              {[ [114,83,168,83],[234,83,288,83],[354,83,408,83],[474,83,508,83] ].map(([x1,y1,x2,y2],i)=> <path key={i} d={`M ${x1} ${y1} H ${x2}`} stroke={PALETTE.purpleBright} strokeWidth="3" strokeLinecap="round" />)}
            </svg>
            <p className="mt-2 text-sm">Visualiza cómo viaja un lead sin fricción. <b className="text-white">¿Por qué aquí?</b> Para mostrar el impacto de la integración sobre tiempo de respuesta y consistencia de datos.</p>
          </Card>
          <Card>
            <div className="mb-2 flex items-center gap-2 text-sm" style={{ color: PALETTE.grayLight }}><Gauge size={16}/> Cumplimiento de SLA</div>
            <div className="flex items-center gap-6"><Donut value={88} /><div><div className="text-white font-semibold">Respuesta &lt; 5 min</div><p className="text-sm">Alertas, asignación automática y mensajes pre‑aprobados. <b className="text-white">¿Qué muestra?</b> El porcentaje de leads atendidos a tiempo.</p></div></div>
          </Card>
        </div>
      </section>
    </GradientBg>
  );
}

/* ===================================================================
   3) Analíticas de negocio — KPIs que mueven la aguja
   =================================================================== */
function AnaliticasNegocioExt() {
  const ventas = [{label:"Ene",value:24},{label:"Feb",value:31},{label:"Mar",value:38},{label:"Abr",value:46},{label:"May",value:54},{label:"Jun",value:66}];
  const cpl = [{label:"FB",value:28},{label:"SEM",value:22},{label:"Org",value:12},{label:"Ref",value:16}];
  return (
    <GradientBg>
      <section className="mx-auto max-w-[1200px] px-6 py-20 md:py-28">
        <SectionTitle caption="KPIs en tiempo real: CPL, tasa de agendamiento, revenue por técnico, canales que sí convierten y ROI por campaña.">Decisiones con datos, no con corazonadas.</SectionTitle>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <div className="mb-2 text-sm" style={{ color: PALETTE.grayLight }}>Ventas cerradas por mes</div>
            <Bars data={ventas} max={80} />
            <p className="mt-2 text-sm">Tendencia de ventas en el semestre. <b className="text-white">¿Por qué aquí?</b> Ilustra el ciclo de mejora tras optimizar web y CRM.</p>
          </Card>
          <Card>
            <div className="mb-2 text-sm" style={{ color: PALETTE.grayLight }}>Costo por lead por canal</div>
            <Bars data={cpl} max={40} />
            <p className="mt-2 text-sm">Comparativa de CPL por fuente. <b className="text-white">Uso:</b> redistribuir presupuesto hacia las fuentes con mejor CAC/ROI.</p>
          </Card>
        </div>
      </section>
    </GradientBg>
  );
}

export { IntegracionCRMExt, AnaliticasNegocioExt };
export default DisenoDesarrolloWebExt;

