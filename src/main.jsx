import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import Landing from './App';
import ServiciosPinnedSlider from './ServiciosPinnedSlider';
import ContactPage from './ContactPage';
import WebDesign from './pages/WebDesign';
import CRMServiceTitan from './pages/CRMServiceTitan';
import AnaliticasNegocio from './pages/AnaliticasNegocio';
// Pages for Automate dropdown
import GeneraCitas from './pages/Automatizaciones/GeneraCitas';
import InventarioChat from './pages/Automatizaciones/InventarioChat';
import CotizacionesPostventa from './pages/Automatizaciones/CotizacionesPostventa';
import PostventaInteligente from './pages/PostventaInteligente';
import PrivacyPolicy from './pages/PrivacyPolicy';
import './index.css';
import './i18n';
import Header from './Header';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path=""           element={<Landing />} />
        <Route path="services"   element={<ServiciosPinnedSlider />} />
        <Route path="services/web"          element={<WebDesign />} />
        <Route path="services/crm-servicetitan" element={<CRMServiceTitan />} />
        <Route path="services/analiticas-negocio" element={<AnaliticasNegocio />} />
        <Route path="services/business-analytics" element={<AnaliticasNegocio />} />
        <Route path="contact"    element={<ContactPage />} />
          <Route path="services/genera-citas" element={<GeneraCitas />} />
          <Route path="services/generate-appointments" element={<GeneraCitas />} />
          <Route path="services/inventario" element={<InventarioChat />} />
          <Route path="services/inventory" element={<InventarioChat />} />
          <Route path="services/cotizaciones" element={<CotizacionesPostventa />} />
          <Route path="services/instant-quotes" element={<CotizacionesPostventa />} />
          <Route path="services/postventa" element={<PostventaInteligente />} />
          <Route path="services/smart-post-sale" element={<PostventaInteligente />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
        <Route path="*"          element={<Landing />} />  {/* fallback a landing */}
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
