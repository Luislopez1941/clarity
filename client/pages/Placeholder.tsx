import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, ArrowLeft, Construction } from "lucide-react";

interface PlaceholderProps {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export default function Placeholder({ 
  title, 
  description, 
  icon: Icon = Construction 
}: PlaceholderProps) {
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
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="bg-clarity-surface-elevated border-border">
            <CardHeader className="pb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-clarity-primary/20 to-clarity-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon className="w-8 h-8 text-clarity-primary" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">
                {title}
              </CardTitle>
              <CardDescription className="text-lg">
                {description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Esta sección está en desarrollo. Pronto estará disponible con todas las funcionalidades 
                avanzadas para la gestión de cámaras y análisis de patrones de consumo.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button className="w-full sm:w-auto bg-clarity-primary hover:bg-clarity-primary/90">
                    Volver al Dashboard
                  </Button>
                </Link>
                <Button variant="outline" className="w-full sm:w-auto">
                  Solicitar Funcionalidad
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
