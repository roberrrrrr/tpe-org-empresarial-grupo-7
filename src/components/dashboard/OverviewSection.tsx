import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

import {
  Car,
  Clock,
  Calendar,
  CreditCard,
  Zap,
  Activity,
  Droplets,
  TrendingUp,
} from 'lucide-react';

export interface OverviewProps {
  /** Llamado al hacer clic en “Iniciar Lavado” */
  onStartWash: () => void;
  /** Indica si el vehículo está en proceso de lavado */
  washing?: boolean;
  /** Progreso del lavado (0–100) */
  progress?: number;
}

// Determina el texto de estado según el progreso
const getWashStatus = (progress: number) => {
  if (progress < 25) return 'Preparando...';
  if (progress < 50) return 'Aplicando detergente...';
  if (progress < 75) return 'Cepillos en acción...';
  if (progress < 100) return 'Secando...';
  return '¡Completado!';
};

// Componente para cada tarjeta de estadística
const StatsCard: FC<{
  title: string;
  icon: FC<any>;
  value: string;
  subtitle: string;
  color: string;
  bgGradient: string;
  pulse?: boolean;
  index: number;
}> = ({ title, icon: Icon, value, subtitle, color, bgGradient, pulse = false, index }) => (
  <Card
    key={title}
    className={`
      relative overflow-hidden group
      bg-white/70 backdrop-blur-xl
      border-0 rounded-2xl
      shadow-lg shadow-black/5
      hover:shadow-2xl hover:shadow-black/10
      hover:scale-105 hover:-translate-y-1
      transition-all duration-500 ease-out
    `}
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-30 group-hover:opacity-50 transition-opacity duration-300`} />
    <div className="absolute -top-2 -right-2 w-20 h-20 bg-white/20 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity" />
    <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full blur-lg" />

    <CardHeader className="relative flex items-center justify-between pb-3 pt-6">
      <CardTitle className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
        {title}
      </CardTitle>
      <div className={`
        p-2 rounded-xl bg-gradient-to-br ${color}
        shadow-lg group-hover:shadow-xl group-hover:scale-110
        transition-all duration-300
      `}>
        <Icon className="w-4 h-4 text-white" />
      </div>
    </CardHeader>

    <CardContent className="relative pt-0">
      <div className="text-2xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors mb-1">
        {value}
      </div>
      <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors">
        {subtitle}
      </p>
    </CardContent>
  </Card>
);

// Componente para cada elemento de actividad reciente
const RecentActivityItem: FC<{
  text: string;
  when: string;
  icon: FC<any>;
  status: 'active' | 'success' | 'completed' | 'info';
  color: string;
  index: number;
  washing: boolean;
}> = ({ text, when, icon: Icon, status, color, index, washing }) => (
  <div
    key={index}
    className="group flex items-start gap-4 p-3 rounded-xl hover:bg-white/60 transition-all duration-300 hover:shadow-md"
    style={{ animationDelay: `${index * 150}ms` }}
  >
    <div className={
      `p-2 rounded-lg bg-gradient-to-br from-white to-gray-50
      shadow-sm group-hover:shadow-md transition-all duration-300
      ${color.replace('text-', 'border-l-4 border-')}`
    }>
      <Icon className={`w-4 h-4 ${color}`} />
    </div>

    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-900 group-hover:text-gray-800 transition-colors">
        {text}
      </p>
      <p className="text-xs text-gray-500 mt-1">
        {when}
      </p>
    </div>

    <div className={
      `w-2 h-2 rounded-full mt-2 transition-all duration-300
      ${status === 'active' ? 'bg-emerald-400 '
        : status === 'success' ? 'bg-blue-400'
        : status === 'completed' ? 'bg-purple-400'
        : 'bg-gray-300'}`
    } />
  </div>
);

const OverviewSection: React.FC<OverviewProps> = () => {

  
  const [washing, setWashing] = useState(false);
  const [progress, setWashProgress] = useState(0);

  const onStartWash = () => {setWashing(prev => !prev)}
  useEffect(() => {
    if (washing && progress < 100) {
      const timer = setTimeout(() => setWashProgress(prev => Math.min(prev + 5, 100)), 800);
      return () => clearTimeout(timer);
    }
  }, [washing, progress]);

  const startWash = () => {
    setWashing(true);
    setWashProgress(0);
  };




  const stats = [
    {
      title: 'Estado',
      icon: Car,
      value: washing ? 'Lavando' : 'Estacionado',
      subtitle: washing ? `${progress}% completado` : 'Planta A-15',
      color: washing ? 'from-blue-400 to-blue-600' : 'from-emerald-400 to-emerald-600',
      bgGradient: washing ? 'from-blue-50 to-blue-100' : 'from-emerald-50 to-emerald-100',
      pulse: washing,
    },
    {
      title: 'Tiempo',
      icon: Clock,
      value: '2h 30m',
      subtitle: 'Hasta 18:00',
      color: 'from-blue-400 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
    },
    {
      title: 'Próx. Lavado',
      icon: Calendar,
      value: washing ? 'En curso' : 'Mañana',
      subtitle: washing ? 'Lavado actual' : '10:00 AM',
      color: 'from-purple-400 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
    },
    {
      title: 'Plan Activo',
      icon: CreditCard,
      value: 'Premium',
      subtitle: '5 servicios restantes',
      color: 'from-amber-400 to-amber-600',
      bgGradient: 'from-amber-50 to-amber-100',
    },
  ];

  const recent = [
    {
      text: 'Vehículo estacionado en A-15',
      when: 'Hace 2h 30m',
      icon: Car,
      status: 'active',
      color: 'text-emerald-600',
    },
    {
      text: 'Lavado ecológico completado',
      when: 'Ayer 16:30',
      icon: Zap,
      status: 'success',
      color: 'text-blue-600',
    },
    {
      text: 'Pago mensual procesado',
      when: 'Hace 3 días',
      icon: CreditCard,
      status: 'completed',
      color: 'text-purple-600',
    },
    {
      text: 'Sistema de seguridad activado',
      when: 'Hace 1 semana',
      icon: Activity,
      status: 'info',
      color: 'text-gray-600',
    },
  ];


  console.log(washing)

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((card, idx) => (
          <StatsCard index={idx} {...card} />
        ))}
      </div>

      {/* Wash Progress & Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Wash Control Card */}
        <Card className="bg-white/70 backdrop-blur-xl border-0 rounded-2xl shadow-lg shadow-black/5 overflow-hidden relative">
          <div className={`absolute inset-0 bg-gradient-to-br ${washing ? 'from-blue-50 to-cyan-50' : 'from-slate-50 to-gray-50'} opacity-40`} />
          <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-bl ${washing ? 'from-blue-200/30' : 'from-gray-200/30'} to-transparent rounded-full blur-xl`} />

          <CardHeader className="relative">
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              {washing ? <Droplets className="w-5 h-5 text-blue-600" /> : <Car className="w-5 h-5 text-gray-600" />}
              {washing ? 'Progreso de Lavado' : 'Control de Lavado'}
            </CardTitle>
          </CardHeader>

          <CardContent className="relative">
            {washing ? (
                <div className="text-center space-y-4">
                  <div className="text-3xl font-bold text-blue-600">{progress}%</div>
                  <Progress value={progress} className="w-full" />
                  <p className="text-gray-600">
                    {progress < 25
                      ? 'Preparando...'
                      : progress < 50
                      ? 'Detergente...'
                      : progress < 75
                      ? 'Cepillos...'
                      : progress < 100
                      ? 'Secando...'
                      : '¡Completado!'}
                  </p>
                </div>
              ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-4">
                  <Car className="w-8 h-8 text-blue-600" />
                </div>
                <div className="space-y-2">
                  <p className="text-gray-600 text-sm">Vehículo listo para lavado</p>
                  <Button
                    onClick={onStartWash}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Iniciar Lavado
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity List */}
        <Card className="lg:col-span-2 bg-white/70 backdrop-blur-xl border-0 rounded-2xl shadow-lg shadow-black/5 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 opacity-30" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/50 to-transparent rounded-full blur-2xl" />

          <CardHeader className="relative">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Actividad Reciente
              </CardTitle>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <TrendingUp className="w-3 h-3" />
                Última hora
              </div>
            </div>
          </CardHeader>

          <CardContent className="relative space-y-4">
            {washing && (
              <div className="group flex items-start gap-4 p-3 rounded-xl bg-blue-50/50 border border-blue-200/50">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-sm">
                  <Droplets className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-blue-900">Lavado en progreso - {getWashStatus(progress)}</p>
                  <p className="text-xs text-blue-600 mt-1">Ahora mismo</p>
                </div>
                {/* <div className="w-2 h-2 rounded-full mt-2 bg-blue-400 animate-pulse" /> */}
              </div>
            )}
            {recent.map((item, idx) => (
              <RecentActivityItem key={idx} index={idx} washing={washing} {...item} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewSection;

