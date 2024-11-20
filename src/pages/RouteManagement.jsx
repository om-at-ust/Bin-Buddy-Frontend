import React, { useState, useEffect } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  Route as RouteIcon,
  Eye,
  Trash2,
  AlertCircle,
} from "lucide-react";
import RouteMap from "../components/routes/RouteMap";
import { useNavigate } from "react-router-dom";
import {
  getAllRoutes,
  deleteRoute,
  createRoute,
  assignRouteToTruck,
  setRouteStatusAssigned,
} from "../services/routeService";
import { toast } from "react-hot-toast";

function RouteManagement() {
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [view, setView] = useState("list");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'assigned', 'unassigned'

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      setLoading(true);
      const data = await getAllRoutes();
      setRoutes(data);
    } catch (error) {
      toast.error("Failed to fetch routes", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#EF4444",
          color: "#FFFFFF",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRoute = async (id) => {
    if (window.confirm("Are you sure you want to delete this route?")) {
      try {
        await deleteRoute(id);
        toast.success("Route deleted successfully", {
          duration: 4000,
          position: "top-right",
          style: {
            background: "#10B981",
            color: "#FFFFFF",
          },
        });
        fetchRoutes();
      } catch (error) {
        toast.error("Failed to delete route", {
          duration: 4000,
          position: "top-right",
          style: {
            background: "#EF4444",
            color: "#FFFFFF",
          },
        });
      }
    }
  };

  const handleCreateRoute = async () => {
    try {
      setLoading(true);
      await createRoute();
      toast.success("New route created successfully", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#10B981",
          color: "#FFFFFF",
        },
      });
      fetchRoutes();
    } catch (error) {
      toast.error("Failed to create route", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#EF4444",
          color: "#FFFFFF",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewRoute = (route) => {
    setSelectedRoute(route);
    setView("map");
  };

  const handleAssignRoute = async (routeId) => {
    try {
      setLoading(true);
      const response = await assignRouteToTruck(routeId);
      if (response.status === 200) {
        await setRouteStatusAssigned(routeId);
        toast.success("Route successfully assigned to truck", {
          duration: 4000,
          position: "top-right",
          style: {
            background: "#10B981",
            color: "#FFFFFF",
          },
        });
        navigate("/admin/dashboard/fleet-management");
      }
    } catch (error) {
      toast.error(error.message || "Failed to assign route to truck", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#EF4444",
          color: "#FFFFFF",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const getFilteredRoutes = () => {
    switch (filterStatus) {
      case 'assigned':
        return routes.filter(route => route.isAssigned);
      case 'unassigned':
        return routes.filter(route => !route.isAssigned);
      default:
        return routes;
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Route Management</h1>
          <p className="text-gray-600">
            Manage and monitor waste collection routes
          </p>
        </div>
        <button
          onClick={handleCreateRoute}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors disabled:bg-green-300"
        >
          <RouteIcon className="h-5 w-5" />
          {loading ? "Generating..." : "Generate New Route"}
        </button>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-4 py-2 rounded-lg ${
            filterStatus === 'all'
              ? "bg-green-50 text-green-600 border border-green-200"
              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          All Routes
        </button>
        <button
          onClick={() => setFilterStatus('assigned')}
          className={`px-4 py-2 rounded-lg ${
            filterStatus === 'assigned'
              ? "bg-green-50 text-green-600 border border-green-200"
              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          Assigned Routes
        </button>
        <button
          onClick={() => setFilterStatus('unassigned')}
          className={`px-4 py-2 rounded-lg ${
            filterStatus === 'unassigned'
              ? "bg-green-50 text-green-600 border border-green-200"
              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          Unassigned Routes
        </button>
      </div>

      {/* Content */}
      {view === "list" ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Route Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Distance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {getFilteredRoutes().map((route, index) => (
                  <tr key={route.id || index}>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">
                          Route #{route.id || index + 1}
                        </span>
                        <span className="text-sm text-gray-500">
                          {route.features?.[0]?.properties?.waypoints?.length ||
                            0}{" "}
                          stops
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <RouteIcon className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {(
                            route.features?.[0]?.properties?.distance || 0
                          ).toFixed(2)}{" "}
                          km
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          route.isAssigned
                            ? "bg-green-50 text-green-600 border border-green-200"
                            : "bg-yellow-50 text-yellow-600 border border-yellow-200"
                        }`}
                      >
                        {route.isAssigned ? "Assigned" : "Unassigned"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleViewRoute(route)}
                          className="text-gray-400 hover:text-gray-600"
                          title="View on map"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        {!route.isAssigned && (
                          <button
                            onClick={() => handleAssignRoute(route.id)}
                            className="text-gray-400 hover:text-blue-600"
                            title="Assign route"
                            disabled={loading}
                          >
                            <Calendar className="h-5 w-5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteRoute(route.id)}
                          className="text-gray-400 hover:text-red-600"
                          title="Delete route"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <RouteMap route={selectedRoute} />
      )}
    </div>
  );
}

export default RouteManagement;
