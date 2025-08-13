import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const PALETTE = {
  purpleDark: "#39166F",
  purpleBright: "#7328E8",
  blackPurple: "#170E26",
  grayLight: "#ACACAC",
  grayDark: "#565758",
};

export const GradientBg = ({ children }) => (
  <div
    className="min-h-screen w-full overflow-hidden text-white"
    style={{
      background: `radial-gradient(60% 80% at 20% 20%, rgba(255,255,255,.06), rgba(0,0,0,0) 60%), linear-gradient(120deg, ${PALETTE.blackPurple}, ${PALETTE.purpleDark})`,
    }}
  >
    <div className="pointer-events-none absolute inset-0 -z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 0.5, scale: [0.85, 1.05, 0.95] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-28 -left-28 h-72 w-72 rounded-full blur-3xl"
        style={{
          background:
            "conic-gradient(from 90deg, #7328E8, rgba(115,40,232,.1), #39166F)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.35, scale: [1, 1.1, 0.95] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 h-[22rem] w-[22rem] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, #7328E8 0%, transparent 60%)",
        }}
      />
    </div>
    {children}
  </div>
);

export const CTAButton = ({ children }) => (
  <motion.button
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.98 }}
    className="group relative inline-flex items-center gap-2 rounded-full border-2 px-8 md:px-12 py-3 text-base whitespace-nowrap md:min-w-[260px]"
    style={{ borderColor: PALETTE.purpleBright, color: PALETTE.grayLight }}
  >
    <span
      className="h-2 w-2 rounded-full"
      style={{ background: PALETTE.purpleBright }}
    />
    {children}
    <ArrowRight
      className="transition-transform group-hover:translate-x-0.5"
      size={18}
    />
  </motion.button>
);

export function FormInput({ label, name, value, onChange, type = "text", required }) {
  return (
    <label className="block text-sm">
      <span
        className="mb-1 inline-block"
        style={{ color: PALETTE.grayLight }}
      >
        {label}
        {required && <span className="text-red-300"> *</span>}
      </span>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        className="w-full rounded-xl border bg-black/30 px-3 py-2 text-white outline-none focus:ring"
        style={{ borderColor: "rgba(172,172,172,.2)" }}
        required={required}
      />
    </label>
  );
}

export function FormTextarea({ label, name, value, onChange, required }) {
  return (
    <label className="block text-sm">
      <span
        className="mb-1 inline-block"
        style={{ color: PALETTE.grayLight }}
      >
        {label}
        {required && <span className="text-red-300"> *</span>}
      </span>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={5}
        className="w-full resize-none rounded-xl border bg-black/30 px-3 py-2 text-white outline-none focus:ring"
        style={{ borderColor: "rgba(172,172,172,.2)" }}
        required={required}
      />
    </label>
  );
}

export function FormSelect({ label, name, value, onChange, options = [] }) {
  return (
    <label className="block text-sm">
      <span
        className="mb-1 inline-block"
        style={{ color: PALETTE.grayLight }}
      >
        {label}
      </span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border bg-black/30 px-3 py-2 text-white outline-none focus:ring"
        style={{ borderColor: "rgba(172,172,172,.2)" }}
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-black">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

