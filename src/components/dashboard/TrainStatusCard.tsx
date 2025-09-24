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
    <Card className="border-border bg-gradient-to-br from-card to-card/50 hover:from-card/90 hover:to-card/40 transition-all duration-300 shadow-lg hover:shadow-xl">
      <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 to-transparent">
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-primary/10">
              <Train className="h-4 w-4 text-primary" />
            </div>
            <span className="font-heading font-bold text-foreground">{trainNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`status-indicator ${config.indicator}`} />
            <Badge className={`text-xs font-semibold ${config.color} border-0 shadow-sm`}>
              {status === "on-time" ? "On Time" : 
               status === "delayed" ? `+${delay}min` :
               status === "stopped" ? "Stopped" : "Maintenance"}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-primary/5">
            <div className="p-1 rounded-full bg-primary/10">
              <Gauge className="h-3 w-3 text-primary" />
            </div>
            <div>
              <div className="text-muted-foreground">Speed</div>
              <div className="font-mono font-bold text-foreground">{speed} km/h</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-2 rounded-lg bg-success/5">
            <div className="p-1 rounded-full bg-success/10">
              <Clock className="h-3 w-3 text-success" />
            </div>
            <div>
              <div className="text-muted-foreground">ETA</div>
              <div className="font-mono font-bold text-foreground">{estimatedArrival}</div>
            </div>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex items-start gap-3 p-2 rounded-lg bg-muted/20">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <div className="text-muted-foreground font-medium">Current Location</div>
              <div className="font-semibold text-foreground mt-0.5">{currentLocation}</div>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-2 rounded-lg bg-success/5">
            <MapPin className="h-4 w-4 text-success mt-0.5" />
            <div className="flex-1">
              <div className="text-muted-foreground font-medium">Next Station</div>
              <div className="font-semibold text-foreground mt-0.5">{nextStation}</div>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-2 rounded-lg bg-primary/5">
            <div className="h-4 w-4 rounded-full bg-primary/20 mt-0.5 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-primary" />
            </div>
            <div className="flex-1">
              <div className="text-muted-foreground font-medium">Final Destination</div>
              <div className="font-semibold text-foreground mt-0.5">{destination}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}