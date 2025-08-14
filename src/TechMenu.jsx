import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function TechMenu({ items, onSelect, className = "" }) {
  const [active, setActive] = useState(items[0]?.id);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMove = (e) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      className={`relative rounded-2xl p-[2px] bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-400 ${className}`}
      role="menu"
      aria-label="Services"
    >
      {/* Glass background + spotlight */}
      <div
        className="relative rounded-2xl bg-black/70 backdrop-blur-md overflow-hidden"
        style={{
          maskImage: `radial-gradient(220px 220px at ${mouse.x}px ${mouse.y}px, #000 35%, transparent 65%)`,
          WebkitMaskImage: `radial-gradient(220px 220px at ${mouse.x}px ${mouse.y}px, #000 35%, transparent 65%)`,
        }}
      >
        {/* Sutil grid decorativa */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:24px_24px]"></div>

        {/* Lista */}
        <ul className="relative">
          {/* Pastilla animada detrás del activo */}
          <motion.div
            layout
            className="absolute left-2 right-2 h-[56px] rounded-xl bg-gradient-to-r from-purple-600/30 to-fuchsia-600/20 border border-white/10"
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
            style={{
              top: 8 + items.findIndex((i) => i.id === active) * (56 + 8),
            }}
          />
          {items.map((item, idx) => (
            <li key={item.id} className={idx > 0 ? "border-t border-white/10" : ""}>
              <Link
                role="menuitemradio"
                aria-checked={active === item.id}
                to={item.path}
                onClick={() => {
                  setActive(item.id);
                  onSelect?.(item.id);
                }}
                className="relative z-10 w-full text-left px-4 py-3.5 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/60 hover:bg-white/2 transition"
              >
                <div className="text-[15px] font-medium text-white/90">
                  {item.label}
                </div>
                {item.desc && (
                  <div className="text-xs text-white/60 mt-0.5">{item.desc}</div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

