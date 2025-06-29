// DashboardPage.tsx
"use client";

import React, { useEffect, useState } from "react";
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
  Clock,
  CreditCard,
  Shield,
  ChevronLeft,
  Bell,
  ChevronRight,
  Crown,
  LogOut,
} from "lucide-react";

// Tipo para los items de navegación
type NavItem = {
  label: string;
  value: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

// Definición de los elementos del menú
const navItems: NavItem[] = [
  { label: "Overview", value: "overview", icon: Car },
  { label: "Reservas", value: "booking", icon: Calendar },
  { label: "Lavado", value: "wash", icon: Clock },
  { label: "Cámaras", value: "cameras", icon: Camera },
  { label: "Facturación", value: "billing", icon: CreditCard },
  { label: "Perfil", value: "profile", icon: Shield },
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
    { title: 'Estado', icon: Car, value: 'Estacionado', subtitle: 'A-15' },
    { title: 'Tiempo', icon: Clock, value: '2h 30m', subtitle: 'Hasta 18:00' },
    { title: 'Próx. Lavado', icon: Calendar, value: 'Mañana', subtitle: '10:00 AM' },
    { title: 'Plan', icon: CreditCard, value: 'Mensual', subtitle: '5 restantes' }
  ];

  const recent = [
    { text: 'Vehículo estacionado', when: 'Hace 2h' },
    { text: 'Lavado completado', when: 'Ayer 16:30' },
    { text: 'Pago procesado', when: 'Hace 3 días' }
  ];

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(card => (
          <Card
            key={card.title}
            className="bg-white/60 backdrop-blur-lg border border-white/20 rounded-3xl shadow-lg hover:shadow-2xl transition"
          >
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">{card.title}</CardTitle>
              <card.icon className="w-5 h-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{card.value}</div>
              <p className="text-xs text-gray-600">{card.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-white/60 backdrop-blur-lg border border-white/20 rounded-3xl shadow-lg">
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recent.map((act, i) => (
              <div key={i} className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                <div>
                  <p className="text-sm font-medium">{act.text}</p>
                  <p className="text-xs text-gray-600">{act.when}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
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
  const hours = Array.from({ length: 10 }, (_, i) => 8 + i);
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Nueva Reserva</CardTitle>
          <CardDescription>Reserva tu espacio y servicios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Booking Form Inline */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Fecha</label>
                <input type="date" className="w-full mt-1 p-2 border rounded-md" />
              </div>
              <div>
                <label className="text-sm font-medium">Hora</label>
                <select className="w-full mt-1 p-2 border rounded-md">
                  {hours.map(hour => (
                    <option key={hour}>{`${hour.toString().padStart(2, '0')}:00`}</option>
                  ))}
                </select>
              </div>
              <label className="text-sm font-medium block">Servicios</label>
              <div className="mt-2 space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> Estacionamiento (incluido)
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> Lavado Completo (+$2.500)
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> Carga Eléctrica (+$150/kWh)
                </label>
              </div>
            </div>
            {/* Reservation Summary Inline */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Resumen de Reserva</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between"><span>Estacionamiento (4h)</span><span>$800</span></div>
                <div className="flex justify-between"><span>Lavado Completo</span><span>$2.500</span></div>
                <div className="border-t pt-1 mt-2 font-medium flex justify-between"><span>Total</span><span>$3.300</span></div>
              </div>
              <Button className="w-full mt-4">Confirmar Reserva</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Reservations Inline */}
      <Card>
        <CardHeader>
          <CardTitle>Próximas Reservas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Mañana - 10:00 AM</p>
                <p className="text-sm text-gray-600">Estacionamiento + Lavado</p>
              </div>
              <Badge>Confirmada</Badge>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Viernes - 2:00 PM</p>
                <p className="text-sm text-gray-600">Solo Estacionamiento</p>
              </div>
              <Badge variant="outline">Pendiente</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};



const CamerasTab: React.FC = () => (
  <>
    <Card>
      <CardHeader>
        <CardTitle>Cámaras de Seguridad</CardTitle>
        <CardDescription>Monitorea tu vehículo en tiempo real</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Cámara Principal Inline */}
          <div className="space-y-4">
            <div className="bg-gray-900 aspect-video rounded-lg flex items-center justify-center">
              <div className="text-center text-white">
                <Camera className="h-12 w-12 mx-auto mb-2" />
                <p>Cámara Principal</p>
                <p className="text-sm text-gray-400">Espacio A-15</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline"><Camera className="h-4 w-4 mr-1" />Captura</Button>
              <Button size="sm" variant="outline">Zoom</Button>
              <Button size="sm" variant="outline">HD</Button>
            </div>
          </div>
          {/* Vista Lateral Inline */}
          <div className="space-y-4">
            <div className="bg-gray-900 aspect-video rounded-lg flex items-center justify-center">
              <div className="text-center text-white">
                <Camera className="h-12 w-12 mx-auto mb-2" />
                <p>Vista Lateral</p>
                <p className="text-sm text-gray-400">Ángulo 2</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline"><Camera className="h-4 w-4 mr-1" />Captura</Button>
              <Button size="sm" variant="outline">Zoom</Button>
              <Button size="sm" variant="outline">HD</Button>
            </div>
          </div>
        </div>
        {/* Security Status Inline */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg flex items-center space-x-2">
          <Shield className="h-5 w-5 text-blue-600" />
          <p className="text-sm text-blue-700">Todas las cámaras están funcionando correctamente. Grabación 24/7 activada.</p>
        </div>
      </CardContent>
    </Card>

    {/* Controles Avanzados Inline */}
    <Card>
      <CardHeader>
        <CardTitle>Controles Avanzados</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
            <Camera className="h-6 w-6 mb-2" />
            <span className="text-sm">Vista 360°</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
            <Clock className="h-6 w-6 mb-2" />
            <span className="text-sm">Grabaciones</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
            <Bell className="h-6 w-6 mb-2" />
            <span className="text-sm">Alertas</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  </>
);



const BillingTab: React.FC = () => (
  <>
    {/* Plan Actual y Uso del Mes */}
    <div className="grid md:grid-cols-2 gap-6 mb-6">
      {/* Plan Actual */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Actual</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Plan Mensual</span>
              <Badge>Activo</Badge>
            </div>
            <div className="text-2xl font-bold">$15.000/mes</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Lavados incluidos:</span>
                <span>8 (3 restantes)</span>
              </div>
              <div className="flex justify-between">
                <span>Próximo pago:</span>
                <span>15 Ene 2024</span>
              </div>
            </div>
            <Button variant="outline" className="w-full">Cambiar Plan</Button>
          </div>
        </CardContent>
      </Card>
      {/* Uso del Mes */}
      <Card>
        <CardHeader>
          <CardTitle>Uso del Mes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between"><span>Estacionamiento</span><span>45 horas</span></div>
            <div className="flex justify-between"><span>Lavados realizados</span><span>5 de 8</span></div>
            <div className="flex justify-between"><span>Carga eléctrica</span><span>12 kWh</span></div>
            <div className="border-t pt-2 flex justify-between font-medium">
              <span>Ahorro vs. pago individual</span>
              <span className="text-green-600">$3.200</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    {/* Historial de Facturación */}
    <Card>
      <CardHeader>
        <CardTitle>Historial de Facturación</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Diciembre 2024</p>
              <p className="text-sm text-gray-600">Plan Mensual</p>
            </div>
            <div className="text-right">
              <p className="font-medium">$15.000</p>
              <Badge className="bg-green-100 text-green-800">Pagado</Badge>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Noviembre 2024</p>
              <p className="text-sm text-gray-600">Plan Mensual</p>
            </div>
            <div className="text-right">
              <p className="font-medium">$15.000</p>
              <Badge className="bg-green-100 text-green-800">Pagado</Badge>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Octubre 2024</p>
              <p className="text-sm text-gray-600">Servicios individuales</p>
            </div>
            <div className="text-right">
              <p className="font-medium">$8.500</p>
              <Badge className="bg-green-100 text-green-800">Pagado</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </>
);



interface ProfileProps {
  user: any;
}

const ProfileTab: React.FC<ProfileProps> = ({ user }) => (
  <>
    {/* Información Personal Inline */}
    <Card>
      <CardHeader>
        <CardTitle>Información Personal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nombre Completo</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-md"
                defaultValue={user.name}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full mt-1 p-2 border rounded-md"
                defaultValue={user.email}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Teléfono</label>
              <input
                type="tel"
                className="w-full mt-1 p-2 border rounded-md"
                defaultValue={user.phone}
              />
            </div>
          </div>
          <div className="space-y-4 mt-6">
            <div>
              <label className="text-sm font-medium">Tipo de Vehículo</label>
              <select
                className="w-full mt-1 p-2 border rounded-md"
                defaultValue={user.vehicleType}
              >
                <option value="auto">Auto</option>
                <option value="suv">SUV</option>
                <option value="camioneta">Camioneta</option>
                <option value="electrico">Vehículo Eléctrico</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Patente</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-md"
                defaultValue={user.licensePlate}
              />
            </div>
            <Button className="w-full mt-2">Actualizar Información</Button>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Preferencias Inline */}
    <Card>
      <CardHeader>
        <CardTitle>Preferencias</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b last:border-none">
            <div>
              <p className="font-medium">Notificaciones por Email</p>
              <p className="text-sm text-gray-600">Recibir actualizaciones por correo</p>
            </div>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="flex items-center justify-between py-2 border-b last:border-none">
            <div>
              <p className="font-medium">Notificaciones Push</p>
              <p className="text-sm text-gray-600">Alertas en tiempo real</p>
            </div>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="flex items-center justify-between py-2 last:border-none">
            <div>
              <p className="font-medium">Recordatorios de Lavado</p>
              <p className="text-sm text-gray-600">Sugerencias automáticas</p>
            </div>
            <input type="checkbox" />
          </div>
        </div>
      </CardContent>
    </Card>
  </>
);









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

  console.log(user)
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
          {/* Overview */}
          <TabsContent value="overview" className="space-y-6">
            <OverviewSection onStartWash={startWash} />
         </TabsContent>

          {/* Lavado */}
          <TabsContent value="wash" className="space-y-6">
            <WashProgressSection
              washing={washing}
              progress={washProgress}
              onStartWash={startWash}
            />
          </TabsContent>        

          {/* Otras pestañas */}

          <TabsContent value="booking">
            <BookingTab/>
          </TabsContent>

          <TabsContent value="cameras">
            <CamerasTab/>
          </TabsContent>

          <TabsContent value="billing">
            <BillingTab/>
          </TabsContent>
          <TabsContent value="profile">
            <ProfileTab user={user}/>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

