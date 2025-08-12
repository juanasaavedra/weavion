import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// Imágenes (usa las que subiste en /src/assets/)
import webDesignImg from './assets/diseño y desarrollo web.png';
import emailMarketingImg from './assets/email marketing.png';
import crmImg from './assets/crm y service titan.png';
import analyticsImg from './assets/automatizaciones.png'; // aquí pondremos “Analíticas y Automatizaciones”

/** Componente para rótulo vertical que ocupa la altura del viewport.
 *  Ajusta font-size con base al número de caracteres para "llenar" la altura.
 */
function VerticalLabel({ text, align = 'left' }) {
  const charCount = useMemo(() => (text || '').length, [text]);
  return (
    <div
      className={`v-label ${align === 'right' ? 'v-right' : 'v-left'}`}
      style={{ '--char-count': charCount }}
      aria-hidden="true"
    >
      {text}
    </div>
  );
}

const sections = [
  {
    id: 'diseno',
    title: 'Diseño y Desarrollo Web',
    description:
      'Tiendas y sitios escalables, con SEO técnico, performance de primer nivel y conversión como prioridad. Tu producto disponible 24/7 con UX responsiva y accesible.',
    image: webDesignImg,
    // Degradé metálico oscuro
    bg: 'bg-metal-1',
    // Vertical label corto y “de marca”
    vlabel: 'WEB · ECOM',
  },
  {
    id: 'email',
    title: 'Email Marketing',
    description:
      'Campañas responsive que llegan y convierten: segmentación avanzada, automatizaciones de disparo y contenido dinámico por audiencia y dispositivo.',
    image: emailMarketingImg,
    bg: 'bg-metal-2',
    vlabel: 'EMAIL',
  },
  {
    id: 'crm',
    title: 'Integración a CRM & ServiceTitan',
    description:
      'Centraliza clientes y operaciones. Conecta CRM/ServiceTitan para orquestar leads, agendas, tickets y reportes. Flujos que eliminan fricción y duplicidades.',
    image: crmImg,
    bg: 'bg-metal-3',
    vlabel: 'CRM · OPS',
  },
  {
    id: 'analytics',
    title: 'Analíticas de tu Negocio & Automatizaciones',
    description:
      'Métricas en tiempo real, paneles ejecutivos y workflows que automatizan tareas repetitivas. Decisiones con datos, escalables y sin fricción.',
    image: analyticsImg,
    bg: 'bg-metal-4',
    vlabel: 'DATA · AUTO',
  },
];

export default function ServicesSection() {
  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory">
      {sections.map(({ id, title, description, image, bg, vlabel }, index) => {
        const imageRight = index % 2 === 0; // alterna imagen derecha/izquierda
        const labelAlign = imageRight ? 'left' : 'right';

        return (
          <motion.section
            key={id}
            className={`h-screen snap-start relative flex flex-col md:flex-row items-stretch justify-center text-white ${bg}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Rótulo vertical que ocupa toda la altura */}
            <VerticalLabel text={vlabel} align={labelAlign} />

            {/* Columna de texto */}
            <div
              className={`flex-1 flex items-center ${
                imageRight ? 'md:order-1 md:pl-16 md:pr-8' : 'md:order-2 md:pr-16 md:pl-8'
              } px-6 py-12`}
              style={{ zIndex: 1 }}
            >
              <div className="max-w-xl mx-auto md:mx-0">
                <motion.h2
                  className="service-title text-3xl sm:text-4xl md:text-6xl font-bold mb-4"
                  initial={{ y: -30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                >
                  {title}
                </motion.h2>
                <motion.p
                  className="service-desc text-base sm:text-lg md:text-xl text-gray-200"
                  initial={{ y: -15, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {description}
                </motion.p>
              </div>
            </div>

            {/* Columna de imagen */}
            <motion.div
              className={`flex-1 flex items-center justify-center ${
                imageRight ? 'md:order-2 md:pr-16 md:pl-8' : 'md:order-1 md:pl-16 md:pr-8'
              } px-6 py-12`}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 180, damping: 16 }}
              style={{ zIndex: 1 }}
            >
              <img
                src={image}
                alt={title}
                className="service-image w-72 h-72 md:w-[28rem] md:h-[28rem] object-contain"
                draggable="false"
              />
            </motion.div>
          </motion.section>
        );
      })}
    </div>
  );
}

