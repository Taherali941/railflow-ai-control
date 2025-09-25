import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Train, Clock, MapPin, Gauge, Calendar, Users, MessageSquare, Route, StopCircle } from "lucide-react";

const TrainDetails = () => {
  const { trainId } = useParams();
  const navigate = useNavigate();
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  // Mock train data - in real app would fetch based on trainId
  const trainData = {
    id: trainId || "RT-4401",
    trainNumber: "RT-4401",
    type: "Express",
    currentLocation: "Junction B-7",
    destination: "Central Hub", 
    speed: 85,
    status: "on-time" as const,
    delay: 0,
    nextStation: "Central Hub",
    estimatedArrival: "14:23",
    passengers: 245,
    capacity: 300,
    gpsLocation: { lat: 40.7128, lng: -74.0060 },
    route: "Central Line",
    previousStation: "North Bridge",
    departureTime: "13:45",
    schedule: [
      { station: "North Bridge", arrival: "13:30", departure: "13:45", status: "completed" },
      { station: "Junction B-7", arrival: "14:05", departure: "14:08", status: "current" },
      { station: "Central Hub", arrival: "14:23", departure: "14:25", status: "upcoming" },
      { station: "South Terminal", arrival: "14:45", departure: "14:47", status: "upcoming" },
    ]
  };

  const statusConfig = {
    "on-time": { color: "bg-green-500 text-white", label: "On Time" },
    "delayed": { color: "bg-orange-500 text-white", label: `+${trainData.delay}min` },
    "stopped": { color: "bg-red-500 text-white", label: "Stopped" },
    "maintenance": { color: "bg-gray-500 text-white", label: "Maintenance" }
  };

  const handleAction = (action: string) => {
    setSelectedAction(action);
    if (action === 'chat') {
      navigate(`/train-chat/${trainId}`);
    } else if (action === 'reroute') {
      navigate(`/route-management/${trainId}`);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Train className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{trainData.trainNumber}</h1>
              <p className="text-muted-foreground">{trainData.route}</p>
            </div>
          </div>
          <Badge className={`${statusConfig[trainData.status].color} ml-auto`}>
            {statusConfig[trainData.status].label}
          </Badge>
        </div>

        {/* Speed and Type */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="p-2 rounded-full bg-blue-100">
                <Gauge className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Speed</p>
                <p className="text-xl font-bold">{trainData.speed} km/h</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="p-2 rounded-full bg-purple-100">
                <Train className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Train Type</p>
                <p className="text-xl font-bold">{trainData.type}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Schedule & Timing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Departure</p>
                <p className="font-mono font-bold">{trainData.departureTime}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Arrival (Next)</p>
                <p className="font-mono font-bold">{trainData.estimatedArrival}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Delay</p>
                <p className="font-mono font-bold">{trainData.delay} min</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* GPS Location */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Live GPS Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/20 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Current Position</p>
                  <p className="font-mono">{trainData.currentLocation}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Coordinates</p>
                  <p className="font-mono text-xs">{trainData.gpsLocation.lat}, {trainData.gpsLocation.lng}</p>
                </div>
              </div>
            </div>
            
            {/* Live Map */}
            <div className="aspect-video bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 rounded-lg border border-border p-6 flex items-center justify-center">
              <div className="text-center space-y-3">
                <div className="mx-auto w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Live GPS Tracking</h3>
                  <p className="text-sm text-muted-foreground">Real-time train position on railway network</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timetable */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Station Timetable
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {trainData.schedule.map((stop, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                  stop.status === 'current' ? 'bg-blue-50 border border-blue-200' :
                  stop.status === 'completed' ? 'bg-green-50 border border-green-200' :
                  'bg-muted/20'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      stop.status === 'current' ? 'bg-blue-500' :
                      stop.status === 'completed' ? 'bg-green-500' :
                      'bg-gray-300'
                    }`} />
                    <div>
                      <p className="font-medium">{stop.station}</p>
                      <p className="text-sm text-muted-foreground capitalize">{stop.status}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm">Arr: {stop.arrival}</p>
                    <p className="font-mono text-sm">Dep: {stop.departure}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-4">
          <Button 
            variant="outline" 
            size="lg" 
            className="h-16 flex flex-col gap-2"
            onClick={() => handleAction('hold')}
          >
            <StopCircle className="h-6 w-6" />
            Hold
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="h-16 flex flex-col gap-2"
            onClick={() => handleAction('reroute')}
          >
            <Route className="h-6 w-6" />
            Reroute
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="h-16 flex flex-col gap-2"
            onClick={() => handleAction('chat')}
          >
            <MessageSquare className="h-6 w-6" />
            Chat
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default TrainDetails;