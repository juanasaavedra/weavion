const fs = require('fs');
const path = require('path');

const enJson = {
  "nav": {
    "about": "About Us",
    "services": "Our Services",
    "pricing": "Packages & Pricing",
    "benefits": "Key Benefits",
    "process": "Our Process",
    "testimonials": "Testimonials",
    "faq": "FAQ",
    "contact": "Contact",
    "english": "Español"
  },
  "hero": {
    "title": "Discover the future of business digitalization",
    "subtitle": "Digital solutions for modern companies. Automate, grow, and stand out in the digital world.",
    "cta": "Discover it"
  },
  "services": {
    "title": "What do you gain with us?",
    "subtitle": "Digital Solutions for your business",
    "description": "We offer core services that cover all your business digital needs. Click on the cards to see more details."
  },
  "about": {
    "title": "About Us",
    "paragraph1": "We are a company specialized in developing digital solutions for small and medium-sized businesses. Our goal is to democratize access to quality technology, allowing businesses of all sizes to compete in today's digital market.",
    "paragraph2": "We believe that technology should be accessible, scalable, and sustainable. That is why we work with agile methodologies, modern technologies, and a user-centered approach to ensure that every project is a success."
  },
  "benefits": {
    "title": "What advantages do you get with us?",
    "fast": {
      "title": "Fast",
      "description": "Record-time deliveries without compromising quality. Agile methodologies for immediate results."
    },
    "economic": {
      "title": "Economical",
      "description": "Fair prices for businesses of all sizes. No hidden costs or surprises."
    },
    "secure": {
      "title": "Secure",
      "description": "We implement best security practices. Data protection and regulatory compliance."
    },
    "scalable": {
      "title": "Scalable",
      "description": "Solutions that grow with your business. Flexible architecture for the future."
    }
  },
  "process": {
    "title": "How does our work process work?",
    "step1": "Initial Meeting",
    "step1Detail": "We get to know your business, objectives, and requirements. Together we define the scope and roadmap of the project.",
    "step2": "Research & Planning",
    "step2Detail": "We analyze the market, the competition, and your target audience to develop a comprehensive strategy.",
    "step3": "Design & Development",
    "step3Detail": "We create functional prototypes and develop the solution with constant communication and iterations.",
    "step4": "Testing & Launch",
    "step4Detail": "We perform exhaustive testing and make the necessary adjustments before going live.",
    "step5": "Growth & Support",
    "step5Detail": "We provide ongoing support, updates, and optimizations to ensure the solution continues to deliver results."
  },
  "contact": {
    "title": "Ready to Start?",
    "subtitle": "Tell us about your project and let us create something amazing together.",
    "name": "Full Name",
    "email": "Email",
    "phone": "Phone (optional)",
    "message": "Tell us about your project",
    "submitButton": "Send Message",
    "formTitle": "Start your project now",
    "nameRequired": "Please enter your name",
    "emailRequired": "Please enter a valid email",
    "messageRequired": "Please tell us about your project",
    "success": "Message sent successfully! We will contact you soon.",
    "error": "There was an error sending your message. Please try again later."
  },
  "folder": {
    "clickToCollapse": "Click to collapse",
    "webDevelopment": {
      "title": "Web Development",
      "short": "Modern and fast websites",
      "detail": "We create modern, fast, and responsive websites, tailored to the needs of your business, optimized for SEO, and with best accessibility practices."
    },
    "webDesign": {
      "title": "Web Design",
      "short": "Attractive and functional design",
      "detail": "We design attractive, intuitive, and user-centered interfaces, ensuring a consistent and professional visual experience."
    },
    "serviceTitan": {
      "title": "ServiceTitan Integration",
      "short": "Automate your operation",
      "detail": "We integrate your business with ServiceTitan to automate processes, improve management, and connect your systems efficiently."
    },
    "analytics": {
      "title": "Business Analytics and Inventory Prediction",
      "short": "Make smart decisions",
      "detail": "We implement advanced analytics and inventory prediction systems using AI, so you can make informed decisions and optimize your resources."
    }
  },
  "common": {
    "discover": "Discover it",
    "backHome": "Back to home",
    "clickToCollapse": "Click to collapse"
  }
};

const esJson = {
  "nav": {
    "about": "Sobre Nosotros",
    "services": "Nuestros Servicios",
    "pricing": "Paquetes & Precios",
    "benefits": "Beneficios Clave",
    "process": "Nuestro Proceso",
    "testimonials": "Testimonios",
    "faq": "Preguntas Frecuentes",
    "contact": "Contacto",
    "english": "English"
  },
  "hero": {
    "title": "Descubre el futuro de la digitalización de las empresas",
    "subtitle": "Soluciones digitales para empresas modernas. Automatiza, crece y destaca en el mundo digital.",
    "cta": "Descúbrelo"
  },
  "services": {
    "title": "¿Qué ganas con nosotros?",
    "subtitle": "Soluciones Digitales para tu empresa",
    "description": "Ofrecemos servicios principales que cubren todas las necesidades digitales de tu empresa. Haz clic en las tarjetas para ver más detalles."
  },
  "about": {
    "title": "Sobre Nosotros",
    "paragraph1": "Somos una empresa especializada en el desarrollo de soluciones digitales para pequeñas y medianas empresas. Nuestro objetivo es democratizar el acceso a tecnología de calidad, permitiendo que empresas de todos los tamaños puedan competir en el mercado digital actual.",
    "paragraph2": "Creemos que la tecnología debe ser accesible, escalable y sostenible. Por eso trabajamos con metodologías ágiles, tecnologías modernas y un enfoque centrado en el usuario para asegurar que cada proyecto sea un éxito."
  },
  "benefits": {
    "title": "¿Qué ventajas obtienes con nosotros?",
    "fast": {
      "title": "Rápido",
      "description": "Entregas en tiempo récord sin comprometer la calidad. Metodologías ágiles para resultados inmediatos."
    },
    "economic": {
      "title": "Económico",
      "description": "Precios justos para empresas de todos los tamaños. Sin costos ocultos ni sorpresas."
    },
    "secure": {
      "title": "Seguro",
      "description": "Implementamos las mejores prácticas de seguridad. Protección de datos y cumplimiento normativo."
    },
    "scalable": {
      "title": "Escalable",
      "description": "Soluciones que crecen con tu negocio. Arquitectura flexible para el futuro."
    }
  },
  "process": {
    "title": "¿Cómo es nuestro proceso de trabajo?",
    "step1": "Reunión Inicial",
    "step2": "Propuesta y Acuerdo",
    "step3": "Diseño y Desarrollo",
    "step4": "Lanzamiento y Soporte"
  },
  "contact": {
    "title": "Contacto",
    "subtitle": "¿Listo para llevar tu negocio al siguiente nivel?",
    "name": "Nombre",
    "email": "Correo electrónico",
    "message": "Mensaje",
    "phone": "Teléfono",
    "send": "Enviar",
    "success": "¡Mensaje enviado! Nos pondremos en contacto pronto.",
    "error": "Hubo un error. Intenta de nuevo más tarde.",
    "formTitle": "¿Quieres impulsar tu empresa con tecnología? Completa el formulario y recibe una propuesta exclusiva.",
    "submitButton": "Enviar",
    "services": {
      "web": "Diseño o rediseño de sitio web",
      "dashboard": "Dashboard de analítica de negocio",
      "serviceTitan": "Integración o soporte con Service Titan",
      "automation": "Automatización de procesos o flujos internos",
      "other": "Otro"
    },
    "cta": {
      "title": "¿Listo para dar el siguiente paso?",
      "subtitle": "Impulsa tu agencia hoy",
      "description": "Contáctanos hoy para comenzar a trabajar en tu proyecto. Nuestro equipo está listo para ayudarte a alcanzar tus objetivos.",
      "button": "Contáctanos"
    }
  },
  "folder": {
    "clickToCollapse": "Haz clic para colapsar",
    "webDevelopment": {
      "title": "Desarrollo web",
      "short": "Webs modernas y rápidas",
      "detail": "Creamos sitios web modernos, rápidos y responsivos, adaptados a las necesidades de tu negocio, optimizados para SEO y con las mejores prácticas de accesibilidad."
    },
    "webDesign": {
      "title": "Diseño web",
      "short": "Diseño atractivo y funcional",
      "detail": "Diseñamos interfaces atractivas, intuitivas y centradas en el usuario, asegurando una experiencia visual coherente y profesional."
    },
    "serviceTitan": {
      "title": "Integración a ServiceTitan",
      "short": "Automatiza tu operación",
      "detail": "Integramos tu negocio con ServiceTitan para automatizar procesos, mejorar la gestión y conectar tus sistemas de manera eficiente."
    },
    "analytics": {
      "title": "Analíticas de negocio y predicción de inventario",
      "short": "Toma decisiones inteligentes",
      "detail": "Implementamos sistemas de analítica avanzada y predicción de inventario usando IA, para que tomes decisiones informadas y optimices tus recursos."
    }
  },
  "common": {
    "discover": "Descúbrelo",
    "backHome": "Volver al inicio",
    "clickToCollapse": "Haz clic para colapsar"
  }
};

// Asegurarnos de que el directorio existe
const localesDir = path.join(__dirname, 'src', 'locales');
if (!fs.existsSync(localesDir)) {
  fs.mkdirSync(localesDir, { recursive: true });
}

// Escribir los archivos JSON
fs.writeFileSync(
  path.join(localesDir, 'en.json'),
  JSON.stringify(enJson, null, 2),
  'utf8'
);

fs.writeFileSync(
  path.join(localesDir, 'es.json'),
  JSON.stringify(esJson, null, 2),
  'utf8'
);

console.log('Archivos JSON creados correctamente');
