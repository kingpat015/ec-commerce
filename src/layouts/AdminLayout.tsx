import React, { useState } from "react";
import { Outlet, Link, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  LayoutDashboard,
  Users,
  Package,
  FileText,
  Home,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const AdminLayout: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Check if user has admin access
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const hasAdminAccess = ["admin", "hr_user", "sales_user"].includes(user.role);

  if (!hasAdminAccess) {
    return <Navigate to="/" replace />;
  }

  const isActive = (path: string) => location.pathname === path;

  const canAccessUsers = user.role === "admin";
  const canAccessProducts = user.role === "admin" || user.role === "sales_user";
  const canAccessBulletins = user.role === "admin" || user.role === "hr_user";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-white/80 backdrop-blur-xl border-r border-slate-200/60 transition-all duration-300 z-40 shadow-xl shadow-slate-200/50 ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="p-4 border-b border-slate-200/60 bg-gradient-to-r from-blue-500/5 to-transparent">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center space-x-2">
                {/* Exelpack Logo with glow effect */}
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-400/20 blur-lg rounded-lg"></div>
                  <img
                    src="https://exelpackcorp.com/wp-content/themes/exelpack2014/img/logo.png"
                    alt="Exelpack"
                    className="h-10 w-auto relative z-10"
                  />
                </div>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg hover:bg-blue-50 transition-all duration-200 ml-auto text-slate-600 hover:text-blue-600 hover:scale-110"
            >
              {sidebarOpen ? (
                <ChevronLeft size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
            </button>
          </div>
          {sidebarOpen && (
            <p className="text-xs text-slate-500 mt-2 font-medium">
              Admin Panel
            </p>
          )}
        </div>

        <nav className="p-3 space-y-1">
          <NavItem
            to="/admin"
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            active={isActive("/admin")}
            collapsed={!sidebarOpen}
          />

          {canAccessUsers && (
            <NavItem
              to="/admin/users"
              icon={<Users size={20} />}
              label="User Management"
              active={isActive("/admin/users")}
              collapsed={!sidebarOpen}
            />
          )}

          {canAccessProducts && (
            <NavItem
              to="/admin/products"
              icon={<Package size={20} />}
              label="Products"
              active={isActive("/admin/products")}
              collapsed={!sidebarOpen}
            />
          )}

          {canAccessBulletins && (
            <NavItem
              to="/admin/bulletins"
              icon={<FileText size={20} />}
              label="Bulletins"
              active={isActive("/admin/bulletins")}
              collapsed={!sidebarOpen}
            />
          )}
        </nav>

        {/* Back to Site - Bottom of sidebar */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-slate-200/60 bg-slate-50/50">
          <NavItem
            to="/"
            icon={<Home size={20} />}
            label="Back to Site"
            active={false}
            collapsed={!sidebarOpen}
          />
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        {/* Top Bar */}
        <header className="bg-white/70 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-30 shadow-sm">
          <div className="px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-transparent rounded-lg border border-blue-100">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-slate-600">
                    System Online
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-700">
                      {user.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {user.role.replace("_", " ").charAt(0).toUpperCase() +
                        user.role.replace("_", " ").slice(1)}
                    </p>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-medium shadow-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 relative">
          {/* Decorative color patches */}
          <div className="absolute top-10 right-20 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl"></div>
          <div className="absolute top-40 left-10 w-40 h-40 bg-purple-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-40 w-36 h-36 bg-cyan-200/20 rounded-full blur-3xl"></div>
          <div className="absolute top-60 right-10 w-28 h-28 bg-pink-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 left-20 w-32 h-32 bg-amber-200/20 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  collapsed: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  to,
  icon,
  label,
  active,
  collapsed,
}) => {
  return (
    <Link
      to={to}
      className={`group flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
        active
          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105"
          : "text-slate-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-blue-700 hover:translate-x-1"
      }`}
      title={collapsed ? label : undefined}
    >
      <span
        className={`flex-shrink-0 transition-transform duration-200 ${active ? "" : "group-hover:scale-110"}`}
      >
        {icon}
      </span>
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
    </Link>
  );
};

export default AdminLayout;
