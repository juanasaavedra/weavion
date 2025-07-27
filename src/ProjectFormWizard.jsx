import { useState } from 'react';

export default function ProjectFormWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    sitio: '',
    url: '',
    servicios: [],
    servicio_otro: '',
    objetivo: '',
    funcionalidades: '',
    fecha_lanzamiento: '',
    presupuesto: '',
    soporte: '',
    cms: '',
    dominio: '',
    crm: '',
    extra: '',
    consentimiento: false,
    firma: '',
    fecha: '',
  });

  // Cambia el nombre de steps a formSteps para evitar conflictos globales
  const formSteps = [
    {
      title: "Datos de contacto",
      content: (
        <>
          <label className="text-white font-bold block mb-2">Nombre completo o razón social:</label>
          <input name="nombre" required className="w-full rounded border-2 border-[#FFD100] bg-black text-white px-3 py-2 mb-4"
            value={form.nombre}
            onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
          />
          <label className="text-white font-bold block mb-2">Nombre del contacto (si aplica):</label>
          <input name="empresa" className="w-full rounded border-2 border-[#FFD100] bg-black text-white px-3 py-2 mb-4"
            value={form.empresa}
            onChange={e => setForm(f => ({ ...f, empresa: e.target.value }))}
          />
          <label className="text-white font-bold block mb-2">Correo electrónico:</label>
          <input name="email" type="email" required className="w-full rounded border-2 border-[#FFD100] bg-black text-white px-3 py-2 mb-4"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          />
          <label className="text-white font-bold block mb-2">Teléfono:</label>
          <input name="telefono" className="w-full rounded border-2 border-[#FFD100] bg-black text-white px-3 py-2 mb-4"
            value={form.telefono}
            onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))}
          />
        </>
      ),
    },
    {
      title: "Servicios",
      content: (
        <>
          <label className="text-white font-bold block mb-2">¿Tienes sitio web actualmente?</label>
          <div className="flex gap-4 mb-4">
            <label className="flex items-center gap-2">
              <input type="radio" name="sitio" value="si"
                checked={form.sitio === "si"}
                onChange={() => setForm(f => ({ ...f, sitio: "si" }))}
                className="accent-[#FFD100]"
              />
              Sí
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="sitio" value="no"
                checked={form.sitio === "no"}
                onChange={() => setForm(f => ({ ...f, sitio: "no" }))}
                className="accent-[#FFD100]"
              />
              No
            </label>
          </div>
          {form.sitio === "si" && (
            <input name="url" placeholder="URL" className="w-full rounded border-2 border-[#FFD100] bg-black text-white px-3 py-2 mb-4"
              value={form.url}
              onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
            />
          )}
          <label className="text-white font-bold block mb-2">Selecciona los servicios que deseas cotizar:</label>
          <div className="grid grid-cols-1 gap-2 mb-4">
            {["Diseño web completo", "Rediseño de sitio actual", "Integración de CRM", "HubSpot", "Salesforce", "Zoho", "ServiceTitan", "Automatización de procesos", "Conexión con herramientas de marketing/ventas", "Optimización SEO & rendimiento", "Alojamiento y mantenimiento"].map(serv => (
              <label key={serv} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-[#FFD100]"
                  checked={form.servicios.includes(serv)}
                  onChange={() => setForm(f => {
                    const servicios = f.servicios.includes(serv)
                      ? f.servicios.filter(s => s !== serv)
                      : [...f.servicios, serv];
                    return { ...f, servicios };
                  })}
                />
                {serv}
              </label>
            ))}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="accent-[#FFD100]"
                checked={form.servicios.includes("Otro")}
                onChange={() => setForm(f => {
                  const servicios = f.servicios.includes("Otro")
                    ? f.servicios.filter(s => s !== "Otro")
                    : [...f.servicios, "Otro"];
                  return { ...f, servicios };
                })}
              />
              Otro:
              <input
                name="servicio_otro"
                className="rounded px-2 py-1 bg-black text-white border-2 border-[#FFD100] flex-1"
                value={form.servicio_otro}
                onChange={e => setForm(f => ({ ...f, servicio_otro: e.target.value }))}
              />
            </label>
          </div>
        </>
      ),
    },
    {
      title: "Funcionalidades y visión",
      content: (
        <>
          <label className="text-white font-bold block mb-2">¿Cuál es el objetivo principal del proyecto?</label>
          <textarea name="objetivo" className="w-full rounded border-2 border-[#FFD100] bg-black text-white px-3 py-2 mb-4"
            value={form.objetivo}
            onChange={e => setForm(f => ({ ...f, objetivo: e.target.value }))}
          />
          <label className="text-white font-bold block mb-2">¿Qué funcionalidades específicas necesitas?</label>
          <textarea name="funcionalidades" className="w-full rounded border-2 border-[#FFD100] bg-black text-white px-3 py-2 mb-4"
            value={form.funcionalidades}
            onChange={e => setForm(f => ({ ...f, funcionalidades: e.target.value }))}
          />
          <label className="text-white font-bold block mb-2">¿Hay una fecha ideal para lanzar este proyecto?</label>
          <input name="fecha_lanzamiento" className="w-full rounded border-2 border-[#FFD100] bg-black text-white px-3 py-2 mb-4"
            value={form.fecha_lanzamiento}
            onChange={e => setForm(f => ({ ...f, fecha_lanzamiento: e.target.value }))}
          />
        </>
      ),
    },
    {
      title: "Presupuesto y soporte",
      content: (
        <>
          <label className="text-white font-bold block mb-2">Presupuesto estimado:</label>
          <select name="presupuesto" className="w-full rounded border-2 border-[#FFD100] bg-black text-white px-3 py-2 mb-4"
            value={form.presupuesto}
            onChange={e => setForm(f => ({ ...f, presupuesto: e.target.value }))}
          >
            <option value="">Selecciona una opción</option>
            <option>Menos de USD 2.000</option>
            <option>USD 2.000 – 5.000</option>
            <option>USD 5.000 – 10.000</option>
            <option>Más de USD 10.000</option>
            <option>A definir</option>
          </select>
          <label className="text-white font-bold block mb-2">¿Te interesa soporte técnico o capacitación post-lanzamiento?</label>
          <div className="flex gap-4 mb-4">
            <label><input type="radio" name="soporte" value="Sí" className="accent-[#FFD100]" checked={form.soporte === "Sí"} onChange={e => setForm(f => ({ ...f, soporte: "Sí" }))} /> Sí</label>
            <label><input type="radio" name="soporte" value="No" className="accent-[#FFD100]" checked={form.soporte === "No"} onChange={e => setForm(f => ({ ...f, soporte: "No" }))} /> No</label>
            <label><input type="radio" name="soporte" value="Necesito más información" className="accent-[#FFD100]" checked={form.soporte === "Necesito más información"} onChange={e => setForm(f => ({ ...f, soporte: "Necesito más información" }))} /> Necesito más información</label>
          </div>
        </>
      ),
    },
    {
      title: "Contexto técnico",
      content: (
        <>
          <label className="text-white font-bold block mb-2">¿Tu sitio actual usa algún CMS?</label>
          <div className="flex flex-wrap gap-4 mb-4">
            {["WordPress", "Shopify", "Webflow", "Otro", "No lo sé", "No tengo sitio web"].map(cms => (
              <label key={cms} className="flex items-center gap-2">
                <input type="radio" name="cms" value={cms} className="accent-[#FFD100]" checked={form.cms === cms} onChange={e => setForm(f => ({ ...f, cms }))} />
                {cms}
              </label>
            ))}
          </div>
          <label className="text-white font-bold block mb-2">¿Cuentas con dominio y hosting?</label>
          <div className="flex flex-wrap gap-4 mb-4">
            {["Sí, ambos", "Solo dominio", "Solo hosting", "Aún no"].map(dh => (
              <label key={dh} className="flex items-center gap-2">
                <input type="radio" name="dominio" value={dh} className="accent-[#FFD100]" checked={form.dominio === dh} onChange={e => setForm(f => ({ ...f, dominio: dh }))} />
                {dh}
              </label>
            ))}
          </div>
          <label className="text-white font-bold block mb-2">¿Tienes actualmente un CRM o estás migrando a uno nuevo?</label>
          <input name="crm" className="w-full rounded border-2 border-[#FFD100] bg-black text-white px-3 py-2 mb-4"
            value={form.crm}
            onChange={e => setForm(f => ({ ...f, crm: e.target.value }))}
          />
        </>
      ),
    },
    {
      title: "Detalles y consentimiento",
      content: (
        <>
          <label className="text-white font-bold block mb-2">¿Algo más que debamos saber?</label>
          <textarea name="extra" className="w-full rounded border-2 border-[#FFD100] bg-black text-white px-3 py-2 mb-4"
            value={form.extra}
            onChange={e => setForm(f => ({ ...f, extra: e.target.value }))}
          />
          <label className="flex items-center gap-2 text-white font-bold mb-2">
            <input type="checkbox" name="consentimiento" className="accent-[#FFD100]" checked={form.consentimiento} onChange={e => setForm(f => ({ ...f, consentimiento: e.target.checked }))} required />
            Autorizo a Weavion a contactarme para presentarme una propuesta personalizada.
          </label>
          <div className="flex flex-col md:flex-row gap-4 mt-2">
            <label className="flex-1 text-white font-bold">
              Firma (opcional):
              <input name="firma" className="mt-1 w-full rounded border-2 border-[#FFD100] bg-black text-white px-3 py-2" value={form.firma} onChange={e => setForm(f => ({ ...f, firma: e.target.value }))} />
            </label>
            <label className="flex-1 text-white font-bold">
              Fecha:
              <input name="fecha" type="date" className="mt-1 w-full rounded border-2 border-[#FFD100] bg-black text-white px-3 py-2" value={form.fecha} onChange={e => setForm(f => ({ ...f, fecha: e.target.value }))} />
            </label>
          </div>
        </>
      ),
    },
  ];

  const handleNext = e => {
    e && e.preventDefault();
    setStep(s => Math.min(s + 1, formSteps.length - 1));
  };
  const handleBack = e => {
    e && e.preventDefault();
    setStep(s => Math.max(s - 1, 0));
  };
  const handleSubmit = e => {
    e.preventDefault();
    // Aquí puedes hacer la lógica de envío real
    alert('¡Formulario enviado!');
  };

  return (
    <form className="w-full max-w-xl mx-auto bg-[#232323] rounded-2xl p-8 md:p-12 shadow-lg flex flex-col gap-8" onSubmit={step === formSteps.length - 1 ? handleSubmit : handleNext}>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{formSteps[step].title}</h2>
      {formSteps[step].content}
      <div className="flex justify-between mt-8">
        {step > 0 && (
          <button
            type="button"
            onClick={handleBack}
            className="bg-black border-2 border-[#FFD100] text-[#FFD100] font-bold rounded-full px-8 py-3 text-lg"
          >
            Atrás
          </button>
        )}
        {step < formSteps.length - 1 ? (
          <button
            type="submit"
            className="bg-black border-2 border-[#FFD100] text-[#FFD100] font-bold rounded-full px-8 py-3 text-lg ml-auto"
          >
            Siguiente
          </button>
        ) : (
          <button
            type="submit"
            className="bg-[#FFD100] text-[#202020] font-bold rounded-full px-8 py-3 text-lg ml-auto"
          >
            Enviar
          </button>
        )}
      </div>
    </form>
  );
}