import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  GradientBg,
  PALETTE,
  FormInput,
  FormTextarea,
  FormSelect,
} from "./common";

export default function ContactoMas() {
  const SUBMIT_URL = "/api/contact";
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    empresa: "",
    telefono: "",
    servicio: "Otro",
    presupuesto: "",
    plazo: "",
    mensaje: "",
  });

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.mensaje) {
      setStatus("error");
      return;
    }
    try {
      setStatus("loading");
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "weavion-contacto" }),
      });
      if (!res.ok) throw new Error("bad status");
      setStatus("success");
      setForm({
        nombre: "",
        email: "",
        empresa: "",
        telefono: "",
        servicio: "Otro",
        presupuesto: "",
        plazo: "",
        mensaje: "",
      });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <GradientBg>
      <section className="mx-auto max-w-[980px] px-6 py-20 md:py-28">
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
            ¿Buscas algo más? Contáctanos.
          </motion.h1>
          <p style={{ color: PALETTE.grayLight }}>
            Cuéntanos lo que necesitas y te proponemos un flujo ideal (web, CRM,
            email, automatizaciones).
          </p>
        </header>

        <form
          onSubmit={onSubmit}
          className="rounded-3xl border bg-white/5 p-6 backdrop-blur-xl"
          style={{ borderColor: "rgba(115,40,232,.35)" }}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <FormInput label="Nombre" name="nombre" value={form.nombre} onChange={onChange} required />
            <FormInput label="Email" name="email" type="email" value={form.email} onChange={onChange} required />
            <FormInput label="Empresa" name="empresa" value={form.empresa} onChange={onChange} />
            <FormInput label="Teléfono" name="telefono" value={form.telefono} onChange={onChange} />
            <FormSelect
              label="Servicio"
              name="servicio"
              value={form.servicio}
              onChange={onChange}
              options={[
                "Automatizaciones",
                "Diseño/Desarrollo Web",
                "Integración CRM",
                "Email Marketing",
                "Analíticas",
                "Otro",
              ]}
            />
            <FormInput
              label="Presupuesto (USD)"
              name="presupuesto"
              type="number"
              value={form.presupuesto}
              onChange={onChange}
            />
            <FormSelect
              label="Plazo estimado"
              name="plazo"
              value={form.plazo}
              onChange={onChange}
              options={[
                "Urgente (1-2 semanas)",
                "Corto (1 mes)",
                "Medio (2-3 meses)",
                "Flexible",
              ]}
            />
            <div className="md:col-span-2">
              <FormTextarea
                label="Mensaje"
                name="mensaje"
                value={form.mensaje}
                onChange={onChange}
                required
              />
            </div>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <button
              disabled={status === "loading"}
              className="rounded-full px-5 py-3 text-sm disabled:opacity-60"
              style={{ border: `2px solid ${PALETTE.purpleBright}`, color: PALETTE.purpleBright }}
            >
              {status === "loading" ? "Enviando…" : "Enviar"}
            </button>
            {status === "success" && (
              <span className="text-sm" style={{ color: PALETTE.grayLight }}>
                ¡Gracias! Te contactaremos pronto.
              </span>
            )}
            {status === "error" && (
              <span className="text-sm text-red-300">
                Revisa los campos obligatorios o intenta más tarde.
              </span>
            )}
          </div>
        </form>
      </section>
    </GradientBg>
  );
}

