import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon, Users, Bell, Shield, Database, Key } from "lucide-react";

const systemSettings = [
  { id: "notifications", label: "Email Notifications", description: "Receive alerts via email", enabled: true },
  { id: "sounds", label: "Audio Alerts", description: "Play sounds for critical alerts", enabled: true },
  { id: "auto-optimize", label: "Auto Optimization", description: "Allow AI to make automatic adjustments", enabled: false },
  { id: "dark-mode", label: "Dark Mode", description: "Use dark theme interface", enabled: true },
];

const userRoles = [
  { id: 1, name: "John Controller", role: "Traffic Controller", status: "Active", lastLogin: "2 hours ago" },
  { id: 2, name: "Sarah Supervisor", role: "Operations Supervisor", status: "Active", lastLogin: "5 minutes ago" },
  { id: 3, name: "Mike Admin", role: "System Administrator", status: "Active", lastLogin: "1 hour ago" },
  { id: 4, name: "Lisa Analyst", role: "Data Analyst", status: "Inactive", lastLogin: "2 days ago" },
];

export default function Settings() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">System Settings</h1>
            <p className="text-muted-foreground">Configure system preferences and user management</p>
          </div>
          <Button>
            <Shield className="h-4 w-4 mr-2" />
            Security Audit
          </Button>
        </div>

        <Separator />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* System Preferences */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                System Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {systemSettings.map((setting) => (
                <div key={setting.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor={setting.id} className="font-medium">
                      {setting.label}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {setting.description}
                    </p>
                  </div>
                  <Switch id={setting.id} defaultChecked={setting.enabled} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Alert Configuration */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Alert Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="critical-threshold">Critical Alert Threshold</Label>
                <Input id="critical-threshold" defaultValue="2 minutes" />
                <p className="text-xs text-muted-foreground">
                  Time before collision to trigger critical alerts
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="delay-threshold">Delay Alert Threshold</Label>
                <Input id="delay-threshold" defaultValue="5 minutes" />
                <p className="text-xs text-muted-foreground">
                  Delay duration to trigger notifications
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-recipients">Email Recipients</Label>
                <Input id="email-recipients" defaultValue="control@railflow.com, alerts@railflow.com" />
                <p className="text-xs text-muted-foreground">
                  Comma-separated email addresses for alerts
                </p>
              </div>

              <Button className="w-full">Save Alert Settings</Button>
            </CardContent>
          </Card>

          {/* User Management */}
          <Card className="bg-card border-border lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Management
                </div>
                <Button variant="outline" size="sm">
                  Add New User
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userRoles.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.role}</p>
                      <p className="text-xs text-muted-foreground">Last login: {user.lastLogin}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                        {user.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* API Configuration */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>API Endpoint</Label>
                <Input defaultValue="https://api.railflow.com/v1" />
              </div>
              
              <div className="space-y-2">
                <Label>API Key</Label>
                <div className="flex gap-2">
                  <Input type="password" defaultValue="••••••••••••••••" />
                  <Button variant="outline" size="sm">Regenerate</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Rate Limit</Label>
                <Input defaultValue="1000 requests/hour" />
              </div>

              <Button className="w-full">Update API Settings</Button>
            </CardContent>
          </Card>

          {/* Database Management */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Database Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">Storage Used</p>
                  <p className="text-lg font-semibold">2.4 GB</p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">Last Backup</p>
                  <p className="text-lg font-semibold">2 hours ago</p>
                </div>
              </div>

              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  Create Backup
                </Button>
                <Button variant="outline" className="w-full">
                  Export Data
                </Button>
                <Button variant="outline" className="w-full">
                  Import Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}