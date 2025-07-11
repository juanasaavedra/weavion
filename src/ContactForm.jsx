import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const serviceOptions = [
  { label: 'Diseño o rediseño de sitio web', value: 'web' },
  { label: 'Dashboard de analítica de negocio', value: 'dashboard' },
  { label: 'Integración o soporte con Service Titan', value: 'servicetitan' },
  { label: 'Automatización de procesos o flujos internos', value: 'automatizacion' },
  { label: 'Otro', value: 'otro' },
];

export default function ContactForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    servicios: [],
    otroServicio: '',
    web: {
      tieneWeb: '', url: '', funcionalidades: [], otraFunc: '', logotipo: '', objetivo: [], otroObj: ''
    },
    dashboard: {
      metricas: [], otraMetrica: '', datos: '', otroDato: '', reportes: ''
    },
    servicetitan: {
      usa: '', objetivo: [], otroObj: '', sistemas: ''
    },
    automatizacion: {
      procesos: [], otroProc: '', herramientas: []
    },
    contacto: {
      nombre: '', empresa: '', email: '', presupuesto: '', llamada: '', horario: ''
    },
    nombre: '',
    email: '',
    telefono: '',
    reunion: 'si',
    mensaje: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Helpers
  const handleServicioChange = (value) => {
    setForm(f => {
      let servicios = f.servicios.includes(value)
        ? f.servicios.filter(s => s !== value)
        : [...f.servicios, value];
      return { ...f, servicios };
    });
  };
  const handleInput = (block, field, value) => {
    setForm(f => ({ ...f, [block]: { ...f[block], [field]: value } }));
  };
  const handleContacto = (field, value) => {
    setForm(f => ({ ...f, contacto: { ...f.contacto, [field]: value } }));
  };
  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Formulario válido, enviando...', form);
      setSubmitted(true);
      setErrors({});
    } else {
      console.log('Formulario inválido');
    }
  };

  // Step logic
  const showWeb = form.servicios.includes('web');
  const showDashboard = form.servicios.includes('dashboard');
  const showST = form.servicios.includes('servicetitan');
  const showAuto = form.servicios.includes('automatizacion');

  // Steps: 0=servicios, 1=web, 2=dashboard, 3=st, 4=auto, 5=contacto
  const steps = [
    'servicios',
    ...(showWeb ? ['web'] : []),
    ...(showDashboard ? ['dashboard'] : []),
    ...(showST ? ['servicetitan'] : []),
    ...(showAuto ? ['automatizacion'] : []),
    'contacto',
  ];
  const current = steps[step];

  const validateForm = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio.';
    if (!form.email.trim()) {
      newErrors.email = 'El email es obligatorio.';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = 'El formato del email no es válido.';
    }
    if (!form.empresa.trim()) newErrors.empresa = 'El nombre de la empresa es obligatorio.';
    if (form.servicios.length === 0) {
      newErrors.servicios = 'Debes seleccionar al menos un servicio.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="max-w-2xl mx-auto rounded-3xl p-8 md:p-16 shadow-2xl mt-12 mb-24">
      <h2 className="text-4xl font-extrabold text-[#FFD100] mb-8 text-center">Contáctanos</h2>
      <form onSubmit={handleSubmit} noValidate>
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="text-2xl text-[#FFD100] font-bold text-center mb-4">¡Gracias por tu interés!</div>
              <div className="text-lg text-[#D6D6D6] text-center">Pronto recibirás nuestra propuesta personalizada {form.contacto.llamada === 'no' ? 'por correo electrónico.' : 'y te contactaremos para la llamada.'}</div>
            </motion.div>
          ) : (
            <motion.div key={current} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}>
              {current === 'servicios' && (
                <div>
                  <div className="text-xl text-[#FFD100] font-bold mb-4">¿Qué servicio estás buscando actualmente?</div>
                  <div className="flex flex-col gap-3 mb-6">
                    {serviceOptions.map(opt => (
                      <label key={opt.value} className="flex items-center gap-2 text-lg text-white">
                        <input type="checkbox"
                          className="w-5 h-5 rounded border-2 border-[#FFD100] bg-black checked:bg-[#FFD100] checked:border-[#FFD100] focus:ring-0 focus:outline-none transition-all duration-150"
                          checked={form.servicios.includes(opt.value)}
                          onChange={() => handleServicioChange(opt.value)}
                        />
                        {opt.label}
                        {opt.value === 'otro' && form.servicios.includes('otro') && (
                          <input type="text" placeholder="Otro..." className="ml-2 px-2 py-1 rounded bg-[#202020] text-[#FFD100] border border-[#FFD100]" value={form.otroServicio} onChange={e => setForm(f => ({ ...f, otroServicio: e.target.value }))} />
                        )}
                      </label>
                    ))}
                  </div>
                  <button type="button" className="bg-[#FFD100] text-[#202020] font-bold px-8 py-3 rounded-full text-xl w-full mt-6" onClick={handleNext} disabled={form.servicios.length === 0}>Siguiente</button>
                </div>
              )}
              {current === 'web' && (
                <div>
                  <div className="text-xl text-[#FFD100] font-bold mb-4">Sobre tu sitio web</div>
                  <div className="mb-4">
                    <label className="block text-[#D6D6D6] mb-2">¿Ya tienes un sitio web?</label>
                    <select className="w-full rounded px-3 py-2 bg-[#202020] text-[#FFD100] border border-[#FFD100]" value={form.web.tieneWeb} onChange={e => handleInput('web', 'tieneWeb', e.target.value)}>
                      <option value="">Selecciona...</option>
                      <option value="si">Sí</option>
                      <option value="no">No</option>
                    </select>
                    {form.web.tieneWeb === 'si' && (
                      <input type="url" placeholder="URL de tu sitio" className="mt-2 w-full rounded px-3 py-2 bg-[#202020] text-[#FFD100] border border-[#FFD100]" value={form.web.url} onChange={e => handleInput('web', 'url', e.target.value)} />
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#D6D6D6] mb-2">¿Qué funcionalidades deseas incluir?</label>
                    <div className="flex flex-col gap-2">
                      {['Agendamiento de citas','Formulario de contacto','Portafolio de trabajos o galería','Testimonios / reseñas de clientes','Chat en vivo','Otra'].map(func => (
                        <label key={func} className="flex items-center gap-2">
                          <input type="checkbox" className="accent-[#FFD100]" checked={form.web.funcionalidades.includes(func)} onChange={() => {
                            setForm(f => {
                              let funcionalidades = f.web.funcionalidades.includes(func)
                                ? f.web.funcionalidades.filter(x => x !== func)
                                : [...f.web.funcionalidades, func];
                              return { ...f, web: { ...f.web, funcionalidades } };
                            });
                          }} />
                          <span className="text-[#FFD100]">{func}</span>
                          {func === 'Otra' && form.web.funcionalidades.includes('Otra') && (
                            <input type="text" placeholder="Otra..." className="ml-2 px-2 py-1 rounded bg-[#202020] text-[#FFD100] border border-[#FFD100]" value={form.web.otraFunc} onChange={e => handleInput('web', 'otraFunc', e.target.value)} />
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#D6D6D6] mb-2">¿Tienes ya un logotipo o identidad visual?</label>
                    <select className="w-full rounded px-3 py-2 bg-[#202020] text-[#FFD100] border border-[#FFD100]" value={form.web.logotipo} onChange={e => handleInput('web', 'logotipo', e.target.value)}>
                      <option value="">Selecciona...</option>
                      <option value="si">Sí</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#D6D6D6] mb-2">¿Qué objetivo tiene tu sitio web?</label>
                    <div className="flex flex-col gap-2">
                      {['Generar leads','Mostrar tu empresa profesionalmente','Facilitar agendamiento','Otras'].map(obj => (
                        <label key={obj} className="flex items-center gap-2">
                          <input type="checkbox" className="accent-[#FFD100]" checked={form.web.objetivo.includes(obj)} onChange={() => {
                            setForm(f => {
                              let objetivo = f.web.objetivo.includes(obj)
                                ? f.web.objetivo.filter(x => x !== obj)
                                : [...f.web.objetivo, obj];
                              return { ...f, web: { ...f.web, objetivo } };
                            });
                          }} />
                          <span className="text-[#FFD100]">{obj}</span>
                          {obj === 'Otras' && form.web.objetivo.includes('Otras') && (
                            <input type="text" placeholder="Otras..." className="ml-2 px-2 py-1 rounded bg-[#202020] text-[#FFD100] border border-[#FFD100]" value={form.web.otroObj} onChange={e => handleInput('web', 'otroObj', e.target.value)} />
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between mt-8">
                    <button type="button" className="text-[#FFD100] underline" onClick={handleBack}>Atrás</button>
                    <button type="button" className="bg-[#FFD100] text-[#202020] font-bold px-8 py-3 rounded-full text-xl" onClick={handleNext}>Siguiente</button>
                  </div>
                </div>
              )}
              {current === 'dashboard' && (
                <div>
                  <div className="text-xl text-[#FFD100] font-bold mb-4">Sobre tu dashboard de analítica</div>
                  <div className="mb-4">
                    <label className="block text-[#D6D6D6] mb-2">¿Qué métricas te gustaría visualizar?</label>
                    <div className="flex flex-col gap-2">
                      {['Ingresos por mes / servicio','Servicios más solicitados','Tasa de conversión por canal (web, llamadas, redes)','Costos operativos o por empleado','Otra'].map(met => (
                        <label key={met} className="flex items-center gap-2">
                          <input type="checkbox" className="accent-[#FFD100]" checked={form.dashboard.metricas.includes(met)} onChange={() => {
                            setForm(f => {
                              let metricas = f.dashboard.metricas.includes(met)
                                ? f.dashboard.metricas.filter(x => x !== met)
                                : [...f.dashboard.metricas, met];
                              return { ...f, dashboard: { ...f.dashboard, metricas } };
                            });
                          }} />
                          <span className="text-[#FFD100]">{met}</span>
                          {met === 'Otra' && form.dashboard.metricas.includes('Otra') && (
                            <input type="text" placeholder="Otra..." className="ml-2 px-2 py-1 rounded bg-[#202020] text-[#FFD100] border border-[#FFD100]" value={form.dashboard.otraMetrica} onChange={e => handleInput('dashboard', 'otraMetrica', e.target.value)} />
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#D6D6D6] mb-2">¿Dónde se almacenan actualmente tus datos de negocio?</label>
                    <select className="w-full rounded px-3 py-2 bg-[#202020] text-[#FFD100] border border-[#FFD100]" value={form.dashboard.datos} onChange={e => handleInput('dashboard', 'datos', e.target.value)}>
                      <option value="">Selecciona...</option>
                      <option value="excel">En hojas de Excel</option>
                      <option value="crm">En un CRM</option>
                      <option value="no">No tengo datos estructurados</option>
                      <option value="otro">Otro</option>
                    </select>
                    {form.dashboard.datos === 'otro' && (
                      <input type="text" placeholder="Otro..." className="mt-2 w-full rounded px-3 py-2 bg-[#202020] text-[#FFD100] border border-[#FFD100]" value={form.dashboard.otroDato} onChange={e => handleInput('dashboard', 'otroDato', e.target.value)} />
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#D6D6D6] mb-2">¿Necesitas reportes automáticos o alertas?</label>
                    <select className="w-full rounded px-3 py-2 bg-[#202020] text-[#FFD100] border border-[#FFD100]" value={form.dashboard.reportes} onChange={e => handleInput('dashboard', 'reportes', e.target.value)}>
                      <option value="">Selecciona...</option>
                      <option value="si">Sí</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <div className="flex justify-between mt-8">
                    <button type="button" className="text-[#FFD100] underline" onClick={handleBack}>Atrás</button>
                    <button type="button" className="bg-[#FFD100] text-[#202020] font-bold px-8 py-3 rounded-full text-xl" onClick={handleNext}>Siguiente</button>
                  </div>
                </div>
              )}
              {current === 'servicetitan' && (
                <div>
                  <div className="text-xl text-[#FFD100] font-bold mb-4">Sobre integración con Service Titan</div>
                  <div className="mb-4">
                    <label className="block text-[#D6D6D6] mb-2">¿Ya usas Service Titan?</label>
                    <select className="w-full rounded px-3 py-2 bg-[#202020] text-[#FFD100] border border-[#FFD100]" value={form.servicetitan.usa} onChange={e => handleInput('servicetitan', 'usa', e.target.value)}>
                      <option value="">Selecciona...</option>
                      <option value="si">Sí</option>
                      <option value="no">No, pero quiero implementarlo</option>
                      <option value="otra">No, uso otra plataforma</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#D6D6D6] mb-2">¿Qué deseas hacer con Service Titan?</label>
                    <div className="flex flex-col gap-2">
                      {['Automatizar flujo de trabajo con el sitio web','Integrarlo con pagos, facturación o agendamiento','Mostrar datos en un dashboard personalizado','Otra'].map(obj => (
                        <label key={obj} className="flex items-center gap-2">
                          <input type="checkbox" className="accent-[#FFD100]" checked={form.servicetitan.objetivo.includes(obj)} onChange={() => {
                            setForm(f => {
                              let objetivo = f.servicetitan.objetivo.includes(obj)
                                ? f.servicetitan.objetivo.filter(x => x !== obj)
                                : [...f.servicetitan.objetivo, obj];
                              return { ...f, servicetitan: { ...f.servicetitan, objetivo } };
                            });
                          }} />
                          <span className="text-[#FFD100]">{obj}</span>
                          {obj === 'Otra' && form.servicetitan.objetivo.includes('Otra') && (
                            <input type="text" placeholder="Otra..." className="ml-2 px-2 py-1 rounded bg-[#202020] text-[#FFD100] border border-[#FFD100]" value={form.servicetitan.otroObj} onChange={e => handleInput('servicetitan', 'otroObj', e.target.value)} />
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#D6D6D6] mb-2">¿Qué sistemas o herramientas necesitas conectar con Service Titan?</label>
                    <input type="text" className="w-full rounded px-3 py-2 bg-[#202020] text-[#FFD100] border border-[#FFD100]" value={form.servicetitan.sistemas} onChange={e => handleInput('servicetitan', 'sistemas', e.target.value)} placeholder="Ej: QuickBooks, Zapier, página web, etc." />
                  </div>
                  <div className="flex justify-between mt-8">
                    <button type="button" className="text-[#FFD100] underline" onClick={handleBack}>Atrás</button>
                    <button type="button" className="bg-[#FFD100] text-[#202020] font-bold px-8 py-3 rounded-full text-xl" onClick={handleNext}>Siguiente</button>
                  </div>
                </div>
              )}
              {current === 'automatizacion' && (
                <div>
                  <div className="text-xl text-[#FFD100] font-bold mb-4">Sobre automatización de procesos</div>
                  <div className="mb-4">
                    <label className="block text-[#D6D6D6] mb-2">¿Qué procesos deseas automatizar?</label>
                    <div className="flex flex-col gap-2">
                      {['Confirmaciones de citas','Notificaciones al cliente','Seguimiento post-servicio','Facturación automática','Otra'].map(proc => (
                        <label key={proc} className="flex items-center gap-2">
                          <input type="checkbox" className="accent-[#FFD100]" checked={form.automatizacion.procesos.includes(proc)} onChange={() => {
                            setForm(f => {
                              let procesos = f.automatizacion.procesos.includes(proc)
                                ? f.automatizacion.procesos.filter(x => x !== proc)
                                : [...f.automatizacion.procesos, proc];
                              return { ...f, automatizacion: { ...f.automatizacion, procesos } };
                            });
                          }} />
                          <span className="text-[#FFD100]">{proc}</span>
                          {proc === 'Otra' && form.automatizacion.procesos.includes('Otra') && (
                            <input type="text" placeholder="Otra..." className="ml-2 px-2 py-1 rounded bg-[#202020] text-[#FFD100] border border-[#FFD100]" value={form.automatizacion.otroProc} onChange={e => handleInput('automatizacion', 'otroProc', e.target.value)} />
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#D6D6D6] mb-2">¿Qué herramientas usas actualmente para tus operaciones?</label>
                    <div className="flex flex-col gap-2">
                      {['Google Calendar','WhatsApp / correo','Excel / manualmente','Otra'].map(herr => (
                        <label key={herr} className="flex items-center gap-2">
                          <input type="checkbox" className="accent-[#FFD100]" checked={form.automatizacion.herramientas.includes(herr)} onChange={() => {
                            setForm(f => {
                              let herramientas = f.automatizacion.herramientas.includes(herr)
                                ? f.automatizacion.herramientas.filter(x => x !== herr)
                                : [...f.automatizacion.herramientas, herr];
                              return { ...f, automatizacion: { ...f.automatizacion, herramientas } };
                            });
                          }} />
                          <span className="text-[#FFD100]">{herr}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between mt-8">
                    <button type="button" className="text-[#FFD100] underline" onClick={handleBack}>Atrás</button>
                    <button type="button" className="bg-[#FFD100] text-[#202020] font-bold px-8 py-3 rounded-full text-xl" onClick={handleNext}>Siguiente</button>
                  </div>
                </div>
              )}
              {current === 'contacto' && (
                <div>
                  <div className="text-xl text-[#FFD100] font-bold mb-4">Datos de contacto</div>
                  <div className="mb-4">
                    <label className="block text-[#D6D6D6] mb-2">¿Cuál es tu nombre y empresa?</label>
                    <input type="text" className="w-full rounded px-3 py-2 bg-[#202020] text-[#FFD100] border border-[#FFD100]" value={form.contacto.nombre} onChange={e => handleContacto('nombre', e.target.value)} placeholder="Nombre y empresa" required />
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#D6D6D6] mb-2">Correo electrónico de contacto</label>
                    <input type="email" className="w-full rounded px-3 py-2 bg-[#202020] text-[#FFD100] border border-[#FFD100]" value={form.contacto.email} onChange={e => handleContacto('email', e.target.value)} placeholder="Correo electrónico" required />
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#D6D6D6] mb-2">¿Cuál es tu presupuesto estimado para este proyecto? <span className="text-[#FFD100]">(opcional)</span></label>
                    <input type="text" className="w-full rounded px-3 py-2 bg-[#202020] text-[#FFD100] border border-[#FFD100]" value={form.contacto.presupuesto} onChange={e => handleContacto('presupuesto', e.target.value)} placeholder="Ej: $2,000 USD" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#D6D6D6] mb-2">¿Deseas agendar una llamada para discutir más detalles?</label>
                    <select className="w-full rounded px-3 py-2 bg-[#202020] text-[#FFD100] border border-[#FFD100]" value={form.contacto.llamada} onChange={e => handleContacto('llamada', e.target.value)} required>
                      <option value="">Selecciona...</option>
                      <option value="si">Sí</option>
                      <option value="no">No por ahora</option>
                    </select>
                    {form.contacto.llamada === 'si' && (
                      <input type="text" className="mt-2 w-full rounded px-3 py-2 bg-[#202020] text-[#FFD100] border border-[#FFD100]" value={form.contacto.horario} onChange={e => handleContacto('horario', e.target.value)} placeholder="Proporciona un horario o disponibilidad" />
                    )}
                  </div>
                  <div className="flex justify-between mt-8">
                    <button type="button" className="text-[#FFD100] underline" onClick={handleBack}>Atrás</button>
                    <button type="submit" className="bg-[#FFD100] text-[#202020] font-bold px-8 py-3 rounded-full text-xl">Enviar</button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
} 