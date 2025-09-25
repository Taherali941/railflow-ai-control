import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Map, Navigation, Clock, Users, AlertCircle, Zap, Search, MapPin, Activity } from "lucide-react";
import { useState } from "react";

const mockTrains = [
  { id: "TR-001", route: "Central Line", speed: 75, status: "On Time", passengers: 245, nextStation: "Central Station", eta: "14:32" },
  { id: "TR-002", route: "Northern Express", speed: 95, status: "Delayed", passengers: 180, nextStation: "North Terminal", eta: "14:47" },
  { id: "TR-003", route: "Eastern Route", speed: 68, status: "On Time", passengers: 320, nextStation: "East Junction", eta: "14:25" },
  { id: "TR-004", route: "Western Loop", speed: 0, status: "Stopped", passengers: 156, nextStation: "West Plaza", eta: "15:15" },
];

export default function Tracking() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<typeof mockTrains[0] | null>(null);

  const handleSearch = () => {
    const result = mockTrains.find(train => 
      train.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResult(result || null);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResult(null);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">Live Train Tracking</h1>
            <p className="text-muted-foreground">Real-time monitoring of all active trains</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="gap-2">
              <div className="status-indicator online" />
              Live Tracking Active
            </Badge>
            <Button variant="outline" size="sm">
              <Map className="h-4 w-4 mr-2" />
              Full Map View
            </Button>
          </div>
        </div>

        <Separator />

        {/* Network Map */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="h-5 w-5" />
              Railway Network Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gradient-to-br from-background via-muted/20 to-background rounded-lg border border-border p-8 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-gradient-status rounded-full flex items-center justify-center">
                  <Map className="h-8 w-8 text-background" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Interactive Map</h3>
                  <p className="text-muted-foreground">Live train positions and route visualization</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Train Search */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Train by ID
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Input
                placeholder="Enter Train ID (e.g., TR-001)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1"
              />
              <Button onClick={handleSearch} className="px-6">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              {searchResult && (
                <Button variant="outline" onClick={handleClearSearch}>
                  Clear
                </Button>
              )}
            </div>

            {searchResult && (
              <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-accent" />
                      {searchResult.id}
                    </CardTitle>
                    <Badge 
                      variant={searchResult.status === "On Time" ? "default" : searchResult.status === "Delayed" ? "destructive" : "secondary"}
                      className="gap-1"
                    >
                      {searchResult.status === "On Time" && <div className="w-2 h-2 bg-status-success rounded-full" />}
                      {searchResult.status === "Delayed" && <AlertCircle className="h-3 w-3" />}
                      {searchResult.status === "Stopped" && <div className="w-2 h-2 bg-status-warning rounded-full" />}
                      {searchResult.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">{searchResult.route}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-accent" />
                        <span className="text-sm">Speed</span>
                      </div>
                      <span className="font-mono font-semibold text-lg">{searchResult.speed} km/h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-accent" />
                        <span className="text-sm">Passengers</span>
                      </div>
                      <span className="font-mono font-semibold text-lg">{searchResult.passengers}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Navigation className="h-4 w-4 text-accent" />
                      <span className="text-sm text-muted-foreground">Next Station:</span>
                      <span className="font-medium">{searchResult.nextStation}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-accent" />
                      <span className="text-sm text-muted-foreground">Estimated Arrival:</span>
                      <span className="font-mono font-semibold">{searchResult.eta}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1" onClick={() => window.location.href = `/train-details/${searchResult.id}`}>
                      Track Live
                    </Button>
                    <Button variant="outline" className="flex-1">
                      View History
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {searchQuery && !searchResult && searchQuery.length > 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No train found with ID "{searchQuery}"</p>
                <p className="text-sm">Please check the train ID and try again</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}