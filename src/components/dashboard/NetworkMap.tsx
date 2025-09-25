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
      case "moving": return "fill-green-500";
      case "delayed": return "fill-orange-500";
      case "stopped": return "fill-red-500";
      default: return "fill-gray-400";
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
        <div className="relative h-[480px] w-full overflow-hidden rounded-lg bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 border border-slate-300 shadow-inner">
          {/* Background grid pattern */}
          <svg className="absolute inset-0 h-full w-full opacity-20">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgb(203 213 225)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Railway Lines */}
          <svg className="absolute inset-0 h-full w-full">
            {/* Main horizontal railway line with glow */}
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            <line 
              x1="5%" y1="50%" x2="95%" y2="50%" 
              stroke="rgb(59 130 246)" 
              strokeWidth="4"
              filter="url(#glow)"
            />
            
            {/* Branch lines with enhanced styling */}
            <line 
              x1="30%" y1="50%" x2="30%" y2="20%" 
              stroke="rgb(59 130 246)" 
              strokeWidth="3"
              strokeOpacity="0.8"
            />
            <line 
              x1="70%" y1="50%" x2="70%" y2="80%" 
              stroke="rgb(59 130 246)" 
              strokeWidth="3"
              strokeOpacity="0.8"
            />
            <line 
              x1="50%" y1="50%" x2="85%" y2="25%" 
              stroke="rgb(59 130 246)" 
              strokeWidth="3"
              strokeOpacity="0.8"
            />
            <line 
              x1="20%" y1="50%" x2="15%" y2="75%" 
              stroke="rgb(59 130 246)" 
              strokeWidth="3"
              strokeOpacity="0.8"
            />
            
            {/* Enhanced Stations with glow */}
            <circle cx="10%" cy="50%" r="6" fill="white" stroke="rgb(59 130 246)" strokeWidth="2" />
            <circle cx="30%" cy="50%" r="6" fill="white" stroke="rgb(59 130 246)" strokeWidth="2" />
            <circle cx="50%" cy="50%" r="6" fill="white" stroke="rgb(59 130 246)" strokeWidth="2" />
            <circle cx="70%" cy="50%" r="6" fill="white" stroke="rgb(59 130 246)" strokeWidth="2" />
            <circle cx="90%" cy="50%" r="6" fill="white" stroke="rgb(59 130 246)" strokeWidth="2" />
            <circle cx="30%" cy="20%" r="5" fill="white" stroke="rgb(59 130 246)" strokeWidth="2" />
            <circle cx="70%" cy="80%" r="5" fill="white" stroke="rgb(59 130 246)" strokeWidth="2" />
            <circle cx="85%" cy="25%" r="5" fill="white" stroke="rgb(59 130 246)" strokeWidth="2" />
            <circle cx="15%" cy="75%" r="5" fill="white" stroke="rgb(59 130 246)" strokeWidth="2" />
            
            {/* Enhanced Train markers with animation and glow */}
            {activeTrains.map((train) => (
              <g key={train.id}>
                <circle
                  cx={`${train.x}%`}
                  cy={`${train.y}%`}
                  r="8"
                  className={`${getTrainColor(train.status)} stroke-background stroke-2 drop-shadow-lg`}
                  style={{
                    animation: train.status === "moving" ? "pulse 2s infinite" : "none",
                    filter: train.status === "moving" ? "drop-shadow(0 0 6px currentColor)" : "none"
                  }}
                />
                <text
                  x={`${train.x}%`}
                  y={`${train.y - 12}%`}
                  textAnchor="middle"
                  className="fill-gray-800 text-xs font-mono font-bold drop-shadow-sm"
                  style={{ fontSize: '11px' }}
                >
                  {train.trainNumber}
                </text>
                {train.status === "moving" && (
                  <circle
                    cx={`${train.x}%`}
                    cy={`${train.y}%`}
                    r="12"
                    fill="none"
                    stroke="rgb(34 197 94)"
                    strokeWidth="1"
                    strokeOpacity="0.3"
                    style={{
                      animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite"
                    }}
                  />
                )}
              </g>
            ))}
          </svg>
          
          {/* Legend */}
          <div className="absolute bottom-4 left-4 rounded-lg bg-white/90 border border-slate-300 p-3 backdrop-blur-sm shadow-lg">
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="text-gray-700">Moving</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-orange-500" />
                <span className="text-gray-700">Delayed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <span className="text-gray-700">Stopped</span>
              </div>
            </div>
          </div>
          
          {/* Status overlay */}
          <div className="absolute top-4 right-4 rounded-lg bg-white/90 border border-slate-300 p-3 backdrop-blur-sm shadow-lg">
            <div className="text-xs">
              <div className="font-medium text-gray-900">Active Trains: {activeTrains.length}</div>
              <div className="text-gray-600">Last Update: Live</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}