import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Activity, BarChart3 } from "lucide-react";
import { patientApi } from "@/lib/api";
import { toast } from "sonner";

interface WeeklyData {
  _id: string;
  completions: number;
  change: number;
}

interface CityBreakdown {
  _id: string;
  completions: number;
  engagement: number;
  language: string;
}

interface AssetPerformance {
  _id: string;
  completions: number;
  dwellTime: string;
  effectiveness: string;
}

const PatientEngagement = () => {
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([]);
  const [cityBreakdown, setCityBreakdown] = useState<CityBreakdown[]>([]);
  const [assetPerformance, setAssetPerformance] = useState<AssetPerformance[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEngagementData();
  }, [selectedCity, selectedLanguage]);

  const fetchEngagementData = async () => {
    try {
      setIsLoading(true);
      const engagementData = await patientApi.getEngagement();
      
      setWeeklyData(engagementData.weeklyData || []);
      setCityBreakdown(engagementData.cityBreakdown || []);
      setAssetPerformance(engagementData.assetPerformance || []);
    } catch (error) {
      console.error('Failed to fetch patient engagement data:', error);
      toast.error('Failed to load patient engagement data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = () => {
    fetchEngagementData();
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Patient Engagement</h1>
        <p className="text-muted-foreground">Track patient interactions and content completion rates</p>
      </div>

      {/* Filters */}
      <Card className="border-border bg-card mb-6">
        <CardHeader className="pb-4">
          <CardTitle className="text-foreground">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="border-border bg-input">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="all">All Cities</SelectItem>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="delhi">Delhi</SelectItem>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                  <SelectItem value="chennai">Chennai</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="border-border bg-input">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="all">All Languages</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleFilterChange} disabled={isLoading}>
              {isLoading ? "Loading..." : "Apply Filters"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Trend */}
      <Card className="border-border bg-card mb-6">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Weekly Completion Trends
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Patient content completion over the last 4 weeks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border">
                  <div className="animate-pulse">
                    <div className="h-4 bg-muted rounded mb-2 w-16"></div>
                    <div className="h-6 bg-muted rounded mb-2 w-24"></div>
                    <div className="h-4 bg-muted rounded w-20"></div>
                  </div>
                  <div className="animate-pulse h-4 bg-muted rounded w-32"></div>
                </div>
              ))
            ) : (
              weeklyData.map((week, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border">
                  <div className="flex items-center gap-4">
                    <div className="text-sm font-medium text-foreground w-16">Week {index + 1}</div>
                    <div className="text-xl font-bold text-foreground">{week.completions} completions</div>
                    {week.change > 0 && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        +{week.change}% WoW
                      </Badge>
                    )}
                  </div>
                  <div className="h-4 bg-muted rounded-full w-32 overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300" 
                      style={{ width: `${Math.min((week.completions / 200) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="mt-4">
            <Button className="w-full" disabled={isLoading}>
              <BarChart3 className="h-4 w-4 mr-2" />
              Drill Down by City/Asset
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* City Breakdown */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              City Performance
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Patient engagement by geographical region
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {cityBreakdown.map((city, index) => (
                <div key={index} className="p-3 bg-secondary/30 rounded-lg border border-border">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium text-foreground">{city.city}</div>
                    <Badge variant="outline" className="text-xs">{city.language}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Completions: {city.completions}</span>
                    <span className="text-primary font-medium">{city.engagement}% engagement</span>
                  </div>
                  <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300" 
                      style={{ width: `${city.engagement}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Asset Performance */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Content Performance
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Most effective content by completion and dwell time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {assetPerformance.map((asset, index) => (
                <div key={index} className="p-3 bg-secondary/30 rounded-lg border border-border">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium text-foreground text-sm">{asset.asset}</div>
                    <Badge 
                      variant={asset.effectiveness === "High" ? "default" : asset.effectiveness === "Medium" ? "secondary" : "destructive"}
                      className={asset.effectiveness === "High" ? "bg-primary text-primary-foreground" : ""}
                    >
                      {asset.effectiveness}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{asset.completions} completions</span>
                    <span>Avg. {asset.dwellTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientEngagement;