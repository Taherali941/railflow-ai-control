import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Route, MapPin, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AllRoutes = () => {
  const routes = [
    {
      id: "R001",
      name: "Central-North Express",
      startStation: "Central Hub",
      endStation: "North Terminal",
      distance: "45.2 km",
      duration: "32 min",
      status: "active",
      frequency: "Every 15 min",
      lastMaintenance: "2024-01-15"
    },
    {
      id: "R002", 
      name: "East-West Connector",
      startStation: "East Hub",
      endStation: "West Terminal",
      distance: "38.7 km",
      duration: "28 min", 
      status: "active",
      frequency: "Every 20 min",
      lastMaintenance: "2024-01-10"
    },
    {
      id: "R003",
      name: "South Circle Line",
      startStation: "South Station",
      endStation: "Central Hub",
      distance: "52.1 km",
      duration: "38 min",
      status: "maintenance",
      frequency: "Every 25 min",
      lastMaintenance: "2024-01-20"
    },
    {
      id: "R004",
      name: "Industrial Branch",
      startStation: "Junction B-7",
      endStation: "Industrial Park",
      distance: "29.3 km",
      duration: "22 min",
      status: "active",
      frequency: "Every 30 min", 
      lastMaintenance: "2024-01-12"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success text-success-foreground";
      case "maintenance": return "bg-warning text-warning-foreground";
      case "closed": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="h-4 w-4" />;
      case "maintenance": return <AlertTriangle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold">All Routes</h1>
            <p className="text-muted-foreground">
              Complete overview of all railway routes and their current status
            </p>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            <div>Total Routes: {routes.length}</div>
            <div>Active: {routes.filter(r => r.status === "active").length}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {routes.map((route) => (
            <Card key={route.id} className="border-border bg-card hover:bg-card/80 transition-colors">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Route className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold">{route.name}</h3>
                      <p className="text-sm text-muted-foreground">{route.id}</p>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(route.status)} border-0`}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(route.status)}
                      <span className="capitalize">{route.status}</span>
                    </div>
                  </Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-success" />
                    <div>
                      <div className="text-muted-foreground">Start</div>
                      <div className="font-medium">{route.startStation}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-destructive" />
                    <div>
                      <div className="text-muted-foreground">End</div>
                      <div className="font-medium">{route.endStation}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="p-2 rounded-lg bg-primary/5">
                    <div className="text-muted-foreground">Distance</div>
                    <div className="font-semibold">{route.distance}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-success/5">
                    <div className="text-muted-foreground">Duration</div>
                    <div className="font-semibold">{route.duration}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-warning/5">
                    <div className="text-muted-foreground">Frequency</div>
                    <div className="font-semibold">{route.frequency}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Last Maintenance: {route.lastMaintenance}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default AllRoutes;