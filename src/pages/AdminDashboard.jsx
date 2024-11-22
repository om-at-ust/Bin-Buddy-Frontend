import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Trash2,
  Route,
  Truck,
  Users,
  AlertCircle,
} from "lucide-react";
import { fetchBins } from "../services/binService";
import { getAllRoutes } from "../services/routeService";
import { getAllTrucks } from "../services/truckService";

function AdminDashboard() {
  const [stats, setStats] = useState({
    activeBins: 0,
    routesToday: 0,
    activeTrucks: 0,
    wasteCollected: 0
  });
  const [criticalBins, setCriticalBins] = useState([]);
  const [activeRoutes, setActiveRoutes] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch all data in parallel with error handling for each request
      const [binsResponse, routesResponse, trucksResponse] = await Promise.all([
        fetchBins().catch(error => {
          console.error("Error fetching bins:", error);
          return [];
        }),
        getAllRoutes().catch(error => {
          console.error("Error fetching routes:", error);
          return [];
        }),
        getAllTrucks().catch(error => {
          console.error("Error fetching trucks:", error);
          return [];
        })
      ]);

      // Safely handle the data with default values
      const binsData = Array.isArray(binsResponse) ? binsResponse : [];
      const routesData = Array.isArray(routesResponse) ? routesResponse : [];
      const trucksData = Array.isArray(trucksResponse) ? trucksResponse : [];

      // Calculate stats with safe defaults
      const activeBinsCount = binsData.length;
      const totalWaste = binsData.reduce((sum, bin) => {
        const wasteAmount = Number(bin?.wasteAmount) || 0;
        return sum + wasteAmount;
      }, 0);
      const activeTrucksCount = trucksData.filter(truck => 
        truck?.status === 'ON_ROUTE'
      ).length;

      // Update stats with safe defaults
      setStats({
        activeBins: activeBinsCount || 0,
        routesToday: routesData.length || 0,
        activeTrucks: activeTrucksCount || 0,
        wasteCollected: `${(totalWaste / 1000).toFixed(1)}T` // Converting to tons
      });

      // Get critical bins (fill level > 75%)
      const criticalBinsData = binsData
        .filter(bin => bin.fillLevel > 75)
        .sort((a, b) => b.fillLevel - a.fillLevel)
        .slice(0, 4)
        .map(bin => ({
          location: bin.location,
          level: bin.fillLevel,
          status: bin.fillLevel >= 90 ? "FULL" : "HALF_FULL"
        }));
      setCriticalBins(criticalBinsData);

      // Modified active routes mapping
      const activeRoutesData = routesData
        .slice(0, 4)
        .map((route, index) => {
          const assignedTruck = trucksData.find(truck => 
            truck?.assignedRouteId === route?.id
          );
          return {
            route: `Active Route ${index + 1}`,
            driver: assignedTruck?.userId ? `Driver ${assignedTruck.userId}` : `Driver ${index + 1}`,
            progress: Math.floor(Math.random() * 100),
            status: "on-time"
          };
        });
      setActiveRoutes(activeRoutesData);

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      // You might want to add error handling/display here
    }
  };

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
              to="/fleet-management"
            />
            <NavItem
              icon={<Users />}
              label="User Management"
              to="/user-management"
            />
            <NavItem
              icon={<AlertCircle />}
              label="Issue Management"
              to="/issue-management"
            />
          </nav>
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
              <p className="text-gray-600">
                Welcome back,{" "}
                {JSON.parse(sessionStorage.getItem("user")).username}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Admin profile"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {JSON.parse(sessionStorage.getItem("user")).username}
                </p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Active Bins", value: stats.activeBins },
              { label: "Routes Today", value: stats.routesToday },
              { label: "Active Trucks", value: stats.activeTrucks },
              { label: "Waste Collected", value: stats.wasteCollected }
            ].map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Critical Bin Levels */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Critical Bin Levels
              </h3>
              <div className="space-y-4">
                {criticalBins.map((bin, index) => (
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
                {activeRoutes.map((route, index) => (
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
