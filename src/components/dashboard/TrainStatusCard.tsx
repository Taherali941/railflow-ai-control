import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Train, Clock, MapPin, Gauge } from "lucide-react";

interface TrainStatusCardProps {
  trainId: string;
  trainNumber: string;
  currentLocation: string;
  destination: string;
  speed: number;
  status: "on-time" | "delayed" | "stopped" | "maintenance";
  delay?: number;
  nextStation: string;
  estimatedArrival: string;
}

const statusConfig = {
  "on-time": {
    color: "bg-success text-success-foreground",
    indicator: "online"
  },
  "delayed": {
    color: "bg-warning text-warning-foreground", 
    indicator: "warning"
  },
  "stopped": {
    color: "bg-destructive text-destructive-foreground",
    indicator: "alert"
  },
  "maintenance": {
    color: "bg-muted text-muted-foreground",
    indicator: "alert"
  }
};

export function TrainStatusCard({
  trainId,
  trainNumber,
  currentLocation,
  destination,
  speed,
  status,
  delay = 0,
  nextStation,
  estimatedArrival
}: TrainStatusCardProps) {
  const config = statusConfig[status];

  return (
    <Card className="border-border bg-card hover:bg-card/80 transition-colors">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Train className="h-4 w-4 text-muted-foreground" />
            <span className="font-heading font-semibold">{trainNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`status-indicator ${config.indicator}`} />
            <Badge className={`text-xs ${config.color}`}>
              {status === "on-time" ? "On Time" : 
               status === "delayed" ? `+${delay}min` :
               status === "stopped" ? "Stopped" : "Maintenance"}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Gauge className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">Speed:</span>
            <span className="font-mono font-medium">{speed} km/h</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">ETA:</span>
            <span className="font-mono font-medium">{estimatedArrival}</span>
          </div>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-start gap-2">
            <MapPin className="h-3 w-3 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <div className="text-muted-foreground">Current:</div>
              <div className="font-medium">{currentLocation}</div>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <MapPin className="h-3 w-3 text-success mt-0.5" />
            <div className="flex-1">
              <div className="text-muted-foreground">Next:</div>
              <div className="font-medium">{nextStation}</div>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <div className="h-3 w-3 mt-0.5" />
            <div className="flex-1">
              <div className="text-muted-foreground">Destination:</div>
              <div className="font-medium">{destination}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}