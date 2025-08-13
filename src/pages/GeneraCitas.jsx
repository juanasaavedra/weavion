import React from 'react';

/* --- Helpers locales: TermHint + mini-charts SVG --- */
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
function BarsAppointments({ data = [8,12,16,18,19,17,20], labels = ['L','M','X','J','V','S','D'] }) {
  const max = Math.max(...data);
  return (
    <svg viewBox="0 0 260 140" className="w-full h-32">
      <defs>
        <linearGradient id="vio" x1="0" x2="1">
          <stop offset="0" stopColor="#b692ff" /><stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      {data.map((v,i)=> {
        const h = (v/max)*92 + 6;
        return (
          <g key={i} transform={`translate(${20 + i*32} 18)`}>
            <rect x="0" y={110-h} width="20" height={h} rx="8" fill="url(#vio)" />
            <text x="10" y="126" textAnchor="middle" fontSize="10" fill="#c9c4f0">{labels[i]}</text>
          </g>
        )
      })}
    </svg>
  );
}
function SLAGauge({ minutes = 3.4 }) {
  const pct = Math.max(0, Math.min(1, 1 - minutes/10));
  const r=56, len=Math.PI*r;
  const dash = len*pct;
  return (
    <svg viewBox="0 0 140 90" className="w-full h-28">
      <defs>
        <linearGradient id="vio2" x1="0" x2="1">
          <stop offset="0" stopColor="#7c3aed" /><stop offset="1" stopColor="#b692ff" />
        </linearGradient>
      </defs>
      <path d="M14,70 A56,56 0 0,1 126,70" fill="none" stroke="#2a2244" strokeWidth="12" />
      <path d="M14,70 A56,56 0 0,1 126,70" fill="none" stroke="url(#vio2)" strokeWidth="12" strokeLinecap="round" strokeDasharray={`${dash} ${len}`} />
      <text x="70" y="58" textAnchor="middle" fontSize="12" fill="#e9e7f7">Primer contacto</text>
      <text x="70" y="76" textAnchor="middle" fontSize="16" fontWeight="800" fill="#fff">{minutes.toFixed(1)} min</text>
    </svg>
  );
}
function SimpleFunnel({ stages = [
  {label:'Captura', v:100},
  {label:'Califica', v:64},
  {label:'Agenda', v:49},
  {label:'Cierre', v:29},
]}) {
  const max = stages[0].v;
  return (
    <svg viewBox="0 0 360 180" className="w-full h-40">
      <defs>
        <linearGradient id="vio" x1="0" x2="1">
          <stop offset="0" stopColor="#b692ff" /><stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      {stages.map((s,i)=>{
        const w=(s.v/max)*320 + 18; const x=(360 - w)/2;
        return (
          <g key={i} transform={`translate(0 ${i*42})`}>
            <rect x={x} y="14" width={w} height="30" rx="15" fill="url(#vio)" opacity={0.95 - i*0.15} />
            <text x="18" y="34" fontSize="12" fill="#e9e7f7">{s.label}</text>
            <text x="342" y="34" fontSize="12" fill="#c9c4f0" textAnchor="end">{s.v}%</text>
          </g>
        );
      })}
    </svg>
  );
}

/* --- Página --- */
export default function GeneraCitas() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-10 space-y-8">
      {/* HERO */}
      <section className="rounded-2xl p-8 bg-gradient-to-b from-[#151427] to-[#0c0d16] ring-1 ring-white/10">
        <h1 className="text-white font-extrabold text-4xl md:text-6xl leading-tight">
          Agenda llena, <span className="bg-gradient-to-r from-[#b692ff] to-[#7c3aed] bg-clip-text text-transparent">sin perseguir a nadie</span>.
        </h1>
        <p className="mt-3 text-[#e9e7f7] text-lg md:text-xl max-w-[75ch]">
          Activa reservas 24/7 con recordatorios y confirmaciones automáticas. Protege tu{" "}
          <TermHint term="SLA: tiempo objetivo de respuesta a un nuevo contacto">SLA</TermHint>, reduce no-shows y prioriza oportunidades calientes con una experiencia de cita que se siente premium.
        </p>
      </section>

      {/* PRUEBA VISUAL */}
      <section className="grid md:grid-cols-3 gap-4">
        <article className="rounded-2xl p-6 bg-white/[0.06] backdrop-blur-md ring-1 ring-white/10 md:col-span-2">
          <h3 className="text-white font-bold text-xl mb-1">Citas por día</h3>
          <p className="text-[#e9e7f7]/90 mb-3">Picos sanos de demanda a lo largo de la semana, sin saturar a tu equipo.</p>
          <BarsAppointments />
        </article>
        <article className="rounded-2xl p-6 bg-white/[0.06] backdrop-blur-md ring-1 ring-white/10">
          <h3 className="text-white font-bold text-xl mb-1">Primer contacto en minutos</h3>
          <p className="text-[#e9e7f7]/90 mb-3">La velocidad multiplica la tasa de cierre; objetivo &lt; 5 min.</p>
          <SLAGauge minutes={3.2} />
        </article>
      </section>

      {/* VALOR + EMBUDO */}
      <section className="grid md:grid-cols-2 gap-4">
        <article className="rounded-2xl p-6 bg-white/[0.06] backdrop-blur-md ring-1 ring-white/10">
          <h3 className="text-white font-bold text-xl mb-1">Embudo de agendamiento</h3>
          <p className="text-[#e9e7f7]/90 mb-3">De la <TermHint term="Captura: formularios, landing o WhatsApp">captura</TermHint> al cierre con fugas controladas.</p>
          <SimpleFunnel />
        </article>
        <article className="rounded-2xl p-6 bg-white/[0.06] backdrop-blur-md ring-1 ring-white/10">
          <h3 className="text-white font-bold text-xl mb-1">Beneficios que verás</h3>
          <ul className="text-[#e9e7f7] grid gap-2">
            <li>Widget de reservas con disponibilidad real y bloqueo de huecos.</li>
            <li>Recordatorios por email/SMS/WhatsApp (menos no-shows).</li>
            <li>Asignación por zona/agenda y confirmación con 1 clic.</li>
            <li>Reporte semanal: citas generadas, asistencia y motivos de cancelación.</li>
          </ul>
        </article>
      </section>

      {/* PROCESO */}
      <section className="rounded-2xl p-6 bg-gradient-to-b from-[#171533] to-[#0b0e1a] ring-1 ring-white/10">
        <h3 className="text-white font-bold text-2xl mb-3">Implementación en 5 días</h3>
        <ol className="grid md:grid-cols-5 gap-3 text-[#e9e7f7]">
          <li className="bg-white/5 rounded-xl p-3 ring-1 ring-white/10">Diagnóstico de flujos y canales.</li>
          <li className="bg-white/5 rounded-xl p-3 ring-1 ring-white/10">Configuración de agenda y reglas.</li>
          <li className="bg-white/5 rounded-xl p-3 ring-1 ring-white/10">Automatizaciones y recordatorios.</li>
          <li className="bg-white/5 rounded-xl p-3 ring-1 ring-white/10">Embeds y pruebas en sitio.</li>
          <li className="bg-white/5 rounded-xl p-3 ring-1 ring-white/10">Reporte inicial y ajuste fino.</li>
        </ol>
      </section>

      {/* CTA */}
      <div className="text-center">
        <a href="#/contact" className="inline-flex items-center justify-center rounded-full px-6 py-3 text-white bg-gradient-to-r from-[#b692ff] to-[#7c3aed] shadow-md hover:shadow-lg transition">
          Quiero llenar mi agenda
        </a>
      </div>
    </main>
  );
}

