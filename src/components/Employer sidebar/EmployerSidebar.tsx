import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Award,
  FileText,
  Search,
  BarChart,
  Settings,
  HelpCircle,
  LogOut
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ 
  to, 
  icon, 
  label, 
  isActive = false 
}) => (
  <Link to={to}>
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-2",
        isActive ? "bg-primary/10 text-primary hover:bg-primary/20" : ""
      )}
    >
      {icon}
      {label}
    </Button>
  </Link>
);

export const EmployerSidebar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 h-full bg-white border-r flex flex-col">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900">Employer Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your recruitment</p>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-1">
          <SidebarLink
            to="/employer/dashboard"
            icon={<BarChart className="h-5 w-5" />}
            label="Dashboard"
            isActive={isActive("/employer/dashboard")}
          />
          <SidebarLink
            to="/employer/candidates"
            icon={<Users className="h-5 w-5" />}
            label="Candidates"
            isActive={isActive("/employer/candidates")}
          />
          <SidebarLink
            to="/employer/criteria"
            icon={<Search className="h-5 w-5" />}
            label="Search Criteria"
            isActive={isActive("/employer/criteria")}
          />
          <SidebarLink
            to="/employer/applications"
            icon={<FileText className="h-5 w-5" />}
            label="Applications"
            isActive={isActive("/employer/applications")}
          />
          <SidebarLink
            to="/employer/scores"
            icon={<Award className="h-5 w-5" />}
            label="GLOHSEN Scores"
            isActive={isActive("/employer/scores")}
          />
        </div>

        <div className="mt-8">
          <h3 className="px-3 text-sm font-medium text-gray-500">Support</h3>
          <div className="mt-2 space-y-1">
            <SidebarLink
              to="/employer/settings"
              icon={<Settings className="h-5 w-5" />}
              label="Settings"
              isActive={isActive("/employer/settings")}
            />
            <SidebarLink
              to="/employer/help"
              icon={<HelpCircle className="h-5 w-5" />}
              label="Help Center"
              isActive={isActive("/employer/help")}
            />
          </div>
        </div>
      </nav>

      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
          <LogOut className="h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};
