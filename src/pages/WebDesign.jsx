import React from 'react';
import { motion } from 'framer-motion';
import ProductInterestSection from '../components/ProductInterestSection';
import TermHint from '../components/TermHint';

/* ---------- Gráficos SVG ---------- */
function TrendBars({ labels, values, note }) {
  const max = Math.max(...values, 1);
  return (
    <div className="chart">
      <svg viewBox="0 0 340 180">
        <defs>
          <linearGradient id="gradBars" x1="0" x2="1">
            <stop offset="0%" stopColor="#b692ff"/>
            <stop offset="100%" stopColor="#7c3aed"/>
          </linearGradient>
        </defs>
        {values.map((v, i) => {
          const w=28, gap=18, x=30+i*(w+gap);
          const h = (v/max)*110 + 10;
          const y = 150 - h;
          return (
            <g key={i}>
              <rect x={x} y={y} width={w} height={h} rx="8" fill="url(#gradBars)"/>
              <text x={x+w/2} y={y-6} textAnchor="middle" fontSize="10" fill="#e9e9ff">{v}</text>
              <text x={x+w/2} y="168" textAnchor="middle" fontSize="10" fill="#bdb8d8">{labels[i]}</text>
            </g>
          );
        })}
      </svg>
      {note ? <p className="chart-note">{note}</p> : null}
    </div>
  );
}

function KPIGrid({ items }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((it, idx)=>(
        <div key={idx} className="kpi glass">
          <p className="kpi-v">{it.value}</p>
          <p className="kpi-l">{it.label}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------- Página ---------- */
export default function WebDesign() {
  return (
    <div className="page-wrap metal-bg-1 text-white">
      {/* Hero */}
      <header className="hero">
        <h1 className="headline-xl">Sitios web que convierten visitas en ventas</h1>
        <p className="sublead">
          Rendimiento real, <TermHint term="SEO">Optimización para buscadores: estructura, contenido y performance que elevan ranking y tráfico orgánico.</TermHint> técnico y UX enfocada en acción. Tu marca luce premium
          y cada pantalla empuja a “comprar”, “agendar” o “pedir cotización”.
        </p>
      </header>

      {/* KPIs de promesa comercial */}
      <section className="section">
        <KPIGrid items={[
          { value:'+38%', label:'Tasa de conversión' },
          { value:'-42%', label:'Rebote en landing' },
          { value:'+2.3x', label:'Velocidad percibida' },
          { value:'+61%', label:'Ingresos por sesión' },
        ]}/>
      </section>

      {/* Tendencia de ventas (muestra impacto de performance + UX) */}
      <section className="section grid md:grid-cols-2 gap-6">
        <motion.article initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="glass p-6 rounded-2xl">
          <h3 className="card-title">Ventas cerradas por mes</h3>
          <p className="card-copy">
            La velocidad y claridad reducen fricción. Más usuarios completan el flujo de compra.
          </p>
          <TrendBars
            labels={['Ene','Feb','Mar','Abr','May','Jun']}
            values={[24,31,38,46,54,66]}
            note="Tendencia sostenida tras optimizar tiempos de carga y jerarquía visual."
          />
        </motion.article>

        <motion.article initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="glass p-6 rounded-2xl">
          <h3 className="card-title">Qué entregamos</h3>
          <ul className="list-bullets">
            <li>Arquitectura <TermHint term="SEO">Mapa de URLs, metadatos, schema y rápidos tiempos TTFB/CLS/INP para mejor posicionamiento.</TermHint> + contenido que posiciona y vende.</li>
            <li>Checkout fluido e integraciones de pago.</li>
            <li>Diseño adaptable con micro-interacciones que guían.</li>
            <li>Métricas de conversión para iterar cada mes.</li>
          </ul>
        </motion.article>
      </section>
      <ProductInterestSection />
    </div>
  );
}
