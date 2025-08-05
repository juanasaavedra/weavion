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
        <Route path="/" element={<Landing />} />
        <Route path="/services" element={<ServicesSection />} />
        {/* Alias /create to services */}
        <Route path="/create" element={<ServicesSection />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
