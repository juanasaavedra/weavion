import React from "react";
import ProductInterestSection from "../components/ProductInterestSection";

/* Tooltip */
function TermHint({ term, children }) {
  return (
    <span className="relative group cursor-help">
      <span className="underline decoration-[#b692ff]/80 underline-offset-2">{children}</span>
      <span className="pointer-events-none absolute left-1/2 top-full z-30 mt-2 hidden -translate-x-1/2 whitespace-nowrap rounded-xl bg-[#0f0f16]/95 px-3 py-2 text-[12px] text-white shadow-lg ring-1 ring-white/10 backdrop-blur-md group-hover:block">
        {term}
      </span>
    </span>
  );
}

/* ---------- Gráficos SVG incrustados ---------- */

/* 1) Línea: Tendencia de Ingresos */
function RevenueLine({ months = ['E','F','M','A','M','J','J','A'], data = [24,28,32,35,40,46,48,53] }) {
  const W = 560, H = 220, left = 36, bottom = 30, top = 26, chartH = H - top - bottom;
  const max = Math.max(...data), step = (W - left - 20) / (months.length - 1);
  const y = v => top + chartH - (v / max) * chartH;
  const path = data.map((v, i) => `${i ? 'L' : 'M'} ${left + i * step} ${y(v)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-56">
      <defs>
        <linearGradient id="vio" x1="0" x2="1"><stop offset="0" stopColor="#b692ff"/><stop offset="1" stopColor="#7c3aed"/></linearGradient>
      </defs>
      <path d={path} fill="none" stroke="url(#vio)" strokeWidth="3.2" strokeLinecap="round"/>
      {months.map((m,i)=>(
        <text key={m} x={left + i*step} y={H-8} fontSize="11" fill="#c9c4f0" textAnchor="middle">{m}</text>
      ))}
    </svg>
  );
}

/* 2) Barras apiladas: Ingresos por canal (Nuevos vs Recurrentes) */
function ChannelBars({ labels=['SEO','Paid','Social','Ref'], data=[[12,8],[18,7],[9,6],[14,5]] }) {
  const max = Math.max(...data.map(d => d[0] + d[1]));
  return (
    <svg viewBox="0 0 560 190" className="w-full h-48">
      <defs>
        <linearGradient id="gNew" x1="0" x2="1"><stop offset="0" stopColor="#7c3aed"/><stop offset="1" stopColor="#b692ff"/></linearGradient>
        <linearGradient id="gRec" x1="0" x2="1"><stop offset="0" stopColor="#ffffff"/><stop offset="1" stopColor="#c9c4f0"/></linearGradient>
      </defs>
      {labels.map((l,i)=>{
        const total = data[i][0] + data[i][1];
        const w = (total / max) * 400 + 20;
        const w1 = (data[i][0] / total) * w;
        const x = 120;
        const y = 30 + i * 34;
        return (
          <g key={l}>
            <text x="16" y={y+10} fontSize="12" fill="#e9e7f7">{l}</text>
            <rect x={x} y={y} width={w1} height="16" rx="8" fill="url(#gNew)"/>
            <rect x={x+w1} y={y} width={w-w1} height="16" rx="8" fill="url(#gRec)" opacity=".65"/>
            <text x={x+w+8} y={y+12} fontSize="11" fill="#c9c4f0">{total}K</text>
          </g>
        );
      })}
      <text x="120" y="18" fontSize="11" fill="#cfc9ee">Nuevos</text>
      <rect x="160" y="10" width="22" height="10" rx="5" fill="url(#gNew)"/>
      <text x="198" y="18" fontSize="11" fill="#cfc9ee">Recurrentes</text>
      <rect x="260" y="10" width="22" height="10" rx="5" fill="url(#gRec)" opacity=".65"/>
    </svg>
  );
}

/* 3) Heatmap de Cohortes (retención por mes) */
function CohortHeatmap({ rows = 4, cols = 6 }) {
  const val = (r,c)=> Math.round(100 - r*8 - c*4); // demo visual
  return (
    <svg viewBox="0 0 560 190" className="w-full h-48">
      <defs>
        <linearGradient id="cell" x1="0" x2="1"><stop offset="0" stopColor="#b692ff"/><stop offset="1" stopColor="#7c3aed"/></linearGradient>
      </defs>
      {[...Array(rows)].map((_,r)=>(
        [...Array(cols)].map((_,c)=>{
          const v = Math.max(50, val(r,c));
          const x = 22 + c*86;
          const y = 34 + r*34;
          return (
            <g key={`${r}-${c}`}>
              <rect x={x} y={y} width="70" height="22" rx="8" fill="url(#cell)" opacity={(v-50)/60}/>
              <text x={x+35} y={y+15} textAnchor="middle" fontSize="11" fill="#fff">{v}%</text>
            </g>
          );
        })
      ))}
      <text x="22" y="22" fontSize="11" fill="#cfc9ee">Retención por cohorte (mes)</text>
    </svg>
  );
}

export default function AnaliticasNegocio() {
  return (
    <main className="max-w-[1200px] mx-auto px-4 py-10 mt-24 space-y-8 bg-gradient-to-b from-[#0b0b12] to-[#0e0d16] text-white">
      {/* HERO */}
      <section className="rounded-2xl p-8 bg-gradient-to-b from-white/10 to-white/5 ring-1 ring-white/10 backdrop-blur-md shadow-[inset_0_0_0_1px_rgba(182,146,255,.22),0_10px_28px_rgba(108,72,237,.18)]">
        <h1 className="font-black text-4xl md:text-6xl leading-tight">
          Analíticas que <span className="bg-gradient-to-r from-[#b692ff] to-[#7c3aed] bg-clip-text text-transparent">aclaran dónde ganar</span>.
        </h1>
        <p className="text-[#e9e7f7]/95 mt-4 text-lg md:text-xl max-w-[82ch]">
          Unificamos datos de marketing, ventas y operación para mostrar qué canal trae mejor <TermHint term="Retorno sobre la inversión publicitaria">ROAS</TermHint>,
          cuánto cuesta adquirir un cliente (<TermHint term="CAC: inversión en marketing/ventas entre nuevos clientes">CAC</TermHint>) y
          cuánto valor deja en el tiempo (<TermHint term="LTV: valor de vida del cliente">LTV</TermHint>). Decisiones rápidas, sin hojas de cálculo eternas.
        </p>
      </section>

      {/* KPIs + Tendencia */}
      <section className="grid lg:grid-cols-3 gap-4">
        {[
          ['Ingreso mensual', '$ 128M', '+12%'],
          ['CAC', '$ 58.000', '−9%'],
          ['LTV', '$ 1.24M', '+7%'],
        ].map(([label, val, delta])=>(
          <article key={label} className="rounded-2xl p-6 bg-[#0e0d16]/70 ring-1 ring-white/10">
            <p className="text-[#c9c4f0] text-sm">{label}</p>
            <p className="text-white text-2xl font-extrabold mt-1">{val}</p>
            <p className="text-[#b692ff] text-sm mt-1">{delta} vs mes anterior</p>
          </article>
        ))}
        <article className="lg:col-span-3 rounded-2xl p-6 bg-[#0e0d16]/70 ring-1 ring-white/10">
          <h3 className="font-bold text-xl mb-1">Tendencia de ingresos</h3>
          <p className="text-[#e9e7f7]/90 text-sm mb-3">Crecimiento consistente, con estacionalidad controlada.</p>
          <RevenueLine />
        </article>
      </section>

      {/* Canales y Cohortes */}
      <section className="grid lg:grid-cols-2 gap-4">
        <article className="rounded-2xl p-6 bg-gradient-to-b from-white/10 to-white/5 ring-1 ring-white/10">
          <h3 className="font-bold text-xl mb-1">Ingresos por canal</h3>
          <p className="text-[#e9e7f7]/90 text-sm mb-2">
            Mezcla saludable entre adquisición y recompra. Compara <TermHint term="Atribución: método para asignar valor de ingresos a canales/campañas">atribución</TermHint> por modelo sin dolores de cabeza.
          </p>
          <ChannelBars />
        </article>
        <article className="rounded-2xl p-6 bg-gradient-to-b from-white/10 to-white/5 ring-1 ring-white/10">
          <h3 className="font-bold text-xl mb-1">Cohortes: ¿quién vuelve?</h3>
          <p className="text-[#e9e7f7]/90 text-sm mb-2">
            Retención por cohorte para detectar productos y campañas que fidelizan.
          </p>
          <CohortHeatmap />
        </article>
      </section>

      {/* ENTREGABLES */}
      <section className="rounded-2xl p-6 bg-[#0e0d16]/70 ring-1 ring-white/10">
        <h3 className="font-extrabold text-2xl mb-3">Qué entregamos</h3>
        <ul className="text-[#e9e7f7] grid lg:grid-cols-2 gap-3 list-disc list-inside">
          <li>Tableros en tiempo real (ingresos, CAC, LTV, ROAS, recurrencia).</li>
          <li><TermHint term="ETL: extracción, transformación y carga de datos entre sistemas">Pipelines ETL</TermHint> conectados a tus fuentes.</li>
          <li>Alertas (caída de conversión, picos de CAC, baja de retención).</li>
          <li>Playbook de decisiones para priorizar inversión y esfuerzos.</li>
        </ul>
        </section>
        <ProductInterestSection />
      </main>
    );
  }

