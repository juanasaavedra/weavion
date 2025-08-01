import { useState } from "react";
import { motion } from "framer-motion";

import { useTranslation } from 'react-i18next';

const getCardsData = (t) => [
  {
    id: 1,
    title: t('folder.webDesign.title', 'Diseño web'),
    short: t('folder.webDesign.short', 'Diseño atractivo y funcional'),
    detail: t('folder.webDesign.detail', 'Diseñamos interfaces atractivas, intuitivas y centradas en el usuario, asegurando una experiencia visual coherente y profesional.')
  },
  {
    id: 2,
    title: t('folder.serviceTitan.title', 'Integración a ServiceTitan'),
    short: t('folder.serviceTitan.short', 'Automatiza tu operación'),
    detail: t('folder.serviceTitan.detail', 'Integramos tu negocio con ServiceTitan para automatizar procesos, mejorar la gestión y conectar tus sistemas de manera eficiente.')
  },
  {
    id: 3,
    title: t('folder.analytics.title', 'Analíticas de negocio y predicción de inventario'),
    short: t('folder.analytics.short', 'Toma decisiones inteligentes'),
    detail: t('folder.analytics.detail', 'Implementamos sistemas de analítica avanzada y predicción de inventario usando IA, para que tomes decisiones informadas y optimices tus recursos.')
  },
  {
    id: 4,
    title: t('folder.emailMarketing.title', 'Email marketing'),
    short: t('folder.emailMarketing.short', 'Conecta con tus clientes'),
    detail: t('folder.emailMarketing.detail', 'Diseñamos campañas de email marketing automatizadas que fidelizan y convierten, integradas con tus herramientas de ventas.')
  },
];

export default function Stack({
  cardDimensions = { width: "80%", height: "auto" },
  cardsData: propCardsData,
  fontSizeTitle = "text-xl md:text-3xl",
  fontSizeShort = "text-base md:text-xl",
  fontSizeDetail = "text-base md:text-xl",
}) {
  const { t } = useTranslation();
  const dynamicCardsData = getCardsData(t);
  const cards = propCardsData || dynamicCardsData;
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(true);

  const spread = 30; // Reducimos el espacio entre tarjetas
  const scaleStep = 0.05; // Reducimos la diferencia de escala
  const maxVisible = 2;

  // Navegación circular
  const goTo = (idx) => {
    setActiveIndex((idx + cards.length) % cards.length);
    setExpanded(true);
  };



  return (
    <div
      className="relative flex items-center justify-center select-none mx-auto card-stack-container"
      style={{
        perspective: 600,
        perspectiveOrigin: '50% 50%',
        transformStyle: 'preserve-3d',
        maxWidth: "600px", // Aumentamos el ancho máximo
        marginBottom: "40px",
        overflow: "visible" // Allow cards to remain visible
      }}
    >
      {/* Stack de tarjetas */}
      {cards.map((card, i) => {
        // Offset circular para simetría perfecta
        let offset = i - activeIndex;
        if (offset > cards.length / 2) offset -= cards.length;
        if (offset < -cards.length / 2) offset += cards.length;
        const absOffset = Math.abs(offset);
        if (absOffset > maxVisible) return null;
        const isActive = i === activeIndex;
        // Ángulo reducido para evitar que las tarjetas se salgan de pantalla
        const rotationAngle = window.innerWidth < 768 ? offset * 5 : offset * 6;
        // Centrado perfectoleft 50% y translateX(-50% + offset)
        return (
          <motion.div
            key={card.id}
            className={`container-rounded bg-white shadow-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 px-6 py-8 border-0`}
            style={{
              width: window.innerWidth < 640 ? (isActive ? "270px" : "240px") : (isActive ? "320px" : "280px"),
              height: window.innerWidth < 640 ? (isActive ? "280px" : "240px") : (isActive ? "330px" : "290px"),
              position: 'absolute',
              left: '50%',
              top: '50%',
              zIndex: isActive ? 20 : 10 - absOffset,
              boxShadow: isActive ? '0 10px 30px 0 rgba(0, 0, 0, 0.15)' : '0 4px 12px 0 rgba(0, 0, 0, 0.1)',
              marginBottom: "0px",
              overflow: "hidden"
            }}
            animate={{
              scale: isActive && expanded ? 1.08 : 1 - absOffset * scaleStep,
              rotate: rotationAngle * 0.3, // Rotación mucho menos pronunciada
              opacity: 1 - absOffset * 0.08, // Aún menos diferencia de opacidad
              filter: isActive && expanded ? 'brightness(1)' : 'brightness(0.95)',
              x: offset * (window.innerWidth < 768 ? 30 : 40), // Mayor separación entre tarjetas
              y: offset * (window.innerWidth < 768 ? 5 : 8) // Ligero desplazamiento vertical
            }}
            transformTemplate={(transform) => `translate(-50%, -50%) ${transform}`}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            onClick={() => {
              if (isActive) {
                setExpanded((prev) => !prev);
              } else {
                goTo(i);
              }
            }}
          >
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className={`${fontSizeTitle} font-bold text-[#0A122E] mb-2 subtitle`}>
                {isActive && expanded ? card.title : card.short}
              </div>
              <div className={`${isActive && expanded ? fontSizeDetail : fontSizeShort} text-[#2A2C37] body-text`}>
                {isActive && expanded ? (
                  <div className={`w-full text-center ${fontSizeDetail} text-[#2A2C37] px-4 break-words min-h-[3.5rem]`}>{card.detail}</div>
                ) : null}
              </div>
            </div>
            {isActive && expanded && (
              <div className="text-xs text-[#0A122E] pb-2 cursor-pointer select-none">{t('folder.clickToCollapse', 'Haz clic para colapsar')}</div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
} 
