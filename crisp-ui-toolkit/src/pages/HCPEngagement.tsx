import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, UserCheck, Calendar, TrendingUp } from "lucide-react";
import { hcpApi } from "@/lib/api";
import { toast } from "sonner";

interface HCP {
  _id: string;
  name: string;
  specialty: string;
  city: string;
  shares: number;
  engagementScore: number;
  isActive: boolean;
  lastActive: string;
}

const HCPEngagement = () => {
  const [metrics, setMetrics] = useState({
    totalHCPsOnboarded: 0,
    weeklyActiveUsers: 0,
    monthlyActiveUsers: 0,
    avgEngagementScore: 0
  });
  const [topEngagedHCPs, setTopEngagedHCPs] = useState<HCP[]>([]);
  const [leastEngagedHCPs, setLeastEngagedHCPs] = useState<HCP[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHCPData();
  }, []);

  const fetchHCPData = async () => {
    try {
      setIsLoading(true);
      const [analytics, topHCPs, leastHCPs] = await Promise.all([
        hcpApi.getAnalytics(),
        hcpApi.getTopEngaged(),
        hcpApi.getLeastEngaged()
      ]);
      
      setMetrics({
        totalHCPsOnboarded: analytics.summary.totalHCPs,
        weeklyActiveUsers: analytics.weeklyActiveUsers,
        monthlyActiveUsers: analytics.monthlyActiveUsers,
        avgEngagementScore: analytics.summary.avgEngagementScore
      });
      
      setTopEngagedHCPs((topHCPs as any).topEngagedHCPs || topHCPs);
      setLeastEngagedHCPs((leastHCPs as any).leastEngagedHCPs || leastHCPs);
    } catch (error) {
      console.error('Failed to fetch HCP data:', error);
      toast.error('Failed to load HCP engagement data');
    } finally {
      setIsLoading(false);
    }
  };

  const metricsData = [
    { 
      title: "Total HCPs Onboarded", 
      value: metrics.totalHCPsOnboarded.toString(), 
      change: "+45 this month", 
      icon: Users 
    },
    { 
      title: "Weekly Active Users", 
      value: metrics.weeklyActiveUsers.toString(), 
      change: "+12% vs last week", 
      icon: UserCheck 
    },
    { 
      title: "Monthly Active Users", 
      value: metrics.monthlyActiveUsers.toString(), 
      change: "+8% vs last month", 
      icon: Calendar 
    },
    { 
      title: "Avg. Engagement Score", 
      value: `${metrics.avgEngagementScore}/10`, 
      change: "+0.5 vs last quarter", 
      icon: TrendingUp 
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">HCP Engagement Tracking</h1>
        <p className="text-muted-foreground">Monitor healthcare professional engagement and activity</p>
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
                      <p className="text-xs text-primary font-medium">{metric.change}</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Engaged HCPs */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Most Engaged HCPs
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Top performers by engagement score and content shares
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-muted-foreground">Doctor</TableHead>
                  <TableHead className="text-muted-foreground">Specialty</TableHead>
                  <TableHead className="text-muted-foreground">Shares</TableHead>
                  <TableHead className="text-muted-foreground">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index} className="border-border">
                      <TableCell>
                        <div className="animate-pulse">
                          <div className="h-4 bg-muted rounded mb-1"></div>
                          <div className="h-3 bg-muted rounded"></div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="animate-pulse h-4 bg-muted rounded"></div>
                      </TableCell>
                      <TableCell>
                        <div className="animate-pulse h-6 bg-muted rounded w-8"></div>
                      </TableCell>
                      <TableCell>
                        <div className="animate-pulse h-4 bg-muted rounded w-12"></div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  Array.isArray(topEngagedHCPs) ? topEngagedHCPs.map((hcp) => (
                    <TableRow key={hcp._id} className="border-border">
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{hcp.name}</p>
                          <p className="text-xs text-muted-foreground">{hcp.city}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground text-sm">{hcp.specialty}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                          {hcp.shares}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-foreground font-medium">{hcp.engagementScore}</TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                        Error loading top engaged HCPs
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Least Engaged HCPs */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              Needs Attention
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              HCPs with low engagement requiring follow-up
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-muted-foreground">Doctor</TableHead>
                  <TableHead className="text-muted-foreground">Specialty</TableHead>
                  <TableHead className="text-muted-foreground">Shares</TableHead>
                  <TableHead className="text-muted-foreground">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, index) => (
                    <TableRow key={index} className="border-border">
                      <TableCell>
                        <div className="animate-pulse">
                          <div className="h-4 bg-muted rounded mb-1"></div>
                          <div className="h-3 bg-muted rounded"></div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="animate-pulse h-4 bg-muted rounded"></div>
                      </TableCell>
                      <TableCell>
                        <div className="animate-pulse h-6 bg-muted rounded w-8"></div>
                      </TableCell>
                      <TableCell>
                        <div className="animate-pulse h-4 bg-muted rounded w-12"></div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  Array.isArray(leastEngagedHCPs) ? leastEngagedHCPs.map((hcp) => (
                    <TableRow key={hcp._id} className="border-border">
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{hcp.name}</p>
                          <p className="text-xs text-muted-foreground">{hcp.city}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground text-sm">{hcp.specialty}</TableCell>
                      <TableCell>
                        <Badge variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20">
                          {hcp.shares}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-destructive font-medium">{hcp.engagementScore}</TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                        Error loading least engaged HCPs
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HCPEngagement;