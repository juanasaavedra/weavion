import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import logo from './assets/logo.png';

export default function Header() {
  const { t } = useTranslation();

  const servicesItems = [
    {
      label: t('header.servicesItems.webDev', 'Diseño y Desarrollo web'),
      path: t('routes.services.web', '/services/web'),
    },
    {
      label: t('header.servicesItems.crm', 'Integración a CRM o Service Titan'),
      path: t('routes.services.crm', '/services/crm-servicetitan'),
    },
    {
      label: t('header.servicesItems.analytics', 'Analíticas de negocio'),
      path: t('routes.services.analytics', '/services/analiticas-negocio'),
    },
  ];

  const automationItems = [
    {
      label: t('header.automationItems.appointments', 'Genera citas'),
      path: t('routes.automation.appointments', '/services/genera-citas'),
    },
    {
      label: t('header.automationItems.inventory', 'Charla con tu inventario y modifícalo'),
      path: t('routes.automation.inventory', '/services/inventario'),
    },
    {
      label: t('header.automationItems.quotes', 'Entrega cotizaciones inmediatas'),
      path: t('routes.automation.quotes', '/services/cotizaciones'),
    },
    {
      label: t('header.automationItems.postSale', 'Postventa inteligente'),
      path: t('routes.automation.postSale', '/services/postventa'),
    },
  ];

  return (
    <div className="fixed top-4 inset-x-0 z-50 flex items-center px-4 md:px-8 drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)]">
      {/* Logo izquierda */}
        <Link to="/" className="mr-4 md:mr-8">
          <div className="w-14 h-14 rounded-full overflow-hidden">
            <img src={logo} alt="Weavion logo" className="w-full h-full object-cover" />
          </div>
        </Link>

      {/* Menús intermedios */}
        <div className="flex-1 flex items-center justify-center">
          <div className="glass-high rounded-2xl flex flex-row">
            <DropdownMenu title={t('header.services', 'Servicios')} items={servicesItems} />
            <DropdownMenu title={t('header.automation', 'Automatiza')} items={automationItems} />
          </div>
        </div>

      {/* Selector idioma */}
      <LanguageSelector />
    </div>
  );
}

function DropdownMenu({ title, items }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const closeTimer = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleEnter = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 900);
  };

  return (
    <div
      ref={menuRef}
      className="relative flex-1"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-center gap-2 px-6 py-3 font-argent text-white text-sm md:text-base"
      >
        <span>{title}</span>
        <ChevronDown className="w-3 h-3" />
      </button>
      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-4 w-full max-w-xl md:max-w-3xl glass-high rounded-2xl flex flex-col md:flex-row gap-4 p-4 text-white">
          {items.map(({ label, path }, idx) => (
            <Link
              key={idx}
              to={path}
              onClick={() => setOpen(false)}
              className="flex-1 text-center py-3 rounded-xl hover:bg-white/10 transition"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
