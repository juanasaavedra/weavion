import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Landing from './App';
import ServicesSection from './full_screen_services_section';
import ContactPage from './ContactPage';
import './index.css';
import './i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path=""           element={<App />} />
        <Route path="services"   element={<ServicesSection />} />
        <Route path="contact"    element={<ContactPage />} />
        <Route path="*"          element={<App />} />  {/* fallback a landing */}
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
