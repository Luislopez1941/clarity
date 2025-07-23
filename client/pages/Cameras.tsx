import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Camera, 
  Plus, 
  Search,
  Filter,
  Settings,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Wifi,
  WifiOff,
  ArrowLeft,
  MapPin,
  Zap,
  Clock,
  MoreHorizontal,
  Power,
  Activity
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Cameras() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [brandFilter, setBrandFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Mock camera data with more details
  const [cameras, setCameras] = useState([
    {
      id: 1,
      name: "Entrada Principal",
      location: "Lobby - Planta Baja",
      status: "online",
      brand: "Hikvision",
      model: "DS-2CD2043G2-I",
      ip: "192.168.1.101",
      consumption: "12.5 kWh",
      lastActivity: "2 min ago",
      resolution: "4MP",
      fps: "30",
      nightVision: true,
      motionDetection: true,
      recording: true,
      uptime: "99.8%"
    },
    {
      id: 2,
      name: "Estacionamiento Exterior",
      location: "Estacionamiento - Exterior",
      status: "online",
      brand: "Dahua",
      model: "IPC-HFW4431R-Z",
      ip: "192.168.1.102",
      consumption: "8.3 kWh",
      lastActivity: "5 min ago",
      resolution: "4MP",
      fps: "25",
      nightVision: true,
      motionDetection: true,
      recording: true,
      uptime: "98.2%"
    },
    {
      id: 3,
      name: "Oficina Gerencia",
      location: "Oficina 1 - Piso 2",
      status: "offline",
      brand: "Axis",
      model: "M3046-V",
      ip: "192.168.1.103",
      consumption: "0 kWh",
      lastActivity: "2 hours ago",
      resolution: "1080p",
      fps: "30",
      nightVision: false,
      motionDetection: true,
      recording: false,
      uptime: "89.1%"
    },
    {
      id: 4,
      name: "Almacén Principal",
      location: "Almacén - Planta Baja",
      status: "online",
      brand: "Samsung",
      model: "SNO-6084RP",
      ip: "192.168.1.104",
      consumption: "15.2 kWh",
      lastActivity: "1 min ago",
      resolution: "2MP",
      fps: "30",
      nightVision: true,
      motionDetection: true,
      recording: true,
      uptime: "99.5%"
    },
    {
      id: 5,
      name: "Pasillo Secundario",
      location: "Pasillo - Piso 1",
      status: "online",
      brand: "Hikvision",
      model: "DS-2CD2385FWD-I",
      ip: "192.168.1.105",
      consumption: "9.8 kWh",
      lastActivity: "3 min ago",
      resolution: "8MP",
      fps: "20",
      nightVision: true,
      motionDetection: true,
      recording: true,
      uptime: "97.3%"
    },
    {
      id: 6,
      name: "Recepción",
      location: "Recepción - Planta Baja",
      status: "warning",
      brand: "Dahua",
      model: "IPC-HDW4431C-A",
      ip: "192.168.1.106",
      consumption: "11.1 kWh",
      lastActivity: "15 min ago",
      resolution: "4MP",
      fps: "30",
      nightVision: true,
      motionDetection: true,
      recording: true,
      uptime: "94.7%"
    }
  ]);

  const filteredCameras = cameras.filter(camera => {
    const matchesSearch = camera.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         camera.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || camera.status === statusFilter;
    const matchesBrand = brandFilter === "all" || camera.brand === brandFilter;
    
    return matchesSearch && matchesStatus && matchesBrand;
  });

  const brands = [...new Set(cameras.map(camera => camera.brand))];
  const onlineCameras = cameras.filter(c => c.status === "online").length;
  const offlineCameras = cameras.filter(c => c.status === "offline").length;
  const warningCameras = cameras.filter(c => c.status === "warning").length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "offline": return "bg-red-500";
      case "warning": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusBadgeVariant = (status: string): "default" | "destructive" | "secondary" => {
    switch (status) {
      case "online": return "default";
      case "offline": return "destructive";
      case "warning": return "secondary";
      default: return "secondary";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "online": return "En línea";
      case "offline": return "Desconectada";
      case "warning": return "Advertencia";
      default: return "Desconocido";
    }
  };

  return (
    <div className="min-h-screen bg-clarity-surface">
      {/* Header */}
      <header className="border-b border-border bg-clarity-surface-elevated">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-clarity-primary to-clarity-secondary rounded-lg flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">Clarity</h1>
              </Link>
              <div className="text-muted-foreground">/</div>
              <h2 className="text-lg font-semibold text-foreground">Gestión de Cámaras</h2>
            </div>
            
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-clarity-surface-elevated border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total</CardTitle>
              <Camera className="w-4 h-4 text-clarity-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{cameras.length}</div>
              <p className="text-xs text-muted-foreground">Cámaras registradas</p>
            </CardContent>
          </Card>

          <Card className="bg-clarity-surface-elevated border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">En Línea</CardTitle>
              <Wifi className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{onlineCameras}</div>
              <p className="text-xs text-muted-foreground">Funcionando normalmente</p>
            </CardContent>
          </Card>

          <Card className="bg-clarity-surface-elevated border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Desconectadas</CardTitle>
              <WifiOff className="w-4 h-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{offlineCameras}</div>
              <p className="text-xs text-muted-foreground">Requieren atención</p>
            </CardContent>
          </Card>

          <Card className="bg-clarity-surface-elevated border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Advertencias</CardTitle>
              <Activity className="w-4 h-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{warningCameras}</div>
              <p className="text-xs text-muted-foreground">Con problemas menores</p>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Buscar por nombre o ubicación..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="online">En línea</SelectItem>
                <SelectItem value="offline">Desconectadas</SelectItem>
                <SelectItem value="warning">Con advertencias</SelectItem>
              </SelectContent>
            </Select>

            <Select value={brandFilter} onValueChange={setBrandFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Marca" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las marcas</SelectItem>
                {brands.map(brand => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-clarity-primary hover:bg-clarity-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Agregar Cámara
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Agregar Nueva Cámara</DialogTitle>
                <DialogDescription>
                  Conecta una nueva cámara al sistema Clarity. Completa la información básica.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input id="name" placeholder="Ej: Entrada principal" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Ubicación</Label>
                    <Input id="location" placeholder="Ej: Lobby - Planta baja" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand">Marca</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar marca" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hikvision">Hikvision</SelectItem>
                        <SelectItem value="dahua">Dahua</SelectItem>
                        <SelectItem value="axis">Axis</SelectItem>
                        <SelectItem value="samsung">Samsung</SelectItem>
                        <SelectItem value="bosch">Bosch</SelectItem>
                        <SelectItem value="other">Otra</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Modelo</Label>
                    <Input id="model" placeholder="Ej: DS-2CD2043G2-I" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ip">Dirección IP</Label>
                    <Input id="ip" placeholder="192.168.1.xxx" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="resolution">Resolución</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Resolución" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                        <SelectItem value="2mp">2MP</SelectItem>
                        <SelectItem value="4mp">4MP</SelectItem>
                        <SelectItem value="8mp">8MP (4K)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notas (opcional)</Label>
                  <Textarea id="notes" placeholder="Información adicional sobre la cámara..." />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancelar
                </Button>
                <Button className="bg-clarity-primary hover:bg-clarity-primary/90">
                  Agregar Cámara
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Results Info */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Mostrando {filteredCameras.length} de {cameras.length} cámaras
          </p>
        </div>

        {/* Cameras Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCameras.map((camera) => (
            <Card key={camera.id} className="bg-clarity-surface-elevated border-border hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-clarity-primary/20 to-clarity-secondary/20 rounded-lg flex items-center justify-center">
                        <Camera className="w-6 h-6 text-clarity-primary" />
                      </div>
                      <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${getStatusColor(camera.status)}`}></div>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{camera.name}</CardTitle>
                      <CardDescription className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {camera.location}
                      </CardDescription>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        Ver en vivo
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="w-4 h-4 mr-2" />
                        Configurar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant={getStatusBadgeVariant(camera.status)}>
                    {getStatusText(camera.status)}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{camera.brand}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <div className="text-muted-foreground">Modelo</div>
                    <div className="font-medium">{camera.model}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground">IP</div>
                    <div className="font-medium font-mono text-xs">{camera.ip}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground">Resolución</div>
                    <div className="font-medium">{camera.resolution}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground">FPS</div>
                    <div className="font-medium">{camera.fps}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center space-x-2 text-sm">
                    <Zap className="w-4 h-4 text-clarity-accent" />
                    <span className="font-medium">{camera.consumption}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{camera.lastActivity}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    Ver
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Settings className="w-4 h-4 mr-2" />
                    Config
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCameras.length === 0 && (
          <div className="text-center py-12">
            <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No se encontraron cámaras</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || statusFilter !== "all" || brandFilter !== "all" 
                ? "Intenta ajustar los filtros de búsqueda"
                : "Comienza agregando tu primera cámara al sistema"
              }
            </p>
            {(!searchQuery && statusFilter === "all" && brandFilter === "all") && (
              <Button onClick={() => setIsAddModalOpen(true)} className="bg-clarity-primary hover:bg-clarity-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Agregar Primera Cámara
              </Button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
