"use client";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Car,
  Calendar,
  Camera,
  Clock,
  MapPin,
  Settings,
  Bell,
  CreditCard,
  Shield,
} from "lucide-react";

// --- Loading State Screen ---
const LoadingScreen: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <p className="text-center">Cargando...</p>
  </div>
);

// --- Header Component ---
interface HeaderProps {
  user: { name: string };
  onLogout: () => void;
}
const Header: React.FC<HeaderProps> = ({ user, onLogout }) => (
  <header className="bg-white border-b">
    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Car className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-xl font-bold">Dashboard</h1>
          <p className="text-sm text-gray-600">Bienvenido, {user.name}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="outline" onClick={onLogout}>
          Salir
        </Button>
      </div>
    </div>
  </header>
);

// --- Overview Tab Subcomponents ---
interface OverviewProps {
  startWash: () => void;
}
const OverviewTab: React.FC<OverviewProps> = ({ startWash }) => (
  <>
    {/* Status Cards */}
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Current Status */}
      <Card>
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Estado Actual</CardTitle>
          <Car className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">Estacionado</div>
          <p className="text-xs text-gray-600">Espacio A-15</p>
        </CardContent>
      </Card>
      {/* Time Remaining */}
      <Card>
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Tiempo Restante</CardTitle>
          <Clock className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2h 30m</div>
          <p className="text-xs text-gray-600">Hasta las 18:00</p>
        </CardContent>
      </Card>
      {/* Next Wash */}
      <Card>
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Próximo Lavado</CardTitle>
          <Calendar className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Mañana</div>
          <p className="text-xs text-gray-600">10:00 AM</p>
        </CardContent>
      </Card>
      {/* Plan */}
      <Card>
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Plan Actual</CardTitle>
          <CreditCard className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Mensual</div>
          <p className="text-xs text-gray-600">5 lavados restantes</p>
        </CardContent>
      </Card>
    </div>

    {/* Quick Actions */}
    <Card>
      <CardHeader>
        <CardTitle>Acciones Rápidas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          <Button className="w-full" variant="outline">
            <Calendar className="h-4 w-4 mr-2" /> Nueva Reserva
          </Button>
          <Button className="w-full" variant="outline" onClick={startWash}>
            <Car className="h-4 w-4 mr-2" /> Iniciar Lavado
          </Button>
          <Button className="w-full" variant="outline">
            <Camera className="h-4 w-4 mr-2" /> Ver Cámaras
          </Button>
        </div>
      </CardContent>
    </Card>

    {/* Recent Activity */}
    <Card>
      <CardHeader>
        <CardTitle>Actividad Reciente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <ActivityItem color="bg-green-500" title="Vehículo estacionado" subtitle="Hace 2 horas - Espacio A-15" />
          <ActivityItem color="bg-blue-500" title="Lavado completado" subtitle="Ayer 16:30 - Lavado Premium" />
          <ActivityItem color="bg-purple-500" title="Pago procesado" subtitle="Hace 3 días - Plan Mensual" />
        </div>
      </CardContent>
    </Card>
  </>
);

interface ActivityItemProps {
  color: string;
  title: string;
  subtitle: string;
}
const ActivityItem: React.FC<ActivityItemProps> = ({ color, title, subtitle }) => (
  <div className="flex items-center space-x-4">
    <div className={`${color} w-2 h-2 rounded-full`} />
    <div className="flex-1">
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-gray-600">{subtitle}</p>
    </div>
  </div>
);

// --- Booking Tab Subcomponents ---
const BookingTab: React.FC = () => (
  <>
    <Card>
      <CardHeader>
        <CardTitle>Nueva Reserva</CardTitle>
        <CardDescription>Reserva tu espacio y servicios</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <BookingForm />
          <ReservationSummary />
        </div>
      </CardContent>
    </Card>
    <UpcomingReservations />
  </>
);

const BookingForm: React.FC = () => (
  <div className="space-y-4">
    <FormField label="Fecha" input={<input type="date" className="w-full mt-1 p-2 border rounded-md" />} />
    <FormField label="Hora" input={
      <select className="w-full mt-1 p-2 border rounded-md">
        {Array.from({ length: 10 }, (_, i) => 8 + i).map(hour => (
          <option key={hour}>{`${hour.toString().padStart(2, '0')}:00`}</option>
        ))}
      </select>
    } />
    <label className="text-sm font-medium block">Servicios</label>
    <div className="mt-2 space-y-2">
      <CheckboxOption label="Estacionamiento (incluido)" />
      <CheckboxOption label="Lavado Completo (+$2.500)" />
      <CheckboxOption label="Carga Eléctrica (+$150/kWh)" />
    </div>
  </div>
);

interface FormFieldProps {
  label: string;
  input: React.ReactNode;
}
const FormField: React.FC<FormFieldProps> = ({ label, input }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    {input}
  </div>
);

interface CheckboxOptionProps {
  label: string;
}
const CheckboxOption: React.FC<CheckboxOptionProps> = ({ label }) => (
  <label className="flex items-center">
    <input type="checkbox" className="mr-2" /> {label}
  </label>
);

const ReservationSummary: React.FC = () => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h4 className="font-medium mb-2">Resumen de Reserva</h4>
    <div className="space-y-1 text-sm">
      <SummaryLine label="Estacionamiento (4h)" value="$800" />
      <SummaryLine label="Lavado Completo" value="$2.500" />
      <SummaryTotal label="Total" value="$3.300" />
    </div>
    <Button className="w-full mt-4">Confirmar Reserva</Button>
  </div>
);

const SummaryLine: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between"> <span>{label}</span> <span>{value}</span> </div>
);

const SummaryTotal: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="border-t pt-1 mt-2 font-medium flex justify-between"> <span>{label}</span> <span>{value}</span> </div>
);

const UpcomingReservations: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle>Próximas Reservas</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <ReservationItem title="Mañana - 10:00 AM" subtitle="Estacionamiento + Lavado" badge={<Badge>Confirmada</Badge>} />
        <ReservationItem title="Viernes - 2:00 PM" subtitle="Solo Estacionamiento" badge={<Badge variant="outline">Pendiente</Badge>} />
      </div>
    </CardContent>
  </Card>
);

const ReservationItem: React.FC<{ title: string; subtitle: string; badge: React.ReactNode }> = ({ title, subtitle, badge }) => (
  <div className="flex items-center justify-between p-4 border rounded-lg">
    <div>
      <p className="font-medium">{title}</p>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </div>
    {badge}
  </div>
);

// --- Wash Tab Subcomponents ---
interface WashProps {
  isWashing: boolean;
  progress: number;
  onStart: () => void;
}
const WashTab: React.FC<WashProps> = ({ isWashing, progress, onStart }) => (
  <>
    <Card>
      <CardHeader>
        <CardTitle>Estado del Lavado</CardTitle>
        <CardDescription>Monitorea el progreso de tu lavado en tiempo real</CardDescription>
      </CardHeader>
      <CardContent>
        {isWashing ? (
          <WashStatus progress={progress} />
        ) : (
          <div className="text-center py-8">
            <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No hay lavado en progreso</p>
            <Button onClick={onStart}>Iniciar Lavado Demo</Button>
          </div>
        )}
      </CardContent>
    </Card>
    <WashHistory />
  </>
);

const WashStatus: React.FC<{ progress: number }> = ({ progress }) => (
  <div className="space-y-6">
    <div className="text-center">
      <div className="text-3xl font-bold text-blue-600 mb-2">{progress}%</div>
      <Progress value={progress} className="w-full mb-4" />
      <p className="text-gray-600">
        {progress < 25 && "Preparando vehículo..."}
        {progress >= 25 && progress < 50 && "Aplicando detergente..."}
        {progress >= 50 && progress < 75 && "Lavado con cepillos..."}
        {progress >= 75 && progress < 100 && "Secado final..."}
        {progress === 100 && "¡Lavado completado!"}
      </p>
    </div>
    <div className="grid md:grid-cols-3 gap-4 text-center">
      <InfoBlock icon={<Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />} title="Tiempo Estimado" subtitle={`${Math.max(0, Math.ceil((100 - progress) / 5))} minutos`} />
      <InfoBlock icon={<Car className="h-8 w-8 text-green-600 mx-auto mb-2" />} title="Tipo de Lavado" subtitle="Completo Premium" />
      <InfoBlock icon={<MapPin className="h-8 w-8 text-purple-600 mx-auto mb-2" />} title="Posición" subtitle="Túnel de Lavado 1" />
    </div>
  </div>
);

const InfoBlock: React.FC<{ icon: React.ReactNode; title: string; subtitle: string }> = ({ icon, title, subtitle }) => (
  <div>
    {icon}
    <p className="text-sm font-medium">{title}</p>
    <p className="text-xs text-gray-600">{subtitle}</p>
  </div>
);

const WashHistory: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle>Historial de Lavados</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <HistoryItem date="Ayer - 4:30 PM" desc="Lavado Premium - 18 minutos" statusColor="bg-green-100" statusText="Completado" />
        <HistoryItem date="Lunes - 11:15 AM" desc="Lavado Básico - 12 minutos" statusColor="bg-green-100" statusText="Completado" />
        <HistoryItem date="Viernes pasado - 2:00 PM" desc="Lavado Premium - 20 minutos" statusColor="bg-green-100" statusText="Completado" />
      </div>
    </CardContent>
  </Card>
);

const HistoryItem: React.FC<{ date: string; desc: string; statusColor: string; statusText: string }> = ({ date, desc, statusColor, statusText }) => (
  <div className="flex items-center justify-between p-4 border rounded-lg">
    <div>
      <p className="font-medium">{date}</p>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
    <Badge className={`${statusColor} text-green-800`}>{statusText}</Badge>
  </div>
);

// --- Cameras Tab Subcomponents ---
const CamerasTab: React.FC = () => (
  <>
    <Card>
      <CardHeader>
        <CardTitle>Cámaras de Seguridad</CardTitle>
        <CardDescription>Monitorea tu vehículo en tiempo real</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <CameraSection title="Cámara Principal" subtitle="Espacio A-15" />
          <CameraSection title="Vista Lateral" subtitle="Ángulo 2" />
        </div>
        <SecurityStatus />
      </CardContent>
    </Card>
    <CameraControls />
  </>
);

const CameraSection: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="space-y-4">
    <div className="bg-gray-900 aspect-video rounded-lg flex items-center justify-center">
      <div className="text-center text-white">
        <Camera className="h-12 w-12 mx-auto mb-2" />
        <p>{title}</p>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>
    </div>
    <div className="flex space-x-2">
      <Button size="sm" variant="outline"><Camera className="h-4 w-4 mr-1" />Captura</Button>
      <Button size="sm" variant="outline">Zoom</Button>
      <Button size="sm" variant="outline">HD</Button>
    </div>
  </div>
);

const SecurityStatus: React.FC = () => (
  <div className="mt-6 p-4 bg-blue-50 rounded-lg flex items-center space-x-2">
    <Shield className="h-5 w-5 text-blue-600" />
    <p className="text-sm text-blue-700">Todas las cámaras están funcionando correctamente. Grabación 24/7 activada.</p>
  </div>
);

const CameraControls: React.FC = () => (
  <Card>
    <CardHeader><CardTitle>Controles Avanzados</CardTitle></CardHeader>
    <CardContent>
      <div className="grid md:grid-cols-3 gap-4">
        <OutlineButton icon={<Camera className="h-6 w-6 mb-2" />} label="Vista 360°" />
        <OutlineButton icon={<Clock className="h-6 w-6 mb-2" />} label="Grabaciones" />
        <OutlineButton icon={<Bell className="h-6 w-6 mb-2" />} label="Alertas" />
      </div>
    </CardContent>
  </Card>
);

const OutlineButton: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
    {icon}
    <span className="text-sm">{label}</span>
  </Button>
);

// --- Billing Tab Subcomponents ---
const BillingTab: React.FC = () => (
  <>
    <div className="grid md:grid-cols-2 gap-6">
      <PlanCurrent />
      <UsageMonth />
    </div>
    <BillingHistory />
  </>
);

const PlanCurrent: React.FC = () => (
  <Card>
    <CardHeader><CardTitle>Plan Actual</CardTitle></CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="font-medium">Plan Mensual</span><Badge>Activo</Badge>
        </div>
        <div className="text-2xl font-bold">$15.000/mes</div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span>Lavados incluidos:</span><span>8 (3 restantes)</span></div>
          <div className="flex justify-between"><span>Próximo pago:</span><span>15 Ene 2024</span></div>
        </div>
        <Button variant="outline" className="w-full">Cambiar Plan</Button>
      </div>
    </CardContent>
  </Card>
);

const UsageMonth: React.FC = () => (
  <Card>
    <CardHeader><CardTitle>Uso del Mes</CardTitle></CardHeader>
    <CardContent>
      <div className="space-y-4 text-sm">
        <div className="flex justify-between"><span>Estacionamiento</span><span>45 horas</span></div>
        <div className="flex justify-between"><span>Lavados realizados</span><span>5 de 8</span></div>
        <div className="flex justify-between"><span>Carga eléctrica</span><span>12 kWh</span></div>
        <div className="border-t pt-2 flex justify-between font-medium"><span>Ahorro vs. pago individual</span><span className="text-green-600">$3.200</span></div>
      </div>
    </CardContent>
  </Card>
);

const BillingHistory: React.FC = () => (
  <Card>
    <CardHeader><CardTitle>Historial de Facturación</CardTitle></CardHeader>
    <CardContent>
      <div className="space-y-4">
        <BillingItem period="Diciembre 2024" plan="Plan Mensual" amount="$15.000" statusColor="bg-green-100" statusText="Pagado" />
        <BillingItem period="Noviembre 2024" plan="Plan Mensual" amount="$15.000" statusColor="bg-green-100" statusText="Pagado" />
        <BillingItem period="Octubre 2024" plan="Servicios individuales" amount="$8.500" statusColor="bg-green-100" statusText="Pagado" />
      </div>
    </CardContent>
  </Card>
);

const BillingItem: React.FC<{ period: string; plan: string; amount: string; statusColor: string; statusText: string }> = ({ period, plan, amount, statusColor, statusText }) => (
  <div className="flex items-center justify-between p-4 border rounded-lg">
    <div>
      <p className="font-medium">{period}</p>
      <p className="text-sm text-gray-600">{plan}</p>
    </div>
    <div className="text-right">
      <p className="font-medium">{amount}</p>
      <Badge className={`${statusColor} text-green-800`}>{statusText}</Badge>
    </div>
  </div>
);

// --- Profile Tab Subcomponents ---
interface ProfileProps {
  user: any;
}
const ProfileTab: React.FC<ProfileProps> = ({ user }) => (
  <>
    <Card>
      <CardHeader><CardTitle>Información Personal</CardTitle></CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <ProfileForm user={user} />
        </div>
      </CardContent>
    </Card>
    <Preferences />
  </>
);

const ProfileForm: React.FC<{ user: any }> = ({ user }) => (
  <>
    <div className="space-y-4">
      <FormField label="Nombre Completo" input={<input type="text" className="w-full mt-1 p-2 border rounded-md" defaultValue={user.name} />} />
      <FormField label="Email" input={<input type="email" className="w-full mt-1 p-2 border rounded-md" defaultValue={user.email} />} />
      <FormField label="Teléfono" input={<input type="tel" className="w-full mt-1 p-2 border rounded-md" defaultValue={user.phone} />} />
    </div>
    <div className="space-y-4 mt-6">
      <FormField label="Tipo de Vehículo" input={
        <select className="w-full mt-1 p-2 border rounded-md" defaultValue={user.vehicleType}>
          <option value="auto">Auto</option>
          <option value="suv">SUV</option>
          <option value="camioneta">Camioneta</option>
          <option value="electrico">Vehículo Eléctrico</option>
        </select>
      } />
      <FormField label="Patente" input={<input type="text" className="w-full mt-1 p-2 border rounded-md" defaultValue={user.licensePlate} />} />
      <Button className="w-full mt-2">Actualizar Información</Button>
    </div>
    </>
);

const Preferences: React.FC = () => (
  <>
  <Card>
    <CardHeader><CardTitle>Preferencias</CardTitle></CardHeader>
    <CardContent>
      <PreferenceItem label="Notificaciones por Email" desc="Recibir actualizaciones por correo" defaultChecked={true} />
      <PreferenceItem label="Notificaciones Push" desc="Alertas en tiempo real" defaultChecked={true} />
      <PreferenceItem label="Recordatorios de Lavado" desc="Sugerencias automáticas" defaultChecked={false} />
    </CardContent>
  </Card>
  </>
);

interface PreferenceItemProps {
  label: string;
  desc: string;
  defaultChecked: boolean;
}
const PreferenceItem: React.FC<PreferenceItemProps> = ({ label, desc, defaultChecked }) => (
  <div className="flex items-center justify-between py-2 border-b last:border-none">
    <div>
      <p className="font-medium">{label}</p>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
    <input type="checkbox" defaultChecked={defaultChecked} />
  </div>
);

const Original: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [washProgress, setWashProgress] = useState(0);
  const [isWashing, setIsWashing] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));
    else navigate("/login");
  }, [navigate]);

  useEffect(() => {
    if (isWashing && washProgress < 100) {
      const timer = setTimeout(() => setWashProgress(prev => Math.min(prev + 5, 100)), 1000);
      return () => clearTimeout(timer);
    }
  }, [isWashing, washProgress]);

  const startWash = () => { setIsWashing(true); setWashProgress(0); };
  const handleLogout = () => { localStorage.removeItem("user"); navigate("/"); };

  if (!user) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={handleLogout} />
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="booking">Reservas</TabsTrigger>
            <TabsTrigger value="wash">Lavado</TabsTrigger>
            <TabsTrigger value="cameras">Cámaras</TabsTrigger>
            <TabsTrigger value="billing">Facturación</TabsTrigger>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
          </TabsList>

          <TabsContent value="overview"><OverviewTab startWash={startWash} /></TabsContent>
          <TabsContent value="booking"><BookingTab /></TabsContent>
          <TabsContent value="wash"><WashTab isWashing={isWashing} progress={washProgress} onStart={startWash} /></TabsContent>
          <TabsContent value="cameras"><CamerasTab /></TabsContent>
          <TabsContent value="billing"><BillingTab /></TabsContent>
          <TabsContent value="profile"><ProfileTab user={user} /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Original;
