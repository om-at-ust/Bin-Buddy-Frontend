import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Shield, KeyRound, User, Lock } from "lucide-react";

function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8222/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const token = await response.text();

      if (token === "Login FAILED") {
        setError("Invalid administrator credentials");
        return;
      }

      sessionStorage.setItem("jwtToken", token);

      const decodedToken = parseJwt(token);
      if (decodedToken) {
        const userData = {
          username: decodedToken.sub,
          isAdmin: true,
        };
        login(userData);
      }

      navigate("/admin/dashboard");
    } catch (err) {
      setError("Authentication failed. Please verify your credentials.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border-t-4 border-green-600">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-green-600 rounded-full shadow-lg">
            <Lock className="w-12 h-12 text-white" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Admin Portal
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Restricted Access - Authorized Personnel Only
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-md">
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              <span className="font-medium">Security Alert:</span>
              <span className="ml-2">{error}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Administrator ID
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-green-600" />
              </div>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                className="pl-10 w-full rounded-lg border-2 border-gray-300 bg-gray-50 p-3 text-sm focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                required
                placeholder="Enter your admin ID"
              />
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Security Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <KeyRound className="h-5 w-5 text-green-600" />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="pl-10 w-full rounded-lg border-2 border-gray-300 bg-gray-50 p-3 text-sm focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                required
                placeholder="Enter your secure password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Shield className="w-5 h-5" />
                <span>Access Control Panel</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/login"
            className="text-sm text-green-600 hover:text-green-800 transition-colors flex items-center justify-center gap-2"
          >
            <span>Return to User Login</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
