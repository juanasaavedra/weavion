// full_screen_services_section.jsx
import React from 'react';
import { motion } from 'framer-motion';

// Imágenes de servicios
import webDesignImg from './assets/diseño y desarrollo web.png';
import emailMarketingImg from './assets/email marketing.png';
import crmImg from './assets/crm y service titan.png';
import automationImg from './assets/automatizaciones.png';

// Configuración de cada sección de servicio
const sections = [
  {
    id: 'diseno',
    title: 'Diseño y Desarrollo Web',
    description: `Creamos tiendas virtuales y portales web escalables, optimizados para SEO y conversión. Tu producto estará disponible 24/7 con una experiencia de usuario intuitiva y adaptativa.`,
    image: webDesignImg,
    bgColor: '#010207'
  },
  {
    id: 'email',
    title: 'Email Marketing',
    description: `Diseñamos campañas de correo que llegan directamente a la bandeja de entrada, adaptándose a todos los dispositivos. Aumentamos el engagement mediante segmentación inteligente y automatización de envíos.`,
    image: emailMarketingImg,
    bgColor: '#010207'
  },
  {
    id: 'crm',
    title: 'Gestión CRM',
    description: `Implementamos flujos de trabajo que centralizan datos de clientes y actividades en un tablero visual. Automatizamos seguimientos y recordatorios para fortalecer la relación con tus usuarios.`,
    image: crmImg,
    bgColor: '#12073e'
  },
  {
    id: 'automatizaciones',
    title: 'Analíticas y Automatizaciones',
    description: `Integración de herramientas de analítica que recopilan métricas en tiempo real y generan reportes automáticos. Usa workflows inteligentes para automatizar tareas repetitivas y escalar operaciones sin esfuerzo.`,
    image: automationImg,
    bgColor: '#141524'
  }
];

export default function ServicesSection() {
  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory">
      {sections.map(({ id, title, description, image, bgColor }, index) => {
        // Alternar orden: en desktop las secciones pares llevan imagen a la derecha
        const isReversed = index % 2 === 0;
        return (
          <motion.section
            key={id}
            className="h-screen snap-start flex flex-col md:flex-row items-center justify-center text-white"
            style={{ backgroundColor: bgColor }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div
              className={`flex-1 px-6 py-12 flex flex-col justify-center ${
                isReversed ? 'md:order-2' : 'md:order-1'
              } text-center md:text-left`}
            >
              <motion.h2
                className="text-4xl md:text-6xl font-bold mb-4"
                initial={{ y: -40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              >
                {title}
              </motion.h2>
              <motion.p
                className="text-lg md:text-xl max-w-lg mx-auto md:mx-0"
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {description}
              </motion.p>
            </div>
            <motion.div
              className={`flex-1 flex items-center justify-center px-6 py-12 ${
                isReversed ? 'md:order-1' : 'md:order-2'
              }`}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <img src={image} alt={title} className="w-64 h-64 md:w-80 md:h-80 object-contain" />
            </motion.div>
          </motion.section>
        );
      })}
    </div>
  );
}
