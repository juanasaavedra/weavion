import React from "react";

/* Tooltip sencillo: término subrayado + globo al hover */
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

/* 1) Flujo de integración Website ↔ CRM ↔ ServiceTitan ↔ Operaciones */
function SyncMap() {
  return (
    <svg viewBox="0 0 600 230" className="w-full h-56">
      <defs>
        <linearGradient id="vio" x1="0" x2="1">
          <stop offset="0" stopColor="#b692ff" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Nodos */}
      <g transform="translate(20,42)">
        <rect width="120" height="64" rx="14" fill="none" stroke="url(#vio)" strokeWidth="2.6" filter="url(#softGlow)"/>
        <text x="60" y="38" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="14">Website</text>
      </g>
      <g transform="translate(170,42)">
        <rect width="150" height="64" rx="14" fill="none" stroke="url(#vio)" strokeWidth="2.6" filter="url(#softGlow)"/>
        <text x="75" y="28" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="14">CRM</text>
        <text x="75" y="46" textAnchor="middle" fill="#cfc9ee" fontSize="11">Leads • Deals • Tareas</text>
      </g>
      <g transform="translate(350,42)">
        <rect width="200" height="64" rx="14" fill="none" stroke="url(#vio)" strokeWidth="2.6" filter="url(#softGlow)"/>
        <text x="100" y="28" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="14">ServiceTitan</text>
        <text x="100" y="46" textAnchor="middle" fill="#cfc9ee" fontSize="11">Órdenes • Técnicos • Agenda</text>
      </g>

      {/* Flechas ida y vuelta */}
      <g stroke="url(#vio)" strokeWidth="2.4" fill="none">
        <path d="M140,74 H170" />
        <path d="M320,74 H350" />
      </g>
      <g stroke="#a896ff" strokeWidth="2" fill="none" opacity=".9">
        <path d="M170,94 H140" />
        <path d="M350,94 H320" />
      </g>

      {/* Operaciones (abajo) */}
      <g transform="translate(230,140)">
        <rect width="160" height="64" rx="14" fill="none" stroke="url(#vio)" strokeWidth="2.6" filter="url(#softGlow)"/>
        <text x="80" y="28" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="14">Operaciones</text>
        <text x="80" y="46" textAnchor="middle" fill="#cfc9ee" fontSize="11">Programación & Ruta</text>
      </g>

      {/* Flechas verticales */}
      <g stroke="url(#vio)" strokeWidth="2.2" fill="none">
        <path d="M425,106 V140" />
        <path d="M245,106 V140" />
      </g>
    </svg>
  );
}

/* 2) Gauge de SLA (minutos a primera respuesta) */
function SLAGauge({ minutes = 3.8 }) {
  const pct = Math.max(0, Math.min(1, 1 - minutes / 12)); // 0..1 (12 min peor)
  const r = 56;
  const len = Math.PI * r;
  const dash = len * pct;
  return (
    <svg viewBox="0 0 180 120" className="w-full h-32">
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0" stopColor="#7c3aed" /><stop offset="1" stopColor="#b692ff" />
        </linearGradient>
      </defs>
      <path d="M22,76 A56,56 0 0,1 158,76" fill="none" stroke="#241c39" strokeWidth="12" />
      <path d="M22,76 A56,56 0 0,1 158,76" fill="none" stroke="url(#g1)" strokeWidth="12" strokeLinecap="round"
        strokeDasharray={`${dash} ${len}`} />
      <text x="90" y="54" textAnchor="middle" fontSize="12" fill="#e9e7f7">Primer contacto</text>
      <text x="90" y="76" textAnchor="middle" fontSize="16" fontWeight="800" fill="#fff">{minutes.toFixed(1)} min</text>
    </svg>
  );
}

/* 3) Barras de “salud de integración” */
function IntegrationHealth({ api = 99, jobs = 97, sync = 98 }) {
  const bar = (v, label, y) => (
    <g key={label}>
      <text x="10" y={y - 6} fontSize="12" fill="#e9e7f7">{label}</text>
      <rect x="10" y={y} width="340" height="12" rx="6" fill="#2a2244" />
      <rect x="10" y={y} width={(v / 100) * 340} height="12" rx="6" fill="url(#vio)" />
      <text x="356" y={y + 10} textAnchor="end" fontSize="12" fill="#fff" fontWeight="700">{v}%</text>
    </g>
  );
  return (
    <svg viewBox="0 0 360 120" className="w-full h-28">
      <defs>
        <linearGradient id="vio" x1="0" x2="1">
          <stop offset="0" stopColor="#b692ff" /><stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      {bar(api, 'API', 28)}
      {bar(jobs, 'Jobs (ETL)', 60)}
      {bar(sync, 'Sincronizaciones', 92)}
    </svg>
  );
}

export default function CRMServiceTitan() {
  return (
    <main className="max-w-[1200px] mx-auto px-4 py-10 space-y-8 bg-gradient-to-b from-[#0b0b12] to-[#0e0d16] text-white">
      {/* HERO */}
      <section className="rounded-2xl p-8 bg-gradient-to-b from-white/10 to-white/5 ring-1 ring-white/10 backdrop-blur-md shadow-[inset_0_0_0_1px_rgba(182,146,255,.22),0_10px_28px_rgba(108,72,237,.18)]">
        <h1 className="font-black text-4xl md:text-6xl leading-tight">
          <span className="bg-gradient-to-r from-[#b692ff] to-[#7c3aed] bg-clip-text text-transparent">CRM</span> y ServiceTitan,
          sincronizados para vender y ejecutar sin fricción.
        </h1>
        <p className="text-[#e9e7f7]/95 mt-4 text-lg md:text-xl max-w-[78ch]">
          Centraliza contactos y oportunidades en tu <TermHint term="Gestor de relaciones con clientes: el “sistema nervioso” comercial">CRM</TermHint>,
          genera órdenes en <TermHint term="Plataforma para gestión de operaciones de campo, cuadrillas y órdenes de trabajo">ServiceTitan</TermHint> y
          mantén todo actualizado en tiempo real. Menos errores, menos doble digitación, más cierres.
        </p>
      </section>

      {/* MAPA + SLA/Salud */}
      <section className="grid lg:grid-cols-2 gap-4">
        <article className="rounded-2xl p-6 bg-[#0e0d16]/70 ring-1 ring-white/10">
          <h3 className="font-bold text-xl mb-1">Todo habla el mismo idioma</h3>
          <p className="text-[#e9e7f7]/90 mb-3">
            La web captura <TermHint term="Prospecto que deja sus datos para ser contactado">leads</TermHint>, el CRM califica y
            ServiceTitan programa trabajos. Sin copiar/pegar.
          </p>
          <SyncMap />
        </article>

        <article className="rounded-2xl p-6 bg-[#0e0d16]/70 ring-1 ring-white/10">
          <h3 className="font-bold text-xl mb-1">Velocidad que convierte</h3>
          <p className="text-[#e9e7f7]/90 mb-3">
            Protegemos tu <TermHint term="SLA: tiempo objetivo de respuesta al nuevo contacto">SLA</TermHint> con alertas y asignación automática.
          </p>
          <SLAGauge minutes={3.6} />
          <div className="mt-4">
            <h4 className="font-semibold">Salud de la integración</h4>
            <p className="text-[#e9e7f7]/80 text-sm mb-2">
              Monitoreo continuo de <TermHint term="API: interfaz para intercambiar datos entre sistemas">API</TermHint>,{" "}
              <TermHint term="ETL/Jobs: procesos programados que extraen, transforman y cargan datos">jobs</TermHint> y sincronizaciones.
            </p>
            <IntegrationHealth api={99} jobs={97} sync={98} />
          </div>
        </article>
      </section>

      {/* BENEFICIOS */}
      <section className="rounded-2xl p-6 bg-gradient-to-b from-white/10 to-white/5 ring-1 ring-white/10">
        <h3 className="font-extrabold text-2xl mb-3">Beneficios que el cliente siente</h3>
        <ul className="grid md:grid-cols-3 gap-3 text-[#e9e7f7]">
          <li className="bg-white/5 rounded-xl p-4 ring-1 ring-white/10">Seguimiento impecable: nadie se pierde en el camino.</li>
          <li className="bg-white/5 rounded-xl p-4 ring-1 ring-white/10">Programación ágil: menos llamadas, más trabajos agendados.</li>
          <li className="bg-white/5 rounded-xl p-4 ring-1 ring-white/10">Datos consistentes: cotizas y facturas sin sorpresas.</li>
        </ul>
      </section>

      {/* ENTREGABLES */}
      <section className="rounded-2xl p-6 bg-[#0e0d16]/70 ring-1 ring-white/10">
        <h3 className="font-extrabold text-2xl mb-3">Qué entregamos</h3>
        <ul className="text-[#e9e7f7] list-disc list-inside grid gap-2">
          <li>Integración bi-direccional CRM ↔ ServiceTitan ↔ Sitio Web.</li>
          <li>Reglas de asignación, estados y automatizaciones de tareas.</li>
          <li>Panel de salud (API, jobs, sincronizaciones y alertas).</li>
          <li>Playbook de operación comercial + capacitación.</li>
        </ul>
      </section>
    </main>
  );
}

