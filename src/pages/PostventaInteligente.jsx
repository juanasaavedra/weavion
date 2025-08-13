import React from 'react';
import ProductInterestSection from '../components/ProductInterestSection';

/* Helpers */
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
function SmileGauge({ score=82, label="CSAT" }) {
  const pct = Math.max(0, Math.min(100, score)) / 100;
  const r=50, len=Math.PI*r; const dash=len*pct;
  return (
    <svg viewBox="0 0 140 90" className="w-full h-28">
      <defs>
        <linearGradient id="vio" x1="0" x2="1">
          <stop offset="0" stopColor="#b692ff" /><stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <path d="M14,70 A50,50 0 0,1 126,70" fill="none" stroke="#2a2244" strokeWidth="10" />
      <path d="M14,70 A50,50 0 0,1 126,70" fill="none" stroke="url(#vio)" strokeWidth="10" strokeLinecap="round"
            strokeDasharray={`${dash} ${len}`} />
      <text x="70" y="58" textAnchor="middle" fontSize="12" fill="#e9e7f7">{label}</text>
      <text x="70" y="76" textAnchor="middle" fontSize="16" fontWeight="800" fill="#fff">{score}</text>
    </svg>
  );
}
function LinearRetention({ months=['M1','M2','M3','M4','M5','M6'], pct=[100,92,89,87,85,84] }) {
  const maxW = 300;
  return (
    <svg viewBox="0 0 340 120" className="w-full h-28">
      <defs>
        <linearGradient id="vio2" x1="0" x2="1">
          <stop offset="0" stopColor="#7c3aed" /><stop offset="1" stopColor="#b692ff" />
        </linearGradient>
      </defs>
      {pct.map((v,i)=>{
        const w=(v/100)*maxW;
        return (
          <g key={i} transform={`translate(12 ${18 + i*16})`}>
            <text x="0" y="10" fontSize="10" fill="#c9c4f0">{months[i]}</text>
            <rect x="28" y="2" width={maxW} height="10" rx="5" fill="#2a2244"/>
            <rect x="28" y="2" width={w} height="10" rx="5" fill="url(#vio2)"/>
            <text x="332" y="10" fontSize="10" fill="#e9e7f7" textAnchor="end">{v}%</text>
          </g>
        );
      })}
    </svg>
  );
}

/* Página */
export default function PostventaInteligente() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-10 mt-24 space-y-8">
      {/* HERO */}
      <section className="rounded-2xl p-8 bg-gradient-to-b from-[#151427] to-[#0c0d16] ring-1 ring-white/10">
        <h1 className="text-white font-extrabold text-4xl md:text-6xl leading-tight">
          Postventa que convierte <span className="bg-gradient-to-r from-[#b692ff] to-[#7c3aed] bg-clip-text text-transparent">clientes de por vida</span>.
        </h1>
        <p className="mt-3 text-[#e9e7f7] text-lg md:text-xl max-w-[75ch]">
          Seguimiento automático, encuestas y tickets proactivos. Aumenta tu{" "}
          <TermHint term="LTV: valor de vida del cliente en toda su relación con tu marca">LTV</TermHint> mientras reduces el churn con experiencias memorables después de la compra.
        </p>
      </section>

      {/* KPIs */}
      <section className="grid md:grid-cols-3 gap-4">
        <article className="rounded-2xl p-6 bg-white/[0.06] backdrop-blur-md ring-1 ring-white/10">
          <h3 className="text-white font-bold text-xl mb-1">Satisfacción</h3>
          <p className="text-[#e9e7f7]/90 mb-3">Encuestas automáticas por canal (CSAT/NPS).</p>
          <SmileGauge score={84} label="CSAT" />
        </article>
        <article className="rounded-2xl p-6 bg-white/[0.06] backdrop-blur-md ring-1 ring-white/10 md:col-span-2">
          <h3 className="text-white font-bold text-xl mb-1">Retención a 6 meses</h3>
          <p className="text-[#e9e7f7]/90 mb-3">Flujos de renovación y programas de mantenimiento.</p>
          <LinearRetention />
        </article>
      </section>

      {/* QUÉ SE AUTOMATIZA */}
      <section className="rounded-2xl p-6 bg-white/[0.06] backdrop-blur-md ring-1 ring-white/10">
        <h3 className="text-white font-bold text-2xl mb-3">Qué se automatiza</h3>
        <ul className="grid md:grid-cols-2 gap-3 text-[#e9e7f7]">
          <li className="bg-white/5 rounded-xl p-3 ring-1 ring-white/10">Recordatorios de mantenimiento y renovaciones.</li>
          <li className="bg-white/5 rounded-xl p-3 ring-1 ring-white/10">Encuestas post-servicio y creación automática de tickets si hay alerta.</li>
          <li className="bg-white/5 rounded-xl p-3 ring-1 ring-white/10">Upsells relevantes por historial y comportamiento.</li>
          <li className="bg-white/5 rounded-xl p-3 ring-1 ring-white/10">Reportes ejecutivos semanales para accionar rápido.</li>
        </ul>
      </section>

      {/* PROCESO */}
      <section className="rounded-2xl p-6 bg-gradient-to-b from-[#171533] to-[#0b0e1a] ring-1 ring-white/10">
        <h3 className="text-white font-bold text-2xl mb-3">Despliegue en 5 pasos</h3>
        <ol className="grid md:grid-cols-5 gap-3 text-[#e9e7f7]">
          <li className="bg-white/5 rounded-xl p-3 ring-1 ring-white/10">Mapa de puntos de contacto.</li>
          <li className="bg-white/5 rounded-xl p-3 ring-1 ring-white/10">Diseño de flujos y plantillas.</li>
          <li className="bg-white/5 rounded-xl p-3 ring-1 ring-white/10">Integraciones con CRM y canales.</li>
          <li className="bg-white/5 rounded-xl p-3 ring-1 ring-white/10">Pruebas end-to-end.</li>
          <li className="bg-white/5 rounded-xl p-3 ring-1 ring-white/10">KPIs y optimización.</li>
        </ol>
      </section>

      <ProductInterestSection />
    </main>
  );
}

