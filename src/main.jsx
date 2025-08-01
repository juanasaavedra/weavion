import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import ContactPage from './ContactPage';
import ServicesPage from './ServicesPage';
import './index.css';
import './i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/weavion" element={<App />} />
        <Route path="/weavion/" element={<App />} />
        <Route path="/weavion/services" element={<ServicesPage />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
); 