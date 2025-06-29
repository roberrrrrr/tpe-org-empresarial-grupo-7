'use client';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '@/context/auth-context'; // si tenés auth-context
import { Loader2 } from 'lucide-react';

const LogoutTab = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Si usás contexto de auth, llamalo acá
        localStorage.clear();
      } catch (err) {
        console.error('Error al cerrar sesión:', err);
      } finally {
        navigate('/');
      }
    };
    performLogout();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-40 flex-col text-center space-y-2 text-gray-600">
      <Loader2 className="animate-spin w-5 h-5 text-blue-600" />
      <p>Cerrando sesión...</p>
    </div>
  );
};

export default LogoutTab;
