import React from 'react';
import { motion } from 'framer-motion';
import TermHint from '../components/TermHint';
import ProductInterestSection from '../components/ProductInterestSection';

/* Embudo simple para visualizar control operacional */
function Funnel({ stages = [] }) {
  const width = 360, height = 200, topW = 300, stepH = 36;
  return (
    <div className="chart">
      <svg viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <linearGradient id="gradFunnel" x1="0" x2="1">
            <stop offset="0%" stopColor="#a78bfa"/>
            <stop offset="100%" stopColor="#6d28d9"/>
          </linearGradient>
        </defs>
        {stages.map((s, i) => {
          const w = topW - i * 34;
          const x = (width - w)/2;
          const y = 20 + i * (stepH + 8);
          return (
            <g key={s.label}>
              <rect x={x} y={y} width={w} height={stepH} rx="12" fill="url(#gradFunnel)" opacity={0.95}/>
              <text x={width/2} y={y+22} textAnchor="middle" fontSize="12" fill="#fff">
                {s.label} · {s.value}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="chart-note">Visibilidad por etapa: menos fugas, más cierres.</p>
    </div>
  );
}

function SLAKpis() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        {v:'< 5 min', l:(<>Primer respuesta <TermHint term="SLA">Acuerdo de nivel de servicio: tiempos objetivo de respuesta y resolución.</TermHint></>)},
        {v:'98%',   l:'Citas confirmadas'},
        {v:'-35%',  l:'No-shows'},
        {v:'+27%',  l:'Cierres por técnico'},
      ].map((k, i)=>(
        <div key={i} className="kpi glass">
          <p className="kpi-v">{k.v}</p>
          <p className="kpi-l">{k.l}</p>
        </div>
      ))}
    </div>
  );
}

export default function ServiceTitan() {
  return (
    <div className="page-wrap metal-bg-3 text-white">
      <header className="hero">
        <h1 className="headline-xl">ServiceTitan integrado: operación sin fricción</h1>
        <p className="sublead">
          Agenda, asigna, factura y reporta desde un mismo flujo. Menos errores, más tiempo productivo.
        </p>
      </header>

      {/* KPIs de eficiencia operativa */}
      <section className="section">
        <SLAKpis/>
      </section>

      {/* Pipeline/Embudo + promesa comercial */}
      <section className="section grid md:grid-cols-2 gap-6">
        <motion.article initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="glass p-6 rounded-2xl">
          <h3 className="card-title">Pipeline controlado de punta a punta</h3>
          <p className="card-copy">
            Cada lead avanza con reglas claras. Asignación automática, recordatorios y
            documentación unificada para cumplir <TermHint term="SLA">tiempos comprometidos</TermHint> y reducir no-shows.
          </p>
          <Funnel stages={[
            {label:'Web / Lead', value:'100%'},
            {label:'Agenda', value:'82%'},
            {label:'Visita', value:'74%'},
            {label:'Cotiza', value:'55%'},
            {label:'Cierra', value:'41%'},
          ]}/>
        </motion.article>

        <motion.article initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="glass p-6 rounded-2xl">
          <h3 className="card-title">Qué activamos</h3>
          <ul className="list-bullets">
            <li>Integración de formularios/llamadas → ServiceTitan.</li>
            <li>Rutas y asignación automática por zona y carga.</li>
            <li>Plantillas y cobros listos para salir a campo.</li>
            <li>Reportes de desempeño por técnico y cuadrilla.</li>
          </ul>
        </motion.article>
      </section>
      <ProductInterestSection />
    </div>
  );
}
