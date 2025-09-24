import { MainLayout } from "@/components/layout/MainLayout";
import { SystemStatus } from "@/components/dashboard/SystemStatus";
import { NetworkMap } from "@/components/dashboard/NetworkMap";
import { TrainStatusCard } from "@/components/dashboard/TrainStatusCard";
import { AIChatBot } from "@/components/chat/AIChatBot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Map, Navigation, Clock, Users, AlertCircle, Zap } from "lucide-react";

const Index = () => {
  // Mock train data for demonstration  
  const trainData = [
    {
      trainId: "1",
      trainNumber: "RT-4401",
      currentLocation: "Junction B-7",
      destination: "Central Hub",
      speed: 85,
      status: "on-time" as const,
      nextStation: "Central Hub",
      estimatedArrival: "14:23"
    },
    {
      trainId: "2", 
      trainNumber: "RT-4402",
      currentLocation: "Sector 7",
      destination: "North Terminal",
      speed: 45,
      status: "delayed" as const,
      delay: 12,
      nextStation: "Bridge Station",
      estimatedArrival: "14:47"
    },
    {
      trainId: "3",
      trainNumber: "RT-4403", 
      currentLocation: "South Station",
      destination: "East Hub",
      speed: 0,
      status: "stopped" as const,
      nextStation: "Platform 3",
      estimatedArrival: "15:12"
    },
    {
      trainId: "4",
      trainNumber: "RT-4404",
      currentLocation: "North Bridge",
      destination: "West Terminal", 
      speed: 78,
      status: "on-time" as const,
      nextStation: "Junction A-4",
      estimatedArrival: "14:35"
    }
  ];

  const mockTrains = [
    { id: "TR-001", route: "Central Line", speed: 75, status: "On Time", passengers: 245, nextStation: "Central Station", eta: "14:32" },
    { id: "TR-002", route: "Northern Express", speed: 95, status: "Delayed", passengers: 180, nextStation: "North Terminal", eta: "14:47" },
    { id: "TR-003", route: "Eastern Route", speed: 68, status: "On Time", passengers: 320, nextStation: "East Junction", eta: "14:25" },
    { id: "TR-004", route: "Western Loop", speed: 0, status: "Stopped", passengers: 156, nextStation: "West Plaza", eta: "15:15" },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold">Railway Control Dashboard</h1>
            <p className="text-muted-foreground">
              Real-time monitoring and control of railway operations
            </p>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            <div>Last Update: {new Date().toLocaleTimeString()}</div>
            <div>System Status: Operational</div>
          </div>
        </div>

        {/* System Status Metrics */}
        <SystemStatus />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Railway Network Map */}
          <div className="lg:col-span-2">
            <NetworkMap />
          </div>

          {/* AI Chat Assistant */}
          <div className="lg:col-span-1">
            <AIChatBot />
          </div>
        </div>

        {/* Active Trains */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Active Trains ({mockTrains.length})</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockTrains.map((train) => (
              <Card key={train.id} className="bg-card border-border hover:border-accent transition-colors group">
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
                  <Button variant="outline" size="sm" className="w-full mt-3 group-hover:bg-accent/10">
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
};

export default Index;
