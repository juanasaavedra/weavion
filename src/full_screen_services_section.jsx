import React from 'react';
import { motion } from 'framer-motion';

// Base SVG for the full-body teddy
const TeddyBase = ({ children }) => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="100" cy="130" rx="60" ry="50" fill="none" stroke="#6B46C1" strokeWidth="4" />
    <circle cx="100" cy="70" r="45" fill="none" stroke="#6B46C1" strokeWidth="4" />
    <circle cx="60" cy="30" r="12" fill="none" stroke="#6B46C1" strokeWidth="3" />
    <circle cx="140" cy="30" r="12" fill="none" stroke="#6B46C1" strokeWidth="3" />
    <path d="M40,110 Q20,140 60,150" fill="none" stroke="#6B46C1" strokeWidth="4" />
    <path d="M160,110 Q180,140 140,150" fill="none" stroke="#6B46C1" strokeWidth="4" />
    <path d="M80,180 Q80,200 100,200" fill="none" stroke="#6B46C1" strokeWidth="4" />
    <path d="M120,180 Q120,200 100,200" fill="none" stroke="#6B46C1" strokeWidth="4" />
    <circle cx="85" cy="60" r="5" fill="#6B46C1" />
    <circle cx="115" cy="60" r="5" fill="#6B46C1" />
    <path d="M80,80 Q100,90 120,80" fill="none" stroke="#6B46C1" strokeWidth="3" />
    {children}
  </svg>
);

// Overlays representing commercial impact per tool
const WebDesignOverlay = () => (
  <g>
    {/* Browser window frame */}
    <rect x="20" y="20" width="160" height="100" rx="8" fill="none" stroke="#FFFFFF" strokeWidth="3" />
    {/* Product card with teddy prominently */}
    <rect x="40" y="40" width="120" height="60" rx="4" fill="none" stroke="#FFFFFF" strokeWidth="2" />
    <text x="100" y="75" textAnchor="middle" fontSize="12" fill="#FFFFFF">Tienda Virtual</text>
    {/* Teddy silhouette inside card */}
    <ellipse cx="100" cy="95" rx="20" ry="15" fill="none" stroke="#6B46C1" strokeWidth="2" />
  </g>
);

const EmailOverlay = () => (
  <g>
    {/* Device outlines */}
    <rect x="10" y="30" width="50" height="80" rx="4" fill="none" stroke="#FFFFFF" strokeWidth="2" />
    <rect x="140" y="50" width="50" height="60" rx="4" fill="none" stroke="#FFFFFF" strokeWidth="2" />
    {/* Envelope icon with teddy face inside */}
    <rect x="60" y="20" width="80" height="50" rx="4" fill="none" stroke="#FFFFFF" strokeWidth="3" />
    <text x="100" y="45" textAnchor="middle" fontSize="10" fill="#FFFFFF">E-mail</text>
    <circle cx="100" cy="50" r="8" fill="none" stroke="#6B46C1" strokeWidth="2" />
  </g>
);

const CRMOverlay = () => (
  <g>
    {/* Kanban-style columns */}
    <rect x="30" y="40" width="40" height="100" rx="4" fill="none" stroke="#FFFFFF" strokeWidth="2" />
    <rect x="90" y="40" width="40" height="100" rx="4" fill="none" stroke="#FFFFFF" strokeWidth="2" />
    <rect x="150" y="40" width="40" height="100" rx="4" fill="none" stroke="#FFFFFF" strokeWidth="2" />
    {/* Teddy cards in columns */}
    <circle cx="50" cy="60" r="8" fill="none" stroke="#6B46C1" strokeWidth="2" />
    <circle cx="110" cy="90" r="8" fill="none" stroke="#6B46C1" strokeWidth="2" />
    <circle cx="170" cy="120" r="8" fill="none" stroke="#6B46C1" strokeWidth="2" />
  </g>
);

const AnalyticsOverlay = () => (
  <g>
    {/* Bar chart */}
    <rect x="70" y="140" width="15" height="40" fill="none" stroke="#FFFFFF" strokeWidth="2" />
    <rect x="95" y="120" width="15" height="60" fill="none" stroke="#FFFFFF" strokeWidth="2" />
    <rect x="120" y="100" width="15" height="80" fill="none" stroke="#FFFFFF" strokeWidth="2" />
    {/* Upward trend line */}
    <polyline points="70,140 95,120 120,100" fill="none" stroke="#6B46C1" strokeWidth="3" markerEnd="url(#arrow)" />
    <defs>
      <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3">
        <path d="M0,0 L6,3 L0,6" fill="#6B46C1" />
      </marker>
    </defs>
  </g>
);

// Section data: commercial descriptions of impact
const sections = [
  {
    id: 'diseno',
    title: 'Diseño Web',
    description: 'Convierte tu producto en una tienda virtual premium que genera ventas 24/7.',
    Overlay: WebDesignOverlay,
    bg: 'bg-gradient-to-br from-purple-900 to-purple-800'
  },
  {
    id: 'email',
    title: 'Email Marketing',
    description: 'Mantén tu marca en la bandeja de entrada en múltiples dispositivos.',
    Overlay: EmailOverlay,
    bg: 'bg-gradient-to-br from-purple-800 to-purple-700'
  },
  {
    id: 'crm',
    title: 'Gestión CRM',
    description: 'Organiza cada interacción y seguimiento de clientes de forma eficiente.',
    Overlay: CRMOverlay,
    bg: 'bg-gradient-to-br from-purple-700 to-purple-600'
  },
  {
    id: 'analiticas',
    title: 'Analíticas Inteligentes',
    description: 'Obtén insights de uso y optimiza tus estrategias basadas en datos reales.',
    Overlay: AnalyticsOverlay,
    bg: 'bg-gradient-to-br from-purple-600 to-purple-500'
  }
];

export default function ServicesSection() {
  return (
    <div className="overflow-y-auto snap-y snap-mandatory h-screen">
      {sections.map(({ id, title, description, Overlay, bg }) => (
        <motion.section
          key={id}
          className={`h-screen snap-start flex flex-col items-center justify-center ${bg}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-full h-full flex flex-col items-center justify-center text-center px-6">
            <motion.h2
              className="text-6xl md:text-8xl font-bold text-white mb-3"
              initial={{ y: -40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
              {title}
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl text-gray-200 max-w-2xl mb-8"
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {description}
            </motion.p>
            <motion.div
              className="w-64 h-64"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <TeddyBase>
                <Overlay />
              </TeddyBase>
            </motion.div>
          </div>
        </motion.section>
      ))}
    </div>
  );
}
