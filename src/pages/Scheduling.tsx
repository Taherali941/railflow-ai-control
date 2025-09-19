import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, TrendingUp, AlertCircle, CheckCircle, Route } from "lucide-react";

const scheduleMetrics = [
  { label: "On-Time Performance", value: "94.2%", trend: "+2.1%", icon: CheckCircle, color: "text-status-success" },
  { label: "Average Delay", value: "3.4 min", trend: "-0.8min", icon: Clock, color: "text-status-warning" },
  { label: "Cancelled Trains", value: "2", trend: "-1", icon: AlertCircle, color: "text-status-error" },
  { label: "Efficiency Score", value: "8.7/10", trend: "+0.3", icon: TrendingUp, color: "text-accent" },
];

const todaySchedule = [
  {
    trainId: "TR-001",
    route: "Central Express",
    departure: "14:30",
    arrival: "16:45",
    status: "On Time",
    platform: "A1",
    passengers: 245
  },
  {
    trainId: "TR-002", 
    route: "Northern Line",
    departure: "14:45",
    arrival: "17:20",
    status: "Delayed +8min",
    platform: "B3",
    passengers: 180
  },
  {
    trainId: "TR-003",
    route: "Eastern Route",
    departure: "15:00", 
    arrival: "16:30",
    status: "On Time",
    platform: "A4",
    passengers: 320
  }
];

const optimizationSuggestions = [
  {
    id: 1,
    type: "Route Optimization",
    description: "Adjust TR-005 route via Junction 4B to reduce congestion",
    impact: "Save 4 minutes",
    priority: "Medium"
  },
  {
    id: 2,
    type: "Schedule Adjustment", 
    description: "Delay TR-008 departure by 3 minutes to improve connection timing",
    impact: "Improve passenger flow",
    priority: "Low"
  }
];

export default function Scheduling() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">Schedule Management</h1>
            <p className="text-muted-foreground">AI-powered schedule optimization and management</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              View Calendar
            </Button>
            <Button size="sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              Optimize Schedule
            </Button>
          </div>
        </div>

        <Separator />

        {/* Schedule Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {scheduleMetrics.map((metric) => (
            <Card key={metric.label} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                    <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                    <p className={`text-xs ${metric.color}`}>{metric.trend} from yesterday</p>
                  </div>
                  <metric.icon className={`h-8 w-8 ${metric.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Today's Schedule */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Today's Schedule
              </div>
              <Badge variant="outline">{todaySchedule.length} Active Trains</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaySchedule.map((train) => (
                <div key={train.trainId} className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-semibold text-lg">{train.trainId}</span>
                      <Badge variant="outline">{train.route}</Badge>
                      <Badge 
                        variant={train.status === "On Time" ? "default" : "destructive"}
                        className="gap-1"
                      >
                        {train.status === "On Time" ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          <AlertCircle className="h-3 w-3" />
                        )}
                        {train.status}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      <Route className="h-4 w-4 mr-2" />
                      View Route
                    </Button>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Departure</p>
                        <p className="font-mono font-semibold">{train.departure}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Arrival</p>
                        <p className="font-mono font-semibold">{train.arrival}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Platform</p>
                      <p className="font-semibold">{train.platform}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Passengers</p>
                      <p className="font-semibold">{train.passengers}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Optimization Suggestions */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              AI Optimization Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {optimizationSuggestions.map((suggestion) => (
              <div key={suggestion.id} className="border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{suggestion.type}</Badge>
                  <Badge variant={suggestion.priority === "High" ? "destructive" : suggestion.priority === "Medium" ? "secondary" : "default"}>
                    {suggestion.priority} Priority
                  </Badge>
                </div>
                <p className="text-sm">{suggestion.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-accent font-medium">Impact: {suggestion.impact}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Review</Button>
                    <Button size="sm">Apply</Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}