import React from 'react';

/**
 * BenefitRail
 * - Mobile: carrusel horizontal con snap
 * - Desktop: grid de 3/4 columnas
 * - Pills con ancho mínimo para evitar texto “vertical”
 */
export default function BenefitRail({
  title,
  subtitle,
  items = [],
  className = '',
}) {
  return (
    <section className={`benefit-section ${className}`}>
      {title && <h3 className="benefit-title">{title}</h3>}
      {subtitle && <p className="benefit-sub">{subtitle}</p>}

      {/* Rail (mobile) */}
      <div className="benefit-rail" role="list">
        {items.map((label, i) => (
          <button key={i} role="listitem" className="benefit-pill" type="button">
            <span className="pill-glow" aria-hidden="true" />
            <span className="pill-text">{label}</span>
          </button>
        ))}
      </div>

      {/* Grid (desktop) */}
      <div className="benefit-grid" role="list">
        {items.map((label, i) => (
          <div key={`g-${i}`} role="listitem" className="benefit-pill is-grid">
            <span className="pill-glow" aria-hidden="true" />
            <span className="pill-text">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

