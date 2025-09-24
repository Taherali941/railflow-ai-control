import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Power, Shield, StopCircle, Phone, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Emergency = () => {
  const emergencyContacts = [
    { name: "Control Center", number: "+1-800-RAIL-911", role: "Primary" },
    { name: "Emergency Services", number: "911", role: "Critical" },
    { name: "Technical Support", number: "+1-800-TECH-SUP", role: "Technical" },
    { name: "Management", number: "+1-800-MGMT-001", role: "Management" }
  ];

  const systemStatus = [
    { system: "Emergency Brakes", status: "operational", priority: "critical" },
    { system: "Communication", status: "operational", priority: "high" },
    { system: "Power Grid", status: "operational", priority: "critical" },
    { system: "Signal Systems", status: "operational", priority: "high" },
    { system: "Backup Power", status: "standby", priority: "medium" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational": return "bg-success text-success-foreground";
      case "standby": return "bg-warning text-warning-foreground";
      case "failure": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "text-destructive";
      case "high": return "text-warning";
      case "medium": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-destructive">Emergency Control</h1>
            <p className="text-muted-foreground">
              Emergency controls and system shutdown procedures
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="status-indicator online" />
            <span className="text-sm text-muted-foreground">All Systems Operational</span>
          </div>
        </div>

        {/* Emergency Actions */}
        <Card className="border-destructive bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              Emergency Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                variant="destructive" 
                size="lg"
                className="h-16 text-lg font-bold"
              >
                <Power className="h-6 w-6 mr-3" />
                EMERGENCY STOP ALL TRAINS
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="h-16 text-lg font-semibold border-warning text-warning hover:bg-warning/10"
              >
                <StopCircle className="h-6 w-6 mr-3" />
                STOP SPECIFIC TRAIN
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="h-16 text-lg font-semibold border-destructive text-destructive hover:bg-destructive/10"
              >
                <Shield className="h-6 w-6 mr-3" />
                ACTIVATE SAFETY PROTOCOL
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="h-16 text-lg font-semibold"
              >
                <Phone className="h-6 w-6 mr-3" />
                CALL EMERGENCY SERVICES
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-success" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {systemStatus.map((system, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className={`h-4 w-4 ${getPriorityColor(system.priority)}`} />
                      <div>
                        <div className="font-medium">{system.system}</div>
                        <div className="text-xs text-muted-foreground capitalize">{system.priority} Priority</div>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(system.status)} border-0`}>
                      {system.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Emergency Contacts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                    <div>
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-sm text-muted-foreground">{contact.role}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-medium">{contact.number}</div>
                      <Button variant="outline" size="sm" className="mt-1 h-6 text-xs">
                        Call
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Warning Notice */}
        <Card className="border-warning bg-warning/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
              <div className="text-sm">
                <div className="font-semibold text-warning mb-1">Warning</div>
                <p className="text-muted-foreground">
                  Emergency controls should only be used in genuine emergency situations. 
                  All emergency actions are logged and monitored. Improper use may result in 
                  system penalties and investigation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Emergency;