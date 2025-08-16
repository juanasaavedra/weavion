import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="py-6 text-center text-gray-400">
      <div className="space-x-4">
        <a href="mailto:sales@weavion.xyz" className="hover:text-white">sales@weavion.xyz</a>
        <span>|</span>
        <Link to="/privacy" className="hover:text-white">Política de Privacidad</Link>
      </div>
    </footer>
  );
}
