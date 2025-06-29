
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export const HeroSection = () => {
  const texts = ['Inteligente', 'Seguro', 'Ecológico', 'Moderno'];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setCurrent(i => (i + 1) % texts.length), 3000);
    return () => clearInterval(iv);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center z-10">
        <Badge className="mb-8 animate-in fade-in slide-in-from-bottom">Innovación • Seguridad • Sostenibilidad</Badge>
        <h1 className="text-8xl font-bold text-slate-800 uppercase tracking-wide mb-4" style={{ fontFamily: "'Russo One', sans-serif" }}>
          El Imperio Del Auto
        </h1>
        <h2 className="text-8xl font-bold text-blue-600 tracking-tight mb-6">
          {texts[current]}
        </h2>
        <p className="text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
          Tecnología de vanguardia para el cuidado integral de tu vehículo...
        </p>
        <div className="flex justify-center gap-6">
          <Button variant="outline" className="px-8 py-4 rounded-full text-lg font-medium hover:scale-105">
            Reservar ahora!
          </Button>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </div>
    </section>)
}
