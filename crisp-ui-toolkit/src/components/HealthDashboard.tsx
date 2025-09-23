import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Activity, 
  MapPin, 
  AlertTriangle, 
  TrendingUp, 
  Calendar,
  Target,
  BarChart3
} from "lucide-react";

const HealthDashboard = () => {
  const campaigns = [
    { 
      id: 1, 
      name: "Diabetes Awareness Q4", 
      status: "Active", 
      progress: 75,
      target: "500 HCPs",
      engaged: "375 HCPs"
    },
    { 
      id: 2, 
      name: "Hypertension Prevention", 
      status: "Planning", 
      progress: 25,
      target: "200 Patients",
      engaged: "50 Patients"
    },
  ];

  const alerts = [
    { id: 1, type: "Patient", message: "Unusual medication adherence drop in Region A", severity: "high" },
    { id: 2, type: "Territory", message: "HCP engagement below target in Metro cities", severity: "medium" },
    { id: 3, type: "Campaign", message: "Diabetes campaign performing above expectations", severity: "low" },
  ];

  const metrics = [
    { title: "Active Campaigns", value: "12", change: "+2", icon: Target },
    { title: "HCP Engagement", value: "89%", change: "+5%", icon: Users },
    { title: "Patient Reach", value: "2.4K", change: "+12%", icon: Activity },
    { title: "Territory Coverage", value: "85%", change: "+3%", icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Health Campaign Management</h1>
        <p className="text-muted-foreground">Monitor and manage healthcare campaigns, HCP engagement, and patient outcomes</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{metric.title}</p>
                    <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                    <p className="text-xs text-primary font-medium">{metric.change} from last month</p>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Campaign Management */}
        <div className="lg:col-span-2">
          <Card className="border-border">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground">Active Campaigns</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Monitor campaign performance and HCP engagement
                  </CardDescription>
                </div>
                <Button variant="default" size="sm">
                  Create Campaign
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="p-4 bg-secondary/50 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-foreground">{campaign.name}</h3>
                    <Badge 
                      variant={campaign.status === "Active" ? "default" : "secondary"}
                      className={campaign.status === "Active" ? "bg-primary text-primary-foreground" : ""}
                    >
                      {campaign.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-foreground font-medium">{campaign.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${campaign.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm pt-2">
                      <span className="text-muted-foreground">Target: {campaign.target}</span>
                      <span className="text-primary font-medium">Engaged: {campaign.engaged}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Analytics
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Alerts & Notifications */}
        <div>
          <Card className="border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-foreground flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                Anomaly Alerts
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Real-time monitoring insights
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-3 rounded-lg border ${
                    alert.severity === 'high' ? 'border-destructive/20 bg-destructive/5' :
                    alert.severity === 'medium' ? 'border-primary/20 bg-primary/5' :
                    'border-border bg-secondary/30'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      alert.severity === 'high' ? 'bg-destructive' :
                      alert.severity === 'medium' ? 'bg-primary' : 'bg-muted-foreground'
                    }`} />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-muted-foreground mb-1">{alert.type}</p>
                      <p className="text-sm text-foreground">{alert.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-border mt-6">
            <CardHeader className="pb-4">
              <CardTitle className="text-foreground">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="default" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                HCP Engagement
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Activity className="h-4 w-4 mr-2" />
                Patient Tracking
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="h-4 w-4 mr-2" />
                Territory Insights
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Content Planning
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HealthDashboard;