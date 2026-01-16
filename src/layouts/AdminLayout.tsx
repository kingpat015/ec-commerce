import React, { useState } from "react";
import { Outlet, Link, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

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
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-gray-900 text-white transition-all duration-300 z-40 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            {sidebarOpen && <h2 className="text-xl font-bold">Admin Panel</h2>}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded hover:bg-gray-800 transition-colors"
            >
              {sidebarOpen ? "◀" : "▶"}
            </button>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          <NavItem
            to="/admin"
            icon="📊"
            label="Dashboard"
            active={isActive("/admin")}
            collapsed={!sidebarOpen}
          />

          {canAccessUsers && (
            <NavItem
              to="/admin/users"
              icon="👥"
              label="User Management"
              active={isActive("/admin/users")}
              collapsed={!sidebarOpen}
            />
          )}

          {canAccessProducts && (
            <NavItem
              to="/admin/products"
              icon="📦"
              label="Products"
              active={isActive("/admin/products")}
              collapsed={!sidebarOpen}
            />
          )}

          {canAccessBulletins && (
            <NavItem
              to="/admin/bulletins"
              icon="📰"
              label="Bulletins"
              active={isActive("/admin/bulletins")}
              collapsed={!sidebarOpen}
            />
          )}

          <hr className="border-gray-800 my-4" />

          <NavItem
            to="/"
            icon="🏠"
            label="Back to Site"
            active={false}
            collapsed={!sidebarOpen}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* Top Bar */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">
                {location.pathname === "/admin" && "Dashboard"}
                {location.pathname === "/admin/users" && "User Management"}
                {location.pathname === "/admin/products" &&
                  "Product Management"}
                {location.pathname === "/admin/bulletins" &&
                  "Bulletin Management"}
              </h1>

              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{user.name}</span>
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                    {user.role.replace("_", " ").toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: string;
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
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
        active
          ? "bg-blue-600 text-white"
          : "text-gray-300 hover:bg-gray-800 hover:text-white"
      }`}
      title={collapsed ? label : undefined}
    >
      <span className="text-xl">{icon}</span>
      {!collapsed && <span className="font-medium">{label}</span>}
    </Link>
  );
};

export default AdminLayout;
