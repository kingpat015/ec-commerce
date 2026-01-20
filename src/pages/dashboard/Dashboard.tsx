import { useState, useEffect } from "react";
import {
  Package,
  Users,
  MessageSquare,
  FileText,
  TrendingUp,
  ShoppingCart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Activity, DashboardStats, Product, User } from "../../types";
import api from "../../services/api";

// Component-specific types
interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: number;
  change?: string;
  changeType?: "positive" | "negative";
  color: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const StatCard = ({
  icon: Icon,
  title,
  value,
  change,
  changeType,
  color,
}: StatCardProps) => (
  <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition-all">
    <div className="flex items-center justify-between mb-3">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      {change && (
        <div className="flex items-center gap-1">
          <TrendingUp
            className={`w-3 h-3 ${
              changeType === "positive" ? "text-green-500" : "text-red-500"
            }`}
          />
          <span
            className={`text-xs font-medium ${
              changeType === "positive" ? "text-green-600" : "text-red-600"
            }`}
          >
            {change}
          </span>
        </div>
      )}
    </div>
    <p className="text-xs text-gray-500 mb-1">{title}</p>
    <p className="text-2xl font-semibold text-gray-900">{value}</p>
  </div>
);

const RecentActivity = ({ activities }: RecentActivityProps) => (
  <div className="bg-white rounded-lg border border-gray-200 p-5">
    <h3 className="text-sm font-semibold text-gray-900 mb-4">
      Recent Activity
    </h3>
    <div className="space-y-3">
      {activities.map((activity, index) => (
        <div
          key={index}
          className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0"
        >
          <div className={`p-1.5 rounded-lg ${activity.color} flex-shrink-0`}>
            <activity.icon className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-900 truncate">
              {activity.title}
            </p>
            <p className="text-xs text-gray-500 mt-0.5 truncate">
              {activity.description}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalUsers: 0,
    totalBulletins: 0,
    contactSubmissions: 0,
    activeProducts: 0,
    activeUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        // Fetch all stats in parallel using ApiService
        const [productsData, usersData, bulletinsData] = await Promise.all([
          api.getProducts(),
          api.getUsers(),
          api.getBulletins(),
        ]);

        setStats({
          totalProducts: productsData.products?.length || 0,
          activeProducts:
            productsData.products?.filter((p: Product) => p.status === "active")
              .length || 0,
          totalUsers: usersData.users?.length || 0,
          activeUsers:
            usersData.users?.filter((u: User) => u.status === "active")
              .length || 0,
          totalBulletins: bulletinsData.bulletins?.length || 0,
          contactSubmissions: 0,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const recentActivities: Activity[] = [
    {
      icon: Users,
      title: "New User Registration",
      description: "John Doe registered as a customer",
      time: "2 hours ago",
      color: "bg-blue-500",
    },
    {
      icon: Package,
      title: "Product Added",
      description: 'New product "Premium Widget" added to inventory',
      time: "4 hours ago",
      color: "bg-green-500",
    },
    {
      icon: MessageSquare,
      title: "Contact Form Submission",
      description: "New inquiry about product availability",
      time: "6 hours ago",
      color: "bg-purple-500",
    },
    {
      icon: FileText,
      title: "Bulletin Published",
      description: "Company event announcement posted",
      time: "1 day ago",
      color: "bg-orange-500",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-3 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Overview of your store performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <StatCard
          icon={Package}
          title="Total Products"
          value={stats.totalProducts}
          change="+12.5%"
          changeType="positive"
          color="bg-blue-500"
        />
        <StatCard
          icon={Users}
          title="Total Users"
          value={stats.totalUsers}
          change="+8.2%"
          changeType="positive"
          color="bg-green-500"
        />
        <StatCard
          icon={FileText}
          title="Bulletins"
          value={stats.totalBulletins}
          change="+3.1%"
          changeType="positive"
          color="bg-purple-500"
        />
        <StatCard
          icon={MessageSquare}
          title="New Inquiries"
          value={stats.contactSubmissions}
          change="+15.3%"
          changeType="positive"
          color="bg-orange-500"
        />
        <StatCard
          icon={ShoppingCart}
          title="Active Products"
          value={stats.activeProducts}
          color="bg-indigo-500"
        />
        <StatCard
          icon={Users}
          title="Active Users"
          value={stats.activeUsers}
          color="bg-teal-500"
        />
      </div>

      {/* Recent Activity and Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity activities={recentActivities} />
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Quick Stats
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-xs font-medium text-gray-700">
                Product Success Rate
              </span>
              <span className="text-xs font-semibold text-green-600">94%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-xs font-medium text-gray-700">
                Avg Response Time
              </span>
              <span className="text-xs font-semibold text-blue-600">2.4h</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-xs font-medium text-gray-700">
                Customer Satisfaction
              </span>
              <span className="text-xs font-semibold text-purple-600">
                4.8/5.0
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-xs font-medium text-gray-700">
                Pending Actions
              </span>
              <span className="text-xs font-semibold text-orange-600">
                {stats.contactSubmissions}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
