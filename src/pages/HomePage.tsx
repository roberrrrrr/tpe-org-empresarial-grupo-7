import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Car,
  Shield,
  Leaf,
  Zap,
  Clock,
  Camera,
  Smartphone,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              El Imperio del Auto
            </h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#servicios" className="text-gray-600 hover:text-blue-600">
              Servicios
            </a>
            <a href="#precios" className="text-gray-600 hover:text-blue-600">
              Precios
            </a>
            <a href="#contacto" className="text-gray-600 hover:text-blue-600">
              Contacto
            </a>
            <Link to="/login">
              <Button>Iniciar Sesión</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800">
            Innovación • Seguridad • Sostenibilidad
          </Badge>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Estacionamiento y Lavado
            <span className="text-blue-600 block">Inteligente</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Tecnología de punta para el cuidado de tu vehículo. Estacionamiento
            seguro, lavado ecológico y carga eléctrica en el corazón de Tandil.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Reservar Ahora
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline">
                Ver Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="servicios" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">
            Nuestros Servicios
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Estacionamiento Seguro</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Cámaras HD 24/7 y acceso controlado por patente
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Car className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Lavado Automático</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Sistema automatizado con cepillos premium y secado
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Zap className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <CardTitle>Carga Eléctrica</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Estaciones de carga para vehículos eléctricos
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Smartphone className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>App Móvil</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Control total desde tu smartphone
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">
            Tecnología Avanzada
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Camera className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">
                Monitoreo en Tiempo Real
              </h4>
              <p className="text-gray-600">
                Accede a las cámaras de seguridad desde tu celular y observa tu
                vehículo en todo momento
              </p>
            </div>

            <div className="text-center">
              <Clock className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">
                Seguimiento de Lavado
              </h4>
              <p className="text-gray-600">
                Visualiza el progreso del lavado de tu auto en tiempo real con
                estimación de tiempo
              </p>
            </div>

            <div className="text-center">
              <Leaf className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Lavado Ecológico</h4>
              <p className="text-gray-600">
                Tecnología sustentable que minimiza el uso de agua y químicos
                nocivos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="precios" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">
            Planes y Precios
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="relative">
              <CardHeader>
                <CardTitle className="text-2xl">Plan Mensual</CardTitle>
                <CardDescription>Ideal para uso frecuente</CardDescription>
                <div className="text-3xl font-bold text-blue-600">
                  $15.000<span className="text-lg text-gray-500">/mes</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    ✓ Estacionamiento ilimitado
                  </li>
                  <li className="flex items-center">✓ 8 lavados incluidos</li>
                  <li className="flex items-center">✓ Acceso prioritario</li>
                  <li className="flex items-center">
                    ✓ Carga eléctrica gratuita
                  </li>
                  <li className="flex items-center">✓ App premium</li>
                </ul>
                <Button className="w-full mt-6">Suscribirse</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Pago por Uso</CardTitle>
                <CardDescription>Flexibilidad total</CardDescription>
                <div className="text-3xl font-bold text-green-600">
                  Variable
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    • Estacionamiento: $200/hora
                  </li>
                  <li className="flex items-center">
                    • Lavado completo: $2.500
                  </li>
                  <li className="flex items-center">
                    • Carga eléctrica: $150/kWh
                  </li>
                  <li className="flex items-center">• Descuento combo: 15%</li>
                  <li className="flex items-center">• Sin compromisos</li>
                </ul>
                <Button variant="outline" className="w-full mt-6">
                  Usar Ahora
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Location */}
      <section id="contacto" className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-8">Ubicación</h3>
          <div className="flex items-center justify-center mb-6">
            <MapPin className="h-6 w-6 text-red-500 mr-2" />
            <p className="text-lg">
              Pinto y Leandro Alem, Centro - Tandil, Buenos Aires
            </p>
          </div>
          <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
            <p className="text-gray-600">Mapa interactivo aquí</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Car className="h-6 w-6" />
                <span className="font-bold">El Imperio del Auto</span>
              </div>
              <p className="text-gray-400">
                Innovación, seguridad y sostenibilidad en el cuidado de tu
                vehículo.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Estacionamiento</li>
                <li>Lavado Automático</li>
                <li>Carga Eléctrica</li>
                <li>Monitoreo 24/7</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📞 (2494) 123-456</li>
                <li>📧 info@imperioauto.com</li>
                <li>📍 Pinto y L. Alem, Tandil</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Horarios</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Lun-Vie: 7:00 - 22:00</li>
                <li>Sábados: 8:00 - 20:00</li>
                <li>Domingos: 9:00 - 18:00</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 El Imperio del Auto. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
