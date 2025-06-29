import React, { useState } from 'react'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import {
  Car,
  Zap,
  Battery,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Users,
  MapPin
} from 'lucide-react'


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

export default BookingTab;
