import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const getServiceOptions = (t) => [
  { label: t('contact.services.web'), value: 'web' },
  { label: t('contact.services.dashboard'), value: 'dashboard' },
  { label: t('contact.services.serviceTitan'), value: 'servicetitan' },
  { label: t('contact.services.automation'), value: 'automatizacion' },
  { label: t('contact.services.other'), value: 'otro' },
];

export default function ContactForm() {
  const { t } = useTranslation();
  const serviceOptions = getServiceOptions(t);
  
  const [step, setStep] = useState(0);
  const [maxSteps, setMaxSteps] = useState(2); // se actualiza al avanzar
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

  const isStepComplete = () => {
    if (current === 'servicios') return form.servicios.length > 0;
    if (current === 'web') {
      if (!showWeb) return true;
      if (form.web.tieneWeb === '') return false;
      if (form.web.tieneWeb === 'si' && !form.web.url.trim()) return false;
      if (form.web.funcionalidades.length === 0) return false;
      if (form.web.logotipo === '') return false;
      if (form.web.objetivo.length === 0) return false;
      if (form.web.objetivo.includes('Otras') && !form.web.otroObj.trim()) return false;
      if (form.web.funcionalidades.includes('Otra') && !form.web.otraFunc.trim()) return false;
      return true;
    }
    if (current === 'dashboard') {
      if (!showDashboard) return true;
      if (form.dashboard.metricas.length === 0) return false;
      if (form.dashboard.metricas.includes('Otra') && !form.dashboard.otraMetrica.trim()) return false;
      if (form.dashboard.datos === '') return false;
      if (form.dashboard.datos === 'otro' && !form.dashboard.otroDato.trim()) return false;
      if (form.dashboard.reportes === '') return false;
      return true;
    }
    if (current === 'servicetitan') {
      if (!showST) return true;
      if (form.servicetitan.usa === '') return false;
      if (form.servicetitan.objetivo.length === 0) return false;
      if (form.servicetitan.objetivo.includes('Otra') && !form.servicetitan.otroObj.trim()) return false;
      if (!form.servicetitan.sistemas.trim()) return false;
      return true;
    }
    if (current === 'automatizacion') {
      if (!showAuto) return true;
      if (form.automatizacion.procesos.length === 0) return false;
      if (form.automatizacion.procesos.includes('Otra') && !form.automatizacion.otroProc.trim()) return false;
      if (form.automatizacion.herramientas.length === 0) return false;
      return true;
    }
    if (current === 'contacto') {
      if (!form.contacto.nombre.trim()) return false;
      if (!form.contacto.email.trim()) return false;
      if (form.contacto.llamada === '') return false;
      if (form.contacto.llamada === 'si' && !form.contacto.horario.trim()) return false;
      return true;
    }
    return true;
  };

  const handleNext = () => {
    if (!isStepComplete()) {
      alert('Por favor completa todas las respuestas antes de continuar.');
      return;
    }
    setErrors({});
    setMaxSteps(steps.length);
    setStep(s => Math.min(s + 1, steps.length - 1));
  };
  const handleBack = () => {
    setErrors({});
    setStep(s => Math.max(s - 1, 0));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
        .then(() => alert('¡Mensaje enviado correctamente!'))
        .catch(() => alert('Error al enviar mensaje'))
        .finally(() => {
          setSubmitted(true);
          setErrors({});
        });
    } else {
      alert('Formulario inválido');
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
    if (!form.contacto.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio.';
    if (!form.contacto.email.trim()) {
      newErrors.email = 'El email es obligatorio.';
    } else if (!/^\S+@\S+\.\S+$/.test(form.contacto.email)) {
      newErrors.email = 'El formato del email no es válido.';
    }
    if (form.servicios.length === 0) {
      newErrors.servicios = 'Debes seleccionar al menos un servicio.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  // Calculate progress based on answered questions rather than selected options
  const questionChecks = [
    { visible: true, answered: () => form.servicios.length > 0 },
    ...(
      showWeb
        ? [
            { visible: true, answered: () => form.web.tieneWeb !== '' },
            ...(form.web.tieneWeb === 'si'
              ? [{ visible: true, answered: () => form.web.url.trim() !== '' }]
              : []),
            { visible: true, answered: () => form.web.funcionalidades.length > 0 },
            { visible: true, answered: () => form.web.logotipo !== '' },
            { visible: true, answered: () => form.web.objetivo.length > 0 },
            ...(form.web.objetivo.includes('Otras')
              ? [{ visible: true, answered: () => form.web.otroObj.trim() !== '' }]
              : []),
            ...(form.web.funcionalidades.includes('Otra')
              ? [{ visible: true, answered: () => form.web.otraFunc.trim() !== '' }]
              : []),
          ]
        : []
    ),
    ...(
      showDashboard
        ? [
            { visible: true, answered: () => form.dashboard.metricas.length > 0 },
            ...(form.dashboard.metricas.includes('Otra')
              ? [{ visible: true, answered: () => form.dashboard.otraMetrica.trim() !== '' }]
              : []),
            { visible: true, answered: () => form.dashboard.datos !== '' },
            ...(form.dashboard.datos === 'otro'
              ? [{ visible: true, answered: () => form.dashboard.otroDato.trim() !== '' }]
              : []),
            { visible: true, answered: () => form.dashboard.reportes !== '' },
          ]
        : []
    ),
    ...(
      showST
        ? [
            { visible: true, answered: () => form.servicetitan.usa !== '' },
            { visible: true, answered: () => form.servicetitan.objetivo.length > 0 },
            ...(form.servicetitan.objetivo.includes('Otra')
              ? [{ visible: true, answered: () => form.servicetitan.otroObj.trim() !== '' }]
              : []),
            { visible: true, answered: () => form.servicetitan.sistemas.trim() !== '' },
          ]
        : []
    ),
    ...(
      showAuto
        ? [
            { visible: true, answered: () => form.automatizacion.procesos.length > 0 },
            ...(form.automatizacion.procesos.includes('Otra')
              ? [{ visible: true, answered: () => form.automatizacion.otroProc.trim() !== '' }]
              : []),
            { visible: true, answered: () => form.automatizacion.herramientas.length > 0 },
          ]
        : []
    ),
    { visible: true, answered: () => form.contacto.nombre.trim() !== '' },
    { visible: true, answered: () => form.contacto.email.trim() !== '' },
    { visible: true, answered: () => form.contacto.llamada !== '' },
    ...(form.contacto.llamada === 'si'
      ? [{ visible: true, answered: () => form.contacto.horario.trim() !== '' }]
      : []),
  ];

  const visibleQuestions = questionChecks.filter(q => q.visible);
  const answeredQuestions = visibleQuestions.filter(q => q.answered());
  const progressPercentage =
    visibleQuestions.length > 0
      ? (answeredQuestions.length / visibleQuestions.length) * 100
      : 0;

  return (
    <div className="max-w-2xl mx-auto rounded-3xl p-6 md:p-10 shadow-2xl bg-[var(--color-slate)] backdrop-blur-sm">
      {/* Progress Bar */}
      <div className="w-full h-2 bg-[var(--color-gunmetal)] rounded-full mb-8">
        <div 
          className="h-full bg-[var(--color-accent)] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <form onSubmit={handleSubmit} noValidate>
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="subtitle text-[var(--color-accent)] text-center mb-4">¡Gracias por tu interés!</div>
              <div className="body-text text-[#FFFFFF] text-center">Pronto recibirás nuestra propuesta personalizada {form.contacto.llamada === 'no' ? 'por correo electrónico.' : 'y te contactaremos para la llamada.'}</div>
            </motion.div>
          ) : (
            <motion.div key={current} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}>
              {current === 'servicios' && (
                <div>
                  <div className="subtitle text-[var(--color-text)] mb-6">¿Qué servicio estás buscando actualmente?</div>
                  <div className="flex flex-col gap-4 mb-8">
                    {serviceOptions.map(opt => (
                      <label key={opt.value} className="custom-checkbox text-lg text-[var(--color-text)]">
                        <input
                          type="checkbox"
                          checked={form.servicios.includes(opt.value)}
                          onChange={() => handleServicioChange(opt.value)}
                        />
                        <span className="checkmark"></span>
                        <span className="ml-2">{opt.label}</span>
                        {opt.value === 'otro' && form.servicios.includes('otro') && (
                          <input
                            type="text"
                            placeholder="Otro..."
                            className="form-input ml-2"
                            value={form.otroServicio}
                            onChange={e =>
                              setForm(f => ({ ...f, otroServicio: e.target.value }))
                            }
                          />
                        )}
                      </label>
                    ))}
                  </div>
                  {errors.servicios && (
                    <div className="text-[var(--color-highlight)] mb-2">{errors.servicios}</div>
                  )}
                  <button
                    type="button"
                    className="form-btn-next"
                    onClick={handleNext}
                  >
                    Siguiente
                  </button>
                </div>
              )}
              {current === 'web' && (
                <div>
                  <div className="subtitle text-[var(--color-accent)] mb-4">Sobre tu sitio web</div>
                  <div className="mb-4">
                    <label className="block text-[#FFFFFF] mb-2">¿Ya tienes un sitio web?</label>
                    <select className="w-full rounded-xl px-4 py-3 bg-[var(--color-gunmetal)] text-[var(--color-text)] border border-[var(--color-accent)]" value={form.web.tieneWeb} onChange={e => handleInput('web', 'tieneWeb', e.target.value)}>
                      <option value="">Selecciona...</option>
                      <option value="si">Sí</option>
                      <option value="no">No</option>
                    </select>
                    {form.web.tieneWeb === 'si' && (
                      <input type="url" placeholder="URL de tu sitio" className="mt-2 w-full rounded px-3 py-2 bg-[#0A122E] text-[#FFFFFF] border border-[var(--color-accent)]" value={form.web.url} onChange={e => handleInput('web', 'url', e.target.value)} />
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#FFFFFF] mb-2">¿Qué funcionalidades deseas incluir?</label>
                    <div className="flex flex-col gap-2">
                      {['Agendamiento de citas','Formulario de contacto','Portafolio de trabajos o galería','Testimonios / reseñas de clientes','Chat en vivo','Otra'].map(func => (
                        <label key={func} className="custom-checkbox text-[#FFFFFF]">
                          <input type="checkbox" checked={form.web.funcionalidades.includes(func)} onChange={() => {
                            setForm(f => {
                              let funcionalidades = f.web.funcionalidades.includes(func)
                                ? f.web.funcionalidades.filter(x => x !== func)
                                : [...f.web.funcionalidades, func];
                              return { ...f, web: { ...f.web, funcionalidades } };
                            });
                          }} />
                          <span className="checkmark"></span>
                          {func}
                          {func === 'Otra' && form.web.funcionalidades.includes('Otra') && (
                            <input type="text" placeholder="Otra..." className="ml-2 px-2 py-1 rounded bg-[#0A122E] text-[#FFFFFF] border border-[var(--color-accent)]" value={form.web.otraFunc} onChange={e => handleInput('web', 'otraFunc', e.target.value)} />
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-[var(--color-text)] mb-2">¿Tienes ya un logotipo o identidad visual?</label>
                    <select className="w-full rounded-2xl px-4 py-3 bg-[var(--color-gunmetal)] text-[var(--color-text)] border border-[var(--color-accent)]" value={form.web.logotipo} onChange={e => handleInput('web', 'logotipo', e.target.value)}>
                      <option value="">Selecciona...</option>
                      <option value="si">Sí</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#FFFFFF] mb-2">¿Qué objetivo tiene tu sitio web?</label>
                    <div className="flex flex-col gap-2">
                      {['Generar leads','Mostrar tu empresa profesionalmente','Facilitar agendamiento','Otras'].map(obj => (
                        <label key={obj} className="custom-checkbox text-[#FFFFFF]">
                          <input type="checkbox" checked={form.web.objetivo.includes(obj)} onChange={() => {
                            setForm(f => {
                              let objetivo = f.web.objetivo.includes(obj)
                                ? f.web.objetivo.filter(x => x !== obj)
                                : [...f.web.objetivo, obj];
                              return { ...f, web: { ...f.web, objetivo } };
                            });
                          }} />
                          <span className="checkmark"></span>
                          {obj}
                          {obj === 'Otras' && form.web.objetivo.includes('Otras') && (
                            <input type="text" placeholder="Otras..." className="ml-2 px-2 py-1 rounded bg-[#0A122E] text-[#FFFFFF] border border-[var(--color-accent)]" value={form.web.otroObj} onChange={e => handleInput('web', 'otroObj', e.target.value)} />
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-btn-container">
                    <button type="button" className="form-btn-back" onClick={handleBack}>Atrás</button>
                    <button type="button" className="form-btn-next" onClick={handleNext}>Siguiente</button>
                  </div>
                </div>
              )}
              {current === 'dashboard' && (
                <div>
                  <div className="text-xl text-[var(--color-accent)] font-bold mb-4">Sobre tu dashboard de analítica</div>
                  <div className="mb-4">
                    <label className="block text-[#D6D6D6] mb-2">¿Qué métricas te gustaría visualizar?</label>
                    <div className="flex flex-col gap-2">
                      {['Ingresos por mes / servicio','Servicios más solicitados','Tasa de conversión por canal (web, llamadas, redes)','Costos operativos o por empleado','Otra'].map(met => (
                        <label key={met} className="custom-checkbox text-[#FFD100]">
                          <input type="checkbox" checked={form.dashboard.metricas.includes(met)} onChange={() => {
                            setForm(f => {
                              let metricas = f.dashboard.metricas.includes(met)
                                ? f.dashboard.metricas.filter(x => x !== met)
                                : [...f.dashboard.metricas, met];
                              return { ...f, dashboard: { ...f.dashboard, metricas } };
                            });
                          }} />
                          <span className="checkmark"></span>
                          {met}
                          {met === 'Otra' && form.dashboard.metricas.includes('Otra') && (
                            <input type="text" placeholder="Otra..." className="ml-2 px-2 py-1 rounded bg-[#202020] text-[var(--color-accent)] border border-[var(--color-accent)]" value={form.dashboard.otraMetrica} onChange={e => handleInput('dashboard', 'otraMetrica', e.target.value)} />
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#D6D6D6] mb-2">¿Dónde se almacenan actualmente tus datos de negocio?</label>
                    <select className="w-full rounded px-3 py-2 bg-[#202020] text-[var(--color-accent)] border border-[var(--color-accent)]" value={form.dashboard.datos} onChange={e => handleInput('dashboard', 'datos', e.target.value)}>
                      <option value="">Selecciona...</option>
                      <option value="excel">En hojas de Excel</option>
                      <option value="crm">En un CRM</option>
                      <option value="no">No tengo datos estructurados</option>
                      <option value="otro">Otro</option>
                    </select>
                    {form.dashboard.datos === 'otro' && (
                      <input type="text" placeholder="Otro..." className="mt-2 w-full rounded px-3 py-2 bg-[#202020] text-[var(--color-accent)] border border-[var(--color-accent)]" value={form.dashboard.otroDato} onChange={e => handleInput('dashboard', 'otroDato', e.target.value)} />
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#D6D6D6] mb-2">¿Necesitas reportes automáticos o alertas?</label>
                    <select className="w-full rounded px-3 py-2 bg-[#202020] text-[var(--color-accent)] border border-[var(--color-accent)]" value={form.dashboard.reportes} onChange={e => handleInput('dashboard', 'reportes', e.target.value)}>
                      <option value="">Selecciona...</option>
                      <option value="si">Sí</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <div className="form-btn-container">
                    <button type="button" className="form-btn-back" onClick={handleBack}>Atrás</button>
                    <button type="button" className="form-btn-next" onClick={handleNext}>Siguiente</button>
                  </div>
                </div>
              )}
              {current === 'servicetitan' && (
                <div>
                  <div className="text-xl text-[var(--color-accent)] font-bold mb-4">Sobre integración con Service Titan</div>
                  <div className="mb-4">
                    <label className="block text-[#D6D6D6] mb-2">¿Ya usas Service Titan?</label>
                    <select className="w-full rounded px-3 py-2 bg-[#202020] text-[var(--color-accent)] border border-[var(--color-accent)]" value={form.servicetitan.usa} onChange={e => handleInput('servicetitan', 'usa', e.target.value)}>
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
                        <label key={obj} className="custom-checkbox text-[#FFD100]">
                          <input type="checkbox" checked={form.servicetitan.objetivo.includes(obj)} onChange={() => {
                            setForm(f => {
                              let objetivo = f.servicetitan.objetivo.includes(obj)
                                ? f.servicetitan.objetivo.filter(x => x !== obj)
                                : [...f.servicetitan.objetivo, obj];
                              return { ...f, servicetitan: { ...f.servicetitan, objetivo } };
                            });
                          }} />
                          <span className="checkmark"></span>
                          {obj}
                          {obj === 'Otra' && form.servicetitan.objetivo.includes('Otra') && (
                            <input type="text" placeholder="Otra..." className="ml-2 px-2 py-1 rounded bg-[#202020] text-[var(--color-accent)] border border-[var(--color-accent)]" value={form.servicetitan.otroObj} onChange={e => handleInput('servicetitan', 'otroObj', e.target.value)} />
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#D6D6D6] mb-2">¿Qué sistemas o herramientas necesitas conectar con Service Titan?</label>
                    <input type="text" className="w-full rounded px-3 py-2 bg-[#202020] text-[var(--color-accent)] border border-[var(--color-accent)]" value={form.servicetitan.sistemas} onChange={e => handleInput('servicetitan', 'sistemas', e.target.value)} placeholder="Ej: QuickBooks, Zapier, página web, etc." />
                  </div>
                  <div className="form-btn-container">
                    <button type="button" className="form-btn-back" onClick={handleBack}>Atrás</button>
                    <button type="button" className="form-btn-next" onClick={handleNext}>Siguiente</button>
                  </div>
                </div>
              )}
              {current === 'automatizacion' && (
                <div>
                  <div className="text-xl text-[var(--color-accent)] font-bold mb-4">Sobre automatización de procesos</div>
                  <div className="mb-4">
                    <label className="block text-[#D6D6D6] mb-2">¿Qué procesos deseas automatizar?</label>
                    <div className="flex flex-col gap-2">
                      {['Confirmaciones de citas','Notificaciones al cliente','Seguimiento post-servicio','Facturación automática','Otra'].map(proc => (
                        <label key={proc} className="custom-checkbox text-[#FFD100]">
                          <input type="checkbox" checked={form.automatizacion.procesos.includes(proc)} onChange={() => {
                            setForm(f => {
                              let procesos = f.automatizacion.procesos.includes(proc)
                                ? f.automatizacion.procesos.filter(x => x !== proc)
                                : [...f.automatizacion.procesos, proc];
                              return { ...f, automatizacion: { ...f.automatizacion, procesos } };
                            });
                          }} />
                          <span className="checkmark"></span>
                          {proc}
                          {proc === 'Otra' && form.automatizacion.procesos.includes('Otra') && (
                            <input type="text" placeholder="Otra..." className="ml-2 px-2 py-1 rounded bg-[#202020] text-[var(--color-accent)] border border-[var(--color-accent)]" value={form.automatizacion.otroProc} onChange={e => handleInput('automatizacion', 'otroProc', e.target.value)} />
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#D6D6D6] mb-2">¿Qué herramientas usas actualmente para tus operaciones?</label>
                    <div className="flex flex-col gap-2">
                      {['Google Calendar','WhatsApp / correo','Excel / manualmente','Otra'].map(herr => (
                        <label key={herr} className="custom-checkbox text-[#FFD100]">
                          <input type="checkbox" checked={form.automatizacion.herramientas.includes(herr)} onChange={() => {
                            setForm(f => {
                              let herramientas = f.automatizacion.herramientas.includes(herr)
                                ? f.automatizacion.herramientas.filter(x => x !== herr)
                                : [...f.automatizacion.herramientas, herr];
                              return { ...f, automatizacion: { ...f.automatizacion, herramientas } };
                            });
                          }} />
                          <span className="checkmark"></span>
                          {herr}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-btn-container">
                    <button type="button" className="form-btn-back" onClick={handleBack}>Atrás</button>
                    <button type="button" className="form-btn-next" onClick={handleNext}>Siguiente</button>
                  </div>
                </div>
              )}
              {current === 'contacto' && (
                <div>
                  <div className="text-xl text-[var(--color-accent)] font-bold mb-4">Datos de contacto</div>
                  <div className="mb-4">
                    <label className="block text-[#D6D6D6] mb-2">¿Cuál es tu nombre y empresa?</label>
                    <input type="text" className="w-full rounded px-3 py-2 bg-[#202020] text-[#FFD100] border border-[#FFD100]" value={form.contacto.nombre} onChange={e => handleContacto('nombre', e.target.value)} placeholder="Nombre y empresa" required />
                    {errors.nombre && <div className="text-[var(--color-highlight)] mt-1">{errors.nombre}</div>}
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#D6D6D6] mb-2">Correo electrónico de contacto</label>
                    <input type="email" className="w-full rounded px-3 py-2 bg-[#202020] text-[#FFD100] border border-[#FFD100]" value={form.contacto.email} onChange={e => handleContacto('email', e.target.value)} placeholder="Correo electrónico" required />
                    {errors.email && <div className="text-[var(--color-highlight)] mt-1">{errors.email}</div>}
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#D6D6D6] mb-2">¿Cuál es tu presupuesto estimado para este proyecto? <span className="text-[var(--color-accent)]">(opcional)</span></label>
                    <input type="text" className="w-full rounded px-3 py-2 bg-[#202020] text-[var(--color-accent)] border border-[var(--color-accent)]" value={form.contacto.presupuesto} onChange={e => handleContacto('presupuesto', e.target.value)} placeholder="Ej: $2,000 USD" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#D6D6D6] mb-2">¿Deseas agendar una llamada para discutir más detalles?</label>
                    <select className="w-full rounded px-3 py-2 bg-[#202020] text-[var(--color-accent)] border border-[var(--color-accent)]" value={form.contacto.llamada} onChange={e => handleContacto('llamada', e.target.value)} required>
                      <option value="">Selecciona...</option>
                      <option value="si">Sí</option>
                      <option value="no">No por ahora</option>
                    </select>
                    {form.contacto.llamada === 'si' && (
                      <>
                        <div className="text-sm text-[#E0E0E0] mt-2">{t('contact.schedulePrompt')}</div>
                        <input type="text" className="mt-1 w-full rounded px-3 py-2 bg-[#202020] text-[var(--color-accent)] border border-[var(--color-accent)]" value={form.contacto.horario} onChange={e => handleContacto('horario', e.target.value)} placeholder={t('contact.schedulePrompt')} />
                      </>
                    )}
                  </div>
                  <div className="form-btn-container">
                    <button type="button" className="form-btn-back" onClick={handleBack}>Atrás</button>
                    <button type="submit" className="form-btn-next">
                      {form.contacto.llamada === 'si' ? t('contact.scheduleButton') : t('contact.submitButton')}
                    </button>
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