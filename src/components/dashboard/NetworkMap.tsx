import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RotateCcw, Maximize2 } from "lucide-react";

interface TrainMarker {
  id: string;
  x: number;
  y: number;
  status: "moving" | "stopped" | "delayed";
  trainNumber: string;
}

interface NetworkMapProps {
  trains?: TrainMarker[];
}

export function NetworkMap({ trains = [] }: NetworkMapProps) {
  // Mock train data for demonstration
  const mockTrains: TrainMarker[] = [
    { id: "1", x: 20, y: 30, status: "moving", trainNumber: "RT-4401" },
    { id: "2", x: 60, y: 45, status: "delayed", trainNumber: "RT-4402" },
    { id: "3", x: 40, y: 70, status: "stopped", trainNumber: "RT-4403" },
    { id: "4", x: 80, y: 25, status: "moving", trainNumber: "RT-4404" },
    { id: "5", x: 15, y: 60, status: "moving", trainNumber: "RT-4405" },
  ];

  const activeTrains = trains.length > 0 ? trains : mockTrains;

  const getTrainColor = (status: string) => {
    switch (status) {
      case "moving": return "fill-success";
      case "delayed": return "fill-warning";
      case "stopped": return "fill-destructive";
      default: return "fill-muted";
    }
  };

  return (
    <Card className="col-span-2 border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="flex items-center gap-2 font-heading">
          Railway Network
          <div className="flex items-center gap-1 ml-2">
            <div className="status-indicator online" />
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
        </CardTitle>
        
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="relative h-96 w-full overflow-hidden rounded-lg bg-gradient-to-br from-background to-muted border border-border">
          {/* Railway Lines */}
          <svg className="absolute inset-0 h-full w-full">
            {/* Main horizontal line */}
            <line 
              x1="5%" y1="50%" x2="95%" y2="50%" 
              stroke="hsl(var(--border))" 
              strokeWidth="3"
              strokeDasharray="0"
            />
            
            {/* Branch lines */}
            <line 
              x1="30%" y1="50%" x2="30%" y2="20%" 
              stroke="hsl(var(--border))" 
              strokeWidth="2"
            />
            <line 
              x1="70%" y1="50%" x2="70%" y2="80%" 
              stroke="hsl(var(--border))" 
              strokeWidth="2"
            />
            <line 
              x1="50%" y1="50%" x2="85%" y2="25%" 
              stroke="hsl(var(--border))" 
              strokeWidth="2"
            />
            
            {/* Stations */}
            <circle cx="10%" cy="50%" r="4" fill="hsl(var(--muted-foreground))" />
            <circle cx="30%" cy="50%" r="4" fill="hsl(var(--muted-foreground))" />
            <circle cx="50%" cy="50%" r="4" fill="hsl(var(--muted-foreground))" />
            <circle cx="70%" cy="50%" r="4" fill="hsl(var(--muted-foreground))" />
            <circle cx="90%" cy="50%" r="4" fill="hsl(var(--muted-foreground))" />
            
            {/* Train markers with animation */}
            {activeTrains.map((train) => (
              <g key={train.id}>
                <circle
                  cx={`${train.x}%`}
                  cy={`${train.y}%`}
                  r="6"
                  className={`${getTrainColor(train.status)} stroke-background stroke-2`}
                  style={{
                    animation: train.status === "moving" ? "data-flow 2s infinite" : "none"
                  }}
                />
                <text
                  x={`${train.x}%`}
                  y={`${train.y - 8}%`}
                  textAnchor="middle"
                  className="fill-foreground text-xs font-mono font-medium"
                  style={{ fontSize: '10px' }}
                >
                  {train.trainNumber}
                </text>
              </g>
            ))}
          </svg>
          
          {/* Legend */}
          <div className="absolute bottom-4 left-4 rounded-lg bg-card/90 border border-border p-3 backdrop-blur-sm">
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-success" />
                <span>Moving</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-warning" />
                <span>Delayed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-destructive" />
                <span>Stopped</span>
              </div>
            </div>
          </div>
          
          {/* Status overlay */}
          <div className="absolute top-4 right-4 rounded-lg bg-card/90 border border-border p-3 backdrop-blur-sm">
            <div className="text-xs">
              <div className="font-medium text-foreground">Active Trains: {activeTrains.length}</div>
              <div className="text-muted-foreground">Last Update: Live</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}