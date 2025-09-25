import { MainLayout } from "@/components/layout/MainLayout";
import { SystemStatus } from "@/components/dashboard/SystemStatus";
import { NetworkMap } from "@/components/dashboard/NetworkMap";
import { TrainStatusCard } from "@/components/dashboard/TrainStatusCard";
import { AIChatBot } from "@/components/chat/AIChatBot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Map, Navigation, Clock, Users, AlertCircle, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  // Mock train data for demonstration  
  const trainData = [
    {
      trainId: "1",
      trainNumber: "RT-4401",
      currentLocation: "Junction B-7",
      destination: "Central Hub",
      speed: 85,
      status: "on-time" as const,
      nextStation: "Central Hub",
      estimatedArrival: "14:23"
    },
    {
      trainId: "2", 
      trainNumber: "RT-4402",
      currentLocation: "Sector 7",
      destination: "North Terminal",
      speed: 45,
      status: "delayed" as const,
      delay: 12,
      nextStation: "Bridge Station",
      estimatedArrival: "14:47"
    },
    {
      trainId: "3",
      trainNumber: "RT-4403", 
      currentLocation: "South Station",
      destination: "East Hub",
      speed: 0,
      status: "stopped" as const,
      nextStation: "Platform 3",
      estimatedArrival: "15:12"
    },
    {
      trainId: "4",
      trainNumber: "RT-4404",
      currentLocation: "North Bridge",
      destination: "West Terminal", 
      speed: 78,
      status: "on-time" as const,
      nextStation: "Junction A-4",
      estimatedArrival: "14:35"
    }
  ];

  const mockTrains = [
    { id: "TR-001", route: "Central Line", speed: 75, status: "On Time", passengers: 245, nextStation: "Central Station", eta: "14:32" },
    { id: "TR-002", route: "Northern Express", speed: 95, status: "Delayed", passengers: 180, nextStation: "North Terminal", eta: "14:47" },
    { id: "TR-003", route: "Eastern Route", speed: 68, status: "On Time", passengers: 320, nextStation: "East Junction", eta: "14:25" },
    { id: "TR-004", route: "Western Loop", speed: 0, status: "Stopped", passengers: 156, nextStation: "West Plaza", eta: "15:15" },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold">Railway Control Dashboard</h1>
            <p className="text-muted-foreground">
              Real-time monitoring and control of railway operations
            </p>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            <div>Last Update: {new Date().toLocaleTimeString()}</div>
            <div>System Status: Operational</div>
          </div>
        </div>

        {/* System Status Metrics */}
        <SystemStatus />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Railway Network Map */}
          <div className="lg:col-span-2">
            <NetworkMap />
          </div>

          {/* AI Chat Assistant */}
          <div className="lg:col-span-1">
            <AIChatBot />
          </div>
        </div>

        {/* Active Trains */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Active Trains ({trainData.length})</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {trainData.map((train) => (
              <div key={train.trainId} onClick={() => navigate(`/train-details/${train.trainId}`)} className="cursor-pointer">
                <TrainStatusCard {...train} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
