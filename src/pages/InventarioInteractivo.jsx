import React from 'react';
import ProductInterestSection from '../components/ProductInterestSection';

/* Helpers locales */
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
function InventoryChatSVG() {
  return (
    <svg viewBox="0 0 360 160" className="w-full h-40">
      <defs>
        <linearGradient id="vio" x1="0" x2="1">
          <stop offset="0" stopColor="#b692ff" /><stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <rect x="12" y="16" width="336" height="90" rx="14" fill="none" stroke="url(#vio)" strokeWidth="2.5"/>
      <rect x="24" y="30" width="90" height="18" rx="9" fill="#b692ff" opacity=".28"/>
      <rect x="120" y="30" width="140" height="18" rx="9" fill="#b692ff" opacity=".18"/>
      <rect x="24" y="56" width="200" height="16" rx="8" fill="#b692ff" opacity=".22"/>
      <g transform="translate(290 95)">
        <circle r="14" fill="none" stroke="url(#vio)" strokeWidth="2.5"/>
        <circle r="3" fill="#fff"/>
        <path d="M0-10v4M0 10v-4M-10 0h4M10 0h-4M-7-7l2 2M7 7l-2-2M-7 7l2-2M7-7l-2 2" stroke="#a98cff" strokeWidth="1.8" strokeLinecap="round"/>
      </g>
    </svg>
  );
}
function TurnoverBars({ months=['Ene','Feb','Mar','Abr','May','Jun'], data=[3.1,3.4,3.8,4.2,4.4,4.7] }) {
  const max = Math.max(...data);
  return (
    <svg viewBox="0 0 320 140" className="w-full h-32">
      <defs>
        <linearGradient id="vio2" x1="0" x2="1">
          <stop offset="0" stopColor="#7c3aed" /><stop offset="1" stopColor="#b692ff" />
        </linearGradient>
      </defs>
      {data.map((v,i)=>{
        const h=(v/max)*96 + 6;
        return (
          <g key={i} transform={`translate(${22 + i*44} 18)`}>
            <rect x="0" y={110-h} width="26" height={h} rx="10" fill="url(#vio2)" />
            <text x="13" y="126" textAnchor="middle" fontSize="10" fill="#c9c4f0">{months[i]}</text>
          </g>
        );
      })}
    </svg>
  );
}
function AccuracyLinear({ pct=98 }) {
  const w = Math.max(0, Math.min(100, pct));
  return (
    <svg viewBox="0 0 340 40" className="w-full h-10">
      <defs>
        <linearGradient id="vio3" x1="0" x2="1">
          <stop offset="0" stopColor="#b692ff" /><stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <rect x="10" y="12" width="320" height="12" rx="6" fill="#2a2244"/>
      <rect x="10" y="12" width={(w/100)*320} height="12" rx="6" fill="url(#vio3)"/>
      <text x="330" y="30" textAnchor="end" fill="#fff" fontSize="12" fontWeight="700">{w}%</text>
    </svg>
  );
}

/* Página */
export default function InventarioInteractivo() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-10 mt-24 space-y-8">
      {/* HERO */}
      <section className="rounded-2xl p-8 bg-gradient-to-b from-[#151427] to-[#0c0d16] ring-1 ring-white/10">
        <h1 className="text-white font-extrabold text-4xl md:text-6xl leading-tight">
          Tu inventario responde <span className="bg-gradient-to-r from-[#b692ff] to-[#7c3aed] bg-clip-text text-transparent">en tiempo real</span>.
        </h1>
        <p className="mt-3 text-[#e9e7f7] text-lg md:text-xl max-w-[75ch]">
          Consulta stock, costos y tiempos en segundos. Cambia precios o disponibilidad desde un chat interno; se refleja al instante en la web y en tu <TermHint term="CRM: sistema donde viven contactos, oportunidades y ventas">CRM</TermHint>.
        </p>
      </section>

      {/* VISUAL + KPIs */}
      <section className="grid md:grid-cols-2 gap-4">
        <article className="rounded-2xl p-6 bg-white/[0.06] backdrop-blur-md ring-1 ring-white/10">
          <h3 className="text-white font-bold text-xl mb-1">Chat con acciones</h3>
          <p className="text-[#e9e7f7]/90 mb-3">Consulta, edita y confirma cambios con trazabilidad por usuario.</p>
          <InventoryChatSVG />
        </article>
        <article className="rounded-2xl p-6 bg-white/[0.06] backdrop-blur-md ring-1 ring-white/10">
          <h3 className="text-white font-bold text-xl mb-1">Exactitud y rotación</h3>
          <p className="text-[#e9e7f7]/90 mb-2">Objetivo: exactitud &gt; 97% y rotación creciente sin quiebres.</p>
          <AccuracyLinear pct={98} />
          <div className="mt-3">
            <TurnoverBars />
          </div>
        </article>
      </section>

      {/* BENEFICIOS */}
      <section className="rounded-2xl p-6 bg-white/[0.06] backdrop-blur-md ring-1 ring-white/10">
        <h3 className="text-white font-bold text-2xl mb-3">Beneficios operativos</h3>
        <ul className="grid md:grid-cols-2 gap-3 text-[#e9e7f7]">
          <li className="bg-white/5 rounded-xl p-3 ring-1 ring-white/10">Edición masiva de precios, stock y lotes con aprobación.</li>
          <li className="bg-white/5 rounded-xl p-3 ring-1 ring-white/10">Sincronización automática con web y marketplace.</li>
          <li className="bg-white/5 rounded-xl p-3 ring-1 ring-white/10">Alertas por <TermHint term="Stockout: quedarte sin inventario vendible">stockout</TermHint> y sobre-inventario.</li>
          <li className="bg-white/5 rounded-xl p-3 ring-1 ring-white/10">Historial y bitácora por usuario (auditoría simple).</li>
        </ul>
      </section>

      {/* PROCESO */}
      <section className="rounded-2xl p-6 bg-gradient-to-b from-[#171533] to-[#0b0e1a] ring-1 ring-white/10">
        <h3 className="text-white font-bold text-2xl mb-3">Implementación guiada</h3>
        <ol className="grid md:grid-cols-5 gap-3 text-[#e9e7f7]">
          <li className="bg-white/5 rounded-xl p-3 ring-1 ring-white/10">Mapeo de SKUs y fuentes.</li>
          <li className="bg-white/5 rounded-xl p-3 ring-1 ring-white/10">Reglas de sincronización.</li>
          <li className="bg-white/5 rounded-xl p-3 ring-1 ring-white/10">Roles y aprobaciones.</li>
          <li className="bg-white/5 rounded-xl p-3 ring-1 ring-white/10">Capacitación al equipo.</li>
          <li className="bg-white/5 rounded-xl p-3 ring-1 ring-white/10">KPIs y alertas activas.</li>
        </ol>
      </section>

      <ProductInterestSection />
    </main>
  );
}

