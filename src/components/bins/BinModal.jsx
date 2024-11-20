import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { saveBin, updateBin } from "../../services/binService";
import { toast } from "react-hot-toast";

function BinModal({ isOpen, onClose, bin, onSave }) {
  const getFillLevelStyle = (status) => {
    switch (status) {
      case "EMPTY":
        return "bg-gray-50";
      case "QUARTERLY_FULL":
        return "bg-green-50";
      case "HALF_FULL":
        return "bg-yellow-50";
      case "FULL":
        return "bg-red-50";
      case "OVERFLOWING":
        return "bg-red-100";
      default:
        return "bg-gray-50";
    }
  };

  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
    fillLevel: 0,
    status: "EMPTY",
  });

  useEffect(() => {
    if (bin) {
      setFormData({
        latitude: bin.latitude,
        longitude: bin.longitude,
        fillLevel: bin.fillLevel,
        status: bin.status,
      });
    } else {
      setFormData({
        latitude: "",
        longitude: "",
        fillLevel: 0,
        status: "EMPTY",
      });
    }
  }, [bin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate form data
      if (!formData.latitude || !formData.longitude) {
        toast.error("Latitude and longitude are required");
        return;
      }

      // Convert string values to numbers for coordinates
      const binData = {
        ...formData,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        fillLevel: parseInt(formData.fillLevel, 10)
      };

      console.log("Submitting bin data:", binData); // Debug log

      if (bin) {
        await updateBin(bin.id, binData);
        toast.success("Bin updated successfully");
      } else {
        await saveBin(binData);
        toast.success("Bin created successfully");
      }

      onClose();
      if (onSave) onSave();
    } catch (error) {
      console.error("Detailed error:", error);
      toast.error(`Error ${bin ? 'updating' : 'saving'} bin: ${error.message}`);
    }
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    let fillLevel;

    // Set fill level based on status
    switch (status) {
      case "EMPTY":
        fillLevel = 0;
        break;
      case "QUARTERLY_FULL":
        fillLevel = 25;
        break;
      case "HALF_FULL":
        fillLevel = 50;
        break;
      case "FULL":
        fillLevel = 100;
        break;
      case "OVERFLOWING":
        fillLevel = 100;
        break;
      default:
        fillLevel = 0;
    }

    setFormData((prev) => ({
      ...prev,
      status,
      fillLevel,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {bin ? "Edit Bin" : "Add New Bin"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Latitude
              </label>
              <input
                type="number"
                step="any"
                value={formData.latitude}
                onChange={(e) =>
                  setFormData({ ...formData, latitude: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Longitude
              </label>
              <input
                type="number"
                step="any"
                value={formData.longitude}
                onChange={(e) =>
                  setFormData({ ...formData, longitude: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fill Level (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.fillLevel}
              readOnly
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${getFillLevelStyle(
                formData.status
              )}`}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={handleStatusChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="EMPTY">Empty</option>
              <option value="QUARTERLY_FULL">Quarter Full</option>
              <option value="HALF_FULL">Half Full</option>
              <option value="FULL">Full</option>
              <option value="OVERFLOWING">Overflowing</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              {bin ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BinModal;
