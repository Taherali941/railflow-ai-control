import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bell, AlertTriangle, CheckCircle, Clock, Settings, Filter, Brain } from "lucide-react";

const alertStats = [
  { label: "Active Alerts", value: "7", color: "text-status-error" },
  { label: "Resolved Today", value: "23", color: "text-status-success" },
  { label: "Avg Response Time", value: "2.4min", color: "text-accent" },
  { label: "Critical Pending", value: "1", color: "text-status-warning" },
];

const activeAlerts = [
  {
    id: "ALT-001",
    type: "Collision Warning",
    priority: "Critical",
    description: "Potential collision detected at Junction 7A",
    time: "2 minutes ago",
    status: "Active",
    trainId: "TR-002"
  },
  {
    id: "ALT-002", 
    type: "Delay Notice",
    priority: "High",
    description: "TR-005 experiencing 15-minute delay due to signal failure",
    time: "8 minutes ago", 
    status: "Acknowledged",
    trainId: "TR-005"
  },
  {
    id: "ALT-003",
    type: "Maintenance Alert",
    priority: "Medium", 
    description: "Scheduled maintenance window approaching for Eastern Line",
    time: "15 minutes ago",
    status: "Scheduled",
    trainId: null
  },
  {
    id: "ALT-004",
    type: "Weather Warning",
    priority: "Medium",
    description: "Heavy rainfall expected in Northern sector - speed restrictions advised",
    time: "32 minutes ago",
    status: "Active", 
    trainId: null
  }
];

export default function Alerts() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">Alert Management</h1>
            <p className="text-muted-foreground">Monitor and manage system alerts and notifications</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter Alerts
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Alert Settings
            </Button>
          </div>
        </div>

        <Separator />

        {/* Alert Statistics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {alertStats.map((stat) => (
            <Card key={stat.label} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <Bell className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Active Alerts */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Active Alerts
              </div>
              <Badge variant="destructive">{activeAlerts.filter(alert => alert.status === "Active").length} Active</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeAlerts.map((alert) => (
              <div key={alert.id} className="border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {alert.priority === "Critical" && (
                        <div className="w-3 h-3 bg-status-error rounded-full animate-pulse" />
                      )}
                      {alert.priority === "High" && (
                        <AlertTriangle className="h-5 w-5 text-status-warning" />
                      )}
                      {alert.priority === "Medium" && (
                        <div className="w-3 h-3 bg-accent rounded-full" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-semibold">{alert.id}</span>
                        <Badge variant="outline">{alert.type}</Badge>
                        <Badge 
                          variant={
                            alert.priority === "Critical" ? "destructive" : 
                            alert.priority === "High" ? "secondary" : 
                            "default"
                          }
                        >
                          {alert.priority}
                        </Badge>
                      </div>
                      <p className="text-sm">{alert.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {alert.time}
                        </div>
                        {alert.trainId && (
                          <div>
                            Train: <span className="font-mono">{alert.trainId}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={
                        alert.status === "Active" ? "destructive" :
                        alert.status === "Acknowledged" ? "secondary" :
                        "default"
                      }
                    >
                      {alert.status}
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-border">
                  {alert.status === "Active" && (
                    <>
                      <Button size="sm" variant="destructive">
                        Acknowledge
                      </Button>
                      <Button size="sm" variant="outline">
                        Escalate
                      </Button>
                    </>
                  )}
                  {alert.status === "Acknowledged" && (
                    <Button size="sm">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark Resolved
                    </Button>
                  )}
                  <Button size="sm" variant="ghost">
                    View Details
                  </Button>
                  <Button size="sm" variant="ghost">
                    Dismiss
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Alert Suggestions */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Alert Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border border-border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Predictive Maintenance Alert</h4>
                <Badge className="bg-blue-600 text-white">AI Predicted</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Track sensor on Eastern Line showing early wear patterns - suggest maintenance in 72 hours</p>
              <Button size="sm">Create Alert</Button>
            </div>
            <div className="border border-border rounded-lg p-4 bg-gradient-to-r from-orange-50 to-red-50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Weather Impact Warning</h4>
                <Badge className="bg-orange-600 text-white">AI Suggested</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Heavy rainfall predicted in 6 hours - recommend speed restrictions for Northern routes</p>
              <Button size="sm">Create Alert</Button>
            </div>
          </CardContent>
        </Card>

        {/* Alert History Summary */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { action: "Resolved delay alert ALT-087", time: "5 minutes ago", user: "Controller A" },
                { action: "Acknowledged maintenance warning ALT-086", time: "12 minutes ago", user: "Supervisor B" },
                { action: "Escalated collision warning ALT-085", time: "18 minutes ago", user: "Controller C" },
                { action: "Auto-resolved weather alert ALT-084", time: "25 minutes ago", user: "System" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">by {activity.user}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}