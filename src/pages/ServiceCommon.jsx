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
  <div className="min-h-screen w-full overflow-hidden bg-[radial-gradient(60%_80%_at_20%_20%,rgba(255,255,255,.06),rgba(0,0,0,0)_60%),linear-gradient(120deg,#170E26,#39166F)] text-white">
    <div className="pointer-events-none absolute inset-0 -z-10">
      {/* Blobs animados */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.5, scale: [0.8, 1.05, 0.9] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "conic-gradient(from 90deg, #7328E8, rgba(115,40,232,.1), #39166F)" }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.35, scale: [1, 1.1, 0.95] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 h-[22rem] w-[22rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(50%_50%_at_50%_50%, #7328E8 0%, transparent 60%)" }}
      />
    </div>
    {children}
  </div>
);

export const CTAButton = ({ children }) => (
  <motion.button
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.98 }}
    className="group relative inline-flex items-center gap-2 rounded-full border-2 px-5 py-3 text-base"
    style={{ borderColor: PALETTE.purpleBright, color: PALETTE.grayLight }}
  >
    <span className="h-2 w-2 rounded-full" style={{ background: PALETTE.purpleBright }} />
    {children}
    <ArrowRight className="transition-transform group-hover:translate-x-0.5" size={18} />
  </motion.button>
);

