import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MedicalDashboard from "./pages/MedicalDashboard";
import CampaignManagement from "./pages/CampaignManagement";
import HCPEngagement from "./pages/HCPEngagement";
import PatientEngagement from "./pages/PatientEngagement";
import ContentEffectiveness from "./pages/ContentEffectiveness";
import TerritoryInsights from "./pages/TerritoryInsights";
import ComplianceSnapshot from "./pages/ComplianceSnapshot";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/medical-dashboard" element={<MedicalDashboard />} />
            <Route path="/campaigns" element={<Layout><CampaignManagement /></Layout>} />
            <Route path="/hcp-engagement" element={<Layout><HCPEngagement /></Layout>} />
            <Route path="/patient-engagement" element={<Layout><PatientEngagement /></Layout>} />
            <Route path="/content-effectiveness" element={<Layout><ContentEffectiveness /></Layout>} />
            <Route path="/territory-insights" element={<Layout><TerritoryInsights /></Layout>} />
            <Route path="/compliance" element={<Layout><ComplianceSnapshot /></Layout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
