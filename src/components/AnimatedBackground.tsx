import React, { useState, useEffect, useMemo } from 'react';
import './animations.css';

export function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleMouseMove = e => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const vw = Math.min(1000, window.innerWidth);
  const vh = Math.max(1080, window.innerHeight);
  const areaEnPx = vw * vh;
  const densidad = 1 / 5000;
  const cantidad = Math.min(500, Math.floor(areaEnPx * densidad));

  const burbujasOriginales = useMemo(
    () => Array.from({ length: cantidad }, () => [
      50 + Math.random() * 100,
      Math.random() * 150 - 25
    ]),
    []
  );

  const burbujas = useMemo(
    () => burbujasOriginales.map(([initialTop, left], i) => {
      const velocidadBase = 0.1;
      const velocidadExtra = (i % 5) * 0.05;
      const velocidadTotal = velocidadBase + velocidadExtra;
      const distancia = scrollPosition * velocidadTotal;
      return [`${initialTop - distancia}vh`, `${left}%`];
    }),
    [burbujasOriginales, scrollPosition]
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      {/* fondo y orb blurs omitidos por brevedad */}
      {/* luz mouse */}
      <div
        className="absolute w-40 h-40 bg-green-300/20 rounded-full blur-2xl transition-transform duration-1000 ease-out"
        style={{ transform: `translate(${mousePosition.x - 80}px, ${mousePosition.y - 80}px)` }}
      />
      {/* burbujas flotantes */}
      {burbujas.map(([top, left], i) => (
        <div key={i} className="absolute animate-float2" style={{ top, left }}>
          <img src="bubble.png" alt="Burbuja" className="w-140 h-140" />
        </div>
      ))}
    </div>
  );
}


