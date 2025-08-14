import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import logo from './assets/logo.png';
import TechMenu from './TechMenu';

export default function Header() {
  const { t, i18n } = useTranslation();

  const [openMenu, setOpenMenu] = useState(null);

  const servicesItems = useMemo(
    () => [
      {
        id: 'web',
        label: t('header.servicesItems.webDev'),
        path: t('routes.services.web'),
      },
      {
        id: 'crm',
        label: t('header.servicesItems.crm'),
        path: t('routes.services.crm'),
      },
      {
        id: 'analytics',
        label: t('header.servicesItems.analytics'),
        path: t('routes.services.analytics'),
      },
    ],
    [i18n.language, t]
  );

  const automationItems = useMemo(
    () => [
      {
        id: 'appointments',
        label: t('header.automationItems.appointments'),
        path: t('routes.automation.appointments'),
      },
      {
        id: 'inventory',
        label: t('header.automationItems.inventory'),
        path: t('routes.automation.inventory'),
      },
      {
        id: 'quotes',
        label: t('header.automationItems.quotes'),
        path: t('routes.automation.quotes'),
      },
      {
        id: 'postSale',
        label: t('header.automationItems.postSale'),
        path: t('routes.automation.postSale'),
      },
    ],
    [i18n.language, t]
  );

  const allItems = useMemo(
    () => [...servicesItems, ...automationItems],
    [servicesItems, automationItems]
  );

  return (
    <div className="fixed top-4 inset-x-0 z-50 flex items-center px-4 md:px-8 drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)]">
      {/* Logo izquierda */}
        <Link to="/" className="mr-4 md:mr-8">
          <div className="w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden">
            <img src={logo} alt="Weavion logo" className="w-full h-full object-cover" />
          </div>
        </Link>

      {/* Menús intermedios */}
        <div className="flex-1 flex items-center justify-center">
          <div className="glass-high rounded-2xl flex">
            <div className="hidden md:flex flex-row">
              <DropdownMenu
                id="services"
                title={t('header.services', 'Servicios')}
                items={servicesItems}
                defaultPath="/services"
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
              />
              <DropdownMenu
                id="automation"
                title={t('header.automation', 'Automatiza')}
                items={automationItems}
                defaultPath={automationItems[0]?.path}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
              />
            </div>
            <div className="md:hidden flex">
              <DropdownMenu
                id="all"
                title={t('header.services', 'Servicios')}
                items={allItems}
                defaultPath={servicesItems[0]?.path}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
              />
            </div>
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
          type="button"
          onClick={() => setOpenMenu(open ? null : id)}
          className="flex w-full items-center justify-center gap-2 px-6 py-3 font-argent text-white text-sm md:text-base"
        >
          <span>{title}</span>
          <ChevronDown className="w-3 h-3" />
        </button>
      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-2">
          <TechMenu items={items} onSelect={() => setOpenMenu(null)} />
        </div>
      )}
    </div>
  );
}
