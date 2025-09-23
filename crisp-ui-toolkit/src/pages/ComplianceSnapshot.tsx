import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, CheckCircle, FileText, User, Calendar } from "lucide-react";

const ComplianceSnapshot = () => {
  const complianceMetrics = [
    { title: "Approved Content", value: "342", subtitle: "Total approved assets", icon: CheckCircle },
    { title: "Pending Approval", value: "12", subtitle: "Awaiting medical review", icon: AlertTriangle },
    { title: "Compliance Score", value: "94%", subtitle: "Overall compliance rate", icon: Shield },
    { title: "Audit Trail Events", value: "1,847", subtitle: "This month", icon: FileText },
  ];

  const auditRecords = [
    {
      id: 1,
      uploader: "Dr. Asha Sharma",
      approver: "MedTeam Review",
      content: "Diabetes Management Video - Hindi",
      shareCount: 25,
      uploadDate: "2025-09-15",
      approvalDate: "2025-09-16",
      status: "Approved",
      compliance: "Compliant"
    },
    {
      id: 2,
      uploader: "Dr. Rajesh Patel",
      approver: "Dr. Sarah Kumar",
      content: "Hypertension Guide PDF - English",
      shareCount: 18,
      uploadDate: "2025-09-14",
      approvalDate: "2025-09-15",
      status: "Approved",
      compliance: "Compliant"
    },
    {
      id: 3,
      uploader: "Dr. Priya Singh",
      approver: "Pending",
      content: "Heart Care Infographic - Hindi",
      shareCount: 0,
      uploadDate: "2025-09-17",
      approvalDate: "-",
      status: "Pending",
      compliance: "Under Review"
    },
    {
      id: 4,
      uploader: "Dr. Amit Gupta",
      approver: "Rejected",
      content: "Medication Chart - English",
      shareCount: 8,
      uploadDate: "2025-09-10",
      approvalDate: "2025-09-12",
      status: "Rejected",
      compliance: "Non-Compliant"
    },
    {
      id: 5,
      uploader: "Dr. Neha Verma",
      approver: "MedTeam Review",
      content: "Exercise Guidelines - Hindi",
      shareCount: 42,
      uploadDate: "2025-09-08",
      approvalDate: "2025-09-09",
      status: "Approved",
      compliance: "Compliant"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-primary text-primary-foreground";
      case "Pending": return "bg-secondary text-secondary-foreground";
      case "Rejected": return "bg-destructive text-destructive-foreground";
      default: return "";
    }
  };

  const getComplianceColor = (compliance: string) => {
    switch (compliance) {
      case "Compliant": return "bg-primary/10 text-primary border-primary/20";
      case "Under Review": return "bg-secondary text-secondary-foreground";
      case "Non-Compliant": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Compliance Snapshot</h1>
        <p className="text-muted-foreground">Content approval tracking and regulatory compliance monitoring</p>
      </div>

      {/* Compliance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {complianceMetrics.map((metric, index) => {
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
                  <div className={`p-3 rounded-lg ${
                    metric.title === "Compliance Score" ? "bg-primary/10" : 
                    metric.title === "Pending Approval" ? "bg-destructive/10" : "bg-secondary"
                  }`}>
                    <Icon className={`h-5 w-5 ${
                      metric.title === "Compliance Score" ? "text-primary" : 
                      metric.title === "Pending Approval" ? "text-destructive" : "text-primary"
                    }`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Audit Trail */}
      <Card className="border-border bg-card mb-6">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Content Audit Trail
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Complete tracking of content uploads, approvals, and sharing activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">Content</TableHead>
                <TableHead className="text-muted-foreground">Uploaded By</TableHead>
                <TableHead className="text-muted-foreground">Approved By</TableHead>
                <TableHead className="text-muted-foreground">Shares</TableHead>
                <TableHead className="text-muted-foreground">Date</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Compliance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditRecords.map((record) => (
                <TableRow key={record.id} className={`border-border ${
                  record.compliance === "Non-Compliant" ? "bg-destructive/5" : ""
                }`}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground text-sm">{record.content}</p>
                      <p className="text-xs text-muted-foreground">ID: {record.id.toString().padStart(4, '0')}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground text-sm">{record.uploader}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground text-sm">{record.approver}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-primary border-primary/20">
                      {record.shareCount}x
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <div>
                        <div className="text-foreground">{record.uploadDate}</div>
                        <div className="text-xs text-muted-foreground">
                          {record.approvalDate !== "-" ? `Approved: ${record.approvalDate}` : "Pending"}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(record.status)}>
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getComplianceColor(record.compliance)}>
                      {record.compliance}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Compliance Actions */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Compliance Actions</CardTitle>
          <CardDescription className="text-muted-foreground">
            Quick actions for content review and compliance management
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full justify-start">
            <FileText className="h-4 w-4 mr-2" />
            View Full Audit Trail (Detailed Report)
          </Button>
          <Button variant="outline" className="w-full justify-start text-primary border-primary/20 hover:bg-primary/5">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Review Pending Approvals (12 items)
          </Button>
          <Button variant="outline" className="w-full justify-start text-primary border-primary/20 hover:bg-primary/5">
            <Shield className="h-4 w-4 mr-2" />
            Generate Compliance Report
          </Button>
          <Button variant="outline" className="w-full justify-start text-destructive border-destructive/20 hover:bg-destructive/5">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Flag Non-Compliant Sharing Activity
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceSnapshot;