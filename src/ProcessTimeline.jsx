import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    title: 'Descubrimiento',
    description: 'Analizamos tus necesidades, objetivos y contexto para definir la mejor solución.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="18" r="16" stroke="#FFD100" strokeWidth="4" fill="none" />
        <path d="M18 10v8l6 4" stroke="#FFD100" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Propuesta',
    description: 'Te presentamos una propuesta personalizada y transparente, alineada a tus objetivos.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="8" width="24" height="20" rx="4" fill="#FFD100" />
        <path d="M10 14h16M10 20h10" stroke="#202020" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Diseño',
    description: 'Creamos prototipos y diseños visuales atractivos, funcionales y alineados a tu marca.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="8" width="20" height="20" rx="5" fill="#FFD100" />
        <rect x="13" y="13" width="10" height="10" rx="2" fill="#fff" />
      </svg>
    ),
  },
  {
    title: 'Desarrollo',
    description: 'Desarrollamos tu solución con tecnologías modernas, asegurando calidad y escalabilidad.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="24" width="8" height="6" rx="2" fill="#FFD100" />
        <rect x="14" y="18" width="8" height="12" rx="2" fill="#FFD100" />
        <rect x="22" y="12" width="8" height="18" rx="2" fill="#FFD100" />
      </svg>
    ),
  },
  {
    title: 'Lanzamiento y soporte',
    description: 'Lanzamos tu proyecto y te acompañamos con soporte y mejoras continuas.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="18" r="16" stroke="#FFD100" strokeWidth="4" fill="none" />
        <rect x="14" y="10" width="8" height="16" rx="4" fill="#FFD100" />
      </svg>
    ),
  },
];

export default function ProcessTimeline() {
  const [visibleStep, setVisibleStep] = useState(0);

  // Reveal next step every 1.2s
  React.useEffect(() => {
    if (visibleStep < steps.length) {
      const timeout = setTimeout(() => setVisibleStep(visibleStep + 1), 1200);
      return () => clearTimeout(timeout);
    }
  }, [visibleStep]);

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto py-12">
      <div className="relative w-full">
        <div className="flex flex-col gap-0 relative z-10">
          <AnimatePresence>
            {steps.slice(0, visibleStep).map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="flex items-center gap-6 mb-0 relative"
              >
                <div className="flex flex-col items-center">
                  <div className="bg-[#202020] rounded-full border-4 border-[#FFD100] flex items-center justify-center w-16 h-16 mb-2">
                    {step.icon}
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="w-1 h-10 bg-[#FFD100]/30" />
                  )}
                </div>
                <div className="py-4">
                  <div className="text-2xl font-bold text-[#FFD100] mb-1">{step.title}</div>
                  <div className="text-lg text-[#D6D6D6]">{step.description}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
} 