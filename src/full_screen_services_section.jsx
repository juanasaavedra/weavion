import React from 'react';
import { motion } from 'framer-motion';

// Static SVGs or image placeholders for teddy and service icons
const TeddySVG = () => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-1/2 h-auto">
    <circle cx="100" cy="100" r="80" fill="#dbc3e0" stroke="#6B46C1" strokeWidth="4" />
    <circle cx="70" cy="80" r="10" fill="#6B46C1" />
    <circle cx="130" cy="80" r="10" fill="#6B46C1" />
    <path d="M70,130 Q100,160 130,130" fill="none" stroke="#6B46C1" strokeWidth="4" />
  </svg>
);
const DesignIcon = () => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-1/3 h-auto">
    <rect x="20" y="40" width="160" height="100" rx="10" fill="none" stroke="#6B46C1" strokeWidth="4" />
    <line x1="20" y1="80" x2="180" y2="80" stroke="#6B46C1" strokeWidth="3" />
    <circle cx="40" cy="60" r="6" fill="#6B46C1" />
    <circle cx="60" cy="60" r="6" fill="#6B46C1" />
  </svg>
);
const EmailIcon = () => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-1/3 h-auto">
    <rect x="20" y="60" width="160" height="80" rx="8" fill="none" stroke="#6B46C1" strokeWidth="4" />
    <polyline points="20,60 100,120 180,60" fill="none" stroke="#6B46C1" strokeWidth="3" />
  </svg>
);
const CRMIcon = () => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-1/3 h-auto">
    <circle cx="80" cy="120" r="20" fill="none" stroke="#6B46C1" strokeWidth="3" />
    <circle cx="120" cy="120" r="20" fill="none" stroke="#6B46C1" strokeWidth="3" />
    <line x1="100" y1="100" x2="100" y2="140" stroke="#6B46C1" strokeWidth="2" />
  </svg>
);
const AnalyticsIcon = () => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-1/3 h-auto">
    <rect x="60" y="120" width="20" height="40" fill="none" stroke="#6B46C1" strokeWidth="3" />
    <rect x="100" y="100" width="20" height="60" fill="none" stroke="#6B46C1" strokeWidth="3" />
    <rect x="140" y="80" width="20" height="80" fill="none" stroke="#6B46C1" strokeWidth="3" />
  </svg>
);

// Section definitions with background gradients
const sections = [
  {
    id: 'hero',
    title: 'Así es tu marca o producto digital',
    subtitle: 'Mira cómo un osito de peluche cobra vida y se transforma con cada paso.',
    background: 'linear-gradient(135deg, #0e001c 0%, #2b0042 100%)',
    Content: TeddySVG,
  },
  {
    id: 'diseno',
    title: 'Diseño Web Innovador',
    subtitle: 'El osito ahora sostiene un boceto que cobra forma de interfaz.',
    background: 'linear-gradient(135deg, #1a0020 0%, #4a016f 100%)',
    Content: DesignIcon,
  },
  {
    id: 'email',
    title: 'Email Marketing Efectivo',
    subtitle: 'Mira el osito compartir mensajes envolventes directamente al inbox.',
    background: 'linear-gradient(135deg, #25005a 0%, #6b26c1 100%)',
    Content: EmailIcon,
  },
  {
    id: 'crm',
    title: 'Integración CRM Inteligente',
    subtitle: 'Nuestro osito conecta tus datos como si fueran engranajes perfectamente sincronizados.',
    background: 'linear-gradient(135deg, #33009f 0%, #8c4acf 100%)',
    Content: CRMIcon,
  },
  {
    id: 'analiticas',
    title: 'Analíticas y Automatizaciones',
    subtitle: 'Observa al osito analizar patrones y ejecutar flujos con precisión.',
    background: 'linear-gradient(135deg, #4a00d6 0%, #b36ffb 100%)',
    Content: AnalyticsIcon,
  },
];

// Full-screen section with entry animations
export default function FullScreenServicesSection() {
  return (
    <div className="overflow-y-scroll snap-y snap-mandatory h-screen">
      {sections.map(({ id, title, subtitle, background, Content }) => (
        <motion.section
          key={id}
          className="w-screen h-screen flex flex-col items-center justify-center"
          style={{ background }}
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center px-8"
          >
            <motion.h2
              className="text-8xl font-bold text-white"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
            >
              {title}
            </motion.h2>
            <motion.p
              className="mt-4 text-2xl text-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {subtitle}
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.6 }}
            className="mt-12"
          >
            <Content />
          </motion.div>
        </motion.section>
      ))}
    </div>
  );
}
