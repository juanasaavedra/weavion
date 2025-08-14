import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import logo from './assets/logo.png';

export default function Header() {
  const { t, i18n } = useTranslation();

  const [openMenu, setOpenMenu] = useState(null);

  const servicesItems = useMemo(
    () => [
      {
        label: t('header.servicesItems.webDev'),
        path: t('routes.services.web'),
      },
      {
        label: t('header.servicesItems.crm'),
        path: t('routes.services.crm'),
      },
      {
        label: t('header.servicesItems.analytics'),
        path: t('routes.services.analytics'),
      },
    ],
    [i18n.language, t]
  );

  const automationItems = useMemo(
    () => [
      {
        label: t('header.automationItems.appointments'),
        path: t('routes.automation.appointments'),
      },
      {
        label: t('header.automationItems.inventory'),
        path: t('routes.automation.inventory'),
      },
      {
        label: t('header.automationItems.quotes'),
        path: t('routes.automation.quotes'),
      },
      {
        label: t('header.automationItems.postSale'),
        path: t('routes.automation.postSale'),
      },
    ],
    [i18n.language, t]
  );

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
            <DropdownMenu
              id="services"
              title={t('header.services', 'Servicios')}
              items={servicesItems}
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
            />
            <DropdownMenu
              id="automation"
              title={t('header.automation', 'Automatiza')}
              items={automationItems}
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
            />
          </div>
        </div>

      {/* Selector idioma */}
      <LanguageSelector />
    </div>
  );
}

function DropdownMenu({ id, title, items, openMenu, setOpenMenu }) {
  const menuRef = useRef(null);
  const closeTimer = useRef();

  const open = openMenu === id;

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [setOpenMenu]);

  const handleEnter = () => {
    clearTimeout(closeTimer.current);
    setOpenMenu(id);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpenMenu((current) => (current === id ? null : current)), 900);
  };

  return (
    <div
      ref={menuRef}
      className="relative flex-1"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        onClick={() => setOpenMenu(open ? null : id)}
        className="flex w-full items-center justify-center gap-2 px-6 py-3 font-argent text-white text-sm md:text-base"
      >
        <span>{title}</span>
        <ChevronDown className="w-3 h-3" />
      </button>
      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 rounded-xl bg-black/40 backdrop-blur-lg border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.3)] overflow-hidden">
          {items.map(({ label, path }, idx) => (
            <Link
              key={idx}
              to={path}
              onClick={() => setOpenMenu(null)}
              className="group relative block w-full px-5 py-3 text-left text-white/80 transition-all duration-300 hover:text-white border-t border-white/10 first:border-t-0"
            >
              <span className="absolute left-0 top-0 h-full w-0 bg-purple-400 transition-all duration-300 group-hover:w-1"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-700/30 to-purple-400/30 bg-[length:200%_100%] bg-left transition-all duration-500 group-hover:bg-right opacity-0 group-hover:opacity-100"></span>
              <span className="relative z-10 block transition-transform duration-300 group-hover:translate-x-1">
                {label}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
