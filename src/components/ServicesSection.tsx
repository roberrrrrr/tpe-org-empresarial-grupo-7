import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Car, Zap, Smartphone } from 'lucide-react';

export const ServicesSection = () => {
  const services = [
    { icon: Shield, title: 'Estacionamiento Seguro', description: 'Cámaras HD 24/7 y acceso controlado', color: 'blue', delay: 0 },
    { icon: Car, title: 'Lavado Automático', description: 'Cepillos premium y secado automatizado', color: 'green', delay: 200 },
    { icon: Zap, title: 'Carga Eléctrica', description: 'Estaciones de carga para vehículos eléctricos', color: 'yellow', delay: 400 },
    { icon: Smartphone, title: 'App Móvil', description: 'Control total desde tu smartphone', color: 'purple', delay: 600 }
  ];

  return (
    <section id="servicios" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">Nuestros Servicios</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full" />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map(s => (
          <Card key={s.title} className="group relative bg-white/60 backdrop-blur-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="text-center pb-4 relative z-10" style={{ animationDelay: `${s.delay}ms` }}>
              <div className={`inline-flex p-4 rounded-2xl mb-4 bg-${s.color}-100 group-hover:bg-${s.color}-200`}>
                <s.icon className={`w-8 h-8 text-${s.color}-600 group-hover:scale-110 transition-transform duration-300`} />
              </div>
              <CardTitle className="text-xl font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                {s.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-gray-600 text-center leading-relaxed">{s.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>)
}
