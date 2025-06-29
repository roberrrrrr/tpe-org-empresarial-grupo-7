// src/components/Logo.jsx
import React from 'react';
import { Crown } from 'lucide-react';

export const Logo = () => (
  <div className="relative flex items-center gap-3 p-2 rounded-3xl bg-gradient-to-r from-blue-600/90 to-indigo-700/90 backdrop-blur-lg shadow-2xl border border-white/10 hover:shadow-3xl transition-all duration-300 group">
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative flex items-center gap-1">
      <Crown className="w-7 h-7 text-yellow-300 drop-shadow-lg filter brightness-110 group-hover:scale-110 transition-transform duration-300" />
    </div>
    <div className="absolute top-2 right-3 w-2 h-2 bg-yellow-300/40 rounded-full blur-sm animate-pulse" />
  </div>
);
