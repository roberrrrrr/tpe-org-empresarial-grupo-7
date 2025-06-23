"use client";

import { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [washProgress, setWashProgress] = useState(0);
  const [isWashing, setIsWashing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (isWashing && washProgress < 100) {
      const timer = setTimeout(() => {
        setWashProgress((prev) => Math.min(prev + 5, 100));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isWashing, washProgress]);

  const startWash = () => {
    setIsWashing(true);
    setWashProgress(0);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
            <Button variant="outline" onClick={handleLogout}>
              Salir
            </Button>
          </div>
        </div>
      </header>

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

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Estado Actual
                  </CardTitle>
                  <Car className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    Estacionado
                  </div>
                  <p className="text-xs text-gray-600">Espacio A-15</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Tiempo Restante
                  </CardTitle>
                  <Clock className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2h 30m</div>
                  <p className="text-xs text-gray-600">Hasta las 18:00</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Próximo Lavado
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Mañana</div>
                  <p className="text-xs text-gray-600">10:00 AM</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Plan Actual
                  </CardTitle>
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
                    <Calendar className="h-4 w-4 mr-2" />
                    Nueva Reserva
                  </Button>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={startWash}
                  >
                    <Car className="h-4 w-4 mr-2" />
                    Iniciar Lavado
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Camera className="h-4 w-4 mr-2" />
                    Ver Cámaras
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
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Vehículo estacionado
                      </p>
                      <p className="text-xs text-gray-600">
                        Hace 2 horas - Espacio A-15
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Lavado completado</p>
                      <p className="text-xs text-gray-600">
                        Ayer 16:30 - Lavado Premium
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Pago procesado</p>
                      <p className="text-xs text-gray-600">
                        Hace 3 días - Plan Mensual
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Booking Tab */}
          <TabsContent value="booking" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Nueva Reserva</CardTitle>
                <CardDescription>
                  Reserva tu espacio y servicios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Fecha</label>
                      <input
                        type="date"
                        className="w-full mt-1 p-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Hora</label>
                      <select className="w-full mt-1 p-2 border rounded-md">
                        <option>08:00</option>
                        <option>09:00</option>
                        <option>10:00</option>
                        <option>11:00</option>
                        <option>12:00</option>
                        <option>13:00</option>
                        <option>14:00</option>
                        <option>15:00</option>
                        <option>16:00</option>
                        <option>17:00</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Servicios</label>
                      <div className="mt-2 space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          Estacionamiento (incluido)
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          Lavado Completo (+$2.500)
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          Carga Eléctrica (+$150/kWh)
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Resumen de Reserva</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Estacionamiento (4h)</span>
                          <span>$800</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Lavado Completo</span>
                          <span>$2.500</span>
                        </div>
                        <div className="border-t pt-1 mt-2 font-medium flex justify-between">
                          <span>Total</span>
                          <span>$3.300</span>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full">Confirmar Reserva</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Reservations */}
            <Card>
              <CardHeader>
                <CardTitle>Próximas Reservas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Mañana - 10:00 AM</p>
                      <p className="text-sm text-gray-600">
                        Estacionamiento + Lavado
                      </p>
                    </div>
                    <Badge>Confirmada</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Viernes - 2:00 PM</p>
                      <p className="text-sm text-gray-600">
                        Solo Estacionamiento
                      </p>
                    </div>
                    <Badge variant="outline">Pendiente</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wash Tab */}
          <TabsContent value="wash" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Estado del Lavado</CardTitle>
                <CardDescription>
                  Monitorea el progreso de tu lavado en tiempo real
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isWashing ? (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {washProgress}%
                      </div>
                      <Progress value={washProgress} className="w-full mb-4" />
                      <p className="text-gray-600">
                        {washProgress < 25 && "Preparando vehículo..."}
                        {washProgress >= 25 &&
                          washProgress < 50 &&
                          "Aplicando detergente..."}
                        {washProgress >= 50 &&
                          washProgress < 75 &&
                          "Lavado con cepillos..."}
                        {washProgress >= 75 &&
                          washProgress < 100 &&
                          "Secado final..."}
                        {washProgress === 100 && "¡Lavado completado!"}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 text-center">
                      <div>
                        <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm font-medium">Tiempo Estimado</p>
                        <p className="text-xs text-gray-600">
                          {Math.max(0, Math.ceil((100 - washProgress) / 5))}{" "}
                          minutos
                        </p>
                      </div>
                      <div>
                        <Car className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <p className="text-sm font-medium">Tipo de Lavado</p>
                        <p className="text-xs text-gray-600">
                          Completo Premium
                        </p>
                      </div>
                      <div>
                        <MapPin className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <p className="text-sm font-medium">Posición</p>
                        <p className="text-xs text-gray-600">
                          Túnel de Lavado 1
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                      No hay lavado en progreso
                    </p>
                    <Button onClick={startWash}>Iniciar Lavado Demo</Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Wash History */}
            <Card>
              <CardHeader>
                <CardTitle>Historial de Lavados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Ayer - 4:30 PM</p>
                      <p className="text-sm text-gray-600">
                        Lavado Premium - 18 minutos
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      Completado
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Lunes - 11:15 AM</p>
                      <p className="text-sm text-gray-600">
                        Lavado Básico - 12 minutos
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      Completado
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Viernes pasado - 2:00 PM</p>
                      <p className="text-sm text-gray-600">
                        Lavado Premium - 20 minutos
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      Completado
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cameras Tab */}
          <TabsContent value="cameras" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cámaras de Seguridad</CardTitle>
                <CardDescription>
                  Monitorea tu vehículo en tiempo real
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-gray-900 aspect-video rounded-lg flex items-center justify-center">
                      <div className="text-center text-white">
                        <Camera className="h-12 w-12 mx-auto mb-2" />
                        <p>Cámara Principal</p>
                        <p className="text-sm text-gray-400">Espacio A-15</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Camera className="h-4 w-4 mr-1" />
                        Captura
                      </Button>
                      <Button size="sm" variant="outline">
                        Zoom
                      </Button>
                      <Button size="sm" variant="outline">
                        HD
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-900 aspect-video rounded-lg flex items-center justify-center">
                      <div className="text-center text-white">
                        <Camera className="h-12 w-12 mx-auto mb-2" />
                        <p>Vista Lateral</p>
                        <p className="text-sm text-gray-400">Ángulo 2</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Camera className="h-4 w-4 mr-1" />
                        Captura
                      </Button>
                      <Button size="sm" variant="outline">
                        Zoom
                      </Button>
                      <Button size="sm" variant="outline">
                        HD
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <p className="text-sm font-medium text-blue-900">
                      Sistema de Seguridad Activo
                    </p>
                  </div>
                  <p className="text-sm text-blue-700 mt-1">
                    Todas las cámaras están funcionando correctamente. Grabación
                    24/7 activada.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Camera Controls */}
            <Card>
              <CardHeader>
                <CardTitle>Controles Avanzados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col">
                    <Camera className="h-6 w-6 mb-2" />
                    Vista 360°
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col">
                    <Clock className="h-6 w-6 mb-2" />
                    Grabaciones
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col">
                    <Bell className="h-6 w-6 mb-2" />
                    Alertas
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
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
                    <Button variant="outline" className="w-full">
                      Cambiar Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Uso del Mes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Estacionamiento</span>
                      <span>45 horas</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lavados realizados</span>
                      <span>5 de 8</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Carga eléctrica</span>
                      <span>12 kWh</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-medium">
                        <span>Ahorro vs. pago individual</span>
                        <span className="text-green-600">$3.200</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Billing History */}
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
                      <Badge className="bg-green-100 text-green-800">
                        Pagado
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Noviembre 2024</p>
                      <p className="text-sm text-gray-600">Plan Mensual</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$15.000</p>
                      <Badge className="bg-green-100 text-green-800">
                        Pagado
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Octubre 2024</p>
                      <p className="text-sm text-gray-600">
                        Servicios individuales
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$8.500</p>
                      <Badge className="bg-green-100 text-green-800">
                        Pagado
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">
                        Nombre Completo
                      </label>
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
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">
                        Tipo de Vehículo
                      </label>
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
                    <Button className="w-full">Actualizar Información</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Preferencias</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notificaciones por Email</p>
                      <p className="text-sm text-gray-600">
                        Recibir actualizaciones por correo
                      </p>
                    </div>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notificaciones Push</p>
                      <p className="text-sm text-gray-600">
                        Alertas en tiempo real
                      </p>
                    </div>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Recordatorios de Lavado</p>
                      <p className="text-sm text-gray-600">
                        Sugerencias automáticas
                      </p>
                    </div>
                    <input type="checkbox" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
