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
function QuoteTimeBars({ me=2.3, avg=19.1 }) {
  const scale = v => Math.min(280, (v/30)*280);
  return (
    <svg viewBox="0 0 320 110" className="w-full h-28">
      <defs>
        <linearGradient id="vio" x1="0" x2="1">
          <stop offset="0" stopColor="#b692ff" /><stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <text x="12" y="26" fill="#e9e7f7" fontSize="12">Tú con Weavion</text>
      <rect x="12" y="34" width={scale(me)} height="16" rx="8" fill="url(#vio)" />
      <text x={12+scale(me)+6} y="47" fill="#fff" fontSize="12">{me} min</text>

      <text x="12" y="78" fill="#e9e7f7" fontSize="12">Promedio del sector</text>
      <rect x="12" y="86" width={scale(avg)} height="16" rx="8" fill="#5b4c8d" />
      <text x={12+scale(avg)+6} y="99" fill="#c9c4f0" fontSize="12">{avg} min</text>
    </svg>
  );
}

/* Página */
export default function CotizacionesInmediatas() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-10 mt-24 space-y-8">
      {/* HERO */}
      <section className="rounded-2xl p-8 bg-gradient-to-b from-[#151427] to-[#0c0d16] ring-1 ring-white/10">
        <h1 className="text-white font-extrabold text-4xl md:text-6xl leading-tight">
          Cotiza en segundos y gana la <span className="bg-gradient-to-r from-[#b692ff] to-[#7c3aed] bg-clip-text text-transparent">ventana de decisión</span>.
        </h1>
        <p className="mt-3 text-[#e9e7f7] text-lg md:text-xl max-w-[75ch]">
          Plantillas dinámicas, reglas de pricing y anexos automáticos. Envía una propuesta profesional antes que tu competencia y dispara la tasa de aceptación.
        </p>
      </section>

      {/* PRUEBA VISUAL */}
      <section className="grid md:grid-cols-2 gap-4">
        <article className="rounded-2xl p-6 bg-white/[0.06] backdrop-blur-md ring-1 ring-white/10">
          <h3 className="text-white font-bold text-xl mb-1">De la solicitud a la propuesta</h3>
          <p className="text-[#e9e7f7]/90 mb-3">Flujo sin fricciones, con variables de precio y anexos por segmento.</p>
          <QuoteTimeBars me={2.1} avg={18.4} />
        </article>
        <article className="rounded-2xl p-6 bg-white/[0.06] backdrop-blur-md ring-1 ring-white/10">
          <h3 className="text-white font-bold text-xl mb-1">Argumentos que convierten</h3>
          <ul className="text-[#e9e7f7] grid gap-2">
            <li>Plantillas con tu marca y elementos de confianza (testimonios, garantías).</li>
            <li>Reglas de precio por margen/volumen y control de descuentos.</li>
            <li>Entrega por email/SMS/WhatsApp con tracking de apertura.</li>
            <li>Botón de aceptación y pago (o <TermHint term="OC: Orden de compra">OC</TermHint>) en un solo paso.</li>
          </ul>
        </article>
      </section>

      {/* PROCESO */}
      <section className="rounded-2xl p-6 bg-gradient-to-b from-[#171533] to-[#0b0e1a] ring-1 ring-white/10">
        <h3 className="text-white font-bold text-2xl mb-3">Implementación en 6 pasos</h3>
        <ol className="grid md:grid-cols-6 gap-3 text-[#e9e7f7]">
          <li className="bg-white/5 rounded-xl p-3 ring-1 ring-white/10">Modelos de cotización.</li>
          <li className="bg-white/5 rounded-xl p-3 ring-1 ring-white/10">Reglas de pricing.</li>
          <li className="bg-white/5 rounded-xl p-3 ring-1 ring-white/10">Disparadores de envío.</li>
          <li className="bg-white/5 rounded-xl p-3 ring-1 ring-white/10">Integración con pagos.</li>
          <li className="bg-white/5 rounded-xl p-3 ring-1 ring-white/10">Tracking y alertas.</li>
          <li className="bg-white/5 rounded-xl p-3 ring-1 ring-white/10">KPIs y mejoras.</li>
        </ol>
      </section>

      <ProductInterestSection />
    </main>
  );
}

