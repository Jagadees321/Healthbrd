import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BarChart3, Edit, Archive, Eye } from "lucide-react";
import { campaignApi } from "@/lib/api";
import { toast } from "sonner";

interface Campaign {
  _id: string;
  name: string;
  therapy: string;
  city: string;
  reach: number;
  shares: number;
  completions: { count: number; rate: number };
  status: string;
  startDate: string;
  endDate: string;
  contentPack: string;
}

const CampaignManagement = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    therapy: "",
    city: "",
    contentPack: "",
    startDate: "",
    endDate: "",
    reach: "",
    targetAudience: "both",
    language: "english"
  });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setIsLoading(true);
      const campaignsData = await campaignApi.getCampaigns();
      setCampaigns((campaignsData as any).campaigns || campaignsData);
    } catch (error) {
      console.error('Failed to fetch campaigns:', error);
      toast.error('Failed to load campaigns');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.therapy || !formData.city || !formData.contentPack || !formData.startDate || !formData.endDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (new Date(formData.endDate) <= new Date(formData.startDate)) {
      toast.error("End date must be after start date");
      return;
    }

    try {
      setIsSubmitting(true);
      const campaignData = {
        ...formData,
        reach: parseInt(formData.reach) || 0
      };
      
      await campaignApi.createCampaign(campaignData);
      toast.success("Campaign created successfully!");
      setShowCreateForm(false);
      setFormData({
        name: "",
        therapy: "",
        city: "",
        contentPack: "",
        startDate: "",
        endDate: "",
        reach: "",
        targetAudience: "both",
        language: "english"
      });
      fetchCampaigns(); // Refresh the list
    } catch (error: any) {
      console.error('Failed to create campaign:', error);
      toast.error(error.message || "Failed to create campaign");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusChange = async (campaignId: string, newStatus: string) => {
    try {
      await campaignApi.updateCampaignStatus(campaignId, newStatus);
      toast.success("Campaign status updated successfully!");
      fetchCampaigns(); // Refresh the list
    } catch (error: any) {
      console.error('Failed to update campaign status:', error);
      toast.error(error.message || "Failed to update campaign status");
    }
  };

  const handleDeleteCampaign = async (campaignId: string) => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      try {
        await campaignApi.deleteCampaign(campaignId);
        toast.success("Campaign deleted successfully!");
        fetchCampaigns(); // Refresh the list
      } catch (error: any) {
        console.error('Failed to delete campaign:', error);
        toast.error(error.message || "Failed to delete campaign");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Campaign Management</h1>
          <p className="text-muted-foreground">Create, monitor and manage your health campaigns</p>
        </div>
        <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
          <DialogTrigger asChild>
            <Button>Create Campaign</Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Create New Campaign</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Set up a new health campaign with target audience and content
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="campaignName" className="text-foreground">Campaign Name *</Label>
                <Input
                  id="campaignName"
                  placeholder="e.g., DiabCare Q4 2025"
                  className="border-border bg-input"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Therapy Name *</Label>
                <Select 
                  value={formData.therapy} 
                  onValueChange={(value) => handleInputChange('therapy', value)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="border-border bg-input">
                    <SelectValue placeholder="Select therapy area" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="diabetes">Diabetes</SelectItem>
                    <SelectItem value="hypertension">Hypertension</SelectItem>
                    <SelectItem value="cardiac">Cardiac</SelectItem>
                    <SelectItem value="oncology">Oncology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Cities/Territories *</Label>
                <Select 
                  value={formData.city} 
                  onValueChange={(value) => handleInputChange('city', value)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="border-border bg-input">
                    <SelectValue placeholder="Select target cities" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                    <SelectItem value="Delhi">Delhi</SelectItem>
                    <SelectItem value="Bangalore">Bangalore</SelectItem>
                    <SelectItem value="Chennai">Chennai</SelectItem>
                    <SelectItem value="Pune">Pune</SelectItem>
                    <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Content Pack *</Label>
                <Select 
                  value={formData.contentPack} 
                  onValueChange={(value) => handleInputChange('contentPack', value)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="border-border bg-input">
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="video-en">Video (English)</SelectItem>
                    <SelectItem value="video-hi">Video (Hindi)</SelectItem>
                    <SelectItem value="pdf-en">PDF (English)</SelectItem>
                    <SelectItem value="pdf-hi">PDF (Hindi)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reach" className="text-foreground">Target Reach</Label>
                <Input
                  id="reach"
                  type="number"
                  placeholder="Enter target reach number"
                  className="border-border bg-input"
                  value={formData.reach}
                  onChange={(e) => handleInputChange('reach', e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-foreground">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    className="border-border bg-input"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate" className="text-foreground">End Date *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    className="border-border bg-input"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Campaign"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowCreateForm(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Campaign Table */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Active Campaigns</CardTitle>
          <CardDescription className="text-muted-foreground">
            Monitor campaign performance and engagement metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-muted-foreground">Campaign</TableHead>
                  <TableHead className="text-muted-foreground">Therapy</TableHead>
                  <TableHead className="text-muted-foreground">City</TableHead>
                  <TableHead className="text-muted-foreground">Reach</TableHead>
                  <TableHead className="text-muted-foreground">Shares</TableHead>
                  <TableHead className="text-muted-foreground">Completions</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                      No campaigns found. Create your first campaign!
                    </TableCell>
                  </TableRow>
                ) : (
                  Array.isArray(campaigns) ? campaigns.map((campaign) => (
                    <TableRow key={campaign._id} className="border-border">
                      <TableCell className="font-medium text-foreground">{campaign.name}</TableCell>
                      <TableCell className="text-foreground capitalize">{campaign.therapy}</TableCell>
                      <TableCell className="text-foreground">{campaign.city}</TableCell>
                      <TableCell className="text-foreground">{campaign.reach.toLocaleString()}</TableCell>
                      <TableCell className="text-foreground">{campaign.shares}</TableCell>
                      <TableCell className="text-foreground">
                        {campaign.completions.count} ({campaign.completions.rate}%)
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={campaign.status === "Active" ? "default" : "secondary"}
                          className={campaign.status === "Active" ? "bg-primary text-primary-foreground" : ""}
                        >
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-primary hover:bg-primary/10"
                            onClick={() => handleStatusChange(campaign._id, campaign.status === "Active" ? "Paused" : "Active")}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-primary hover:bg-primary/10"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-primary hover:bg-primary/10"
                          >
                            <BarChart3 className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-muted-foreground hover:bg-muted"
                            onClick={() => handleDeleteCampaign(campaign._id)}
                          >
                            <Archive className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                        Error loading campaigns
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignManagement;