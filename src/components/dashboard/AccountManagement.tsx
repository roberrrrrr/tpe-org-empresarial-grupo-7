import React, { useState } from 'react'
import type { FC } from 'react'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

import {
  CreditCard,
  TrendingUp,
  Car,
  Zap,
  Battery,
  Calendar,
  User,
  Edit,
  Settings
} from 'lucide-react'




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


export default AccountManagement;
