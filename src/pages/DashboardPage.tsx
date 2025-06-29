// DashboardPage.tsx
"use client";

import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Progress } from "@/components/ui/progress";
import { Logo } from "@/components/Logo";
import {
  Car,
  Calendar,
  Camera,
  Video,
  Eye,
  Wifi,
  ZoomIn,
  Download,
  Pause,
  Clock,
  Edit3,
  Settings,
  CreditCard,
  Battery,
  Users,
  User,
  MapPin,
  X,
  Check,
  Shield,
  ChevronLeft,
  Bell,
  ChevronRight,
  Crown,
  LogOut,
  Zap,
  TrendingUp,
  Activity
} from "lucide-react";

// Tipo para los items de navegación
type NavItem = {
  label: string;
  value: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

// Definición de los elementos del menú
const navItems: NavItem[] = [

  { label: "Resumen", value: "overview", icon: Car },
  { label: "Cuenta", value: "profile", icon: Shield },
  { label: "Reservas", value: "booking", icon: Calendar },
  { label: "Cámaras", value: "cameras", icon: Camera },
  { label: "Lavado", value: "wash", icon: Clock },
  { label: "Cerrar Session", value: "logout", icon: LogOut}
];

// Props para el componente Sidebar
interface SidebarProps {
  collapsed: boolean;
  activeTab: string;
  onToggle: () => void;
  onTabChange: (value: string) => void;
}



const OverviewSection: React.FC<OverviewProps> = ({ onStartWash }) => {
  const stats = [
    { 
      title: 'Estado', 
      icon: Car, 
      value: 'Estacionado', 
      subtitle: 'Planta A-15',
      color: 'from-emerald-400 to-emerald-600',
      bgGradient: 'from-emerald-50 to-emerald-100',
      pulse: false 
    },
    { 
      title: 'Tiempo', 
      icon: Clock, 
      value: '2h 30m', 
      subtitle: 'Hasta 18:00',
      color: 'from-blue-400 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100'
    },
    { 
      title: 'Próx. Lavado', 
      icon: Calendar, 
      value: 'Mañana', 
      subtitle: '10:00 AM',
      color: 'from-purple-400 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100'
    },
    { 
      title: 'Plan Activo', 
      icon: CreditCard, 
      value: 'Premium', 
      subtitle: '5 servicios restantes',
      color: 'from-amber-400 to-amber-600',
      bgGradient: 'from-amber-50 to-amber-100'
    }
  ];

  const recent = [
    { 
      text: 'Vehículo estacionado en A-15', 
      when: 'Hace 2h 30m', 
      icon: Car, 
      status: 'active',
      color: 'text-emerald-600'
    },
    { 
      text: 'Lavado ecológico completado', 
      when: 'Ayer 16:30', 
      icon: Zap, 
      status: 'success',
      color: 'text-blue-600'
    },
    { 
      text: 'Lavado ecológico completado', 
      when: 'Ayer 16:30', 
      icon: Zap, 
      status: 'success',
      color: 'text-blue-600'
    },
    { 
      text: 'Lavado ecológico completado', 
      when: 'Ayer 16:30', 
      icon: Zap, 
      status: 'success',
      color: 'text-blue-600'
    },
        { 
      text: 'Lavado ecológico completado', 
      when: 'Ayer 16:30', 
      icon: Zap, 
      status: 'success',
      color: 'text-blue-600'
    },
    { 
      text: 'Pago mensual procesado', 
      when: 'Hace 3 días', 
      icon: CreditCard, 
      status: 'completed',
      color: 'text-purple-600'
    },
    { 
      text: 'Sistema de seguridad activado', 
      when: 'Hace 1 semana', 
      icon: Activity, 
      status: 'info',
      color: 'text-gray-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((card, index) => (
          <Card
            key={card.title}
            className={`
              relative overflow-hidden group
              bg-white/70 backdrop-blur-xl 
              border-0 rounded-2xl 
              shadow-lg shadow-black/5
              hover:shadow-2xl hover:shadow-black/10
              hover:scale-105 hover:-translate-y-1
              transition-all duration-500 ease-out
              ${card.pulse ? 'animate-pulse' : ''}
            `}
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-30 group-hover:opacity-50 transition-opacity duration-300`} />
            
            {/* Floating Elements */}
            <div className="absolute -top-2 -right-2 w-20 h-20 bg-white/20 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full blur-lg" />
            
            <CardHeader className="relative flex items-center justify-between pb-3 pt-6">
              <CardTitle className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                {card.title}
              </CardTitle>
              <div className={`
                p-2 rounded-xl bg-gradient-to-br ${card.color} 
                shadow-lg group-hover:shadow-xl group-hover:scale-110
                transition-all duration-300
              `}>
                <card.icon className="w-4 h-4 text-white" />
              </div>
            </CardHeader>
            
            <CardContent className="relative pt-0">
              <div className="text-2xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors mb-1">
                {card.value}
              </div>
              <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors">
                {card.subtitle}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="bg-white/70 backdrop-blur-xl border-0 rounded-2xl shadow-lg shadow-black/5 overflow-hidden">
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
        
        <CardContent className="relative">
          <div className="space-y-4">
            {recent.map((activity, index) => (
              <div 
                key={index}
                className="group flex items-start gap-4 p-3 rounded-xl hover:bg-white/60 transition-all duration-300 hover:shadow-md"
                style={{
                  animationDelay: `${index * 150}ms`
                }}
              >
                <div className={`
                  p-2 rounded-lg bg-gradient-to-br from-white to-gray-50 
                  shadow-sm group-hover:shadow-md transition-all duration-300
                  ${activity.color.replace('text-', 'border-l-4 border-')}
                `}>
                  <activity.icon className={`w-4 h-4 ${activity.color}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 group-hover:text-gray-800 transition-colors">
                    {activity.text}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {activity.when}
                  </p>
                </div>
                
                <div className={`
                  w-2 h-2 rounded-full mt-2 transition-all duration-300
                  ${activity.status === 'active' ? 'bg-emerald-400 animate-pulse' : 
                    activity.status === 'success' ? 'bg-blue-400' : 
                    activity.status === 'completed' ? 'bg-purple-400' : 'bg-gray-300'}
                `} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Componente de Progreso de Lavado
interface WashProgressProps {
  washing: boolean;
  progress: number;
  onStartWash: () => void;
}

const WashProgressSection: React.FC<WashProgressProps> = ({ washing, progress, onStartWash }) => (
  <Card className="bg-white/60 backdrop-blur-lg border border-white/20 rounded-3xl shadow-lg">
    <CardHeader>
      <CardTitle>Progreso de Lavado</CardTitle>
    </CardHeader>
    <CardContent>
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
        <div className="text-center py-8">
          <Car className="mx-auto w-12 h-12 text-gray-400 mb-4" />
          <Button onClick={onStartWash}>Iniciar Demo</Button>
        </div>
      )}
    </CardContent>
  </Card>
);















// Componente Sidebar
const Sidebar: React.FC<SidebarProps> = ({ collapsed, activeTab, onToggle, onTabChange }) => (
  <motion.aside
    initial={{ width: collapsed ? 64 : 240 }}
    animate={{ width: collapsed ? 64 : 240 }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    className="bg-white/20 backdrop-blur-md border-r border-white/30 flex flex-col h-full relative"
  >
    {/* Header con Logo y Toggle */}
    <div className="flex items-center justify-center p-4 min-h-[72px] relative">
      {/* Logo con animación fluida sin desaparecer */}
      <motion.div
        animate={{ 
          scale: collapsed ? 0.9 : 1,
          transition: { type: "spring", stiffness: 300, damping: 25 }
        }}
        className="flex items-center justify-center"
      >
        <motion.div
          animate={{
            width: collapsed ? "auto" : "auto",
            paddingLeft: collapsed ? "8px" : "16px",
            paddingRight: collapsed ? "8px" : "16px",
            paddingTop: "8px",
            paddingBottom: "8px",
            borderRadius: collapsed ? "16px" : "24px",
            gap: collapsed ? "0px" : "12px"
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}

          className="relative flex items-center bg-gradient-to-r from-blue-600/90 to-indigo-700/90 shadow-xl border border-white/10 hover:shadow-2xl transition-shadow duration-300 group"
        >
          <div className="absolute inset-0 rounded-inherit bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Corona - siempre visible */}
          <motion.div
            animate={{
              scale: collapsed ? 1 : 1.1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative flex items-center flex-shrink-0"
          >
            <Crown className="w-6 h-6 text-yellow-300 drop-shadow-lg filter brightness-110 group-hover:scale-110 transition-transform duration-300" />
          </motion.div>

          {/* Punto brillante */}
          <motion.div 
            animate={{
              top: collapsed ? "4px" : "8px",
              right: collapsed ? "4px" : "12px"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute w-2 h-2 bg-yellow-300/40 rounded-full blur-sm animate-pulse" 
          />
        </motion.div>
      </motion.div>

      {/* Toggle button unificado - siempre el mismo chevron que rota */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        onClick={onToggle}
        className={`
          absolute w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-white/30 
          flex items-center justify-center hover:bg-white transition-all duration-300 z-10
          ${collapsed ? '-right-3 top-6' : 'right-4 top-1/2 -translate-y-1/2'}
        `}
      >
        <motion.div
          animate={{ rotate: collapsed ? 0 : 180 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ChevronRight className="w-3 h-3 text-gray-600" />
        </motion.div>
      </motion.button>
    </div>

    {/* Navegación */}
    <nav className="flex-1 overflow-y-auto px-2">
      <ul className="space-y-1">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeTab === item.value;
          
          return (
            <motion.li 
              key={item.value}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={() => onTabChange(item.value)}
                className={`
                  flex items-center w-full px-3 py-2.5 rounded-lg transition-all duration-200 group relative
                  ${collapsed ? 'justify-center' : 'gap-3'}
                  ${isActive 
                    ? 'bg-white/40 text-gray-900 shadow-sm' 
                    : 'text-gray-700 hover:bg-white/30 hover:text-gray-900'
                  }
                `}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={`flex-shrink-0 transition-transform duration-200 ${
                  isActive ? 'scale-110' : 'group-hover:scale-105'
                } ${collapsed ? 'w-5 h-5' : 'w-5 h-5'}`} />
                
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="whitespace-nowrap font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Indicador activo cuando está colapsado */}
                {collapsed && isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-full"
                  />
                )}
              </button>
            </motion.li>
          );
        })}
      </ul>
    </nav>

    {/* Footer */}

  </motion.aside>
);






const BookingTab: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ date: Date; hour: number } | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>(['parking']);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Mock data - turnos existentes
  const existingBookings = [
    { 
      date: new Date(2025, 5, 30), 
      hour: 10, 
      services: ['parking', 'wash'], 
      status: 'confirmed',
      spot: 'A-15',
      total: 3300
    },
    { 
      date: new Date(2025, 6, 2), 
      hour: 14, 
      services: ['parking'], 
      status: 'pending',
      spot: 'B-08',
      total: 800
    },
    { 
      date: new Date(2025, 6, 5), 
      hour: 9, 
      services: ['parking', 'charge'], 
      status: 'confirmed',
      spot: 'C-12',
      total: 1200
    }
  ];

  const services = [
    { id: 'parking', name: 'Estacionamiento', price: 800, included: true, icon: Car },
    { id: 'wash', name: 'Lavado Completo', price: 2500, included: false, icon: Zap },
    { id: 'charge', name: 'Carga Eléctrica', price: 150, included: false, icon: Battery, unit: '/kWh' }
  ];

  const timeSlots = Array.from({ length: 10 }, (_, i) => 8 + i);

  // Generar días del calendario
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Días del mes anterior
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevMonth = new Date(year, month - 1, 0);
      days.push({
        date: new Date(year, month - 1, prevMonth.getDate() - i),
        isCurrentMonth: false
      });
    }
    
    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: new Date(year, month, day),
        isCurrentMonth: true
      });
    }
    
    // Días del próximo mes para completar la grilla
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        date: new Date(year, month + 1, day),
        isCurrentMonth: false
      });
    }
    
    return days;
  };

  const getBookingsForDate = (date: Date) => {
    return existingBookings.filter(booking => 
      booking.date.toDateString() === date.toDateString()
    );
  };

  const isSlotAvailable = (date: Date, hour: number) => {
    const bookings = getBookingsForDate(date);
    return !bookings.some(booking => booking.hour === hour);
  };

  const handleDateClick = (date: Date) => {
    if (date < new Date()) return; // No permitir fechas pasadas
    setSelectedDate(date);
  };

  const handleTimeSlotClick = (hour: number) => {
    if (selectedDate && isSlotAvailable(selectedDate, hour)) {
      setSelectedSlot({ date: selectedDate, hour });
      setShowBookingModal(true);
    }
  };

  const calculateTotal = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      return total + (service?.price || 0);
    }, 0);
  };

  const handleServiceToggle = (serviceId: string) => {
    if (serviceId === 'parking') return; // Parking siempre incluido
    
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleConfirmBooking = () => {
    // Aquí iría la lógica para confirmar la reserva
    console.log('Booking confirmed:', {
      date: selectedSlot?.date,
      hour: selectedSlot?.hour,
      services: selectedServices,
      total: calculateTotal()
    });
    setShowBookingModal(false);
    setSelectedSlot(null);
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                     'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <Card className="bg-white/70 backdrop-blur-xl border-0 rounded-2xl shadow-lg shadow-black/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-40" />
        
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-blue-600" />
              Reservar Turno
            </CardTitle>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                className="p-2 hover:bg-white/60 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              
              <h3 className="text-lg font-semibold text-gray-800 min-w-[140px] text-center">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              
              <button 
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                className="p-2 hover:bg-white/60 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative">
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {dayNames.map(day => (
              <div key={day} className="p-3 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
            
            {days.map((day, index) => {
              const bookings = getBookingsForDate(day.date);
              const isToday = day.date.toDateString() === new Date().toDateString();
              const isSelected = selectedDate?.toDateString() === day.date.toDateString();
              const isPast = day.date < new Date();
              
              return (
                <button
                  key={index}
                  onClick={() => handleDateClick(day.date)}
                  disabled={isPast || !day.isCurrentMonth}
                  className={`
                    relative p-3 text-sm rounded-lg transition-all duration-200 min-h-[50px]
                    ${!day.isCurrentMonth ? 'text-gray-300 cursor-not-allowed' :
                      isPast ? 'text-gray-400 cursor-not-allowed' :
                      isSelected ? 'bg-blue-500 text-white shadow-lg scale-105' :
                      isToday ? 'bg-blue-100 text-blue-600 font-semibold' :
                      'hover:bg-white/60 text-gray-700'}
                  `}
                >
                  <span className={isToday && !isSelected ? 'font-bold' : ''}>{day.date.getDate()}</span>
                  
                  {bookings.length > 0 && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
                      {bookings.slice(0, 3).map((booking, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full ${
                            booking.status === 'confirmed' ? 'bg-green-400' : 'bg-yellow-400'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Time Slots */}
      {selectedDate && (
        <Card className="bg-white/70 backdrop-blur-xl border-0 rounded-2xl shadow-lg shadow-black/5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-40" />
          
          <CardHeader className="relative">
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-600" />
              Horarios Disponibles - {selectedDate.toLocaleDateString('es-AR')}
            </CardTitle>
          </CardHeader>

          <CardContent className="relative">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {timeSlots.map(hour => {
                const isAvailable = isSlotAvailable(selectedDate, hour);
                const booking = getBookingsForDate(selectedDate).find(b => b.hour === hour);
                
                return (
                  <button
                    key={hour}
                    onClick={() => handleTimeSlotClick(hour)}
                    disabled={!isAvailable}
                    className={`
                      p-4 rounded-xl text-sm font-medium transition-all duration-200 relative overflow-hidden
                      ${isAvailable 
                        ? 'bg-white/80 hover:bg-white text-gray-700 hover:text-gray-900 shadow-md hover:shadow-lg hover:scale-105 border border-green-200/50' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }
                    `}
                  >
                    {!isAvailable && (
                      <div className="absolute inset-0 bg-red-100/50 flex items-center justify-center">
                        <X className="w-4 h-4 text-red-400" />
                      </div>
                    )}
                    
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-semibold">{`${hour.toString().padStart(2, '0')}:00`}</span>
                      {booking && (
                        <Badge 
                          variant={booking.status === 'confirmed' ? 'default' : 'secondary'} 
                          className="text-xs"
                        >
                          {booking.status === 'confirmed' ? 'Ocupado' : 'Pendiente'}
                        </Badge>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Bookings */}
      <Card className="bg-white/70 backdrop-blur-xl border-0 rounded-2xl shadow-lg shadow-black/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-40" />
        
        <CardHeader className="relative">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            Próximas Reservas
          </CardTitle>
        </CardHeader>

        <CardContent className="relative space-y-4">
          {existingBookings.map((booking, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-4 bg-white/60 rounded-xl hover:bg-white/80 transition-all duration-300 hover:shadow-md border border-white/20"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                
                <div>
                  <p className="font-semibold text-gray-900">
                    {booking.date.toLocaleDateString('es-AR')} - {booking.hour.toString().padStart(2, '0')}:00
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-3 h-3" />
                    <span>{booking.spot}</span>
                    <span>•</span>
                    <span>{booking.services.length} servicios</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${booking.total.toLocaleString()}</p>
                </div>
                <Badge 
                  variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                  className={booking.status === 'confirmed' ? 'bg-green-500' : ''}
                >
                  {booking.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Booking Modal */}
      {showBookingModal && selectedSlot && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Nueva Reserva</h3>
                <button 
                  onClick={() => setShowBookingModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="mb-6 p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center gap-2 text-blue-800 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">
                    {selectedSlot.date.toLocaleDateString('es-AR')} • {selectedSlot.hour.toString().padStart(2, '0')}:00
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <h4 className="font-medium text-gray-800">Servicios</h4>
                {services.map(service => (
                  <label key={service.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service.id)}
                      onChange={() => handleServiceToggle(service.id)}
                      disabled={service.included}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    
                    <div className="flex items-center gap-2 flex-1">
                      <service.icon className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">
                        {service.name}
                        {service.included && <span className="text-green-600"> (incluido)</span>}
                      </span>
                    </div>
                    
                    <span className="text-sm font-semibold text-gray-900">
                      ${service.price.toLocaleString()}{service.unit || ''}
                    </span>
                  </label>
                ))}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-800">Total</span>
                  <span className="text-2xl font-bold text-gray-900">${calculateTotal().toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleConfirmBooking}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};





const CamerasTab = () => {
  const [isRecording, setIsRecording] = useState(true);
  const [activeCamera, setActiveCamera] = useState('main');
  const [cameras, setCameras] = useState([
    { 
      id: 'main', 
      name: 'Cámara Principal', 
      location: 'Espacio A-15', 
      status: 'online',
      quality: 'HD',
      angle: 'Frontal',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // URL hardcodeada
      videoStatus: 'loading' // 'placeholder', 'loading', 'connected', 'error'
    },
    { 
      id: 'side', 
      name: 'Vista Lateral', 
      location: 'Ángulo Derecho', 
      status: 'online',
      quality: '4K',
      angle: 'Lateral',
      url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4', // URL hardcodeada
      videoStatus: 'loading'
    }
  ]);

  const controls = [
    { 
      icon: Video, 
      label: 'Vista 360°', 
      description: 'Rotación completa',
      color: 'from-purple-400 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100'
    },
    { 
      icon: Clock, 
      label: 'Grabaciones', 
      description: 'Historial 24/7',
      color: 'from-blue-400 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100'
    },
    { 
      icon: Bell, 
      label: 'Alertas', 
      description: 'Notificaciones',
      color: 'from-orange-400 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100'
    }
  ];

  const handleVideoLoad = (cameraId) => {
    setCameras(prev => prev.map(cam => 
      cam.id === cameraId 
        ? { ...cam, videoStatus: 'connected' }
        : cam
    ));
  };

  const handleVideoError = (cameraId) => {
    setCameras(prev => prev.map(cam => 
      cam.id === cameraId 
        ? { ...cam, videoStatus: 'error' }
        : cam
    ));
  };

  const handleVideoLoadStart = (cameraId) => {
    setCameras(prev => prev.map(cam => 
      cam.id === cameraId 
        ? { ...cam, videoStatus: 'loading' }
        : cam
    ));
  };



  const VideoPlayer = ({ camera }) => {
    const videoRef = useRef(null);

    useEffect(() => {
      if (camera.url && videoRef.current) {
        videoRef.current.load();
      }
    }, [camera.url]);

    if (!camera.url || camera.videoStatus === 'placeholder') {
      return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 aspect-video flex items-center justify-center relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
          <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
          
          {/* Camera Content */}
          <div className="text-center text-white z-10">
            <div className="relative">
              <Camera className="h-12 w-12 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gray-500 rounded-full" />
            </div>
            <p className="font-semibold text-lg">{camera.name}</p>
            <p className="text-sm text-gray-300">{camera.location}</p>
            <p className="text-xs text-gray-400 mt-2">Sin fuente de video</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
                {camera.quality}
              </span>
              <span className="px-2 py-1 bg-gray-500/20 rounded-full text-xs font-medium text-gray-300">
                {camera.angle}
              </span>
            </div>
          </div>
        </div>
      );
    }

    if (camera.videoStatus === 'loading') {
      return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 aspect-video flex items-center justify-center relative overflow-hidden">
          <div className="text-center text-white z-10">
            <div className="relative">
              <Wifi className="h-12 w-12 mx-auto mb-3 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
            </div>
            <p className="font-semibold text-lg">Conectando...</p>
            <p className="text-sm text-gray-300">{camera.location}</p>
            <div className="flex justify-center mt-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (camera.videoStatus === 'error') {
      return (
        <div className="bg-gradient-to-br from-red-900/30 to-gray-800 aspect-video flex items-center justify-center relative overflow-hidden border-2 border-red-500/20">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-transparent" />
          <div className="text-center text-white z-10">
            <div className="relative">
              <AlertTriangle className="h-12 w-12 mx-auto mb-3 text-red-400" />
              <WifiOff className="h-6 w-6 absolute -bottom-1 -right-1 text-red-500" />
            </div>
            <p className="font-semibold text-lg text-red-300">Video No Encontrado</p>
            <p className="text-sm text-gray-300">{camera.location}</p>
            <p className="text-xs text-red-400 mt-2">Error al cargar la fuente</p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="px-2 py-1 bg-red-500/20 rounded-full text-xs font-medium text-red-300 border border-red-500/30">
                Sin Conexión
              </span>
              <span className="px-2 py-1 bg-gray-500/20 rounded-full text-xs font-medium text-gray-300">
                {camera.angle}
              </span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="relative aspect-video overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          onLoadStart={() => handleVideoLoadStart(camera.id)}
          onCanPlay={() => handleVideoLoad(camera.id)}
          onError={() => handleVideoError(camera.id)}
        >
          <source src={camera.url} type="video/mp4" />
          <source src={camera.url} type="video/webm" />
          Tu navegador no soporta video HTML5.
        </video>
        
        {/* Live indicator for connected video */}
        <div className="absolute top-3 left-3 flex items-center gap-2 px-2 py-1 bg-red-600/90 rounded-full backdrop-blur-sm">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span className="text-xs font-medium text-white">EN VIVO</span>
        </div>
        
        {/* Video quality indicator */}
        <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/60 rounded-full backdrop-blur-sm">
          <span className="text-xs font-medium text-white">{camera.quality}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Main Camera Section */}
      <Card className="bg-white/70 backdrop-blur-xl border-0 rounded-2xl shadow-lg shadow-black/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 opacity-30" />
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-100/30 to-transparent rounded-full blur-2xl" />
        
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                Cámaras de Seguridad
              </CardTitle>
              <CardDescription className="text-gray-600 mt-1">
                Monitoreo en tiempo real de tu vehículo
              </CardDescription>
            </div>
            
            {/* Status Indicator */}
            <div className="flex items-center gap-2 px-3 py-2 bg-emerald-100/80 rounded-full">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-emerald-700">Sistema Activo</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="relative">
          <div className="grid md:grid-cols-2 gap-6">
            {cameras.map((camera, index) => (
              <div 
                key={camera.id}
                className="group space-y-4"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Camera Feed */}
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <VideoPlayer camera={camera} />
                  
                  {/* Corner Controls */}
                  <div className="absolute top-3 right-3 flex gap-1">
                    <button className="p-1.5 bg-black/40 hover:bg-black/60 rounded-lg backdrop-blur-sm transition-all duration-200">
                      <Eye className="w-3 h-3 text-white" />
                    </button>
                    <button className="p-1.5 bg-black/40 hover:bg-black/60 rounded-lg backdrop-blur-sm transition-all duration-200">
                      <Settings className="w-3 h-3 text-white" />
                    </button>
                  </div>
                </div>
                
                {/* Camera Controls */}
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 p-3 bg-white/80 hover:bg-white rounded-xl font-medium text-gray-700 hover:text-gray-900 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 border border-gray-200/50">
                    <Camera className="h-4 w-4" />
                    Captura
                  </button>
                  <button className="flex items-center justify-center gap-2 p-3 bg-white/80 hover:bg-white rounded-xl font-medium text-gray-700 hover:text-gray-900 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 border border-gray-200/50">
                    <ZoomIn className="h-4 w-4" />
                  </button>
                  <button className="flex items-center justify-center gap-2 p-3 bg-white/80 hover:bg-white rounded-xl font-medium text-gray-700 hover:text-gray-900 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 border border-gray-200/50">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Security Status */}
          <div className="mt-8 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl border border-emerald-200/50 shadow-inner relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-200/20 rounded-full blur-xl" />
            <div className="flex items-center gap-3 relative">
              <div className="p-2 bg-emerald-500 rounded-xl shadow-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-emerald-800">Sistema de Seguridad Activo</p>
                <p className="text-sm text-emerald-700">
                  Cámaras conectadas: {cameras.filter(c => c.videoStatus === 'connected').length}/{cameras.length} • 
                  Grabación 24/7 {isRecording ? 'activada' : 'pausada'}
                </p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <button 
                  onClick={() => setIsRecording(!isRecording)}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    isRecording 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  {isRecording ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Controls */}
      <Card className="bg-white/70 backdrop-blur-xl border-0 rounded-2xl shadow-lg shadow-black/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-30" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-100/30 to-transparent rounded-full blur-2xl" />
        
        <CardHeader className="relative">
          <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
              <Settings className="w-5 h-5 text-white" />
            </div>
            Controles Avanzados
          </CardTitle>
        </CardHeader>
        
        <CardContent className="relative">
          <div className="grid md:grid-cols-3 gap-6">
            {controls.map((control, index) => (
              <button
                key={control.label}
                className="group relative h-24 bg-white/80 hover:bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 border border-gray-200/50 overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${control.bgColor} opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />
                
                {/* Floating Elements */}
                <div className="absolute -top-2 -right-2 w-16 h-16 bg-white/30 rounded-full blur-lg opacity-60 group-hover:opacity-80 transition-opacity" />
                
                <div className="relative flex flex-col items-center justify-center h-full p-4">
                  <div className={`p-3 bg-gradient-to-br ${control.color} rounded-xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 mb-2`}>
                    <control.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-medium text-gray-800 group-hover:text-gray-900 transition-colors">
                    {control.label}
                  </span>
                  <span className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors">
                    {control.description}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};












const AccountManagement: React.FC<AccountManagementProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'billing' | 'profile'>('billing');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    washReminders: true
  });

  const billingHistory = [
    { month: 'Diciembre 2024', type: 'Plan Mensual', amount: '$15.000', status: 'Pagado' },
    { month: 'Noviembre 2024', type: 'Plan Mensual', amount: '$15.000', status: 'Pagado' },
    { month: 'Octubre 2024', type: 'Servicios individuales', amount: '$8.500', status: 'Pagado' }
  ];

  const TabButton = ({ tab, label }: { tab: 'billing' | 'profile', label: string }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`
        px-6 py-3 rounded-xl font-medium transition-all duration-300
        ${activeTab === tab 
          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25' 
          : 'bg-white/60 text-gray-600 hover:bg-white/80 hover:text-gray-800'
        }
      `}
    >
      {label}
    </button>
  );

  const NotificationToggle = ({ 
    id, 
    label, 
    description, 
    checked, 
    onChange 
  }: { 
    id: string, 
    label: string, 
    description: string, 
    checked: boolean, 
    onChange: (checked: boolean) => void 
  }) => (
    <div className="flex items-center justify-between p-4 rounded-xl bg-white/40 backdrop-blur-sm border border-white/20 hover:bg-white/60 transition-all duration-300">
      <div className="flex-1">
        <h4 className="text-sm font-medium text-gray-900">{label}</h4>
        <p className="text-xs text-gray-600 mt-1">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`
          relative w-12 h-6 rounded-full transition-all duration-300
          ${checked ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gray-300'}
        `}
      >
        <div className={`
          absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-300
          ${checked ? 'left-6' : 'left-0.5'}
        `} />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 p-1 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/20">
        <TabButton tab="billing" label="Facturación y Plan" />
        <TabButton tab="profile" label="Perfil y Configuración" />
      </div>

      {/* Billing Tab */}
      {activeTab === 'billing' && (
        <div className="space-y-6">
          {/* Plan y Uso Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Plan Actual */}
            <Card className="bg-white/70 backdrop-blur-xl border-0 rounded-2xl shadow-lg shadow-black/5 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-40" />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-bl from-blue-200/30 to-transparent rounded-full blur-xl" />
              
              <CardHeader className="relative">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  Plan Actual
                </CardTitle>
              </CardHeader>
              
              <CardContent className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Plan Mensual</h3>
                    <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-emerald-100 text-emerald-800">
                      Activo
                    </span>
                  </div>
                </div>

                <div className="text-3xl font-bold text-gray-900">
                  $15.000<span className="text-lg text-gray-600">/mes</span>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Lavados incluidos:</span>
                    <span className="font-medium text-gray-900">8 (3 restantes)</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Próximo pago:</span>
                    <span className="font-medium text-gray-900">15 Ene 2024</span>
                  </div>
                </div>

                <button className="w-full mt-4 p-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Cambiar Plan
                </button>
              </CardContent>
            </Card>

            {/* Uso del Mes */}
            <Card className="bg-white/70 backdrop-blur-xl border-0 rounded-2xl shadow-lg shadow-black/5 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 opacity-40" />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-bl from-emerald-200/30 to-transparent rounded-full blur-xl" />
              
              <CardHeader className="relative">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  Uso del Mes
                </CardTitle>
              </CardHeader>
              
              <CardContent className="relative space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/40 rounded-xl">
                    <Car className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <div className="text-lg font-bold text-gray-900">45 horas</div>
                    <div className="text-xs text-gray-600">Estacionamiento</div>
                  </div>
                  <div className="text-center p-3 bg-white/40 rounded-xl">
                    <Zap className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                    <div className="text-lg font-bold text-gray-900">5 de 8</div>
                    <div className="text-xs text-gray-600">Lavados realizados</div>
                  </div>
                </div>
                
                <div className="text-center p-3 bg-white/40 rounded-xl">
                  <Battery className="w-5 h-5 text-green-600 mx-auto mb-1" />
                  <div className="text-lg font-bold text-gray-900">12 kWh</div>
                  <div className="text-xs text-gray-600">Carga eléctrica</div>
                </div>

                <div className="mt-4 p-3 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl text-center">
                  <div className="text-sm text-gray-600">Ahorro vs. pago individual</div>
                  <div className="text-xl font-bold text-emerald-700">$3.200</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Historial de Facturación */}
          <Card className="bg-white/70 backdrop-blur-xl border-0 rounded-2xl shadow-lg shadow-black/5 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-gray-50 opacity-40" />
            
            <CardHeader className="relative">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-600" />
                Historial de Facturación
              </CardTitle>
            </CardHeader>
            
            <CardContent className="relative">
              <div className="space-y-3">
                {billingHistory.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/60 rounded-xl hover:bg-white/80 transition-all duration-300">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.month}</h4>
                      <p className="text-sm text-gray-600">{item.type}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{item.amount}</div>
                      <span className="text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded-lg">
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          {/* Información Personal */}
          <Card className="bg-white/70 backdrop-blur-xl border-0 rounded-2xl shadow-lg shadow-black/5 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-40" />
            
            <CardHeader className="relative">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Información Personal
              </CardTitle>
            </CardHeader>
            
            <CardContent className="relative">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                    <input 
                      type="text" 
                      defaultValue="Juan Pérez"
                      className="w-full p-3 bg-white/60 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      defaultValue="juan@email.com"
                      className="w-full p-3 bg-white/60 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                    <input 
                      type="tel" 
                      defaultValue="+54 11 1234-5678"
                      className="w-full p-3 bg-white/60 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Vehículo</label>
                    <select className="w-full p-3 bg-white/60 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300">
                      <option>Auto</option>
                      <option>SUV</option>
                      <option>Camioneta</option>
                      <option>Vehículo Eléctrico</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Patente</label>
                    <input 
                      type="text" 
                      defaultValue="ABC 123"
                      className="w-full p-3 bg-white/60 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <button className="w-full mt-4 p-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                    <Edit className="w-4 h-4" />
                    Actualizar Información
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferencias */}
          <Card className="bg-white/70 backdrop-blur-xl border-0 rounded-2xl shadow-lg shadow-black/5 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-40" />
            
            <CardHeader className="relative">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Settings className="w-5 h-5 text-purple-600" />
                Preferencias
              </CardTitle>
            </CardHeader>
            
            <CardContent className="relative space-y-4">
              <NotificationToggle
                id="email"
                label="Notificaciones por Email"
                description="Recibir actualizaciones por correo"
                checked={notifications.email}
                onChange={(checked) => setNotifications({...notifications, email: checked})}
              />
              
              <NotificationToggle
                id="push"
                label="Notificaciones Push"
                description="Alertas en tiempo real"
                checked={notifications.push}
                onChange={(checked) => setNotifications({...notifications, push: checked})}
              />
              
              <NotificationToggle
                id="washReminders"
                label="Recordatorios de Lavado"
                description="Sugerencias automáticas"
                checked={notifications.washReminders}
                onChange={(checked) => setNotifications({...notifications, washReminders: checked})}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};



// Componente principal DashboardPage
export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>({
    email : "prueba@gmail.com",
    name : "juansito",
    phone : "2284237538",
    patente : 'kih384'
  });
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [washProgress, setWashProgress] = useState(0);
  const [washing, setWashing] = useState(false);

  // Carga de usuario y redirección si no está logueado
  useEffect(() => {
    // const data = localStorage.getItem("user");
    // if (!data) {
    //   navigate("/login");
    //   return;
    // }
    // setUser(JSON.parse(data));
  }, [navigate]);

  // Simulación de progreso de lavado
  useEffect(() => {
    if (washing && washProgress < 100) {
      const timer = setTimeout(() => setWashProgress(prev => Math.min(prev + 5, 100)), 800);
      return () => clearTimeout(timer);
    }
  }, [washing, washProgress]);

  const startWash = () => {
    setWashing(true);
    setWashProgress(0);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-gray-500">Cargando usuario...</span>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Barra lateral */}
      <Sidebar
        collapsed={collapsed}
        activeTab={activeTab}
        onToggle={() => setCollapsed(prev => !prev)}
        onTabChange={setActiveTab}
      />

      {/* Contenido principal */}
      <main className="flex-1 overflow-y-auto bg-gradient-to-b from-blue-50 to-white p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsContent value="overview" className="space-y-6">
            <OverviewSection onStartWash={startWash} />
         </TabsContent>
          <TabsContent value="wash" className="space-y-6">
            <WashProgressSection
              washing={washing}
              progress={washProgress}
              onStartWash={startWash}
            />
          </TabsContent>        
          <TabsContent value="booking">
            <BookingTab/>
          </TabsContent>
          <TabsContent value="cameras">
            <CamerasTab/>
          </TabsContent>

          <TabsContent value="profile">
            <AccountManagement user={user}/>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

