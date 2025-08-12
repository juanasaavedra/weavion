import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t, i18n } = useTranslation();
  const toggleLang = () => i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');

  const servicesItems = [
    {
      label: t('header.servicesItems.webDev', 'Diseño y Desarrollo web'),
      path: '/services/web',
    },
    {
      label: t('header.servicesItems.crm', 'Integración a CRM o Service Titan'),
      path: '/services/crm',
    },
    {
      label: t('header.servicesItems.analytics', 'Analíticas de negocio'),
      path: '/services/analiticas',
    },
  ];

  const automationItems = [
    {
      label: t('header.automationItems.appointments', 'Genera citas'),
      path: '/automation/genera-citas',
    },
    {
      label: t('header.automationItems.inventoryChat', 'Charla con tu inventario y modifícalo'),
      path: '/automation/inventario-chat',
    },
    {
      label: t('header.automationItems.leads', 'Captura y califica tus leads'),
      path: '/automation/captura-califica-leads',
    },
    {
      label: t('header.automationItems.quotes', 'Entrega cotizaciones inmediatas y ten una postventa inteligente'),
      path: '/automation/cotizaciones-postventa',
    },
    {
      label: t('header.automationItems.contact', '¿Buscas algo más? Contáctanos'),
      path: '/automation/contacto',
    },
  ];

  return (
    <div className="fixed top-8 inset-x-0 z-50 flex items-center px-8">
      {/* Logo izquierda */}
      <Link to="/" className="mr-8">
        <img src="/logo.svg" alt="Logo" className="w-14 h-14 object-contain rounded-full" />
      </Link>

      {/* Menús intermedios */}
      <div className="flex-1 flex items-center justify-center space-x-8">
        <DropdownMenu title={t('header.services', 'Servicios')} items={servicesItems} />
        <DropdownMenu title={t('header.automation', 'Automatiza tu operación')} items={automationItems} />
      </div>

      {/* Selector idioma con borde degradado */}
      <button
        onClick={toggleLang}
        className="transition group flex h-10 w-20 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 p-[2px] text-white duration-300 hover:bg-gradient-to-l hover:shadow-2xl hover:shadow-purple-600/30"
      >
        <div className="flex h-full w-full items-center justify-center rounded-full bg-black">
          {i18n.language === 'es' ? 'EN' : 'ES'}
        </div>
      </button>
    </div>
  );
}

function DropdownMenu({ title, items }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={menuRef} className="relative mx-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="cursor-pointer text-white px-4 py-2 rounded-md font-argent"
      >
        {title}
      </button>
      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-4 glass rounded-2xl grid grid-rows-2 grid-flow-col gap-4 p-4 text-white">
          {items.map(({ label, path }, idx) => (
            <Link
              key={idx}
              to={path}
              onClick={() => setOpen(false)}
              className="group w-40 h-40 rounded-2xl p-[2px] bg-gradient-to-r from-purple-400 to-purple-700 text-white transition duration-300 hover:bg-gradient-to-l hover:shadow-2xl hover:shadow-purple-600/30"
            >
              <div className="flex h-full w-full items-center justify-center rounded-2xl bg-black text-center transition duration-300 ease-in-out group-hover:bg-gradient-to-br group-hover:from-gray-700 group-hover:to-gray-900 font-argent">
                {label}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
