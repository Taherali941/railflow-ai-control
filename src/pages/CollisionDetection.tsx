import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Shield, AlertTriangle, CheckCircle, Clock, MapPin, Zap } from "lucide-react";

const riskLevels = [
  { level: "Low", count: 12, color: "bg-status-success", description: "Normal operations" },
  { level: "Medium", count: 3, color: "bg-status-warning", description: "Requires monitoring" },
  { level: "High", count: 1, color: "bg-status-error", description: "Immediate attention needed" },
];

const activeWarnings = [
  {
    id: "COL-001",
    priority: "High",
    trains: ["TR-002", "TR-005"],
    location: "Junction 7A - Central Line",
    timeToCollision: "4 minutes",
    recommendedAction: "Reduce speed TR-002 to 45 km/h",
    status: "Active"
  },
  {
    id: "COL-002", 
    priority: "Medium",
    trains: ["TR-003", "TR-008"],
    location: "Eastern Bridge Section",
    timeToCollision: "12 minutes",
    recommendedAction: "Delay TR-008 departure by 2 minutes",
    status: "Monitoring"
  }
];

export default function CollisionDetection() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">Collision Avoidance System</h1>
            <p className="text-muted-foreground">AI-powered collision detection and prevention</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="gap-2">
              <div className="status-indicator online" />
              System Active
            </Badge>
            <Button variant="destructive" size="sm">
              <Shield className="h-4 w-4 mr-2" />
              Emergency Override
            </Button>
          </div>
        </div>

        <Separator />

        {/* Risk Level Dashboard */}
        <div className="grid gap-4 md:grid-cols-3">
          {riskLevels.map((risk) => (
            <Card key={risk.level} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{risk.level} Risk</p>
                    <p className="text-3xl font-bold text-foreground">{risk.count}</p>
                    <p className="text-xs text-muted-foreground">{risk.description}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-full ${risk.color} flex items-center justify-center`}>
                    <div className="w-6 h-6 rounded-full bg-background" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Active Collision Warnings */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-status-error" />
                Active Collision Warnings
              </div>
              <Badge variant="destructive">{activeWarnings.length} Active</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeWarnings.map((warning) => (
              <div key={warning.id} className="border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant={warning.priority === "High" ? "destructive" : "secondary"}
                      className="gap-1"
                    >
                      <AlertTriangle className="h-3 w-3" />
                      {warning.priority} Priority
                    </Badge>
                    <span className="font-mono text-sm font-semibold">{warning.id}</span>
                  </div>
                  <Badge variant="outline">{warning.status}</Badge>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Location:</span>
                      <span className="text-sm">{warning.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Trains Involved:</span>
                      <div className="flex gap-1">
                        {warning.trains.map(train => (
                          <Badge key={train} variant="outline" className="text-xs">{train}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-status-error" />
                      <span className="text-sm font-medium">Time to Collision:</span>
                      <span className="text-sm font-mono text-status-error font-semibold">{warning.timeToCollision}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Recommended Action:</span>
                      <span className="text-sm">{warning.recommendedAction}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="destructive" size="sm">
                    Execute Action
                  </Button>
                  <Button variant="outline" size="sm">
                    Manual Override
                  </Button>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-status-success rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-background" />
                </div>
                <p className="font-medium">AI Detection</p>
                <p className="text-xs text-muted-foreground">Operating Normally</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-status-success rounded-full flex items-center justify-center">
                  <Zap className="h-6 w-6 text-background" />
                </div>
                <p className="font-medium">Response Time</p>
                <p className="text-xs text-muted-foreground">&lt; 200ms Average</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-status-success rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-background" />
                </div>
                <p className="font-medium">Prevention Rate</p>
                <p className="text-xs text-muted-foreground">99.97% Success</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-status-warning rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-background" />
                </div>
                <p className="font-medium">Active Monitors</p>
                <p className="text-xs text-muted-foreground">16 Zones Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}