import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Camera, 
  Activity, 
  Users, 
  TrendingUp, 
  Settings, 
  Search,
  Plus,
  Eye,
  EyeOff,
  Zap,
  Shield,
  BarChart3,
  Bell
} from "lucide-react";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for cameras
  const cameras = [
    {
      id: 1,
      name: "Entrada Principal",
      location: "Lobby",
      status: "online",
      brand: "Hikvision",
      consumption: "12.5 kWh",
      lastActivity: "2 min ago"
    },
    {
      id: 2,
      name: "Estacionamiento",
      location: "Exterior",
      status: "online",
      brand: "Dahua",
      consumption: "8.3 kWh",
      lastActivity: "5 min ago"
    },
    {
      id: 3,
      name: "Oficina 1",
      location: "Piso 2",
      status: "offline",
      brand: "Axis",
      consumption: "0 kWh",
      lastActivity: "2 hours ago"
    },
    {
      id: 4,
      name: "Almacén",
      location: "Planta Baja",
      status: "online",
      brand: "Samsung",
      consumption: "15.2 kWh",
      lastActivity: "1 min ago"
    }
  ];

  const stats = [
    {
      title: "Cámaras Activas",
      value: "24",
      change: "+2 desde ayer",
      icon: Camera,
      color: "text-clarity-primary"
    },
    {
      title: "Consumo Total",
      value: "156.8 kWh",
      change: "-5.2% vs mes anterior",
      icon: Zap,
      color: "text-clarity-accent"
    },
    {
      title: "Detecciones",
      value: "1,429",
      change: "+12% esta semana",
      icon: Eye,
      color: "text-clarity-secondary"
    },
    {
      title: "Eficiencia",
      value: "94.2%",
      change: "+1.8% mejora",
      icon: TrendingUp,
      color: "text-green-600"
    }
  ];

  return (
    <div className="min-h-screen bg-clarity-surface">
      {/* Header */}
      <header className="border-b border-border bg-clarity-surface-elevated">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-clarity-primary to-clarity-secondary rounded-lg flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">Clarity</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Buscar cámaras..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Button variant="outline" size="icon">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Panel de Control
          </h2>
          <p className="text-muted-foreground">
            Administra tus cámaras, monitorea el consumo y detecta patrones en tiempo real
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-clarity-surface-elevated border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-clarity-surface-elevated border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-clarity-primary" />
                <span>Conectar Nueva Cámara</span>
              </CardTitle>
              <CardDescription>
                Integra cámaras de diferentes marcas con sus librerías específicas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/cameras">
                <Button className="w-full bg-clarity-primary hover:bg-clarity-primary/90">
                  Agregar Cámara
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-clarity-surface-elevated border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-clarity-secondary" />
                <span>Analizar Patrones</span>
              </CardTitle>
              <CardDescription>
                Detecta patrones de consumo y optimiza el rendimiento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/analytics">
                <Button variant="outline" className="w-full">
                  Ver Análisis
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-clarity-surface-elevated border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-clarity-accent" />
                <span>Configurar Alertas</span>
              </CardTitle>
              <CardDescription>
                Recibe notificaciones sobre eventos importantes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/settings">
                <Button variant="outline" className="w-full">
                  Configurar
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Cameras Overview */}
        <Card className="bg-clarity-surface-elevated border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Cámaras Conectadas</CardTitle>
                <CardDescription>Estado actual de todas las cámaras en el sistema</CardDescription>
              </div>
              <Link to="/cameras">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Nueva Cámara
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cameras.map((camera) => (
                <div key={camera.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-background">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-clarity-primary/20 to-clarity-secondary/20 rounded-lg flex items-center justify-center">
                        <Camera className="w-6 h-6 text-clarity-primary" />
                      </div>
                      <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${
                        camera.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{camera.name}</h3>
                      <p className="text-sm text-muted-foreground">{camera.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">{camera.brand}</p>
                      <p className="text-xs text-muted-foreground">Marca</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">{camera.consumption}</p>
                      <p className="text-xs text-muted-foreground">Consumo</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">{camera.lastActivity}</p>
                      <p className="text-xs text-muted-foreground">Última actividad</p>
                    </div>
                    
                    <Badge variant={camera.status === 'online' ? 'default' : 'destructive'}>
                      {camera.status === 'online' ? 'En línea' : 'Desconectada'}
                    </Badge>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
