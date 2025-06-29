import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X, Settings, DollarSign, Phone } from 'lucide-react';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { name: 'Servicios', href: '#servicios', icon: Settings },
    { name: 'Precios', href: '#precios', icon: DollarSign },
    { name: 'Contacto', href: '#contacto', icon: Phone }
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-200/50' : 'bg-gradient-to-b from-black/5 to-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-20">
        <Logo />
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <a key={item.name} href={item.href} className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 text-gray-700 hover:text-blue-600 hover:bg-blue-50">
                <Icon className="w-4 h-4" />
                {item.name}
              </a>
            );
          })}
          <a href="/login">
            <button className="ml-6 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg hover:scale-105 transition-all duration-300">
              Iniciar Sesión
            </button>
          </a>
        </nav>
        <button className="lg:hidden p-2 rounded-xl text-white hover:bg-white/10 transition" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </div>
      <div className={`${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} lg:hidden overflow-hidden transition-all duration-300`}>  
        <div className="py-4 space-y-2 bg-white/95 backdrop-blur-xl rounded-2xl mt-4 shadow-xl border border-gray-200/50">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <a key={item.name} href={item.href} className="flex items-center gap-3 px-6 py-3 font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                <Icon className="w-5 h-5" />
                {item.name}
              </a>
            );
          })}
          <div className="px-4 pt-4 border-t border-gray-200/50">
            <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl opacity-95 hover:scale-95 transition">
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    </header>)
}
