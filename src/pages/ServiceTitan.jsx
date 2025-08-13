import React from 'react';
import { motion } from 'framer-motion';
import TermHint from '../components/TermHint';
import { useTranslation, Trans } from 'react-i18next';

/* Embudo simple para visualizar control operacional */
function Funnel({ stages = [] }) {
  const { t } = useTranslation();
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
      <p className="chart-note">{t('pages.servicetitan.funnel.note')}</p>
    </div>
  );
}

function SLAKpis() {
  const { t } = useTranslation();
  const items = t('pages.servicetitan.kpis', { returnObjects: true });
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((k, i)=>(
        <div key={i} className="kpi glass">
          <p className="kpi-v">{k.value}</p>
          <p className="kpi-l">{k.label}</p>
        </div>
      ))}
    </div>
  );
}

export default function ServiceTitan() {
  const { t } = useTranslation();
  const stages = t('pages.servicetitan.funnel.stages', { returnObjects: true }).map((label, i) => ({ label, value: [100,82,74,55,41][i] }));
  const activate = t('pages.servicetitan.activate.items', { returnObjects: true });
  return (
    <div className="page-wrap metal-bg-3 text-white">
      <header className="hero">
        <h1 className="headline-xl">{t('pages.servicetitan.hero.title')}</h1>
        <p className="sublead">{t('pages.servicetitan.hero.subtitle')}</p>
      </header>

      {/* KPIs de eficiencia operativa */}
      <section className="section">
        <SLAKpis/>
      </section>

      {/* Pipeline/Embudo + promesa comercial */}
      <section className="section grid md:grid-cols-2 gap-6">
        <motion.article initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="glass p-6 rounded-2xl">
          <h3 className="card-title">{t('pages.servicetitan.funnel.title')}</h3>
          <p className="card-copy">
            <Trans i18nKey="pages.servicetitan.funnel.description" components={{ TermHint: <TermHint term={t('pages.servicetitan.funnel.term')} /> }} />
          </p>
          <Funnel stages={stages}/>
        </motion.article>

        <motion.article initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="glass p-6 rounded-2xl">
          <h3 className="card-title">{t('pages.servicetitan.activate.title')}</h3>
          <ul className="list-bullets">
            {activate.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </motion.article>
      </section>
    </div>
  );
}
