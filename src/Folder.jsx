import { useState } from "react";
import { motion } from "framer-motion";

const cardsData = [
  {
    id: 1,
    title: 'Desarrollo web',
    short: 'Webs modernas y rápidas',
    detail: 'Creamos sitios web modernos, rápidos y responsivos, adaptados a las necesidades de tu negocio, optimizados para SEO y con las mejores prácticas de accesibilidad.'
  },
  {
    id: 2,
    title: 'Diseño web',
    short: 'Diseño atractivo y funcional',
    detail: 'Diseñamos interfaces atractivas, intuitivas y centradas en el usuario, asegurando una experiencia visual coherente y profesional.'
  },
  {
    id: 3,
    title: 'Integración a ServiceTitan',
    short: 'Automatiza tu operación',
    detail: 'Integramos tu negocio con ServiceTitan para automatizar procesos, mejorar la gestión y conectar tus sistemas de manera eficiente.'
  },
  {
    id: 4,
    title: 'Analíticas de negocio y predicción de inventario',
    short: 'Toma decisiones inteligentes',
    detail: 'Implementamos sistemas de analítica avanzada y predicción de inventario usando IA, para que tomes decisiones informadas y optimices tus recursos.'
  },
];

export default function Stack({
  cardDimensions = { width: 260, height: 260 },
  cardsData: propCardsData,
  fontSizeTitle = "text-xl md:text-3xl",
  fontSizeShort = "text-base md:text-xl",
  fontSizeDetail = "text-base md:text-xl",
}) {
  const cards = propCardsData || cardsData;
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(true);

  const spread = 60;
  const scaleStep = 0.08;
  const maxVisible = 2;

  // Navegación circular
  const goTo = (idx) => {
    setActiveIndex((idx + cards.length) % cards.length);
    setExpanded(true);
  };

  // Ajustar el ancho del contenedor para que nunca corte las cartas laterales
  const containerWidth = cardDimensions.width + spread * maxVisible * 2 + 40;

  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{
        width: containerWidth,
        height: cardDimensions.height + 40,
        perspective: 600,
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
        // Centrado perfectoleft 50% y translateX(-50% + offset)
        return (
          <motion.div
            key={card.id}
            className={`rounded-2xl bg-white shadow-xl flex flex-col items-center justify-center cursor-pointer font-sans transition-all duration-300 px-6 py-8`}
            style={{
              width: cardDimensions.width,
              height: cardDimensions.height,
              position: 'absolute',
              left: '50%',
              top: '50%',
              zIndex: isActive ? 20 : 10 - absOffset,
              boxShadow: isActive ? '0 8px 32px 0 rgba(255,221,0,0.18)' : '0 2px 8px 0 rgba(0,0,0,0.10)',
            }}
            animate={{
              x: 0,
              y: 0,
              scale: isActive && expanded ? 1.12 : 1 - absOffset * scaleStep,
              rotate: offset * 8,
              opacity: 1 - absOffset * 0.18,
              filter: isActive && expanded ? 'brightness(1)' : 'brightness(0.95)',
              translateX: `calc(-50% + ${offset * spread}px)`
            }}
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
              <div className={`${fontSizeTitle} font-bold text-[#202020] mb-2 font-sans`}>
                {isActive && expanded ? card.title : card.short}
              </div>
              <div className={`${isActive && expanded ? fontSizeDetail : fontSizeShort} text-[#202020] font-normal font-sans`}>
                {isActive && expanded ? (
                  <div className={`w-full text-center ${fontSizeDetail} text-black px-4 break-words min-h-[3.5rem] font-normal`}>{card.detail}</div>
                ) : null}
              </div>
            </div>
            {isActive && expanded && (
              <div className="text-xs text-[#202020] pb-2 cursor-pointer select-none opacity-60">Haz clic para colapsar</div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
} 
