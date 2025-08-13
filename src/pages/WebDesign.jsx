import React from 'react';
import { motion } from 'framer-motion';
import ProductInterestSection from '../components/ProductInterestSection';
import TermHint from '../components/TermHint';
import { useTranslation, Trans } from 'react-i18next';

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
  const { t } = useTranslation();
  const kpis = t('pages.web.kpis', { returnObjects: true });
  const months = t('pages.web.sales.months', { returnObjects: true });
  const deliver = t('pages.web.deliver.items', { returnObjects: true });
  return (
    <div className="page-wrap metal-bg-1 text-white mt-24">
      {/* Hero */}
      <header className="hero">
        <h1 className="headline-xl">{t('pages.web.hero.title')}</h1>
        <p className="sublead">
          <Trans i18nKey="pages.web.hero.subtitle" components={{ TermHint: <TermHint term={t('pages.web.hero.term')} /> }} />
        </p>
      </header>

      {/* KPIs de promesa comercial */}
      <section className="section">
        <KPIGrid items={kpis}/>
      </section>

      {/* Tendencia de ventas (muestra impacto de performance + UX) */}
      <section className="section grid md:grid-cols-2 gap-6">
        <motion.article initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="glass p-6 rounded-2xl">
          <h3 className="card-title">{t('pages.web.sales.title')}</h3>
          <p className="card-copy">{t('pages.web.sales.description')}</p>
          <TrendBars
            labels={months}
            values={[24,31,38,46,54,66]}
            note={t('pages.web.sales.note')}
          />
        </motion.article>

        <motion.article initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="glass p-6 rounded-2xl">
          <h3 className="card-title">{t('pages.web.deliver.title')}</h3>
          <ul className="list-bullets">
            {deliver.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </motion.article>
      </section>
      <ProductInterestSection />
    </div>
  );
}
