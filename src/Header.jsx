import React from 'react';
import { Link } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import NavTechMenus from './NavTechMenus';
import logo from './assets/logo.png';

export default function Header() {
  return (
    <div className="fixed top-4 inset-x-0 z-50 flex items-center px-4 md:px-8">
      <Link to="/" className="mr-4 md:mr-8">
        <img src={logo} alt="Weavion logo" className="w-14 h-14 object-contain rounded-full" />
      </Link>

      <div className="flex-1 flex items-center justify-center">
        <NavTechMenus />
      </div>

      <LanguageSelector />
    </div>
  );
}
