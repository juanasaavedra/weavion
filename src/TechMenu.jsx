import React from "react";
import { Link } from "react-router-dom";

// Dropdown menu used in the header for Services and Automate sections.
// It features a subtle purple gradient border and a dark glassy background.
export default function TechMenu({ items, onSelect, className = "" }) {
  return (
    <div
      className={`rounded-xl p-[1.5px] bg-gradient-to-r from-purple-600 to-purple-400 w-64 ${className}`}
      role="menu"
      aria-label="Services"
    >
      <div className="rounded-xl bg-black/80 backdrop-blur-sm py-2">
        {items.map((item, idx) => (
          <Link
            key={item.id}
            to={item.path}
            onClick={() => onSelect?.(item.id)}
            className={`block px-4 py-2 ${
              idx === 0 ? "text-white" : "text-gray-300"
            } hover:bg-purple-500/20 transition rounded-md`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

