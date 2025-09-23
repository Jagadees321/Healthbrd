import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Home, 
  Target, 
  Users, 
  Activity, 
  BarChart3, 
  MapPin, 
  Shield,
  LogOut
} from "lucide-react";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: Home },
    { path: "/campaigns", label: "Campaigns", icon: Target },
    { path: "/hcp-engagement", label: "HCP Engagement", icon: Users },
    { path: "/patient-engagement", label: "Patient Engagement", icon: Activity },
    { path: "/content-effectiveness", label: "Content", icon: BarChart3 },
    { path: "/territory-insights", label: "Territory", icon: MapPin },
    { path: "/compliance", label: "Compliance", icon: Shield },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className="bg-card border-r border-border h-screen w-64 p-4 flex flex-col">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-foreground">Health Campaign Manager</h2>
        <p className="text-sm text-muted-foreground">Medical Affairs Platform</p>
      </div>
      
      <div className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Button
              key={item.path}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start ${
                isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
              }`}
              onClick={() => navigate(item.path)}
            >
              <Icon className="h-4 w-4 mr-2" />
              {item.label}
            </Button>
          );
        })}
      </div>
      
      <div className="pt-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;