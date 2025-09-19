import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Clock, 
  AlertTriangle, 
  CheckCircle2,
  TrendingUp,
  Users
} from "lucide-react";

interface StatusMetric {
  label: string;
  value: string | number;
  icon: React.ElementType;
  status: "success" | "warning" | "error" | "info";
  change?: string;
}

export function SystemStatus() {
  const metrics: StatusMetric[] = [
    {
      label: "Active Trains",
      value: 47,
      icon: Activity,
      status: "success",
      change: "+3"
    },
    {
      label: "On Schedule", 
      value: "94%",
      icon: CheckCircle2,
      status: "success",
      change: "+2%"
    },
    {
      label: "Delays",
      value: 3,
      icon: Clock,
      status: "warning",
      change: "-1"
    },
    {
      label: "Alerts",
      value: 2,
      icon: AlertTriangle, 
      status: "error",
      change: "0"
    },
    {
      label: "Network Efficiency",
      value: "97.2%",
      icon: TrendingUp,
      status: "success",
      change: "+0.8%"
    },
    {
      label: "Controllers Online",
      value: 8,
      icon: Users,
      status: "info",
      change: "0"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "text-success";
      case "warning": return "text-warning";
      case "error": return "text-destructive";
      case "info": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "success": return "default";
      case "warning": return "secondary";
      case "error": return "destructive";
      default: return "outline";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {metric.label}
            </CardTitle>
            <metric.icon className={`h-4 w-4 ${getStatusColor(metric.status)}`} />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold font-heading">
                {metric.value}
              </div>
              {metric.change && (
                <Badge 
                  variant={getBadgeVariant(metric.status)}
                  className="text-xs"
                >
                  {metric.change}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}