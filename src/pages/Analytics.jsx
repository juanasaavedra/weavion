import React from 'react';
import { motion } from 'framer-motion';
import TermHint from '../components/TermHint';
import { useTranslation, Trans } from 'react-i18next';

/* Combo Area + Line para ROI */
function ComboROI({ months, cac, roi }) {
  const { t } = useTranslation();
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
      <p className="chart-note">{t('pages.analytics.combo.note')}</p>
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
  const { t } = useTranslation();
  const kpis = t('pages.analytics.kpis', { returnObjects: true });
  const months = t('pages.analytics.combo.months', { returnObjects: true });
  const getItems = t('pages.analytics.get.items', { returnObjects: true });
  return (
    <div className="page-wrap metal-bg-4 text-white">
      <header className="hero">
        <h1 className="headline-xl">{t('pages.analytics.hero.title')}</h1>
        <p className="sublead">
          <Trans i18nKey="pages.analytics.hero.subtitle" components={{ CAC: <TermHint term={t('pages.analytics.hero.cacTerm')} />, ROAS: <TermHint term={t('pages.analytics.hero.roasTerm')} /> }} />
        </p>
      </header>

      <section className="section">
        <KPIList items={kpis}/>
      </section>

      <section className="section grid md:grid-cols-2 gap-6">
        <motion.article initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="glass p-6 rounded-2xl">
          <h3 className="card-title">{t('pages.analytics.combo.title')}</h3>
          <p className="card-copy">
            <Trans i18nKey="pages.analytics.combo.description" components={{ ROAS: <TermHint term={t('pages.analytics.combo.roasTerm')} /> }} />
          </p>
          <ComboROI
            months={months}
            cac={[62,58,55,53,52,49]}
            roi={[1.2,1.4,1.5,1.7,1.9,2.1]}
          />
        </motion.article>

        <motion.article initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="glass p-6 rounded-2xl">
          <h3 className="card-title">{t('pages.analytics.get.title')}</h3>
          <ul className="list-bullets">
            {getItems.map((g, i) => (
              <li key={i}>{g}</li>
            ))}
          </ul>
        </motion.article>
      </section>
    </div>
  );
}
