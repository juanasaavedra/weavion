import React from "react";
import { motion } from "framer-motion";
import { GradientBg, PALETTE } from "./common";
import ProductInterestSection from "../../components/ProductInterestSection";

export default function InventarioChat() {
  const msgs = [
    { from: "user", text: "¿Cuántas sillas negras quedan en Bogotá?" },
    {
      from: "bot",
      text: "Stock: 34 unidades en bodega Salitre. ¿Reservar 5 para mañana?",
    },
    { from: "user", text: "Sí, y baja el precio en 5% por liquidación." },
    {
      from: "bot",
      text:
        "Listo. Nuevo precio aplicado y 5 unidades reservadas para retiro 10:00 AM.",
    },
  ];
  return (
    <GradientBg>
      <section className="mx-auto max-w-[1000px] px-6 py-20 md:py-28">
        <header className="mb-10">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-extrabold tracking-tight"
            style={{
              fontSize: "clamp(36px,7vw,84px)",
              letterSpacing: "-0.02em",
              backgroundImage: `linear-gradient(90deg, ${PALETTE.purpleBright}, #fff)`,
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Habla con tu inventario.
          </motion.h1>
          <p className="max-w-3xl" style={{ color: PALETTE.grayLight }}>
            Consulta, reserva, ajusta precios y crea órdenes con lenguaje natural.
          </p>
        </header>

        <div
          className="rounded-3xl border bg-white/5 p-6 backdrop-blur-xl"
          style={{ borderColor: "rgba(115,40,232,.35)" }}
        >
          <div className="space-y-3">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`${m.from === "user" ? "justify-end" : "justify-start"} flex`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                    m.from === "user" ? "ml-auto" : "mr-auto"
                  }`}
                  style={{
                    background:
                      m.from === "user"
                        ? "rgba(115,40,232,.25)"
                        : "rgba(255,255,255,.06)",
                    color: "#fff",
                    border: "1px solid rgba(172,172,172,.15)",
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div
            className="mt-4 flex items-center gap-2 rounded-full border bg-black/30 p-2"
            style={{ borderColor: "rgba(172,172,172,.2)" }}
          >
            <input
              placeholder="Escribe un comando…"
              className="flex-1 bg-transparent px-3 text-sm text-white placeholder-white/50 outline-none"
            />
            <button
              className="rounded-full px-4 py-2 text-sm"
              style={{
                border: `2px solid ${PALETTE.purpleBright}`,
                color: PALETTE.purpleBright,
              }}
            >
              Enviar
            </button>
          </div>
        </div>
      </section>
      <ProductInterestSection />
    </GradientBg>
  );
}

