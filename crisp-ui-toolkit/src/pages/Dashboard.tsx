import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Users, Activity, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { dashboardApi } from "@/lib/api";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState({
    activeCampaigns: 0,
    totalReach: 0,
    doctorShares: 0,
    completionRate: 0,
    roiImprovement: 0,
    patientEngagement: 0,
    hcpSatisfaction: 0
  });
  const [roiSignals, setRoiSignals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching dashboard data...');
        
        const [metricsData, roiData] = await Promise.all([
          dashboardApi.getMetrics(),
          dashboardApi.getROISignals()
        ]);
        
        console.log('Dashboard data received:', { metricsData, roiData });
        setMetrics(metricsData.metrics);
        setRoiSignals((roiData as any).roiSignals || roiData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        toast.error('Failed to load dashboard data');
        // Set default values to prevent white screen
        setMetrics({
          activeCampaigns: 0,
          totalReach: 0,
          doctorShares: 0,
          completionRate: 0,
          roiImprovement: 0,
          patientEngagement: 0,
          hcpSatisfaction: 0
        });
        setRoiSignals([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const metricsData = [
    { 
      title: "Active Campaigns", 
      value: metrics.activeCampaigns.toString(), 
      subtitle: "Currently running campaigns", 
      icon: Target 
    },
    { 
      title: "Total Reach", 
      value: metrics.totalReach.toLocaleString(), 
      subtitle: "Patients reached this month", 
      icon: Users 
    },
    { 
      title: "Doctor Shares", 
      value: metrics.doctorShares.toString(), 
      subtitle: "HCPs actively sharing content", 
      icon: Activity 
    },
    { 
      title: "Completion Rate", 
      value: `${metrics.completionRate}%`, 
      subtitle: "Average across all campaigns", 
      icon: TrendingUp 
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Campaign Performance Dashboard</h1>
        <p className="text-muted-foreground">Monitor your health campaigns and engagement metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="border-border bg-card">
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-8 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          metricsData.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{metric.title}</p>
                      <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{metric.subtitle}</p>
                    </div>
                    <div className="p-3 bg-secondary rounded-lg">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* ROI Signals */}
      <Card className="border-border bg-card mb-6">
        <CardHeader>
          <CardTitle className="text-foreground">ROI Signals</CardTitle>
          <CardDescription className="text-muted-foreground">
            Key performance indicators and business impact
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="p-4 bg-secondary/30 rounded-lg border border-border">
                  <div className="animate-pulse">
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-6 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded"></div>
                  </div>
                </div>
              ))
            ) : (
              Array.isArray(roiSignals) ? roiSignals.map((signal: any, index) => (
                <div key={index} className="p-4 bg-secondary/30 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground">{signal.metric}</p>
                  <p className="text-xl font-bold text-foreground">{signal.value}</p>
                  <p className="text-xs text-primary">{signal.change}</p>
                </div>
              )) : (
                <div className="p-4 text-center text-muted-foreground">
                  No ROI signals available
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">AI-Powered Insights</CardTitle>
          <CardDescription className="text-muted-foreground">
            Click on these prompts to get detailed analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-start text-primary border-primary/20 hover:bg-primary/5"
            onClick={() => navigate("/comparison")}
          >
            Compare EN vs Hindi completion rates in Mumbai
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start text-primary border-primary/20 hover:bg-primary/5"
            onClick={() => navigate("/trends")}
          >
            Where did we underperform vs last week?
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start text-primary border-primary/20 hover:bg-primary/5"
            onClick={() => navigate("/recommendations")}
          >
            Recommend next action → AI suggestion
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;