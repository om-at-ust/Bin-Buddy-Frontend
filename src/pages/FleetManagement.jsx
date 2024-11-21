import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Truck,
  MapPin,
  Wrench,
  AlertCircle,
  Route as RouteIcon,
  CheckCircle2,
  XCircle,
  RefreshCcw,
} from "lucide-react";
import TruckModal from "../components/trucks/TruckModal";
import TruckMap from "../components/trucks/TruckMap";
import { toast } from "react-hot-toast";

function FleetManagement() {
  const [trucks, setTrucks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [view, setView] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    loadTrucks();
  }, []);

  const loadTrucks = async () => {
    try {
      const response = await fetch("http://localhost:8083/api/trucks");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTrucks(data);
    } catch (error) {
      console.error("Error loading trucks:", error);
      toast.error("Failed to load trucks", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#EF4444",
          color: "#FFFFFF",
        },
      });
    }
  };

  const handleStatusUpdate = async (truckId, newStatus) => {
    try {
      const response = await fetch("http://localhost:8083/api/trucks/status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ truckId, newStatus }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      loadTrucks();
      toast.success("Truck status updated successfully");
    } catch (error) {
      console.error("Error updating truck status:", error);
      toast.error("Failed to update truck status");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this truck?")) {
      try {
        const response = await fetch(`http://localhost:8083/api/trucks/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        loadTrucks();
        toast.success("Truck deleted successfully");
      } catch (error) {
        console.error("Error deleting truck:", error);
        toast.error("Failed to delete truck");
      }
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "AVAILABLE":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "ON_ROUTE":
        return <Truck className="h-4 w-4 text-blue-500" />;
      case "MAINTENANCE":
        return <Wrench className="h-4 w-4 text-yellow-500" />;
      case "UNAVAILABLE":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredTrucks = trucks.filter((truck) => {
    const matchesSearch =
      truck.truckNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      truck.currentLocation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || truck.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fleet Management</h1>
          <p className="text-gray-600">
            Manage and monitor your waste collection fleet
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedTruck(null);
            setIsModalOpen(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Add New Truck
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search trucks by number or location..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Status</option>
            <option value="AVAILABLE">Available</option>
            <option value="ON_ROUTE">On Route</option>
            <option value="MAINTENANCE">Maintenance</option>
            <option value="UNAVAILABLE">Unavailable</option>
          </select>
          <button
            onClick={() => setView("list")}
            className={`px-4 py-2 rounded-lg ${
              view === "list"
                ? "bg-green-50 text-green-600 border border-green-200"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setView("map")}
            className={`px-4 py-2 rounded-lg ${
              view === "map"
                ? "bg-green-50 text-green-600 border border-green-200"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            Map View
          </button>
        </div>
      </div>

      {/* Content */}
      {view === "list" ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Truck Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Capacity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Route
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTrucks.map((truck) => (
                  <tr key={truck.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Truck className="h-5 w-5 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {truck.truckNumber}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {truck.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {truck.currentLocation}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900">
                          {truck.pickupCapacity} tons
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(truck.status)}
                        <select
                          value={truck.status}
                          onChange={(e) =>
                            handleStatusUpdate(truck.id, e.target.value)
                          }
                          className="text-sm border-0 bg-transparent focus:ring-0"
                        >
                          <option value="AVAILABLE">Available</option>
                          <option value="ON_ROUTE">On Route</option>
                          <option value="MAINTENANCE">Maintenance</option>
                          <option value="UNAVAILABLE">Unavailable</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {truck.assignedRouteId ? (
                        <div className="flex items-center gap-2">
                          <RouteIcon className="h-4 w-4 text-blue-500" />
                          <span className="text-sm text-gray-900">
                            Route #{truck.assignedRouteId}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">
                          No route assigned
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedTruck(truck);
                            setIsModalOpen(true);
                          }}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(truck.id)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
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
        <TruckMap
          trucks={filteredTrucks}
          onTruckClick={(truck) => {
            setSelectedTruck(truck);
            setIsModalOpen(true);
          }}
        />
      )}

      {/* Modal */}
      <TruckModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTruck(null);
        }}
        truck={selectedTruck}
        onSave={loadTrucks}
      />
    </div>
  );
}

export default FleetManagement;
