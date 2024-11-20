import React, { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, MapPin, AlertCircle, Truck } from "lucide-react";
import BinModal from "../components/bins/BinModal";
import BinMap from "../components/bins/BinMap";
import { fetchBins, deleteBin, getFullOrOverflowingBins, generateRoute } from "../services/binService";
import { toast } from "react-hot-toast";

function BinManagement() {
  const [bins, setBins] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBin, setSelectedBin] = useState(null);
  const [view, setView] = useState("list"); // 'list' or 'map'
  const [searchTerm, setSearchTerm] = useState("");
  const [showOnlyFull, setShowOnlyFull] = useState(false);
  const [isGeneratingRoute, setIsGeneratingRoute] = useState(false);
  const [routeData, setRouteData] = useState(null);

  useEffect(() => {
    loadBins();
  }, []);

  const loadBins = async () => {
    try {
      const data = await fetchBins();
      setBins(data);
      setShowOnlyFull(false);
    } catch (error) {
      console.error("Error loading bins:", error);
    }
  };

  const loadFullBins = async () => {
    try {
      const data = await getFullOrOverflowingBins();
      setBins(data);
      setShowOnlyFull(true);
    } catch (error) {
      console.error("Error loading full bins:", error);
    }
  };

  const handleEdit = (bin) => {
    setSelectedBin(bin);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this bin?")) {
      try {
        await deleteBin(id);
        loadBins();
      } catch (error) {
        console.error("Error deleting bin:", error);
      }
    }
  };

  const handleGenerateRoute = async () => {
    try {
      setIsGeneratingRoute(true);
      const response = await generateRoute();
      setRouteData(response);
      toast.success('Route generated successfully!');
    } catch (error) {
      console.error('Error generating route:', error);
      toast.error('Failed to generate route');
    } finally {
      setIsGeneratingRoute(false);
    }
  };

  const filteredBins = bins.filter((bin) =>
    bin.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bins Management</h1>
          <p className="text-gray-600">
            Manage and monitor waste bins across the city
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedBin(null);
            setIsModalOpen(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Add New Bin
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search bins by location..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => showOnlyFull ? loadBins() : loadFullBins()}
            className={`px-4 py-2 rounded-lg ${
              showOnlyFull
                ? "bg-red-50 text-red-600 border border-red-200"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <AlertCircle className="h-4 w-4 inline mr-2" />
            {showOnlyFull ? "Show All Bins" : "Show Full Bins"}
          </button>

          {showOnlyFull && (
            <button
              onClick={handleGenerateRoute}
              disabled={isGeneratingRoute}
              className={`px-4 py-2 rounded-lg flex items-center gap-2
                ${isGeneratingRoute 
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100"
                }`}
            >
              <Truck className="h-4 w-4" />
              {isGeneratingRoute ? "Generating..." : "Generate Route"}
            </button>
          )}

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
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fill Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Collection
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBins.map((bin) => (
                  <tr key={bin.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {bin.location}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <FillLevelIndicator level={bin.fillLevel} />
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={bin.status} />
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500">
                        {bin.lastCollectionDate
                          ? new Date(
                              bin.lastCollectionDate
                            ).toLocaleDateString()
                          : "Never"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(bin)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(bin.id)}
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
        <BinMap bins={filteredBins} onBinClick={handleEdit} />
      )}

      {/* Modal */}
      <BinModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedBin(null);
        }}
        bin={selectedBin}
        onSave={loadBins}
      />
    </div>
  );
}

function FillLevelIndicator({ level }) {
  const getColorClass = () => {
    if (level >= 90) return "bg-red-600";
    if (level >= 70) return "bg-yellow-500";
    if (level >= 50) return "bg-yellow-200";
    return "bg-green-500";
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-gray-200 rounded-full h-2 w-24">
        <div
          className={`h-2 rounded-full ${getColorClass()}`}
          style={{ width: `${level}%` }}
        ></div>
      </div>
      <span className="text-sm text-gray-600">{level}%</span>
    </div>
  );
}

function StatusBadge({ status }) {
  const getStatusStyles = () => {
    switch (status) {
      case "FULL":
        return "bg-red-50 text-red-600 border-red-200";
      case "OVERFLOWING":
        return "bg-red-100 text-red-800 border-red-300";
      case "HALF_FULL":
        return "bg-yellow-50 text-yellow-600 border-yellow-200";
      case "QUARTERLY_FULL":
        return "bg-green-50 text-green-600 border-green-200";
      case "EMPTY":
        return "bg-gray-50 text-gray-600 border-gray-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const formatStatus = (status) => {
    return status
      ?.toLowerCase()
      .replace(/_/g, " ") // Replace all underscores with spaces
      .replace(/\b\w/g, (c) => c.toUpperCase()); // Capitalize first letter of each word
  };

  return (
    <span
      className={`text-xs px-2 py-1 rounded-full border ${getStatusStyles()}`}
    >
      {formatStatus(status)}
    </span>
  );
}

export default BinManagement;
