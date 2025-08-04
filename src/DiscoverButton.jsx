import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**
 * DiscoverButton
 * Navega a la sección de servicios full-screen por defecto.
 * Acepta enlaces externos si 'to' comienza con http(s).
 */
export default function DiscoverButton({
  to = '/full-screen-services-button',
  className = '',
  rounded = true
}) {
  const { t } = useTranslation();

  // Detecta si la URL es externa (http o https)
  const isExternal = /^https?:\/\//.test(to);

  // Clases base para el botón
  const classes = [
    'inline-block text-2xl font-bold button-text',
    rounded ? 'btn-rounded' : 'btn-primary',
    'hover:scale-105 transition-all duration-300',
    className
  ]
    .filter(Boolean)
    .join(' ');

  // Etiqueta traducida, fallback 'Descúbrelo'
  const label = t('common.discover', 'Descúbrelo');

  if (isExternal) {
    return (
      <a href={to} className={classes} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  }

  return (
    <Link to={to} className={classes}>
      {label}
    </Link>
  );
}
