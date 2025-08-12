import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Landing from './App';
import ServiciosPinnedSlider from './ServiciosPinnedSlider';
import ContactPage from './ContactPage';
import DisenoDesarrolloWebExt, { IntegracionCRMExt, AnaliticasNegocioExt } from './pages/ServiciosExtendidos';
import GeneraCitas from './pages/Automatizaciones/GeneraCitas';
import CapturaCalificaLeads from './pages/Automatizaciones/CapturaCalificaLeads';
import InventarioChat from './pages/Automatizaciones/InventarioChat';
import CotizacionesPostventa from './pages/Automatizaciones/CotizacionesPostventa';
import ContactoMas from './pages/Automatizaciones/ContactoMas';
import './index.css';
import './i18n';
import Header from './Header';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Header />
      <Routes>
        <Route path=""           element={<Landing />} />
        <Route path="services"   element={<ServiciosPinnedSlider />} />
        <Route path="services/web"        element={<DisenoDesarrolloWebExt />} />
        <Route path="services/crm"        element={<IntegracionCRMExt />} />
        <Route path="services/analiticas" element={<AnaliticasNegocioExt />} />
        <Route path="contact"    element={<ContactPage />} />
        <Route path="automation/genera-citas" element={<GeneraCitas />} />
        <Route path="automation/captura-califica-leads" element={<CapturaCalificaLeads />} />
        <Route path="automation/inventario-chat" element={<InventarioChat />} />
        <Route path="automation/cotizaciones-postventa" element={<CotizacionesPostventa />} />
        <Route path="automation/contacto" element={<ContactoMas />} />
        <Route path="*"          element={<Landing />} />  {/* fallback a landing */}
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
