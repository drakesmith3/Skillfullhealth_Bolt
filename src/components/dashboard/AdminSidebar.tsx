import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Settings, BarChart2, ShieldAlert, HelpCircle } from 'lucide-react'; // Example icons

const AdminSidebar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Overview', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'User Management', path: '/admin/user-management', icon: <Users size={20} /> },
    { name: 'System Settings', path: '/admin/system-settings', icon: <Settings size={20} /> },
    { name: 'Analytics', path: '/admin/analytics', icon: <BarChart2 size={20} /> },
    { name: 'Security', path: '/admin/security', icon: <ShieldAlert size={20} /> },
    { name: 'Support', path: '/admin/support', icon: <HelpCircle size={20} /> },
  ];

  return (
    <div className="h-full bg-black text-white p-4 flex flex-col">
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-center text-[#F9D75D]">Admin Panel</h2>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700 transition-colors
                  ${location.pathname === item.path ? 'bg-gray-700 text-[#F9D75D]' : 'text-gray-300'}`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto">
        <p className="text-xs text-gray-500 text-center">© {new Date().getFullYear()} GLOHSEN Admin</p>
      </div>
    </div>
  );
};

export default AdminSidebar;
