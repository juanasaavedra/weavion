import React from 'react';
import Footer from '../Footer';

export default function PrivacyPolicy() {
  return (
    <div className="px-4 py-10 text-gray-200">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Política de Privacidad</h1>
        <p className="mb-4">Fecha de entrada en vigor: 15/08/2025</p>
        <p className="mb-4">En Weavion, nos comprometemos a proteger la privacidad y seguridad de los datos personales de nuestros clientes, usuarios y contactos profesionales. Esta Política de Privacidad explica cómo recopilamos, usamos, almacenamos y protegemos la información personal, así como los derechos de los titulares de los datos.</p>
        <ol className="list-decimal pl-5 space-y-4">
          <li>
            <p className="font-semibold">Información que recopilamos</p>
            <p>Podemos recopilar y tratar la siguiente información personal:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Datos de contacto: nombre, apellidos, dirección de correo electrónico y número de teléfono.</li>
              <li>Información proporcionada de manera directa: al completar formularios en nuestra web, responder a encuestas, solicitar información o contratar servicios.</li>
              <li>Información pública y profesional: datos de contacto obtenidos a través de LinkedIn u otras redes profesionales, siempre conforme a sus políticas de uso.</li>
              <li>Datos técnicos: dirección IP, cookies y datos de navegación cuando visita nuestro sitio web.</li>
            </ul>
          </li>
          <li>
            <p className="font-semibold">Finalidad del tratamiento de los datos</p>
            <p>Utilizamos los datos recopilados para las siguientes finalidades:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Establecer y gestionar relaciones comerciales y profesionales.</li>
              <li>Proveer y mejorar nuestros servicios digitales (diseño web, automatización, CRM, business analytics, entre otros).</li>
              <li>Gestionar comunicaciones, cotizaciones, propuestas y acuerdos contractuales.</li>
              <li>Enviar recordatorios, actualizaciones y notificaciones relacionadas con los servicios.</li>
              <li>Realizar seguimiento postventa y encuestas de satisfacción.</li>
              <li>Cumplir con obligaciones legales o regulatorias aplicables.</li>
            </ul>
          </li>
          <li>
            <p className="font-semibold">Legitimación para el tratamiento</p>
            <p>El tratamiento de los datos personales se basa en:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>El consentimiento otorgado por el titular de los datos.</li>
              <li>La ejecución de un contrato o la aplicación de medidas precontractuales.</li>
              <li>El interés legítimo de la Empresa en mantener relaciones profesionales y comerciales.</li>
            </ul>
          </li>
          <li>
            <p className="font-semibold">Conservación de los datos</p>
            <p>Los datos se conservarán únicamente durante el tiempo necesario para cumplir con las finalidades para las que fueron recopilados, o hasta que el titular solicite su supresión, salvo que exista una obligación legal de conservación.</p>
          </li>
          <li>
            <p className="font-semibold">Comunicación y transferencia de datos</p>
            <p>Weavion no venderá ni cederá los datos personales a terceros sin autorización expresa del titular. Podremos compartir información con proveedores de servicios tecnológicos, CRM, plataformas de automatización o analítica, siempre bajo acuerdos de confidencialidad y únicamente con el fin de garantizar la correcta prestación de nuestros servicios.</p>
          </li>
          <li>
            <p className="font-semibold">Seguridad de la información</p>
            <p>Implementamos medidas técnicas, organizativas y administrativas razonables para proteger los datos personales contra pérdida, uso indebido, acceso no autorizado, divulgación o alteración.</p>
          </li>
          <li>
            <p className="font-semibold">Derechos de los titulares</p>
            <p>Los usuarios pueden ejercer sus derechos de:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Acceso a sus datos personales.</li>
              <li>Rectificación de información inexacta o incompleta.</li>
              <li>Supresión de los datos cuando ya no sean necesarios.</li>
              <li>Limitación u oposición al tratamiento de datos.</li>
              <li>Portabilidad de los datos, cuando aplique.</li>
            </ul>
            <p>Las solicitudes pueden enviarse al correo electrónico: <a href="mailto:sales@weavion.xyz" className="underline">sales@weavion.xyz</a>.</p>
          </li>
          <li>
            <p className="font-semibold">Uso de cookies</p>
            <p>Nuestro sitio web utiliza cookies para mejorar la experiencia de usuario, analizar tráfico y personalizar contenidos. El usuario puede configurar su navegador para rechazar cookies, aunque algunas funciones del sitio podrían no estar disponibles.</p>
          </li>
          <li>
            <p className="font-semibold">Actualizaciones de la Política de Privacidad</p>
            <p>Weavion podrá actualizar esta Política de Privacidad periódicamente. Se recomienda revisar esta página de forma regular para estar informado sobre cualquier cambio.</p>
          </li>
          <li>
            <p className="font-semibold">Contacto</p>
            <p>Si tiene preguntas sobre esta Política de Privacidad o sobre el tratamiento de sus datos, puede contactarnos en: <a href="mailto:sales@weavion.xyz" className="underline">sales@weavion.xyz</a>.</p>
          </li>
        </ol>
      </div>
      <Footer />
    </div>
  );
}
