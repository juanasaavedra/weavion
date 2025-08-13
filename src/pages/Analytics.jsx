import React from 'react';
import { motion } from 'framer-motion';
import TermHint from '../components/TermHint';
import ProductInterestSection from '../components/ProductInterestSection';

/* Combo Area + Line para ROI */
function ComboROI({ months, cac, roi }) {
  const W=360, H=200, chartH=130, top=30, left=28;
  const max = Math.max(...cac, ...roi, 1);
  const scale = v => top + chartH - (v/max)*chartH;
  const step = (W - left*2) / (months.length - 1);

  const linePath = roi.map((v,i)=>`${i===0?'M':'L'} ${left+i*step} ${scale(v)}`).join(' ');
  const areaPath = `M ${left} ${scale(cac[0])} ` + cac.map((v,i)=>`L ${left+i*step} ${scale(v)}`).join(' ') + ` L ${left+(months.length-1)*step} ${H-20} L ${left} ${H-20} Z`;

  return (
    <div className="chart">
      <svg viewBox={`0 0 ${W} ${H}`}>
        <defs>
          <linearGradient id="areaCAC" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#9333ea" stopOpacity="0.35"/>
            <stop offset="100%" stopColor="#9333ea" stopOpacity="0.05"/>
          </linearGradient>
          <linearGradient id="lineROI" x1="0" x2="1">
            <stop offset="0%" stopColor="#a78bfa"/>
            <stop offset="100%" stopColor="#ffffff"/>
          </linearGradient>
        </defs>

        <path d={areaPath} fill="url(#areaCAC)"/>
        <path d={linePath} fill="none" stroke="url(#lineROI)" strokeWidth="3" strokeLinecap="round"/>

        {months.map((m,i)=>(
          <text key={m} x={left+i*step} y={H-6} fontSize="10" fill="#bdb8d8" textAnchor="middle">{m}</text>
        ))}
      </svg>
      <p className="chart-note">ROI sube mientras el CAC se contiene: más rentabilidad por campaña.</p>
    </div>
  );
}

function KPIList({ items }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((it, idx)=>(
        <div key={idx} className="glass rounded-2xl p-5">
          <p className="kpi-v">{it.value}</p>
          <p className="kpi-l">{it.label}</p>
          <p className="card-copy mt-2">{it.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default function Analytics() {
  return (
    <div className="page-wrap metal-bg-4 text-white">
      <header className="hero">
        <h1 className="headline-xl">Analíticas que guían inversión y crecimiento</h1>
        <p className="sublead">
          Paneles en tiempo real: <TermHint term="CAC">Costo de Adquisición de Cliente: inversión total / clientes nuevos.</TermHint>, <TermHint term="ROAS">Retorno de la inversión publicitaria: revenue atribuible / gasto publicitario.</TermHint>, tasa de cierre y revenue por canal. Decisiones
          con datos, no corazonadas.
        </p>
      </header>

      <section className="section">
        <KPIList items={[
          { value:'-18%', label:'CAC', desc:'Costo por adquisición controlado mes a mes.' },
          { value:'+34%', label:'ROAS', desc:'Mayor retorno por cada dólar invertido.' },
          { value:'+22%', label:'Tasa de cierre', desc:'Seguimiento y nurturing que convierten.' },
        ]}/>
      </section>

      <section className="section grid md:grid-cols-2 gap-6">
        <motion.article initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="glass p-6 rounded-2xl">
          <h3 className="card-title">ROI vs CAC (últimos 6 meses)</h3>
          <p className="card-copy">
            Redistribuimos presupuesto a los canales con mejor <TermHint term="ROAS">retorno por gasto publicitario</TermHint> y pausamos
            los que drenan inversión.
          </p>
          <ComboROI
            months={['Ene','Feb','Mar','Abr','May','Jun']}
            cac={[62,58,55,53,52,49]}
            roi={[1.2,1.4,1.5,1.7,1.9,2.1]}
          />
        </motion.article>

        <motion.article initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="glass p-6 rounded-2xl">
          <h3 className="card-title">Qué obtienes</h3>
          <ul className="list-bullets">
            <li>Tableros ejecutivos por canal, campaña y equipo.</li>
            <li>Alertas de desviación para reaccionar a tiempo.</li>
            <li>Reportes automáticos a tu correo cada semana.</li>
          </ul>
        </motion.article>
      </section>
      <ProductInterestSection />
    </div>
  );
}
