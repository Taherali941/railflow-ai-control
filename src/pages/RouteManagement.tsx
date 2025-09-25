import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Route, MapPin, Zap, Clock, Brain } from "lucide-react";

const RouteManagement = () => {
  const { trainId } = useParams();
  const navigate = useNavigate();

  const availableTracks = [
    { id: "TR-A1", name: "Main Line A", status: "available", capacity: "85%", distance: "12.5 km" },
    { id: "TR-B2", name: "Express Route B", status: "busy", capacity: "95%", distance: "10.2 km" },
    { id: "TR-C3", name: "Alternative Route C", status: "available", capacity: "60%", distance: "15.8 km" },
  ];

  const aiSuggestions = [
    {
      id: "AI-1",
      route: "Main Line A + Bypass Junction",
      estimatedTime: "18 min",
      efficiency: "92%",
      reason: "Optimal balance of speed and traffic"
    },
    {
      id: "AI-2", 
      route: "Alternative Route C",
      estimatedTime: "22 min",
      efficiency: "88%",
      reason: "Lower traffic, more stable timing"
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen text-foreground p-6 -m-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Route Management - {trainId}</h1>
            <p className="text-muted-foreground">Optimize train routing and track selection</p>
          </div>
        </div>

        {/* Route Management */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Route className="h-5 w-5" />
              Current Route Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-primary/20 rounded-lg border border-primary/30">
                <MapPin className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Current Track</p>
                <p className="font-bold text-card-foreground">Main Line A</p>
              </div>
              <div className="text-center p-4 bg-success/20 rounded-lg border border-success/30">
                <Clock className="h-6 w-6 text-success mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">ETA to Destination</p>
                <p className="font-bold text-card-foreground">14:23</p>
              </div>
              <div className="text-center p-4 bg-warning/20 rounded-lg border border-warning/30">
                <Zap className="h-6 w-6 text-warning mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Route Efficiency</p>
                <p className="font-bold text-card-foreground">89%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Map */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Live Route Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-lg border border-border relative overflow-hidden">
              {/* Simplified map visualization */}
              <svg className="absolute inset-0 w-full h-full">
                {/* Current route */}
                <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="rgb(59 130 246)" strokeWidth="4" />
                
                {/* Alternative routes */}
                <line x1="30%" y1="50%" x2="80%" y2="30%" stroke="rgb(156 163 175)" strokeWidth="2" strokeDasharray="5,5" />
                <line x1="30%" y1="50%" x2="80%" y2="70%" stroke="rgb(156 163 175)" strokeWidth="2" strokeDasharray="5,5" />
                
                {/* Train position */}
                <circle cx="40%" cy="50%" r="6" fill="rgb(34 197 94)" stroke="hsl(var(--card-foreground))" strokeWidth="2" />
                <text x="40%" y="35%" textAnchor="middle" className="fill-card-foreground text-xs font-bold">{trainId}</text>
                
                {/* Stations */}
                <circle cx="20%" cy="50%" r="4" fill="hsl(var(--card))" stroke="rgb(34 197 94)" strokeWidth="2" />
                <circle cx="60%" cy="50%" r="4" fill="hsl(var(--card))" stroke="rgb(34 197 94)" strokeWidth="2" />
                <circle cx="80%" cy="50%" r="4" fill="hsl(var(--card))" stroke="rgb(34 197 94)" strokeWidth="2" />
              </svg>
              
              <div className="absolute bottom-2 left-2 bg-card/90 text-card-foreground rounded px-2 py-1 text-xs backdrop-blur-sm border border-border">
                <span className="text-blue-600">● Current Route</span>
                <span className="text-gray-500 ml-3">- - Alternative Routes</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Tracks */}
        <Card>
          <CardHeader>
            <CardTitle>Available Tracks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {availableTracks.map((track) => (
                <div key={track.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/20">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <div>
                      <p className="font-medium">{track.name}</p>
                      <p className="text-sm text-muted-foreground">Distance: {track.distance}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={track.status === 'available' ? 'default' : 'destructive'}>
                      {track.status}
                    </Badge>
                    <div className="text-right">
                      <p className="text-sm font-medium">Capacity: {track.capacity}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Select
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Suggested Tracks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Suggested Routes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiSuggestions.map((suggestion) => (
                <div key={suggestion.id} className="border border-accent/20 rounded-lg p-4 bg-accent/10 hover:bg-accent/20 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-card-foreground">{suggestion.route}</h4>
                    <Badge className="bg-primary text-primary-foreground">AI Recommended</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Estimated Time</p>
                      <p className="font-bold text-card-foreground">{suggestion.estimatedTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Efficiency</p>
                      <p className="font-bold text-card-foreground">{suggestion.efficiency}</p>
                    </div>
                    <div className="flex justify-end">
                      <Button size="sm">Apply Route</Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{suggestion.reason}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default RouteManagement;