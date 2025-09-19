import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BarChart3, TrendingUp, Clock, Users, AlertTriangle, Download } from "lucide-react";

const performanceMetrics = [
  { label: "Network Efficiency", value: "96.8%", change: "+2.1%", trend: "up" },
  { label: "Average Speed", value: "87.4 km/h", change: "+1.2 km/h", trend: "up" },
  { label: "Delay Incidents", value: "23", change: "-5", trend: "down" },
  { label: "Passenger Satisfaction", value: "4.7/5", change: "+0.2", trend: "up" },
];

const recentReports = [
  { id: "RPT-001", title: "Weekly Performance Summary", date: "2024-01-15", status: "Completed" },
  { id: "RPT-002", title: "Delay Analysis Report", date: "2024-01-14", status: "In Progress" },
  { id: "RPT-003", title: "Safety Incident Review", date: "2024-01-13", status: "Completed" },
];

export default function Analytics() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Performance metrics and operational insights</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        <Separator />

        {/* Performance KPIs */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {performanceMetrics.map((metric) => (
            <Card key={metric.label} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                  <p className="text-3xl font-bold text-foreground">{metric.value}</p>
                  <div className="flex items-center gap-1">
                    <TrendingUp className={`h-4 w-4 ${metric.trend === 'up' ? 'text-status-success' : 'text-status-error'}`} />
                    <p className={`text-sm ${metric.trend === 'up' ? 'text-status-success' : 'text-status-error'}`}>
                      {metric.change} from last period
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Performance Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Network Performance Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-br from-background via-muted/10 to-background rounded-lg border border-border flex items-center justify-center">
                <div className="text-center space-y-2">
                  <BarChart3 className="h-12 w-12 mx-auto text-accent" />
                  <p className="text-sm text-muted-foreground">Performance chart placeholder</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Delay Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-br from-background via-muted/10 to-background rounded-lg border border-border flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Clock className="h-12 w-12 mx-auto text-accent" />
                  <p className="text-sm text-muted-foreground">Delay analysis chart placeholder</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Reports */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Recent Reports
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{report.title}</p>
                    <p className="text-sm text-muted-foreground">Report ID: {report.id} • {report.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={report.status === "Completed" ? "default" : "secondary"}>
                      {report.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Insights */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Key Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <Users className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="font-medium">Peak Hour Performance</p>
                  <p className="text-sm text-muted-foreground">Morning rush hour efficiency improved by 12% this week due to optimized scheduling.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-status-warning mt-0.5" />
                <div>
                  <p className="font-medium">Weather Impact</p>
                  <p className="text-sm text-muted-foreground">Rain conditions caused 15% increase in delays on Eastern routes. Consider preventive measures.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <TrendingUp className="h-5 w-5 text-status-success mt-0.5" />
                <div>
                  <p className="font-medium">Efficiency Gains</p>
                  <p className="text-sm text-muted-foreground">AI-powered route optimization saved 45 minutes of total travel time across all routes today.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}