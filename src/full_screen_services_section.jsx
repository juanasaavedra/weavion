import React from 'react';
import { motion } from 'framer-motion';

// Asset imports (replace with actual filenames in your assets folder)
import webDesignImg from './assets/diseño y desarrollo web.png';
import emailMarketingImg from './assets/email marketing.png';
import crmImg from './assets/crm y service titan.png';
import automationImg from './assets/automatizaciones.png';

// Sections configuration with expanded descriptions
const sections = [
  {
    id: 'diseno',
    title: 'Diseño y Desarrollo Web',
    description: `Creamos tiendas virtuales y portales web escalables, optimizados para SEO y conversión. Tu producto estará disponible 24/7 con una experiencia de usuario intuitiva y adaptativa.`,
    image: webDesignImg,
    bg: 'bg-gradient-to-br from-purple-900 to-purple-800'
  },
  {
    id: 'email',
    title: 'Email Marketing',
    description: `Diseñamos campañas de correo que llegan directamente a la bandeja de entrada, adaptándose a todos los dispositivos. Aumentamos el engagement mediante segmentación inteligente y automatización de envíos.`,
    image: emailMarketingImg,
    bg: 'bg-gradient-to-br from-purple-800 to-purple-700'
  },
  {
    id: 'crm',
    title: 'Gestión CRM',
    description: `Implementamos flujos de trabajo que centralizan datos de clientes y actividades en un tablero visual. Automatizamos seguimientos y recordatorios para fortalecer la relación con tus usuarios.`,
    image: crmImg,
    bg: 'bg-gradient-to-br from-purple-700 to-purple-600'
  },
  {
    id: 'automatizaciones',
    title: 'Analíticas y Automatizaciones',
    description: `Integración de herramientas de analítica que recopilan métricas en tiempo real y generan reportes automáticos. Usa workflows inteligentes para automatizar tareas repetitivas y escalar operaciones sin esfuerzo.`,
    image: automationImg,
    bg: 'bg-gradient-to-br from-purple-600 to-purple-500'
  }
];

export default function ServicesSection() {
  return (
    <div className="overflow-y-auto snap-y snap-mandatory h-screen">
      {sections.map(({ id, title, description, image, bg }) => (
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
              className="text-6xl md:text-8xl font-bold text-white mb-4"
              initial={{ y: -40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
              {title}
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl text-gray-200 max-w-3xl mb-8 whitespace-pre-line"
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {description}
            </motion.p>
            <motion.img
              src={image}
              alt={title}
              className="w-64 h-64 object-contain mb-10"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            />
          </div>
        </motion.section>
      ))}
    </div>
  );
}
