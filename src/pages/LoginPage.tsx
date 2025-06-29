"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Car, Eye, EyeOff, Loader2 } from "lucide-react";
import { Logo } from "/src/components/Logo";

export function AnimatedBackground({ isLoggingIn = false }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const vw = typeof window !== 'undefined' ? Math.min(1000, window.innerWidth) : 1000;
  const vh = typeof window !== 'undefined' ? Math.max(1080, window.innerHeight) : 1080;
  const areaEnPx = vw * vh;
  const densidad = 1 / 5000;
  const cantidad = Math.min(500, Math.floor(areaEnPx * densidad));

  const burbujasOriginales = useMemo(
    () => Array.from({ length: cantidad }, (_, i) => ({
      id: i,
      size: 20 + Math.random() * 60,
      initialTop: 50 + Math.random() * 100,
      left: Math.random() * 100,
      opacity: 0.1 + Math.random() * 0.3,
      animationDelay: Math.random() * 2,
      color: ['blue', 'indigo', 'purple', 'cyan'][Math.floor(Math.random() * 4)]
    })),
    [cantidad]
  );

  const burbujas = useMemo(
    () => burbujasOriginales.map((burbuja) => {
      const velocidadBase = 0.1;
      const velocidadExtra = (burbuja.id % 5) * 0.05;
      const velocidadTotal = velocidadBase + velocidadExtra;
      const distancia = scrollPosition * velocidadTotal;
      const loginBoost = isLoggingIn ? 200 : 0;
      return {
        ...burbuja,
        top: burbuja.initialTop - distancia - loginBoost,
        scale: isLoggingIn ? 1.5 : 1,
        opacity: isLoggingIn ? burbuja.opacity * 2 : burbuja.opacity
      };
    }),
    [burbujasOriginales, scrollPosition, isLoggingIn]
  );

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        
        @keyframes bubble-rise {
          from { transform: translateY(0) scale(1); opacity: 0.2; }
          to { transform: translateY(-100vh) scale(1.2); opacity: 0; }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-bubble-rise {
          animation: bubble-rise 3s ease-out forwards;
        }
      `}</style>
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
        <div className="absolute inset-0 z-[-2]">
          <div className="w-full h-full bg-gradient-to-br from-white via-[#b2f5ea] to-white blur-2xl opacity-80" />
          <div className="absolute top-1/2 left-1/2 w-[120vw] h-[120vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300/30 blur-[180px]" />
        </div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div
          className="absolute w-40 h-40 bg-cyan-300/20 rounded-full blur-2xl transition-transform duration-1000 ease-out"
          style={{ 
            transform: `translate(${mousePosition.x - 80}px, ${mousePosition.y - 80}px)`,
            opacity: isLoggingIn ? 0.5 : 0.3
          }}
        />
        {burbujas.map((burbuja) => (
          <div
            key={burbuja.id}
            className={`absolute ${isLoggingIn ? 'animate-bubble-rise' : 'animate-float'}`}
            style={{
              top: `${burbuja.top}vh`,
              left: `${burbuja.left}%`,
              opacity: burbuja.opacity,
              animationDelay: `${burbuja.animationDelay}s`,
              transform: `scale(${burbuja.scale})`,
              transition: isLoggingIn ? 'all 0.5s ease-out' : 'none'
            }}
          >
            <img 
              src="bubble.png" 
              alt="Burbuja" 
              className="w-20 h-20"
              style={{
                filter: `hue-rotate(${burbuja.color === 'blue' ? '0deg' : burbuja.color === 'indigo' ? '30deg' : burbuja.color === 'purple' ? '60deg' : '180deg'})`,
                width: `${burbuja.size}px`,
                height: `${burbuja.size}px`
              }}
            />
          </div>
        ))}
        {isLoggingIn && (
          <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent animate-pulse" />
        )}
      </div>
    </>
  );
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify({ email, name: "Usuario Demo" }));
      navigate("/dashboard");
    }, 2500);
  };

  return (
    <>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <AnimatedBackground isLoggingIn={isLoggingIn} />

        <div className={`relative z-10 w-full max-w-md transition-all duration-1000 ${
          isLoggingIn ? 'animate-pulse scale-105' : 'animate-fade-in'
        }`}>
          <Card className={`rounded-3xl backdrop-blur-lg bg-white/80 border border-white/30 
                           shadow-2xl transition-all duration-500 ${
                             isLoggingIn ? 'shadow-3xl bg-white/95' : 'hover:shadow-3xl'
                           }`}>
            <CardHeader className="text-center pb-6">
              <div className={`mb-6 w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 
                           flex items-center justify-center mx-auto shadow-lg transition-all duration-500 ${
                             isLoggingIn ? 'animate-spin' : ''
                           }`}>
                {isLoggingIn ? <Loader2 className="w-8 h-8 text-white animate-spin" /> : <Logo />}
              </div>

              <CardDescription className="text-gray-600 mt-2">
                {isLoggingIn ? "Iniciando sesión..." : "Ingresa a tu cuenta para gestionar tus servicios"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoggingIn}
                    placeholder="tu@email.com"
                    className={`w-full px-4 py-3 rounded-xl bg-white/90 border border-gray-200 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                             transition-all duration-200 placeholder:text-gray-400 ${
                               isLoggingIn ? 'opacity-50 cursor-not-allowed' : ''
                             }`}  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoggingIn}
                      placeholder="Tu contraseña"
                      className={`w-full px-4 py-3 pr-12 rounded-xl bg-white/90 border border-gray-200 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                             transition-all duration-200 placeholder:text-gray-400 ${
                               isLoggingIn ? 'opacity-50 cursor-not-allowed' : ''
                             }`}  />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoggingIn}
                      className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 
                             focus:outline-none transition-colors duration-200 ${
                               isLoggingIn ? 'opacity-50 cursor-not-allowed' : ''
                             }`}
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoggingIn}
                  className={`w-full py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 ${
                    isLoggingIn 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] active:scale-[0.98]'
                  }`}>
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Iniciando sesión...
                    </>
                  ) : (
                    'Iniciar Sesión'
                  )}
                </Button>
              </form>

              {!isLoggingIn && (
                <div className="pt-4 text-center space-y-3 border-t border-gray-200">
                  <Link 
                    to="/forgot-password" 
                    className="block text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                  <div className="text-sm text-gray-600">
                    ¿No tienes cuenta?{" "}
                    <Link 
                      to="/register" 
                      className="text-blue-600 hover:text-blue-700 hover:underline font-medium transition-colors duration-200"
                    >
                      Regístrate aquí
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {isLoggingIn && (
          <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
            ¡Bienvenido de vuelta! 🎉
          </div>
        )}
      </div>
    </>
  );
}

