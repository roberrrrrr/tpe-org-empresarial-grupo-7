import React from 'react'
import type { FC } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import {
  Car,
  Shield,
  Calendar,
  Camera,
  Clock,
  LogOut,
  Crown,
  ChevronRight
} from 'lucide-react'


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
  { label: "Cerrar Session", value: "logout", icon: LogOut}
];

// Props para el componente Sidebar
interface SidebarProps {
  collapsed: boolean;
  activeTab: string;
  onToggle: () => void;
  onTabChange: (value: string) => void;
}


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




export default Sidebar;
