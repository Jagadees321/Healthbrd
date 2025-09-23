import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { CalendarIcon, Upload, Eye, Play, Download, FileText, CheckCircle, Clock, Shield, LogOut } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { medicalApi } from "@/lib/api";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface MedicalContent {
  _id: string;
  medicalName: string;
  description: string;
  language: string;
  status: string;
  approver?: string;
  onLabel: boolean;
  notes?: string;
  approvalDate?: string;
  expiryDate: string;
  reminderFrequency: string;
  createdBy: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

interface AuditLog {
  _id: string;
  contentId: string;
  approver: {
    firstName: string;
    lastName: string;
  };
  action: string;
  timestamp: string;
  status: string;
  notes: string;
}

const MedicalDashboard = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [expiryDate, setExpiryDate] = useState<Date>();
  const [reminderFreq, setReminderFreq] = useState("");
  const [medicalName, setMedicalName] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for content and audit data
  const [approvalData, setApprovalData] = useState<MedicalContent[]>([]);
  const [auditData, setAuditData] = useState<AuditLog[]>([]);

  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === "approval" || activeTab === "audit") {
      fetchData();
    }
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      if (activeTab === "approval") {
        const content = await medicalApi.getContent();
        setApprovalData((content as any).content || content);
      } else if (activeTab === "audit") {
        const logs = await medicalApi.getAuditLogs();
        setAuditData((logs as any).auditLogs || logs);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      toast.error('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!medicalName || !description || !language || !expiryDate || !reminderFreq) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setIsSubmitting(true);
      const contentData = {
        medicalName,
        description,
        language,
        expiryDate: expiryDate.toISOString(),
        reminderFrequency: reminderFreq,
        onLabel: true
      };
      
      await medicalApi.uploadContent(contentData);
      toast.success("Content uploaded successfully!");
      
      // Reset form
      setMedicalName("");
      setDescription("");
      setLanguage("");
      setExpiryDate(undefined);
      setReminderFreq("");
    } catch (error: any) {
      console.error('Failed to upload content:', error);
      toast.error(error.message || "Failed to upload content");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleChange = async (id: string, checked: boolean) => {
    try {
      await medicalApi.toggleLabel(id, checked);
      toast.success("Label status updated successfully!");
      fetchData(); // Refresh data
    } catch (error: any) {
      console.error('Failed to update label status:', error);
      toast.error(error.message || "Failed to update label status");
    }
  };

  const handleActionChange = async (id: string, action: string) => {
    try {
      await medicalApi.approveContent(id, action as 'Approved' | 'Rejected', '');
      toast.success(`Content ${action.toLowerCase()} successfully!`);
      fetchData(); // Refresh data
    } catch (error: any) {
      console.error('Failed to update content status:', error);
      toast.error(error.message || "Failed to update content status");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const tabs = [{
    id: "upload",
    label: "Content Upload",
    icon: Upload
  }, {
    id: "approval",
    label: "Approval Workflow",
    icon: CheckCircle
  }, {
    id: "expiry",
    label: "Expiry & Review",
    icon: Clock
  }, {
    id: "audit",
    label: "Audit Logs",
    icon: Shield
  }];
  const renderContentUpload = () => <Card>
      <CardHeader>
        <CardTitle>Content Upload Form</CardTitle>
        <CardDescription>Upload new medical content for approval</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleContentSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="medical-name">Medical Name *</Label>
              <Select value={medicalName} onValueChange={setMedicalName} required disabled={isSubmitting}>
                <SelectTrigger>
                  <SelectValue placeholder="Select medical name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diabetes-care">Diabetes Care</SelectItem>
                  <SelectItem value="foot-care">Foot Care</SelectItem>
                  <SelectItem value="heart-health">Heart Health</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="language">Language *</Label>
              <Select value={language} onValueChange={setLanguage} required disabled={isSubmitting}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="tamil">Tamil</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea 
              id="description" 
              placeholder="Enter content description" 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              className="min-h-[100px]" 
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label>Content Upload</Label>
            <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag and drop files here, or click to browse
              </p>
              <Button variant="outline" size="sm" disabled={isSubmitting}>
                Choose Files
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Expiry Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !expiryDate && "text-muted-foreground")} disabled={isSubmitting}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {expiryDate ? format(expiryDate, "PPP") : "Select expiry date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={expiryDate} onSelect={setExpiryDate} initialFocus className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Reminder Frequency *</Label>
              <Select value={reminderFreq} onValueChange={setReminderFreq} required disabled={isSubmitting}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15d">15 Days</SelectItem>
                  <SelectItem value="30d">30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Content"}
          </Button>
        </form>
      </CardContent>
    </Card>;
  const renderApprovalWorkflow = () => <Card>
      <CardHeader>
        <CardTitle>Approval Workflow</CardTitle>
        <CardDescription>Review and manage content approval status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by content creator" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Content Creators</SelectItem>
              <SelectItem value="dr-sarah">Dr. Sarah Chen</SelectItem>
              <SelectItem value="dr-ahmed">Dr. Ahmed Ali</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="On/Off Label" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Content</SelectItem>
              <SelectItem value="on-label">On-label</SelectItem>
              <SelectItem value="off-label">Off-label</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Content Creator</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Content</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Approver</TableHead>
                <TableHead>On-label/Off-label</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(approvalData) ? approvalData.map(item => <TableRow key={item._id}>
                  <TableCell className="font-medium">
                    {typeof item.createdBy === 'object' ? `${item.createdBy.firstName} ${item.createdBy.lastName}` : item.createdBy || 'N/A'}
                  </TableCell>
                  <TableCell>{new Date(item.expiryDate).toISOString().split('T')[0]}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-blue-600 cursor-pointer" />
                      {item.medicalName} - {item.language}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.status === "Approved" ? "default" : item.status === "Pending" ? "secondary" : "destructive"}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {item?.approver || 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Switch checked={item.onLabel} onCheckedChange={checked => handleToggleChange(item._id, checked)} />
                  </TableCell>
                  <TableCell>{item.notes}</TableCell>
                  <TableCell>
                    <Select onValueChange={value => handleActionChange(item._id, value)} value={item.status === "Pending" ? "" : item.status.toLowerCase()}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Action" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="approve">Approve</SelectItem>
                        <SelectItem value="reject">Reject</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                      Error loading approval data
                    </TableCell>
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>;
  const renderExpiryManagement = () => <Card>
      <CardHeader>
        <CardTitle>Expiry & Review Management</CardTitle>
        <CardDescription>Manage content expiry dates and review reminders</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Expiry Date</Label>
            <Input value="2024-06-15" readOnly className="bg-muted" />
          </div>
          
          <div className="space-y-2">
            <Label>Reviewer Name</Label>
            <Input value="Dr. Kumar" readOnly className="bg-muted" />
          </div>
          
          <div className="space-y-2">
            <Label>Set New Reminder</Label>
            <Select defaultValue="30d">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15d">15 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button>
          Update Reminder
        </Button>
      </CardContent>
    </Card>;
  const renderAuditLogs = () => <Card>
      <CardHeader>
        <CardTitle>Audit Logs</CardTitle>
        <CardDescription>View complete audit trail of content actions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by reminder" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reminders</SelectItem>
              <SelectItem value="15d">15 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Content ID</TableHead>
                <TableHead>Approver Name</TableHead>
                <TableHead>Action Taken</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(auditData) ? auditData.map((item, index) => <TableRow key={index}>
                  <TableCell className="font-medium">{item.contentId}</TableCell>
                  <TableCell>
                    {item.approver && typeof item.approver === 'object' && item.approver.firstName ? `${item.approver.firstName} ${item.approver.lastName}` : 'N/A'}
                  </TableCell>
                  <TableCell>{item.action}</TableCell>
                  <TableCell>{item.timestamp}</TableCell>
                  <TableCell>
                    <Badge variant={item.status === "Active" ? "default" : "destructive"}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.notes}</TableCell>
                </TableRow>) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      Error loading audit data
                    </TableCell>
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>;
  return <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border p-4 flex flex-col">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-foreground mb-2">Medical Team</h1>
          <p className="text-sm text-muted-foreground">Content Management</p>
        </div>

        <nav className="space-y-2">
          {tabs.map(tab => {
          const Icon = tab.icon;
          return <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${activeTab === tab.id ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground hover:text-foreground"}`}>
                <Icon className="h-5 w-5" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>;
        })}
        </nav>

        {/* Logout Button */}
        <div className="pt-4 border-t border-border mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {activeTab === "upload" && renderContentUpload()}
          {activeTab === "approval" && renderApprovalWorkflow()}
          {activeTab === "expiry" && renderExpiryManagement()}
          {activeTab === "audit" && renderAuditLogs()}
        </div>
      </div>
    </div>;
};
export default MedicalDashboard;