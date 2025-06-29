import React from 'react'
import type { FC } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Car } from 'lucide-react'


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




export default WashProgressSection;
