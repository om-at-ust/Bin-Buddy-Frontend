import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

function TruckModal({ isOpen, onClose, truck, onSave }) {
  const [formData, setFormData] = useState({
    truckNumber: "",
    pickupCapacity: "",
    currentLocation: "",
    status: "AVAILABLE",
    startLatitude: "",
    startLongitude: "",
    endLatitude: "",
    endLongitude: "",
  });

  useEffect(() => {
    if (truck) {
      setFormData({
        truckNumber: truck.truckNumber,
        pickupCapacity: truck.pickupCapacity,
        currentLocation: truck.currentLocation,
        status: truck.status,
        startLatitude: truck.startLatitude,
        startLongitude: truck.startLongitude,
        endLatitude: truck.endLatitude,
        endLongitude: truck.endLongitude,
      });
    } else {
      setFormData({
        truckNumber: "",
        pickupCapacity: "",
        currentLocation: "",
        status: "AVAILABLE",
        startLatitude: "",
        startLongitude: "",
        endLatitude: "",
        endLongitude: "",
      });
    }
  }, [truck]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        truck
          ? `http://localhost:8083/api/trucks/${truck.id}`
          : "http://localhost:8083/api/trucks",
        {
          method: truck ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        onSave();
        onClose();
      } else {
        throw new Error("Failed to save truck");
      }
    } catch (error) {
      console.error("Error saving truck:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {truck ? "Edit Truck" : "Add New Truck"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Truck Number
            </label>
            <input
              type="text"
              value={formData.truckNumber}
              onChange={(e) =>
                setFormData({ ...formData, truckNumber: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pickup Capacity (tons)
            </label>
            <input
              type="number"
              value={formData.pickupCapacity}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  pickupCapacity: parseInt(e.target.value),
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Location
            </label>
            <input
              type="text"
              value={formData.currentLocation}
              onChange={(e) =>
                setFormData({ ...formData, currentLocation: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="AVAILABLE">Available</option>
              <option value="ON_ROUTE">On Route</option>
              <option value="MAINTENANCE">Maintenance</option>
              <option value="UNAVAILABLE">Unavailable</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Latitude
              </label>
              <input
                type="number"
                step="any"
                value={formData.startLatitude}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    startLatitude: parseFloat(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Longitude
              </label>
              <input
                type="number"
                step="any"
                value={formData.startLongitude}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    startLongitude: parseFloat(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Latitude
              </label>
              <input
                type="number"
                step="any"
                value={formData.endLatitude}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    endLatitude: parseFloat(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Longitude
              </label>
              <input
                type="number"
                step="any"
                value={formData.endLongitude}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    endLongitude: parseFloat(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
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
              {truck ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TruckModal;
