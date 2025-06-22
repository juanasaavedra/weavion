import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const darkenColor = (hex, percent) => {
  let color = hex.startsWith("#") ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return (
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  );
};

const WebSVG = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="10" width="30" height="20" rx="4" fill="#3B82F6"/>
    <rect x="10" y="15" width="20" height="10" rx="2" fill="white"/>
    <circle cx="20" cy="25" r="2" fill="#3B82F6"/>
  </svg>
);
const MobileSVG = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="13" y="8" width="14" height="24" rx="3" fill="#3B82F6"/>
    <rect x="15" y="12" width="10" height="16" rx="1" fill="white"/>
    <circle cx="20" cy="28" r="1.5" fill="#3B82F6"/>
  </svg>
);
const AiSVG = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="12" fill="#3B82F6"/>
    <rect x="14" y="14" width="12" height="12" rx="6" fill="white"/>
    <circle cx="20" cy="20" r="3" fill="#3B82F6"/>
  </svg>
);

const Folder = ({
  color = "#111827",
  size = 2,
  items = [],
  open,
  setOpen,
  className = "",
}) => {
  const maxItems = 3;
  const defaultData = [
    {
      title: "Desarrollo Web",
      description: "Sitios web modernos, rápidos y responsivos para tu negocio.",
      svg: <WebSVG />,
    },
    {
      title: "Apps Móviles",
      description: "Aplicaciones móviles nativas y multiplataforma para iOS y Android.",
      svg: <MobileSVG />,
    },
    {
      title: "Inteligencia Artificial",
      description: "Soluciones de IA para automatizar y potenciar tu empresa.",
      svg: <AiSVG />,
    },
  ];
  const papers = items.length && typeof items[0] === 'object' && items[0].title ? items.slice(0, maxItems) : defaultData;
  while (papers.length < maxItems) {
    papers.push(defaultData[papers.length]);
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1: next, -1: prev

  const folderBackColor = darkenColor(color, 0.08);

  const handleClick = () => {
    if (setOpen && !open) setOpen(true);
    else {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % maxItems);
    }
  };

  // Slide variants
  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0,
      position: 'absolute',
    }),
    center: {
      x: 0,
      opacity: 1,
      position: 'relative',
      zIndex: 50,
    },
    exit: (dir) => ({
      x: dir > 0 ? -200 : 200,
      opacity: 0,
      position: 'absolute',
    }),
  };

  const scaleStyle = { transform: `scale(${size})` };

  return (
    <div style={scaleStyle} className={className}>
      {/* Overlay para cerrar al hacer clic fuera */}
      {open && (
        <div
          className="fixed inset-0 z-40 cursor-pointer"
          style={{ background: 'transparent' }}
          onClick={() => setOpen && setOpen(false)}
        />
      )}
      <div
        className={`group relative transition-all duration-300 ease-in cursor-pointer shadow-[0_0_32px_0_rgba(59,130,246,0.5)] bg-[#232b3e] bg-opacity-95 border-4 border-blue-400 rounded-3xl flex flex-col items-center justify-center z-50`}
        style={{
          boxShadow: '0 0 32px 0 rgba(59,130,246,0.5)',
          transform: open ? "translateY(-12px)" : undefined,
          padding: '24px 32px',
          minWidth: 220,
          minHeight: 160,
        }}
        onClick={handleClick}
      >
        <div
          className="relative w-[120px] h-[100px] rounded-tl-0 rounded-tr-[18px] rounded-br-[18px] rounded-bl-[18px] flex items-center justify-center mx-auto"
          style={{ backgroundColor: folderBackColor }}
        >
          <span
            className="absolute z-0 bottom-[98%] left-0 w-[40px] h-[14px] rounded-tl-[8px] rounded-tr-[8px] rounded-bl-0 rounded-br-0"
            style={{ backgroundColor: folderBackColor }}
          ></span>
          {/* Slide de tarjeta activa */}
          <AnimatePresence custom={direction} mode="wait">
            {open && (
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-blue-400 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-6 text-center bg-[#181f2f] w-44 h-60 z-50"
                style={{ boxShadow: '0 8px 32px 0 rgba(59,130,246,0.25)' }}
              >
                <div className="mb-2" style={{width:40, height:40}}>{papers[activeIndex].svg}</div>
                <div className="text-base font-bold text-white mb-1">{papers[activeIndex].title}</div>
                <div className="text-gray-300 text-xs leading-tight">{papers[activeIndex].description}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Folder; 