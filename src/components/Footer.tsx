import React from 'react';

export const Footer = () => (
  <footer className="bg-gray-900/95 backdrop-blur-2xl text-white py-16 px-6 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900" />
    <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-4 gap-8 mb-12">
      <div><p className="text-gray-400">Innovación, seguridad y sostenibilidad en el cuidado integral de tu vehículo.</p></div>
      <div><h4 className="font-semibold mb-6 text-lg">Servicios</h4><ul className="space-y-3 text-gray-400">{['Estacionamiento','Lavado Automático','Carga Eléctrica','Monitoreo 24/7'].map(s=><li key={s}><a href="#" className="hover:text-white">{s}</a></li>)}</ul></div>
      <div><h4 className="font-semibold mb-6 text-lg">Contacto</h4><ul className="space-y-3 text-gray-400"><li>📞 (2494) 123-456</li><li>📧 info@imperioauto.com</li><li>📍 Pinto y L. Alem, Tandil</li></ul></div>
      <div><h4 className="font-semibold mb-6 text-lg">Horarios</h4><ul className="space-y-3 text-gray-400"><li>Lun-Vie: 7:00 - 22:00</li><li>Sábados: 8:00 - 20:00</li><li>Domingos: 9:00 - 18:00</li></ul></div>
    </div>
    <div className="border-t border-gray-800 pt-8 text-center"><p className="text-gray-400">© 2025 El Imperio del Auto. Todos los derechos reservados.</p></div>
  </footer>
);
