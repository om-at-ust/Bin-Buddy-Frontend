import React from "react";
import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

function RaiseIssueButton() {
  return (
    <Link
      to="/raise-issue"
      className="fixed bottom-8 right-8 bg-red-600 text-white p-4 rounded-full 
        shadow-lg hover:bg-red-700 transition-all duration-300 
        hover:shadow-xl hover:scale-105
        flex items-center justify-center aspect-square"
    >
      <AlertCircle className="h-6 w-6" />
    </Link>
  );
}

export default RaiseIssueButton;
