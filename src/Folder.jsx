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
  const handlePrev = (e) => {
    e.stopPropagation();
    goTo(activeIndex - 1);
  };
  const handleNext = (e) => {
    e.stopPropagation();
    goTo(activeIndex + 1);
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
      {/* Flecha izquierda */}
      <button
        aria-label="Anterior"
        className="absolute left-0 z-20 bg-[#FFD100] text-[#202020] rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-[#FFEE32] transition"
        onClick={handlePrev}
        style={{ top: '50%', transform: 'translateY(-50%)' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 18l-6-6 6-6" stroke="#202020" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      {/* Flecha derecha */}
      <button
        aria-label="Siguiente"
        className="absolute right-0 z-20 bg-[#FFD100] text-[#202020] rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-[#FFEE32] transition"
        onClick={handleNext}
        style={{ top: '50%', transform: 'translateY(-50%)' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 6l6 6-6 6" stroke="#202020" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      {/* Stack de tarjetas */}
      {cards.map((card, i) => {
        // Offset circular para simetría perfecta
        let offset = i - activeIndex;
        if (offset > cards.length / 2) offset -= cards.length;
        if (offset < -cards.length / 2) offset += cards.length;
        const absOffset = Math.abs(offset);
        if (absOffset > maxVisible) return null;
        const isActive = i === activeIndex;
        // Centrado perfecto: left 50% y translateX(-50% + offset)
        return (
          <motion.div
            key={card.id}
            className={`rounded-2xl border-2 border-black bg-white shadow-xl flex flex-col items-center justify-center cursor-pointer font-sans transition-all duration-300`}
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
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 text-center">
              <div className="text-xl md:text-2xl font-bold text-[#202020] mb-2 font-sans">
                {isActive && expanded ? card.title : card.short}
              </div>
              <div className="text-base text-[#202020] font-normal font-sans">
                {isActive && expanded ? card.detail : null}
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
