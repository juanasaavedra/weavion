import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { ChevronDown, Cpu, Network, BarChart3, Workflow } from "lucide-react";

export default function NavTechMenus() {
  const { t } = useTranslation();
  const [openMobile, setOpenMobile] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const services = [
    { icon: <Cpu size={16} className="text-fuchsia-400" />, title: "Web Design & Development", desc: "Sites rápidos, accesibles y escalables", to: t('routes.services.web', '/services/web') },
    { icon: <Network size={16} className="text-fuchsia-400" />, title: "CRM / ServiceTitan", desc: "Integración, pipelines y automatización", to: t('routes.services.crm', '/services/crm-servicetitan') },
    { icon: <BarChart3 size={16} className="text-fuchsia-400" />, title: "Business analytics", desc: "Dashboards, métricas y BI", to: t('routes.services.analytics', '/services/analiticas-negocio') }
  ];

  const automations = [
    { icon: <Workflow size={16} className="text-fuchsia-400" />, title: "Generar citas", desc: "Agenda automática y recordatorios", to: t('routes.automation.appointments', '/services/genera-citas') },
    { icon: <Workflow size={16} className="text-fuchsia-400" />, title: "Cotizaciones inmediatas", desc: "Precios y propuestas al instante", to: t('routes.automation.quotes', '/services/cotizaciones') },
    { icon: <Workflow size={16} className="text-fuchsia-400" />, title: "Inventario inteligente", desc: "Consulta y actualización del stock", to: t('routes.automation.inventory', '/services/inventario') },
    { icon: <Workflow size={16} className="text-fuchsia-400" />, title: "Postventa inteligente", desc: "Seguimiento y NPS automatizado", to: t('routes.automation.postSale', '/services/postventa') }
  ];

  return (
    <div className="relative w-full">
      {/* --- MOBILE BAR --- */}
      <div className="md:hidden flex items-center justify-center">
        <button
          onClick={() => setOpenMobile(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-white/90 hover:text-white transition bg-white/0 hover:bg-white/5 ring-1 ring-white/10"
          aria-haspopup="menu"
          aria-expanded={openMobile}
        >
          <span className="text-sm">Services</span>
          <ChevronDown size={16} className="transition" />
        </button>
      </div>

      {openMobile && (
        <MobileCombinedMenu onClose={() => setOpenMobile(false)} services={services} automations={automations} />
      )}

      {/* --- DESKTOP --- */}
      <div className="hidden md:flex w-full justify-center items-center gap-2">
        <DropdownTrigger
          label="Services"
          items={services}
          isOpen={openMenu === 'services'}
          onOpen={() => setOpenMenu('services')}
          onClose={() => setOpenMenu(null)}
        />
        <DropdownTrigger
          label="Automate"
          items={automations}
          isOpen={openMenu === 'automate'}
          onOpen={() => setOpenMenu('automate')}
          onClose={() => setOpenMenu(null)}
        />
      </div>
    </div>
  );
}

function DropdownTrigger({ label, items, isOpen, onOpen, onClose }) {
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        onClick={() => (isOpen ? onClose() : onOpen())}
        className="group flex items-center gap-2 px-3 py-2 rounded-xl text-white/90 hover:text-white transition bg-white/0 hover:bg-white/5 ring-1 ring-transparent hover:ring-white/10"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <span className="text-sm">{label}</span>
        <ChevronDown size={16} className="transition" />
      </button>
      {isOpen && <Dropdown items={items} label={label} onClose={onClose} />}
    </div>
  );
}

function Dropdown({ items, label, onClose }) {
  return (
    <div className="absolute left-0 mt-2 w-[320px] rounded-2xl border border-white/10 bg-gradient-to-b from-black/90 to-black/70 backdrop-blur p-2 shadow-2xl">
      <div className="px-2 py-1 text-[11px] uppercase tracking-widest text-fuchsia-300/80">{label}</div>
      <div className="mt-1 space-y-1">
        {items.map((item, i) => (
          <Link
            key={i}
            to={item.to}
            onClick={onClose}
            className="group block rounded-xl p-[10px] transition relative overflow-hidden"
          >
            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10 group-hover:ring-fuchsia-400/30" />
            {i !== 0 && (
              <div className="absolute -top-[1px] left-2 right-2 h-px bg-gradient-to-r from-transparent via-fuchsia-400/20 to-transparent" />
            )}
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10">
                {item.icon}
              </div>
              <div>
                <div className="text-[13px] text-white font-medium leading-snug">{item.title}</div>
                <div className="text-xs text-white/60 mt-0.5">{item.desc}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileCombinedMenu({ onClose, services, automations }) {
  return (
    <div className="md:hidden fixed inset-0 z-50">
      <button
        className="absolute inset-0 bg-black/60 backdrop-blur"
        onClick={onClose}
        aria-label="Close"
      />
      <div className="absolute inset-x-3 top-16 bottom-6 rounded-2xl border border-white/10 bg-black/80 backdrop-blur overflow-y-auto shadow-2xl">
        <MobileGroup title="Services" items={services} onClose={onClose} />
        <Separator />
        <MobileGroup title="Automate" items={automations} onClose={onClose} />
      </div>
    </div>
  );
}

function MobileGroup({ title, items, onClose }) {
  return (
    <div className="p-3">
      <div className="px-1 pb-2 text-[11px] uppercase tracking-widest text-fuchsia-300/80">{title}</div>
      <ul className="space-y-2">
        {items.map((i, idx) => (
          <li key={idx}>
            <Link
              to={i.to}
              onClick={onClose}
              className="flex items-start gap-3 rounded-xl p-3 ring-1 ring-white/10 hover:ring-fuchsia-400/30 transition bg-white/[0.02]"
            >
              <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10">{i.icon}</div>
              <div>
                <div className="text-[13px] text-white font-medium leading-snug">{i.title}</div>
                <div className="text-xs text-white/60 mt-0.5">{i.desc}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Separator() {
  return <div className="h-px mx-3 my-2 bg-gradient-to-r from-transparent via-fuchsia-400/20 to-transparent" />;
}
