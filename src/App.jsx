import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import BinManagement from "./pages/BinManagement";
import RouteManagement from "./pages/RouteManagement";
import { Toaster } from "react-hot-toast";
import FleetManagement from "./pages/FleetManagement";
import UserManagement from "./pages/UserManagement";
import IssueForm from "./components/IssueForm";
import IssueManagement from "./pages/IssueManagement";
import UserIssues from "./pages/UserIssues";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen">
          <Navbar />
          <Toaster />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/bin-management" element={<BinManagement />} />
            <Route path="/route-management" element={<RouteManagement />} />
            <Route path="/fleet-management" element={<FleetManagement />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/raise-issue" element={<IssueForm />} />
            <Route path="/issue-management" element={<IssueManagement />} />
            <Route path="/user-issues" element={<UserIssues />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
