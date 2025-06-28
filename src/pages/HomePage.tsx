import React, { useState, useEffect, useMemo} from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Car,
  Shield,
  Crown,
  Leaf,
  Zap,
  Clock,
  Camera,
  Smartphone,
  MapPin,
  ChevronDown,
  Phone,
  Settings,

  DollarSign,
  Menu,
  X
} from "lucide-react";





import "./animations.css"; // Ajustá la ruta según tu estructura

// Animated background component

export function AnimatedBackground() {
 const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const vw = Math.min(1000, window.innerWidth);
  const vh = Math.max(1080, window.innerHeight);

  const areaEnPx = vw * vh;
  const densidad = 1 / 5000; // 1 burbuja cada 8000px² aprox.
  const cantidad = Math.min(500, Math.floor(areaEnPx * densidad));
  console.log(cantidad,Math.floor(areaEnPx * densidad) )


  const burbujasOriginales = useMemo(() =>
    Array.from({ length: cantidad }, () => [
      50 + Math.random() * 100, // top inicial más abajo
      Math.random() * 150 - 25, // left aleatorio
    ]),
    []
  );

  const burbujas = useMemo(() => {
      return burbujasOriginales.map(([initialTop, left], i) => {
        const velocidadBase = 0.1;           
        const velocidadExtra = (i % 5) * 0.05; 
        const velocidadTotal = velocidadBase + velocidadExtra; 
        const distanciaMovida = scrollPosition * velocidadTotal; 
        const currentTop = initialTop - distanciaMovida; // Nueva posición = posición inicial - distancia movida
        return [`${currentTop}vh`, `${left}%`];
      });
  }, [burbujasOriginales, scrollPosition])




  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">

      {/* FONDO DIFUMINADO VERDE MENTA */}
      <div className="absolute inset-0 z-[-2]">
        {/* Capa base con verde + blanco */}
        <div className="w-full h-full bg-gradient-to-br from-white via-[#b2f5ea] to-white blur-2xl opacity-80" />
        
        {/* Glow radial verde intenso */}
        <div className="absolute top-1/2 left-1/2 w-[120vw] h-[120vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300/30 blur-[180px]" />
      </div>

      {/* ORB BLURS */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-green-300/30 rounded-full blur-[160px] animate-orb" />
      <div className="absolute top-[70%] left-[60%] w-[400px] h-[400px] bg-blue-300/30 rounded-full blur-[120px] animate-orbSlow" />
      <div className="absolute top-[40%] left-[80%] w-[300px] h-[300px] bg-cyan-200/30 rounded-full blur-[100px] animate-orbDelay" />

      {/* LUZ QUE SIGUE AL MOUSE */}
      <div
        className="absolute w-40 h-40 bg-green-300/20 rounded-full blur-2xl transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 80}px, ${mousePosition.y - 80}px)`,
        }}
      />

      {/* MESH GRID SUPER SUAVE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] bg-[length:60px_60px] opacity-5" />

      {/* BURBUJAS FLOTANTES */}
      {burbujas.map(([top, left], i) => (
        <div
          key={i}
          className="!cursor-pointer absolute animate-float2"
          style={{ top, left }}
        >
          <img src="bubble.png" alt="Burbuja" className="w-140 h-140" />
        </div>
      ))}

      {/* SVG BURBUJAS */}
      <svg
        className="absolute top-[10%] left-[10%] w-[200px] h-[200px] animate-float1 opacity-20"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="90" fill="url(#grad1)" />
        <defs>
          <radialGradient id="grad1" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffffaa" />
            <stop offset="100%" stopColor="#ffffff00" />
          </radialGradient>
        </defs>
      </svg>

      <svg
        className="absolute bottom-[15%] right-[15%] w-[180px] h-[180px] animate-float2 opacity-15"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="90" fill="url(#grad2)" />
        <defs>
          <radialGradient id="grad2" cx="35%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#ffffffaa" />
            <stop offset="100%" stopColor="#ffffff00" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

// Header component


const Logo = () => {
  return (
    <div className="relative flex items-center gap-3 p-2 rounded-3xl bg-gradient-to-r from-blue-600/90 to-indigo-700/90 backdrop-blur-lg shadow-2xl border border-white/10 hover:shadow-3xl transition-all duration-300 group">
      {/* Efecto de brillo sutil */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Iconos con animación */}
      <div className="relative flex items-center gap-1">
        <Crown className="w-7 h-7 text-yellow-300 drop-shadow-lg filter brightness-110 group-hover:scale-110 transition-transform duration-300" />
        {/* <Car className="w-6 h-6 text-white/90 drop-shadow-md group-hover:translate-x-1 transition-transform duration-300" /> */}
      </div>
      
      {/* Texto con mejor tipografía */}
      {/* <div className="relative"> */}
      {/*   <h1 className="text-xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent drop-shadow-sm tracking-wide"> */}
      {/*     Imperio del Auto */}
      {/*   </h1> */}
      {/*   <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-300/60 to-transparent rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div> */}
      {/* </div> */}
      {/**/}
      {/* Punto de luz decorativo */}
      <div className="absolute top-2 right-3 w-2 h-2 bg-yellow-300/40 rounded-full blur-sm animate-pulse"></div>
    </div>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Servicios', href: '#servicios', icon: Settings },
    { name: 'Precios', href: '#precios', icon: DollarSign },
    { name: 'Contacto', href: '#contacto', icon: Phone }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-200/50' 
        : 'bg-gradient-to-b from-black/5 to-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo mejorado */}
          <Logo></Logo>
          {/* Navigation desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 group ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                      : 'text-gray-700  hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </a>
              );
            })}
            
            <a href={"/login"}>
                <button className="ml-6 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95">
                  Iniciar Sesión
                </button>
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            className={`lg:hidden p-2 rounded-xl transition-all duration-300 ${
              isScrolled 
                ? 'hover:bg-gray-100 text-gray-700' 
                : 'hover:bg-white/10 text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-2 bg-white/95 backdrop-blur-xl rounded-2xl mt-4 shadow-xl border border-gray-200/50">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200 rounded-lg mx-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </a>
              );
            })}
            <div className="px-4 pt-4 border-t border-gray-200/50">
              <button 
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 active:scale-95"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Iniciar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};


// Hero Section
const HeroSection = () => {
  const [currentText, setCurrentText] = useState(0);
  const texts = ['Inteligente', 'Seguro', 'Ecológico', 'Moderno'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Animated badge */}
        <div className="mb-8 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
          <Badge className="font-bold text-blue-800 bg-blue-100/80 px-6 py-2 text-sm rounded-full backdrop-blur-xl shadow-lg transition-all duration-300 hover:scale-105 hover:text-blue-800 hover:bg-blue-100/80">
            Innovación • Seguridad • Sostenibilidad
          </Badge>
        </div>

        {/* Main title */}
        <div className="mb-8 animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
          <h1 className="text-6xl lg:text-8xl font-bold text-slate-800 mb-4 tracking-wide 
            transition-all duration-300 uppercase"
            style={{fontFamily: "'Russo One', 'Arial Black', sans-serif"}}>
            El Imperio Del Auto
          </h1>
          <h1 className="text-6xl lg:text-8xl font-bold text-blue-600 mb-6 tracking-tight relative">
            <span className="inline-block transition-all duration-500 transform">
              {texts[currentText]}
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light animate-in fade-in slide-in-from-bottom duration-1000 delay-700">
          Tecnología de vanguardia para el cuidado integral de tu vehículo. 
          Estacionamiento seguro, lavado ecológico y carga eléctrica en el corazón de Tandil.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-in fade-in slide-in-from-bottom duration-1000 delay-1000">
          {/* <Button  */}
          {/*   size="lg"  */}
          {/*   className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/25" */}
          {/* > */}
          {/*   Reservar Ahora */}
          {/* </Button> */}
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 backdrop-blur-xl"
          >
            Reservar ahora! 
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-gray-400" />
        </div>
      </div>
    </section>
  );
};

// Services Section
const ServicesSection = () => {
  const services = [
    {
      icon: Shield,
      title: "Estacionamiento Seguro",
      description: "Cámaras HD 24/7 y acceso controlado por patente",
      color: "blue",
      delay: 0
    },
    {
      icon: Car,
      title: "Lavado Automático",
      description: "Sistema automatizado con cepillos premium y secado",
      color: "green",
      delay: 200
    },
    {
      icon: Zap,
      title: "Carga Eléctrica",
      description: "Estaciones de carga para vehículos eléctricos",
      color: "yellow",
      delay: 400
    },
    {
      icon: Smartphone,
      title: "App Móvil",
      description: "Control total desde tu smartphone",
      color: "purple",
      delay: 600
    }
  ];

  return (
    <section id="servicios" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight"


          >
            Nuestros Servicios
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.title}
              className="group relative bg-white/60 backdrop-blur-2xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 rounded-3xl overflow-hidden"
              style={{ animationDelay: `${service.delay}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardHeader className="text-center pb-4 relative z-10">
                <div className={`inline-flex p-4 rounded-2xl mb-4 bg-${service.color}-100 group-hover:bg-${service.color}-200 transition-colors duration-300`}>
                  <service.icon className={`h-8 w-8 text-${service.color}-600 group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <CardTitle className="text-xl font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <p className="text-gray-600 text-center leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Tech Section
const TechSection = () => {
  const features = [
    {
      icon: Camera,
      title: "Monitoreo en Tiempo Real",
      description: "Accede a las cámaras de seguridad desde tu celular y observa tu vehículo en todo momento",
      color: "blue"
    },
    {
      icon: Clock,
      title: "Seguimiento de Lavado",
      description: "Visualiza el progreso del lavado de tu auto en tiempo real con estimación de tiempo",
      color: "green"
    },
    {
      icon: Leaf,
      title: "Lavado Ecológico",
      description: "Tecnología sustentable que minimiza el uso de agua y químicos nocivos",
      color: "emerald"
    }
  ];

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Tecnología Avanzada
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="text-center group cursor-pointer"
            >
              <div className={`inline-flex p-6 rounded-3xl mb-6 bg-${feature.color}-100 group-hover:bg-${feature.color}-200 transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl`}>
                <feature.icon className={`h-12 w-12 text-${feature.color}-600 group-hover:scale-110 transition-transform duration-300`} />
              </div>
              <h3 className="text-2xl font-medium mb-4 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Pricing Section
const PricingSection = () => {
  return (
    <section id="precios" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Planes y Precios
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Monthly Plan */}
          <Card className="group relative bg-white/60 backdrop-blur-2xl border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <CardHeader className="relative z-10 text-center pb-6">

              <CardTitle className="text-3xl font-light text-gray-900 mb-2">
                Plan Mensual
              </CardTitle>
              <CardDescription className="text-gray-600 mb-6">
                Ideal para uso frecuente
              </CardDescription>
              <div className="text-5xl font-light text-blue-600 mb-2">
                $15.000
                <span className="text-xl text-gray-400 font-normal">/mes</span>
              </div>
            </CardHeader>
            
            <CardContent className="relative z-10">
              <ul className="space-y-4 mb-8">
                {[
                  'Estacionamiento ilimitado',
                  '8 lavados incluidos',
                  'Acceso prioritario',
                  'Carga eléctrica gratuita',
                  'App premium'
                ].map((feature) => (
                  <li key={feature} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl">
                Suscribirse
              </Button>
            </CardContent>
          </Card>

          {/* Pay per use */}
          <Card className="group relative bg-white/60 backdrop-blur-2xl border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <CardHeader className="relative z-10 text-center pb-6">
              <CardTitle className="text-3xl font-light text-gray-900 mb-2">
                Pago por Uso
              </CardTitle>
              <CardDescription className="text-gray-600 mb-6">
                Flexibilidad total
              </CardDescription>
              <div className="text-5xl font-light text-green-600 mb-2">
                Variable
              </div>
            </CardHeader>
            
            <CardContent className="relative z-10">
              <ul className="space-y-4 mb-8">
                {[
                  'Estacionamiento: $200/hora',
                  'Lavado completo: $2.500',
                  'Carga eléctrica: $150/kWh',
                  'Descuento combo: 15%',
                  'Sin compromisos'
                ].map((feature) => (
                  <li key={feature} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                variant="outline" 
                className="w-full border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white py-4 rounded-2xl text-lg font-medium transition-all duration-300 hover:scale-105"
              >
                Usar Ahora
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  return (
    <section id="contacto" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Visitanos 
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full" />
        </div>

        <div className="flex items-center justify-center mb-8 group">
          <MapPin className="h-6 w-6 text-red-500 mr-3 group-hover:scale-110 transition-transform duration-300" />
          <p className="text-xl text-gray-700 font-medium">
            Pinto y Leandro Alem, Centro - Tandil, Buenos Aires
          </p>
        </div>

        <div className="relative bg-white/60 backdrop-blur-2xl rounded-3xl p-2 sm:p-4 shadow-xl hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 h-64 sm:h-96 w-full rounded-2xl overflow-hidden">
          <iframe
              title="Ubicación Lavadero"
              width="100%"
              height="100%"
              loading="lazy"
              style={{ border: 0 }}
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=-37.324713,-59.143377&z=17&output=embed"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};// Footer
const Footer = () => {
  return (
    <footer className="bg-gray-900/95 backdrop-blur-2xl text-white py-16 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            {/* <div className="flex items-center space-x-3 mb-6"> */}
            {/*   <Logo></Logo> */}
            {/*   <span className="text-xl font-medium">El Imperio del Auto</span> */}
            {/* </div> */}
            <p className="text-gray-400 leading-relaxed">
              Innovación, seguridad y sostenibilidad en el cuidado integral de tu vehículo.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-lg">Servicios</h4>
            <ul className="space-y-3">
              {['Estacionamiento', 'Lavado Automático', 'Carga Eléctrica', 'Monitoreo 24/7'].map((service) => (
                <li key={service}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-lg">Contacto</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center">
                <span className="mr-2">📞</span> (2494) 123-456
              </li>
              <li className="flex items-center">
                <span className="mr-2">📧</span> info@imperioauto.com
              </li>
              <li className="flex items-center">
                <span className="mr-2">📍</span> Pinto y L. Alem, Tandil
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-lg">Horarios</h4>
            <ul className="space-y-3 text-gray-400">
              <li>Lun-Vie: 7:00 - 22:00</li>
              <li>Sábados: 8:00 - 20:00</li>
              <li>Domingos: 9:00 - 18:00</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2025 El Imperio del Auto. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main HomePage Component
export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <div className="relative z-10">
        <Header />
        <HeroSection />
        <ServicesSection />
        <TechSection />
        <PricingSection />  
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}
