import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Trash2,
  Route,
  Truck,
  Users,
  BarChart3,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

function AdminDashboard() {
  const stats = [
    { label: "Active Bins", value: "245", change: "+12%", trend: "up" },
    { label: "Routes Today", value: "18", change: "+5%", trend: "up" },
    { label: "Active Trucks", value: "12", change: "stable", trend: "neutral" },
    { label: "Waste Collected", value: "4.2T", change: "+8%", trend: "up" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-green-600 flex items-center gap-2">
              <Trash2 className="h-6 w-6" />
              Bin Buddy Admin
            </h2>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            <NavItem
              icon={<LayoutDashboard />}
              label="Dashboard"
              to="/admin"
              active
            />
            <NavItem
              icon={<Trash2 />}
              label="Bins Management"
              to="/bin-management"
            />
            <NavItem icon={<Route />} label="Routes" to="/route-management" />
            <NavItem
              icon={<Truck />}
              label="Fleet Management"
              to="/admin/fleet"
            />
            <NavItem
              icon={<Users />}
              label="User Management"
              to="/admin/users"
            />
            <NavItem
              icon={<BarChart3 />}
              label="Analytics"
              to="/admin/analytics"
            />
          </nav>

          <div className="p-4 border-t border-gray-200">
            <NavItem
              icon={<Settings />}
              label="Settings"
              to="/admin/settings"
            />
            <NavItem icon={<LogOut />} label="Logout" to="/admin/logout" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Dashboard Overview
              </h1>
              <p className="text-gray-600">Welcome back, Admin</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Admin profile"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-700">John Doe</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bin Fill Levels */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Critical Bin Levels
              </h3>
              <div className="space-y-4">
                {[
                  { location: "Central Park", level: 90, status: "critical" },
                  { location: "Main Street", level: 85, status: "warning" },
                  { location: "Harbor View", level: 82, status: "warning" },
                  { location: "West Avenue", level: 78, status: "warning" },
                ].map((bin, index) => (
                  <BinLevelIndicator key={index} {...bin} />
                ))}
              </div>
            </div>

            {/* Active Routes */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Active Routes
              </h3>
              <div className="space-y-4">
                {[
                  {
                    route: "Route A-1",
                    driver: "Mike Johnson",
                    progress: 75,
                    status: "on-time",
                  },
                  {
                    route: "Route B-3",
                    driver: "Sarah Wilson",
                    progress: 45,
                    status: "delayed",
                  },
                  {
                    route: "Route C-2",
                    driver: "Tom Davis",
                    progress: 90,
                    status: "on-time",
                  },
                  {
                    route: "Route D-4",
                    driver: "Emma Brown",
                    progress: 30,
                    status: "on-time",
                  },
                ].map((route, index) => (
                  <RouteProgressBar key={index} {...route} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, to, active }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
        ${
          active
            ? "bg-green-50 text-green-600"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        }`}
    >
      {icon}
      {label}
    </Link>
  );
}

function StatCard({ label, value, change, trend }) {
  const trendColor =
    trend === "up"
      ? "text-green-600"
      : trend === "down"
      ? "text-red-600"
      : "text-gray-600";

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <span className={`text-sm font-medium ${trendColor}`}>{change}</span>
      </div>
    </div>
  );
}

function BinLevelIndicator({ location, level, status }) {
  const statusColors = {
    EMPTY: "bg-gray-500",
    QUARTERLY_FULL: "bg-green-500",
    HALF_FULL: "bg-yellow-500",
    FULL: "bg-red-500",
    OVERFLOWING: "bg-red-600",
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">{location}</span>
          <span className="text-sm font-medium text-gray-500">{level}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${statusColors[status]}`}
            style={{ width: `${level}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

function RouteProgressBar({ route, driver, progress, status }) {
  const statusColors = {
    "on-time": "text-green-600",
    delayed: "text-red-600",
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700">{route}</p>
          <p className="text-xs text-gray-500">{driver}</p>
        </div>
        <span className={`text-sm font-medium ${statusColors[status]}`}>
          {status}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="h-2 rounded-full bg-green-600"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

export default AdminDashboard;