import { MainLayout } from "@/components/layout/MainLayout";
import { SystemStatus } from "@/components/dashboard/SystemStatus";
import { NetworkMap } from "@/components/dashboard/NetworkMap";
import { TrainStatusCard } from "@/components/dashboard/TrainStatusCard";
import { AIChatBot } from "@/components/chat/AIChatBot";

const Index = () => {
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
        <div className="space-y-4">
          <h2 className="font-heading text-xl font-semibold">Active Trains</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trainData.map((train) => (
              <TrainStatusCard key={train.trainId} {...train} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
