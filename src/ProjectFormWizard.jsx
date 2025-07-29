import { useState, useEffect } from 'react';

export default function ProjectFormWizard() {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [completedQuestions, setCompletedQuestions] = useState({});
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
  // Define qué campos son obligatorios en cada paso
  const requiredFields = {
    0: ['nombre', 'email'],
    1: ['sitio', 'servicios'],
    2: ['objetivo', 'funcionalidades'],
    3: ['presupuesto', 'soporte'],
    4: ['cms', 'dominio', 'consentimiento']
  };

  // Evaluar si una pregunta está completa
  const isQuestionCompleted = (fieldName) => {
    if (Array.isArray(form[fieldName])) {
      return form[fieldName].length > 0;
    }
    if (typeof form[fieldName] === 'boolean') {
      return form[fieldName] === true;
    }
    return form[fieldName] !== '';
  };

  // Calcular progreso general basado en preguntas completadas vs total de preguntas obligatorias
  const calculateProgress = () => {
    let completed = 0;
    let total = 0;

    Object.values(requiredFields).forEach(fields => {
      total += fields.length;
      fields.forEach(field => {
        if (completedQuestions[field]) completed++;
      });
    });

    return total > 0 ? (completed / total) * 100 : 0;
  };

  // Actualizar el estado de preguntas completadas cuando cambie el formulario
  useEffect(() => {
    const newCompletedQuestions = { ...completedQuestions };
    
    // Comprobar todos los campos requeridos
    Object.values(requiredFields).flat().forEach(field => {
      newCompletedQuestions[field] = isQuestionCompleted(field);
    });
    
    setCompletedQuestions(newCompletedQuestions);
  }, [form]);

  const formSteps = [
    {
      title: "Datos de contacto",
      content: (
        <>
          <label className="text-white font-bold block mb-2">Nombre completo o razón social: <span className="text-[var(--color-highlight)]">*</span></label>
          <input 
            name="nombre" 
            required 
            className={`w-full rounded border-2 ${errors.nombre ? 'border-[var(--color-highlight)]' : 'border-[var(--color-accent)]'} bg-black text-white px-3 py-2 mb-1`}
            value={form.nombre}
            onChange={e => {
              setForm(f => ({ ...f, nombre: e.target.value }));
              if (e.target.value) setErrors(prev => ({ ...prev, nombre: null }));
            }}
          />
          <ErrorMessage field="nombre" />
          <label className="text-white font-bold block mb-2">Nombre del contacto (si aplica):</label>
          <input name="empresa" className="w-full rounded border-2 border-[var(--color-accent)] bg-black text-white px-3 py-2 mb-4"
            value={form.empresa}
            onChange={e => setForm(f => ({ ...f, empresa: e.target.value }))}
          />
          <label className="text-white font-bold block mb-2">Correo electrónico: <span className="text-[var(--color-highlight)]">*</span></label>
          <input 
            name="email" 
            type="email" 
            required 
            className={`w-full rounded border-2 ${errors.email ? 'border-[var(--color-highlight)]' : 'border-[var(--color-accent)]'} bg-black text-white px-3 py-2 mb-1`}
            value={form.email}
            onChange={e => {
              setForm(f => ({ ...f, email: e.target.value }));
              if (e.target.value) setErrors(prev => ({ ...prev, email: null }));
            }}
          />
          <ErrorMessage field="email" />
          <label className="text-white font-bold block mb-2">Teléfono:</label>
          <input name="telefono" className="w-full rounded border-2 border-[var(--color-accent)] bg-black text-white px-3 py-2 mb-4"
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
          <label className="text-white font-bold block mb-2">¿Tienes sitio web actualmente? <span className="text-[var(--color-highlight)]">*</span></label>
          <div className="flex gap-4 mb-1">
            <label className="flex items-center gap-2">
              <input type="radio" name="sitio" value="si"
                checked={form.sitio === "si"}
                onChange={() => {
                  setForm(f => ({ ...f, sitio: "si" }));
                  setErrors(prev => ({ ...prev, sitio: null }));
                }}
                className="accent-[var(--color-accent)]"
              />
              Sí
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="sitio" value="no"
                checked={form.sitio === "no"}
                onChange={() => {
                  setForm(f => ({ ...f, sitio: "no" }));
                  setErrors(prev => ({ ...prev, sitio: null }));
                }}
                className="accent-[var(--color-accent)]"
              />
              No
            </label>
          </div>
          <ErrorMessage field="sitio" />
          {form.sitio === "si" && (
            <input name="url" placeholder="URL" className="w-full rounded border-2 border-[var(--color-accent)] bg-black text-white px-3 py-2 mb-4"
              value={form.url}
              onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
            />
          )}
          <label className="text-white font-bold block mb-2">Selecciona los servicios que deseas cotizar: <span className="text-[var(--color-highlight)]">*</span></label>
          <div className={`grid grid-cols-1 gap-2 mb-1 ${errors.servicios ? 'border-l-2 border-[var(--color-highlight)] pl-2' : ''}`}>
            {["Diseño web completo", "Rediseño de sitio actual", "Integración de CRM", "HubSpot", "Salesforce", "Zoho", "ServiceTitan", "Automatización de procesos", "Conexión con herramientas de marketing/ventas", "Optimización SEO & rendimiento", "Alojamiento y mantenimiento"].map(serv => (
              <label key={serv} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-[var(--color-accent)]"
                  checked={form.servicios.includes(serv)}
                  onChange={() => {
                    setForm(f => {
                      const servicios = f.servicios.includes(serv)
                        ? f.servicios.filter(s => s !== serv)
                        : [...f.servicios, serv];
                      return { ...f, servicios };
                    });
                    // Limpiar error si se selecciona al menos un servicio
                    setErrors(prev => ({ ...prev, servicios: null }));
                  }}
                />
                {serv}
              </label>
            ))}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="accent-[var(--color-accent)]"
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
                className="rounded px-2 py-1 bg-black text-white border-2 border-[var(--color-accent)] flex-1"
                value={form.servicio_otro}
                onChange={e => setForm(f => ({ ...f, servicio_otro: e.target.value }))}
              />
            </label>
          </div>
          <ErrorMessage field="servicios" />
        </>
      ),
    },
    {
      title: "Funcionalidades y visión",
      content: (
        <>
          <label className="text-white font-bold block mb-2">¿Cuál es el objetivo principal del proyecto? <span className="text-[var(--color-highlight)]">*</span></label>
          <textarea 
            name="objetivo" 
            className={`w-full rounded border-2 ${errors.objetivo ? 'border-[var(--color-highlight)]' : 'border-[var(--color-accent)]'} bg-black text-white px-3 py-2 mb-1`}
            value={form.objetivo}
            onChange={e => {
              setForm(f => ({ ...f, objetivo: e.target.value }));
              if (e.target.value) setErrors(prev => ({ ...prev, objetivo: null }));
            }}
          />
          <ErrorMessage field="objetivo" />
          <label className="text-white font-bold block mb-2">¿Qué funcionalidades específicas necesitas? <span className="text-[var(--color-highlight)]">*</span></label>
          <textarea 
            name="funcionalidades" 
            className={`w-full rounded border-2 ${errors.funcionalidades ? 'border-[var(--color-highlight)]' : 'border-[var(--color-accent)]'} bg-black text-white px-3 py-2 mb-1`}
            value={form.funcionalidades}
            onChange={e => {
              setForm(f => ({ ...f, funcionalidades: e.target.value }));
              if (e.target.value) setErrors(prev => ({ ...prev, funcionalidades: null }));
            }}
          />
          <ErrorMessage field="funcionalidades" />
          <label className="text-white font-bold block mb-2">¿Hay una fecha ideal para lanzar este proyecto?</label>
          <input name="fecha_lanzamiento" className="w-full rounded border-2 border-[var(--color-accent)] bg-black text-white px-3 py-2 mb-4"
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
          <label className="text-white font-bold block mb-2">Presupuesto estimado: <span className="text-[var(--color-highlight)]">*</span></label>
          <select 
            name="presupuesto" 
            className={`w-full rounded border-2 ${errors.presupuesto ? 'border-[var(--color-highlight)]' : 'border-[var(--color-accent)]'} bg-black text-white px-3 py-2 mb-1`}
            value={form.presupuesto}
            onChange={e => {
              setForm(f => ({ ...f, presupuesto: e.target.value }));
              if (e.target.value) setErrors(prev => ({ ...prev, presupuesto: null }));
            }}
          >
            <option value="">Selecciona una opción</option>
            <option>Menos de USD 2.000</option>
            <option>USD 2.000 – 5.000</option>
            <option>USD 5.000 – 10.000</option>
            <option>Más de USD 10.000</option>
            <option>A definir</option>
          </select>
          <ErrorMessage field="presupuesto" />
          
          <label className="text-white font-bold block mb-2">¿Te interesa soporte técnico o capacitación post-lanzamiento? <span className="text-[var(--color-highlight)]">*</span></label>
          <div className="flex gap-4 mb-1">
            <label><input type="radio" name="soporte" value="Sí" className="accent-[var(--color-accent)]" checked={form.soporte === "Sí"} 
              onChange={e => {
                setForm(f => ({ ...f, soporte: "Sí" }));
                setErrors(prev => ({ ...prev, soporte: null }));
              }} /> Sí</label>
            <label><input type="radio" name="soporte" value="No" className="accent-[var(--color-accent)]" checked={form.soporte === "No"} 
              onChange={e => {
                setForm(f => ({ ...f, soporte: "No" }));
                setErrors(prev => ({ ...prev, soporte: null }));
              }} /> No</label>
            <label><input type="radio" name="soporte" value="Necesito más información" className="accent-[var(--color-accent)]" checked={form.soporte === "Necesito más información"} 
              onChange={e => {
                setForm(f => ({ ...f, soporte: "Necesito más información" }));
                setErrors(prev => ({ ...prev, soporte: null }));
              }} /> Necesito más información</label>
          </div>
          <ErrorMessage field="soporte" />
        </>
      ),
    },
    {
      title: "Contexto técnico",
      content: (
        <>
          <label className="text-white font-bold block mb-2">¿Tu sitio actual usa algún CMS? <span className="text-[var(--color-highlight)]">*</span></label>
          <div className="flex flex-wrap gap-4 mb-1">
            {["WordPress", "Shopify", "Webflow", "Otro", "No lo sé", "No tengo sitio web"].map(cms => (
              <label key={cms} className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name="cms" 
                  value={cms} 
                  className="accent-[var(--color-accent)]" 
                  checked={form.cms === cms} 
                  onChange={e => {
                    setForm(f => ({ ...f, cms }));
                    setErrors(prev => ({ ...prev, cms: null }));
                  }} 
                />
                {cms}
              </label>
            ))}
          </div>
          <ErrorMessage field="cms" />
          
          <label className="text-white font-bold block mb-2">¿Cuentas con dominio y hosting? <span className="text-[var(--color-highlight)]">*</span></label>
          <div className="flex flex-wrap gap-4 mb-1">
            {["Sí, ambos", "Solo dominio", "Solo hosting", "Aún no"].map(dh => (
              <label key={dh} className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name="dominio" 
                  value={dh} 
                  className="accent-[var(--color-accent)]" 
                  checked={form.dominio === dh} 
                  onChange={e => {
                    setForm(f => ({ ...f, dominio: dh }));
                    setErrors(prev => ({ ...prev, dominio: null }));
                  }} 
                />
                {dh}
              </label>
            ))}
          </div>
          <ErrorMessage field="dominio" />
          
          <label className="text-white font-bold block mb-2">¿Tienes actualmente un CRM o estás migrando a uno nuevo?</label>
          <input name="crm" className="w-full rounded border-2 border-[var(--color-accent)] bg-black text-white px-3 py-2 mb-4"
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
          <textarea name="extra" className="w-full rounded border-2 border-[var(--color-accent)] bg-black text-white px-3 py-2 mb-4"
            value={form.extra}
            onChange={e => setForm(f => ({ ...f, extra: e.target.value }))}
          />
          <label className={`flex items-center gap-2 text-white font-bold mb-1 ${errors.consentimiento ? 'text-[var(--color-highlight)]' : ''}`}>
            <input 
              type="checkbox" 
              name="consentimiento" 
              className={`accent-[var(--color-accent)] ${errors.consentimiento ? 'outline outline-[var(--color-highlight)]' : ''}`} 
              checked={form.consentimiento} 
              onChange={e => {
                setForm(f => ({ ...f, consentimiento: e.target.checked }));
                if (e.target.checked) setErrors(prev => ({ ...prev, consentimiento: null }));
              }} 
              required 
            />
            Autorizo a Weavion a contactarme para presentarme una propuesta personalizada. <span className="text-[var(--color-highlight)]">*</span>
          </label>
          <ErrorMessage field="consentimiento" />
          <div className="flex flex-col md:flex-row gap-4 mt-2">
            <label className="flex-1 text-white font-bold">
              Firma (opcional):
              <input name="firma" className="mt-1 w-full rounded border-2 border-[var(--color-accent)] bg-black text-white px-3 py-2" value={form.firma} onChange={e => setForm(f => ({ ...f, firma: e.target.value }))} />
            </label>
            <label className="flex-1 text-white font-bold">
              Fecha:
              <input name="fecha" type="date" className="mt-1 w-full rounded border-2 border-[var(--color-accent)] bg-black text-white px-3 py-2" value={form.fecha} onChange={e => setForm(f => ({ ...f, fecha: e.target.value }))} />
            </label>
          </div>
        </>
      ),
    },
  ];

  // Validar los campos requeridos en el paso actual
  const validateStep = (stepIndex) => {
    const currentRequiredFields = requiredFields[stepIndex] || [];
    const newErrors = {};
    let isValid = true;

    currentRequiredFields.forEach(field => {
      if (!isQuestionCompleted(field)) {
        newErrors[field] = 'Este campo es obligatorio';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = e => {
    e && e.preventDefault();
    
    if (validateStep(step)) {
      setStep(s => Math.min(s + 1, formSteps.length - 1));
      window.scrollTo(0, 0); // Scroll arriba para mejor usabilidad
    }
  };
  
  const handleBack = e => {
    e && e.preventDefault();
    setStep(s => Math.max(s - 1, 0));
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    
    if (validateStep(step)) {
      // Aquí puedes hacer la lógica de envío real
      alert('¡Formulario enviado!');
    }
  };

  const progress = calculateProgress();

  // Función de ayuda para mostrar un mensaje de error
  const ErrorMessage = ({ field }) => (
    errors[field] ? <div className="text-[var(--color-highlight)] text-sm mt-1">{errors[field]}</div> : null
  );

  // Componente para el indicador de pregunta completada
  const CompletionIndicator = ({ field, label }) => (
    <div className="flex items-center justify-between mb-1">
      <span className="text-white text-sm font-medium">{label || field}</span>
      <span className={`text-xs font-medium px-2 py-1 rounded ${
        completedQuestions[field] ? 'bg-green-800 text-green-200' : 'bg-[var(--color-highlight)] text-white'
      }`}>
        {completedQuestions[field] ? 'Completado' : 'Pendiente'}
      </span>
    </div>
  );

  return (
    <form className="w-full max-w-xl mx-auto bg-[#232323] rounded-2xl p-8 md:p-12 shadow-lg flex flex-col gap-8" onSubmit={step === formSteps.length - 1 ? handleSubmit : handleNext}>
      {/* Barra de progreso general */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-white text-sm font-medium">Progreso del formulario</span>
          <span className="text-white text-sm font-medium">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
          <div className="bg-[var(--color-accent)] h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{formSteps[step].title}</h2>
      
      {/* Indicadores de estado para las preguntas del paso actual */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
        {requiredFields[step]?.map(field => (
          <CompletionIndicator key={field} field={field} label={
            field === 'nombre' ? 'Nombre completo' :
            field === 'email' ? 'Correo electrónico' :
            field === 'sitio' ? '¿Tienes sitio web?' :
            field === 'servicios' ? 'Servicios a cotizar' :
            field === 'objetivo' ? 'Objetivo del proyecto' :
            field === 'funcionalidades' ? 'Funcionalidades específicas' :
            field === 'presupuesto' ? 'Presupuesto estimado' :
            field === 'soporte' ? 'Soporte técnico' :
            field === 'cms' ? 'CMS actual' :
            field === 'dominio' ? 'Dominio y hosting' :
            field === 'consentimiento' ? 'Autorización de contacto' :
            field
          } />
        ))}
      </div>
      
      {formSteps[step].content}
      
      {/* Mostrar errores generales */}
      {Object.keys(errors).length > 0 && (
        <div className="bg-[var(--color-highlight)] text-white p-3 rounded-md">
          Por favor, completa todos los campos obligatorios.
        </div>
      )}
      
      <div className="flex justify-between mt-8">
        {step > 0 && (
          <button
            type="button"
            onClick={handleBack}
            className="bg-black border-2 border-[var(--color-accent)] text-[var(--color-accent)] font-bold rounded-full px-8 py-3 text-lg"
          >
            Atrás
          </button>
        )}
        {step < formSteps.length - 1 ? (
          <button
            type="submit"
            className="bg-black border-2 border-[var(--color-accent)] text-[var(--color-accent)] font-bold rounded-full px-8 py-3 text-lg ml-auto"
          >
            Siguiente
          </button>
        ) : (
          <button
            type="submit"
            className="bg-[var(--color-accent)] text-[#202020] font-bold rounded-full px-8 py-3 text-lg ml-auto"
          >
            Enviar
          </button>
        )}
      </div>
    </form>
  );
}