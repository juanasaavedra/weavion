import React, { useEffect } from 'react';
import './ServicesSlides.css';
import Stack from './Folder';

export default function ServicesPage() {
  useEffect(() => {
    const slides = document.querySelectorAll('.slide');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.3 }
    );
    slides.forEach(slide => observer.observe(slide));

    const groups = document.querySelectorAll('#slide-0 svg g');
    let idx = 0;
    function cycleMorph() {
      groups.forEach((g, i) => g.classList.toggle('active', i === idx));
      idx = (idx + 1) % groups.length;
    }
    cycleMorph();
    const id = setInterval(cycleMorph, 3000);

    return () => {
      observer.disconnect();
      clearInterval(id);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7A00FF" />
            <stop offset="100%" stopColor="#400080" />
          </linearGradient>
        </defs>
      </svg>

      <div className="flex justify-center mb-12 px-4">
        <div className="w-full max-w-xl">
          <Stack randomRotation={false} sendToBackOnClick={false} cardDimensions={{ width: '100%', height: 350 }} />
        </div>
        <div className="graphic">
          <svg viewBox="0 0 200 200">
            <rect className="shape" x="0" y="0" width="200" height="200" fill="none" />
            <rect className="shape" x="40" y="50" width="120" height="80" fill="none" strokeWidth="3" />
            <line className="shape" x1="60" y1="140" x2="140" y2="140" strokeWidth="3" />
          </svg>
        </div>
      </div>

      <section id="slide-2" className="slide">
        <div className="text">
          <h2>Email marketing</h2>
          <p>Conecta con tu audiencia de forma personalizada y escalable.</p>
        </div>
        <div className="graphic">
          <svg viewBox="0 0 200 200">
            <rect className="shape" x="25" y="70" width="150" height="60" fill="none" />
            <polyline className="shape" points="25,70 100,110 175,70" fill="none" strokeWidth="3" />
          </svg>
        </div>
      </section>

      <section id="slide-3" className="slide">
        <div className="text">
          <h2>Analíticas &amp; automatizaciones</h2>
          <p>Convierte datos en decisiones con informes claros y flujos de trabajo inteligentes.</p>
        </div>
        <div className="graphic">
          <svg viewBox="0 0 200 200">
            <circle className="shape" cx="100" cy="100" r="70" fill="none" />
            <rect className="shape" x="60" y="90" width="20" height="40" fill="none" />
            <rect className="shape" x="95" y="70" width="20" height="60" fill="none" />
            <rect className="shape" x="130" y="80" width="20" height="50" fill="none" />
          </svg>
        </div>
      </section>

      <section id="slide-4" className="slide">
        <div className="text">
          <h2>Integraciones CRM</h2>
          <p>Centraliza tu información y optimiza la comunicación en un solo lugar.</p>
        </div>
        <div className="graphic">
          <svg viewBox="0 0 200 200">
            <path className="shape" d="M50,120 a30,25 0 0,1 60,-20 a20,18 0 0,1 40,15 h10 a15,12 0 0,1 0,25 h-110 a15,12 0 0,1 0,-20 z" fill="none" />
            <path className="shape" d="M90,110 l15,15 l-15,15" fill="none" strokeWidth="3" />
            <path className="shape" d="M110,110 l-15,15 l15,15" fill="none" strokeWidth="3" />
          </svg>
        </div>
      </section>
    </div>
  );
}
