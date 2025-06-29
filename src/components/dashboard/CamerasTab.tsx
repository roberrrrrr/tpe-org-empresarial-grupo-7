
import React, { useState, useRef, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import {
  Video,
  Clock,
  Bell,
  Camera,
  Shield,
  Pause,
  Wifi,
  WifiOff,
  AlertTriangle,
  Eye,
  Settings,
  ZoomIn,
  Download,
  ChevronLeft,
  ChevronRight,
  Play
} from 'lucide-react'

interface CameraInfo {
  id: string
  name: string
  location: string
  status: string
  quality: string
  angle: string
  url: string
  videoStatus: 'placeholder' | 'loading' | 'connected' | 'error'
}

interface CameraCardProps {
  camera: CameraInfo
  index: number
  onLoadStart: (id: string) => void
  onLoaded: (id: string) => void
  onError: (id: string) => void
}

const CameraCard: React.FC<CameraCardProps> = ({ camera, onLoadStart, onLoaded, onError }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Cada vez que cambie la URL o el estado, recarga
  useEffect(() => {
    if (camera.url && videoRef.current) {
      videoRef.current.load();
    }
  }, [camera.url, camera.videoStatus]);


  // Solo la primera vez que montamos el componente pasamos a 'loading'
  useEffect(() => {
    if (camera.videoStatus === 'placeholder') {
      onLoadStart(camera.id);
    }
  }, []); // ¡vacío para que solo ocurra al montar!

  const handleLoadStart = () => {
    // Si ya estamos 'connected', no resetees a loading
    if (camera.videoStatus !== 'connected') {
      onLoadStart(camera.id);
    }
  };




  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl shadow-lg">

      {/* 1) El video SIEMPRE en el DOM */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadStart={() => handleLoadStart()}
        onCanPlay={() => onLoaded(camera.id)}
        onError={() => onError(camera.id)}
      >
        <source src={camera.url} type="video/mp4" />
        <source src={camera.url} type="video/webm" />
        Tu navegador no soporta video HTML5.
      </video>

      {/* 2) Overlay: PLACEHOLDER */}
      {(!camera.url || camera.videoStatus === 'placeholder') && (
        <div className="absolute inset-0 bg-gray-900/80 flex flex-col items-center justify-center text-white">
          <Camera className="h-12 w-12 mb-2 animate-pulse" />
          <p className="font-semibold">{camera.name}</p>
          <p className="text-sm">{camera.location}</p>
          <p className="text-xs mt-1">Sin fuente de video</p>
        </div>
      )}

      {/* 3) Overlay: LOADING */}
      {camera.videoStatus === 'loading' && (
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
          <Wifi className="h-12 w-12 mb-2 animate-pulse" />
          <p>Conectando…</p>
        </div>
      )}

      {/* 4) Overlay: ERROR */}
      {camera.videoStatus === 'error' && (
        <div className="absolute inset-0 bg-red-900/50 flex flex-col items-center justify-center text-red-200">
          <AlertTriangle className="h-12 w-12 mb-2" />
          <p className="font-semibold">Error al cargar</p>
        </div>
      )}

      {/* 5) Indicadores y controles cuando esté conectado */}
      {camera.videoStatus === 'connected' && (
        <>
          <div className="absolute top-2 left-2 bg-red-600/90 px-2 py-1 rounded-full text-white text-xs flex items-center gap-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />EN VIVO
          </div>
          <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded-full text-white text-xs">
            {camera.quality}
          </div>
          <div className="absolute top-2 right-2 flex gap-1">
            <button><Eye className="w-4 h-4 text-white" /></button>
            <button><Settings className="w-4 h-4 text-white" /></button>
          </div>
        </>
      )}
    </div>
  );
};const CamerasTab: React.FC = () => {
  const [isRecording, setIsRecording] = useState(true)
  const [cameras, setCameras] = useState<CameraInfo[]>([
    {
      id: 'main',
      name: 'Cámara Principal',
      location: 'Espacio A-15',
      status: 'online',
      quality: 'HD',
      angle: 'Frontal',
      url: './test.mp4',
      videoStatus: 'placeholder'
    },
    {
      id: 'side',
      name: 'Vista Lateral',
      location: 'Ángulo Derecho',
      status: 'online',
      quality: '4K',
      angle: 'Lateral',
      url: './test1.mp4',
      videoStatus: 'placeholder'
    }
  ])

  const controls = [
    { icon: Video, label: 'Vista 360°', description: 'Rotación completa', color: 'from-purple-400 to-purple-600', bgColor: 'from-purple-50 to-purple-100' },
    { icon: Clock, label: 'Grabaciones', description: 'Historial 24/7', color: 'from-blue-400 to-blue-600', bgColor: 'from-blue-50 to-blue-100' },
    { icon: Bell, label: 'Alertas', description: 'Notificaciones', color: 'from-orange-400 to-orange-600', bgColor: 'from-orange-50 to-orange-100' }
  ]

  const updateStatus = (id: string, status: CameraInfo['videoStatus']) => {
    setCameras(prev =>
      prev.map(cam => (cam.id === id ? { ...cam, videoStatus: status } : cam))
    )
  }

  return (
    <div className="space-y-8">
      {/* Main Camera Section */}
      <Card className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-3">
                <Camera /> Cámaras de Seguridad
              </CardTitle>
              <CardDescription>Monitoreo en tiempo real de tu vehículo</CardDescription>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-emerald-100 rounded-full">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm">Sistema Activo</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {cameras.map((cam, idx) => (
              <CameraCard
                key={cam.id}
                camera={cam}
                index={idx}
                onLoadStart={id => updateStatus(id, 'loading')}
                onLoaded={id => updateStatus(id, 'connected')}
                onError={id => updateStatus(id, 'error')}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Controls */}
      <Card className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Settings /> Controles Avanzados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {controls.map((ctl, i) => (
              <button key={ctl.label} className="group relative h-24 bg-white/80 rounded-2xl shadow-md transition-transform hover:scale-105">
                <div className={`absolute inset-0 bg-gradient-to-br ${ctl.bgColor} opacity-20`} />
                <div className="relative flex flex-col items-center justify-center h-full p-4">
                  <div className={`p-3 bg-gradient-to-br ${ctl.color} rounded-xl shadow-lg transition-transform group-hover:scale-110 mb-2`}>
                    <ctl.icon className="h-6 w-6 text-white" />
                  </div>
                  <span>{ctl.label}</span>
                  <span className="text-xs">{ctl.description}</span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CamerasTab

