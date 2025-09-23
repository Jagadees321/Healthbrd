import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, BarChart3, RefreshCw, Share } from "lucide-react";

const ContentEffectiveness = () => {
  const topPerformingAssets = [
    {
      id: 1,
      name: "Foot Care Video - Hindi",
      type: "Video",
      language: "Hindi",
      completions: 892,
      dwellTime: "4.8 min",
      shareRate: 78,
      effectiveness: "High",
      trend: "up"
    },
    {
      id: 2,
      name: "Diabetes Management PDF - English",
      type: "PDF",
      language: "English",
      completions: 743,
      dwellTime: "3.2 min",
      shareRate: 65,
      effectiveness: "High",
      trend: "up"
    },
    {
      id: 3,
      name: "Heart Health Infographic - Hindi",
      type: "Infographic",
      language: "Hindi",
      completions: 634,
      dwellTime: "2.1 min",
      shareRate: 72,
      effectiveness: "Medium",
      trend: "up"
    }
  ];

  const underperformingAssets = [
    {
      id: 4,
      name: "Exercise Guide - English",
      type: "PDF",
      language: "English",
      completions: 124,
      dwellTime: "1.2 min",
      shareRate: 23,
      effectiveness: "Low",
      trend: "down"
    },
    {
      id: 5,
      name: "Medication Reminder - Hindi",
      type: "Interactive",
      language: "Hindi",
      completions: 89,
      dwellTime: "0.8 min",
      shareRate: 15,
      effectiveness: "Low",
      trend: "down"
    },
    {
      id: 6,
      name: "Nutrition Chart - English",
      type: "Infographic",
      language: "English",
      completions: 67,
      dwellTime: "1.0 min",
      shareRate: 18,
      effectiveness: "Low",
      trend: "down"
    }
  ];

  const dwellTimeMetrics = [
    { contentType: "Videos", avgDwellTime: "3.8 min", completionRate: "78%", change: "+12%" },
    { contentType: "PDFs", avgDwellTime: "2.4 min", completionRate: "65%", change: "+8%" },
    { contentType: "Infographics", avgDwellTime: "1.9 min", completionRate: "82%", change: "+15%" },
    { contentType: "Interactive", avgDwellTime: "1.1 min", completionRate: "45%", change: "-5%" }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Content Effectiveness</h1>
        <p className="text-muted-foreground">Analyze content performance and optimize engagement strategies</p>
      </div>

      {/* Dwell Time Metrics */}
      <Card className="border-border bg-card mb-6">
        <CardHeader>
          <CardTitle className="text-foreground">Content Type Performance</CardTitle>
          <CardDescription className="text-muted-foreground">
            Average engagement metrics by content format
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dwellTimeMetrics.map((metric, index) => (
              <div key={index} className="p-4 bg-secondary/30 rounded-lg border border-border">
                <div className="text-sm font-medium text-foreground mb-2">{metric.contentType}</div>
                <div className="text-lg font-bold text-foreground">{metric.avgDwellTime}</div>
                <div className="text-sm text-muted-foreground">{metric.completionRate} completion</div>
                <div className="text-xs text-primary font-medium mt-1">{metric.change} vs last month</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Assets */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Top Performing Assets
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              High engagement content driving results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-muted-foreground">Content</TableHead>
                  <TableHead className="text-muted-foreground">Metrics</TableHead>
                  <TableHead className="text-muted-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topPerformingAssets.map((asset) => (
                  <TableRow key={asset.id} className="border-border">
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground text-sm">{asset.name}</p>
                        <div className="flex gap-1 mt-1">
                          <Badge variant="outline" className="text-xs">{asset.type}</Badge>
                          <Badge variant="outline" className="text-xs">{asset.language}</Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs space-y-1">
                        <div className="text-foreground">{asset.completions} completions</div>
                        <div className="text-muted-foreground">{asset.dwellTime} avg time</div>
                        <div className="text-primary">{asset.shareRate}% share rate</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" className="w-full mb-1">
                        <Share className="h-3 w-3 mr-1" />
                        Promote
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Underperforming Assets */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-destructive" />
              Underperforming Content
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Content requiring optimization or replacement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-muted-foreground">Content</TableHead>
                  <TableHead className="text-muted-foreground">Metrics</TableHead>
                  <TableHead className="text-muted-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {underperformingAssets.map((asset) => (
                  <TableRow key={asset.id} className="border-border">
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground text-sm">{asset.name}</p>
                        <div className="flex gap-1 mt-1">
                          <Badge variant="outline" className="text-xs">{asset.type}</Badge>
                          <Badge variant="outline" className="text-xs">{asset.language}</Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs space-y-1">
                        <div className="text-foreground">{asset.completions} completions</div>
                        <div className="text-muted-foreground">{asset.dwellTime} avg time</div>
                        <div className="text-destructive">{asset.shareRate}% share rate</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="w-full mb-1">
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Replace
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Action Prompts */}
      <Card className="border-border bg-card mt-6">
        <CardHeader>
          <CardTitle className="text-foreground">Optimization Actions</CardTitle>
          <CardDescription className="text-muted-foreground">
            Recommended actions to improve content performance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full justify-start">
            <BarChart3 className="h-4 w-4 mr-2" />
            Which platform had more impact for video content?
          </Button>
          <Button variant="outline" className="w-full justify-start text-primary border-primary/20 hover:bg-primary/5">
            <RefreshCw className="h-4 w-4 mr-2" />
            Replace low-performing English content with Hindi versions
          </Button>
          <Button variant="outline" className="w-full justify-start text-primary border-primary/20 hover:bg-primary/5">
            <Share className="h-4 w-4 mr-2" />
            Promote top-performing foot care content to more regions
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentEffectiveness;