import React from 'react';
import { MapPin } from 'lucide-react';

export const ContactSection = () => (
  <section id="contacto" className="py-24 px-6">
    <div className="max-w-4xl mx-auto text-center mb-16">
      <h2 className="text-5xl font-bold text-gray-900 mb-6">Visítanos</h2>
      <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full" />
    </div>
    <div className="flex flex-col items-center gap-8">
      <div className="flex items-center gap-3 text-xl text-gray-700">
        <MapPin className="w-6 h-6 text-red-500" />
        Pinto y Leandro Alem, Tandil, Buenos Aires
      </div>
      <div className="w-full h-64 sm:h-96 rounded-2xl overflow-hidden shadow-xl">
        <iframe
          title="Ubicación Lavadero"
          src="https://www.google.com/maps?q=-37.324713,-59.143377&z=17&output=embed"
          width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
        />
      </div>
    </div>
  </section>
);
