import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Cpu, Network, BarChart3, Workflow } from "lucide-react";

export default function NavTechMenus() {
  const [openMobile, setOpenMobile] = useState(false);

  const services = [
    { icon: <Cpu size={16} className="text-fuchsia-400" />, title: "Web Design & Development", desc: "Sites rápidos, accesibles y escalables", to: "/services/web" },
    { icon: <Network size={16} className="text-fuchsia-400" />, title: "CRM / ServiceTitan", desc: "Integración, pipelines y automatización", to: "/services/crm" },
    { icon: <BarChart3 size={16} className="text-fuchsia-400" />, title: "Business analytics", desc: "Dashboards, métricas y BI", to: "/services/analytics" }
  ];

  const automations = [
    { icon: <Workflow size={16} className="text-fuchsia-400" />, title: "Lead intake → Sheets/DB", desc: "Formularios conectados a tu data", to: "/automate/intake" },
    { icon: <Workflow size={16} className="text-fuchsia-400" />, title: "Emails inteligentes", desc: "Respuestas según reglas y contexto", to: "/automate/emails" },
    { icon: <Workflow size={16} className="text-fuchsia-400" />, title: "Bots/agents n8n + Python", desc: "Flujos y agentes para operaciones", to: "/automate/agents" }
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
      <div className="hidden md:flex items-center gap-2">
        <DropdownTrigger label="Services" items={services} />
        <DropdownTrigger label="Automate" items={automations} />
      </div>
    </div>
  );
}

function DropdownTrigger({ label, items }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="group flex items-center gap-2 px-3 py-2 rounded-xl text-white/90 hover:text-white transition bg-white/0 hover:bg-white/5 ring-1 ring-transparent hover:ring-white/10"
      >
        <span className="text-sm">{label}</span>
        <ChevronDown size={16} className="transition" />
      </button>
      {open && <Dropdown items={items} label={label} onClose={() => setOpen(false)} />}
    </div>
  );
}

function Dropdown({ items, label, onClose }) {
  return (
    <div
      onMouseLeave={onClose}
      className="absolute left-0 mt-2 w-[320px] rounded-2xl border border-white/10 bg-gradient-to-b from-black/90 to-black/70 backdrop-blur p-2 shadow-2xl"
    >
      <div className="px-2 py-1 text-[11px] uppercase tracking-widest text-fuchsia-300/80">{label}</div>
      <div className="mt-1 space-y-1">
        {items.map((item, i) => (
          <Link key={i} to={item.to} className="group block rounded-xl p-[10px] transition relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10 group-hover:ring-fuchsia-400/30" />
            {i !== 0 && <div className="absolute -top-[1px] left-2 right-2 h-px bg-gradient-to-r from-transparent via-fuchsia-400/20 to-transparent" />}
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10">{item.icon}</div>
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
      <button className="absolute inset-0 bg-black/60 backdrop-blur" onClick={onClose} aria-label="Close" />
      <div className="absolute inset-x-3 top-16 bottom-6 rounded-2xl border border-white/10 bg-black/80 backdrop-blur overflow-y-auto shadow-2xl">
        <MobileGroup title="Services" items={services} />
        <Separator />
        <MobileGroup title="Automate" items={automations} />
      </div>
    </div>
  );
}

function MobileGroup({ title, items }) {
  return (
    <div className="p-3">
      <div className="px-1 pb-2 text-[11px] uppercase tracking-widest text-fuchsia-300/80">{title}</div>
      <ul className="space-y-2">
        {items.map((i, idx) => (
          <li key={idx}>
            <Link to={i.to} className="flex items-start gap-3 rounded-xl p-3 ring-1 ring-white/10 hover:ring-fuchsia-400/30 transition bg-white/[0.02]">
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
