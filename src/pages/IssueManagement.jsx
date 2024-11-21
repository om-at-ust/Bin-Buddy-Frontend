import React, { useState, useEffect } from "react";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Search,
  ChevronDown,
  ChevronUp,
  User,
} from "lucide-react";
import { toast } from "react-hot-toast";

function IssueManagement() {
  const [issues, setIssues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  useEffect(() => {
    loadIssues();
  }, []);

  const loadIssues = async () => {
    try {
      const response = await fetch("http://localhost:8084/issues/getAllIssues");
      const data = await response.json();
      setIssues(data);
    } catch (error) {
      console.error("Error loading issues:", error);
      toast.error("Failed to load issues");
    }
  };

  const handleResolveIssue = async (issueId) => {
    try {
      const response = await fetch(
        `http://localhost:8084/issues/resolve/${issueId}`,
        {
          method: "PUT",
        }
      );
      if (response.ok) {
        loadIssues();
        toast.success("Issue marked as resolved");
      }
    } catch (error) {
      console.error("Error resolving issue:", error);
      toast.error("Failed to resolve issue");
    }
  };

  const handleDeleteIssue = async (issueId) => {
    try {
      const response = await fetch(
        `http://localhost:8084/issues/delete/${issueId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        loadIssues();
        toast.success("Issue deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting issue:", error);
      toast.error("Failed to delete issue");
    }
  };

  const toggleDescription = (issueId) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [issueId]: !prev[issueId],
    }));
  };

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || issue.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Issue Management</h1>
          <p className="text-gray-600">Manage and resolve reported issues</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search issues by description or username..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="all">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="RESOLVED">Resolved</option>
        </select>
      </div>

      {/* Issues List */}
      <div className="space-y-4">
        {filteredIssues.map((issue) => (
          <div
            key={issue.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-4">
                <div
                  className={`p-2 rounded-full ${
                    issue.status === "RESOLVED"
                      ? "bg-green-50 text-green-600"
                      : "bg-yellow-50 text-yellow-600"
                  }`}
                >
                  {issue.status === "RESOLVED" ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Clock className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-900">
                      {issue.username}
                    </span>
                  </div>
                  <div className="mt-1">
                    <p className="text-sm text-gray-500">
                      {new Date(issue.createdAt).toLocaleString()}
                    </p>
                    <div className="mt-2">
                      <p
                        className={`text-gray-700 ${
                          expandedDescriptions[issue.id] ? "" : "line-clamp-2"
                        }`}
                      >
                        {issue.description}
                      </p>
                      {issue.description.length > 150 && (
                        <button
                          onClick={() => toggleDescription(issue.id)}
                          className="text-green-600 hover:text-green-700 text-sm mt-1 flex items-center"
                        >
                          {expandedDescriptions[issue.id] ? (
                            <>
                              <ChevronUp className="h-4 w-4 mr-1" />
                              Show less
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-4 w-4 mr-1" />
                              Read more
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {issue.status === "PENDING" ? (
                  <button
                    onClick={() => handleResolveIssue(issue.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Mark as Resolved
                  </button>
                ) : (
                  <button
                    onClick={() => handleDeleteIssue(issue.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete Issue
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IssueManagement;
