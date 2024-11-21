import React, { useState, useEffect } from "react";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

function UserIssues() {
  const { username } = useAuth();
  const [issues, setIssues] = useState([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  useEffect(() => {
    if (username) {
      loadUserIssues();
    }
  }, [username]);

  const loadUserIssues = async () => {
    try {
      const response = await fetch(`/api/issues/user/${username}`);
      const data = await response.json();
      setIssues(data);
    } catch (error) {
      console.error("Error loading issues:", error);
      toast.error("Failed to load issues");
    }
  };

  const toggleDescription = (issueId) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [issueId]: !prev[issueId],
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Issues</h1>
        <p className="text-gray-600">
          Track the status of your reported issues
        </p>
      </div>

      <div className="space-y-6">
        {issues.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              You haven't reported any issues yet.
            </p>
          </div>
        ) : (
          issues.map((issue) => (
            <div
              key={issue.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    {issue.status === "RESOLVED" ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Resolved
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-50 text-yellow-700">
                        <Clock className="h-4 w-4 mr-1" />
                        Pending
                      </span>
                    )}
                    <span className="text-sm text-gray-500">
                      Reported on{" "}
                      {new Date(issue.createdAt).toLocaleDateString()}
                    </span>
                  </div>
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
                  {issue.resolvedAt && (
                    <p className="text-sm text-gray-500 mt-2">
                      Resolved on{" "}
                      {new Date(issue.resolvedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserIssues;
