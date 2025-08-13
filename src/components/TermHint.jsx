import React, { useId, useState } from 'react';

/**
 * TermHint
 * Muestra un “link” subrayado (accesible) que despliega una burbuja con definición.
 * - Hover / Focus / Tap: abre la burbuja
 * - Esc o click fuera: cierra
 */
export default function TermHint({ term, children, placement = 'top' }) {
  const id = useId();
  const [open, setOpen] = useState(false);

  const toggle = (e) => {
    // soportar tap en móvil sin saltar la página
    if (e) e.preventDefault();
    setOpen((v) => !v);
  };

  return (
    <span className="termhint-wrapper" onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        className="termhint-link"
        aria-expanded={open}
        aria-controls={`hint-${id}`}
        onMouseEnter={() => setOpen(true)}
        onFocus={() => setOpen(true)}
        onClick={toggle}
        onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
      >
        {term}
      </button>

      <span
        id={`hint-${id}`}
        role="tooltip"
        className={`termhint-bubble ${open ? 'is-open' : ''} ${placement}`}
      >
        {children}
      </span>
    </span>
  );
}
