import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Map, Navigation, Clock, Users, AlertCircle, Zap } from "lucide-react";

const mockTrains = [
  { id: "TR-001", route: "Central Line", speed: 75, status: "On Time", passengers: 245, nextStation: "Central Station", eta: "14:32" },
  { id: "TR-002", route: "Northern Express", speed: 95, status: "Delayed", passengers: 180, nextStation: "North Terminal", eta: "14:47" },
  { id: "TR-003", route: "Eastern Route", speed: 68, status: "On Time", passengers: 320, nextStation: "East Junction", eta: "14:25" },
  { id: "TR-004", route: "Western Loop", speed: 0, status: "Stopped", passengers: 156, nextStation: "West Plaza", eta: "15:15" },
];

export default function Tracking() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">Live Train Tracking</h1>
            <p className="text-muted-foreground">Real-time monitoring of all active trains</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="gap-2">
              <div className="status-indicator online" />
              Live Tracking Active
            </Badge>
            <Button variant="outline" size="sm">
              <Map className="h-4 w-4 mr-2" />
              Full Map View
            </Button>
          </div>
        </div>

        <Separator />

        {/* Network Map */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="h-5 w-5" />
              Railway Network Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gradient-to-br from-background via-muted/20 to-background rounded-lg border border-border p-8 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-gradient-status rounded-full flex items-center justify-center">
                  <Map className="h-8 w-8 text-background" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Interactive Map</h3>
                  <p className="text-muted-foreground">Live train positions and route visualization</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Trains */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Active Trains ({mockTrains.length})</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockTrains.map((train) => (
              <Card key={train.id} className="bg-card border-border hover:border-accent transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{train.id}</CardTitle>
                    <Badge 
                      variant={train.status === "On Time" ? "default" : train.status === "Delayed" ? "destructive" : "secondary"}
                      className="gap-1"
                    >
                      {train.status === "On Time" && <div className="w-2 h-2 bg-status-success rounded-full" />}
                      {train.status === "Delayed" && <AlertCircle className="h-3 w-3" />}
                      {train.status === "Stopped" && <div className="w-2 h-2 bg-status-warning rounded-full" />}
                      {train.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{train.route}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-accent" />
                      <span className="text-sm">Speed</span>
                    </div>
                    <span className="font-mono font-semibold">{train.speed} km/h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-accent" />
                      <span className="text-sm">Passengers</span>
                    </div>
                    <span className="font-mono font-semibold">{train.passengers}</span>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Navigation className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Next:</span>
                      <span className="text-sm font-medium">{train.nextStation}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">ETA:</span>
                      <span className="text-sm font-mono">{train.eta}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}