import React, { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { fetchBins } from "../services/binService";

function IssueForm() {
  const { username } = useAuth();
  const [description, setDescription] = useState("");
  const [binId, setBinId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bins, setBins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBins = async () => {
      try {
        const binsData = await fetchBins();
        console.log("Received bins data:", binsData);
        setBins(binsData);
      } catch (error) {
        console.error("Error loading bins:", error);
        toast.error("Failed to load bin locations");
      } finally {
        setLoading(false);
      }
    };

    loadBins();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      toast.error("Please provide a description");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `http://localhost:8084/issues/createIssue/${binId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description,
            username,
          }),
        }
      );

      if (response.ok) {
        toast.success("Issue reported successfully");
        setDescription("");
        setBinId("");
      } else {
        throw new Error("Failed to create issue");
      }
    } catch (error) {
      console.error("Error creating issue:", error);
      toast.error("Failed to report issue");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-red-50 rounded-full">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Report an Issue</h2>
            <p className="text-gray-600">
              Help us improve by reporting any problems you encounter
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="binId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Bin Location
            </label>
            <select
              id="binId"
              value={binId}
              onChange={(e) => setBinId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-green-500
                text-sm text-gray-700 font-medium"
              required
            >
              <option value="">Select a bin location</option>
              {bins && bins.length > 0 ? (
                bins.map((bin) => (
                  <option
                    key={bin.id}
                    value={bin.id}
                    className="text-sm font-medium"
                  >
                    {bin.location} - {bin.status} ({bin.fillLevel}% full)
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No bins available
                </option>
              )}
            </select>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Describe the issue in detail..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 
              transition-colors disabled:bg-green-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default IssueForm;
