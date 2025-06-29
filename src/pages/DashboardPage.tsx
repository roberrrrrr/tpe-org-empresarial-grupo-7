// DashboardPage.tsx
"use client";

import React, { useEffect, useState, useRef } from "react";
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
  Video,
  Eye,
  Wifi,
  ZoomIn,
  Download,
  Pause,
  Clock,
  Edit3,
  Settings,
  CreditCard,
  Battery,
  Users,
  User,
  MapPin,
  X,
  Check,
  Shield,
  ChevronLeft,
  Bell,
  ChevronRight,
  Crown,
  LogOut,
  Zap,
  TrendingUp,
  Activity
} from "lucide-react";


import OverviewSection from '@/components/dashboard/OverviewSection'
import WashProgressSection  from '@/components/dashboard/WashProgressSection'
import BookingTab  from '@/components/dashboard/BookingTab'
import CamerasTab  from '@/components/dashboard/CamerasTab'
import AccountManagement  from '@/components/dashboard/AccountManagement'
import Sidebar from '@/components/dashboard/Sidebar'
import LogoutTab from "@/components/dashboard/LogoutTab"


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
          <TabsContent value="overview" className="space-y-6">
            <OverviewSection onStartWash={startWash} />
         </TabsContent>
          <TabsContent value="wash" className="space-y-6">
            <WashProgressSection
              washing={washing}
              progress={washProgress}
              onStartWash={startWash}
            />
          </TabsContent>        
          <TabsContent value="booking">
            <BookingTab/>
          </TabsContent>
          <TabsContent value="cameras">
            <CamerasTab/>
          </TabsContent>

          <TabsContent value="profile">
            <AccountManagement user={user}/>
          </TabsContent>

          <TabsContent value="logout">
            <LogoutTab/>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

