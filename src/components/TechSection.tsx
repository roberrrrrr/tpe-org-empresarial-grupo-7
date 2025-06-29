import React from 'react';
import { Camera, Clock, Leaf } from 'lucide-react';

export const TechSection = () => {
  const features = [
    { icon: Camera, title: 'Monitoreo en Tiempo Real', description: 'Cámaras HD accesibles desde el móvil', color: 'blue' },
    { icon: Clock, title: 'Seguimiento de Lavado', description: 'Progreso y tiempo estimado en vivo', color: 'green' },
    { icon: Leaf, title: 'Lavado Ecológico', description: 'Minimiza consumo de agua y químicos', color: 'emerald' }
  ];
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">Tecnología Avanzada</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full" />
      </div>
      <div className="grid lg:grid-cols-3 gap-12">{features.map(f=> (<div key={f.title} className="text-center group cursor-pointer"><div className={`inline-flex p-6 rounded-3xl mb-6 bg-${f.color}-100`}><f.icon className={`w-12 h-12 text-${f.color}-600`} /></div><h3 className="text-2xl font-medium mb-4 text-gray-900">{f.title}</h3><p className="text-gray-600 leading-relaxed max-w-sm mx-auto">{f.description}</p></div>))}</div>
    </section>)
}
