import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MapPin, MessageSquare, Mail, Smartphone, BarChart3 } from "lucide-react";

const TerritoryInsights = () => {
  const territoryHeatmap = [
    { region: "Mumbai Metro", engagement: 85, campaigns: 12, hcps: 145, patients: 2840, performance: "High" },
    { region: "Delhi NCR", engagement: 78, campaigns: 10, hcps: 132, patients: 2650, performance: "High" },
    { region: "Bangalore Urban", engagement: 82, campaigns: 8, hcps: 98, patients: 1980, performance: "High" },
    { region: "Chennai City", engagement: 71, campaigns: 6, hcps: 87, patients: 1650, performance: "Medium" },
    { region: "Pune Region", engagement: 69, campaigns: 5, hcps: 76, patients: 1420, performance: "Medium" },
    { region: "Hyderabad Metro", engagement: 63, campaigns: 4, hcps: 54, patients: 980, performance: "Low" },
    { region: "Kolkata Region", engagement: 58, campaigns: 3, hcps: 42, patients: 720, performance: "Low" },
  ];

  const channelStats = [
    {
      platform: "WhatsApp",
      delivered: 8420,
      opened: 6340,
      clicked: 2850,
      deliveryRate: 94,
      openRate: 75,
      clickRate: 45,
      impact: "High"
    },
    {
      platform: "SMS",
      delivered: 12650,
      opened: 8920,
      clicked: 1840,
      deliveryRate: 97,
      openRate: 71,
      clickRate: 21,
      impact: "Medium"
    },
    {
      platform: "Email",
      delivered: 6780,
      opened: 3420,
      clicked: 890,
      deliveryRate: 89,
      openRate: 50,
      clickRate: 26,
      impact: "Low"
    }
  ];

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "High": return "bg-primary text-primary-foreground";
      case "Medium": return "bg-secondary text-secondary-foreground";
      case "Low": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "bg-primary text-primary-foreground";
      case "Medium": return "bg-secondary text-secondary-foreground";
      case "Low": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Territory & Channel Insights</h1>
        <p className="text-muted-foreground">Geographic performance analysis and communication channel effectiveness</p>
      </div>

      {/* Territory Heatmap */}
      <Card className="border-border bg-card mb-6">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Regional Performance Heatmap
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Engagement metrics and campaign reach by geographical territory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">Territory</TableHead>
                <TableHead className="text-muted-foreground">Engagement %</TableHead>
                <TableHead className="text-muted-foreground">Active Campaigns</TableHead>
                <TableHead className="text-muted-foreground">HCPs</TableHead>
                <TableHead className="text-muted-foreground">Patients Reached</TableHead>
                <TableHead className="text-muted-foreground">Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {territoryHeatmap.map((territory, index) => (
                <TableRow key={index} className="border-border">
                  <TableCell className="font-medium text-foreground">{territory.region}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-muted rounded-full h-2">
                        <div 
                          className="h-2 bg-primary rounded-full" 
                          style={{ width: `${territory.engagement}%` }}
                        />
                      </div>
                      <span className="text-foreground font-medium">{territory.engagement}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground">{territory.campaigns}</TableCell>
                  <TableCell className="text-foreground">{territory.hcps}</TableCell>
                  <TableCell className="text-foreground">{territory.patients.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getPerformanceColor(territory.performance)}>
                      {territory.performance}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Channel Performance */}
      <Card className="border-border bg-card mb-6">
        <CardHeader>
          <CardTitle className="text-foreground">Communication Channel Performance</CardTitle>
          <CardDescription className="text-muted-foreground">
            Delivery statistics and engagement rates across different platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {channelStats.map((channel, index) => {
              const Icon = channel.platform === "WhatsApp" ? MessageSquare : 
                          channel.platform === "SMS" ? Smartphone : Mail;
              
              return (
                <div key={index} className="p-4 bg-secondary/30 rounded-lg border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{channel.platform}</h3>
                      <Badge className={getImpactColor(channel.impact)}>
                        {channel.impact} Impact
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Delivered</span>
                      <span className="text-sm font-medium text-foreground">{channel.delivered.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Opened</span>
                      <span className="text-sm font-medium text-foreground">{channel.opened.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Clicked</span>
                      <span className="text-sm font-medium text-foreground">{channel.clicked.toLocaleString()}</span>
                    </div>
                    
                    <div className="pt-2 border-t border-border">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <div className="text-xs text-muted-foreground">Delivery</div>
                          <div className="text-sm font-medium text-primary">{channel.deliveryRate}%</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Open</div>
                          <div className="text-sm font-medium text-primary">{channel.openRate}%</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Click</div>
                          <div className="text-sm font-medium text-primary">{channel.clickRate}%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Action Prompts */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Strategic Insights</CardTitle>
          <CardDescription className="text-muted-foreground">
            AI-powered recommendations for territory and channel optimization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full justify-start">
            <BarChart3 className="h-4 w-4 mr-2" />
            Which platform had more impact in metro vs non-metro cities?
          </Button>
          <Button variant="outline" className="w-full justify-start text-primary border-primary/20 hover:bg-primary/5">
            <MapPin className="h-4 w-4 mr-2" />
            Expand successful Mumbai strategy to underperforming regions
          </Button>
          <Button variant="outline" className="w-full justify-start text-primary border-primary/20 hover:bg-primary/5">
            <MessageSquare className="h-4 w-4 mr-2" />
            Increase WhatsApp campaigns in high-performing territories
          </Button>
          <Button variant="outline" className="w-full justify-start text-primary border-primary/20 hover:bg-primary/5">
            <Smartphone className="h-4 w-4 mr-2" />
            Optimize SMS timing for better engagement rates
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TerritoryInsights;