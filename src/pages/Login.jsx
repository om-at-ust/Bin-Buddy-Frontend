// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// function Login() {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [credentials, setCredentials] = useState({
//     username: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     try {
//       const response = await fetch("http://localhost:8222/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(credentials),
//       });

//       if (!response.ok) {
//         throw new Error("Server error");
//       }

//       const token = await response.text();

//       if (token === "Login FAILED") {
//         setError("Invalid credentials");
//         return;
//       }

//       sessionStorage.setItem("jwtToken", token);

//       const decodedToken = parseJwt(token);
//       if (decodedToken) {
//         const userData = {
//           username: decodedToken.sub,
//         };
//         login(userData);
//       }

//       navigate("/");
//     } catch (err) {
//       setError("An error occurred during login");
//       console.error("Login error:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const parseJwt = (token) => {
//     try {
//       return JSON.parse(atob(token.split(".")[1]));
//     } catch (e) {
//       return null;
//     }
//   };

//   return (
//     <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
//           Login to Bin Buddy
//         </h2>

//         {error && (
//           <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label
//               htmlFor="username"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={credentials.username}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
//               required
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={credentials.password}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//           >
//             Sign in
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User, KeyRound, Shield } from "lucide-react";

function Login() {
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
      const response = await fetch("http://localhost:8081/api/auth/login", {
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
        setError("Invalid credentials");
        return;
      }

      sessionStorage.setItem("jwtToken", token);

      const decodedToken = parseJwt(token);
      if (decodedToken) {
        const userData = {
          username: decodedToken.sub,
        };
        login(userData);
      }

      navigate("/");
    } catch (err) {
      setError("An error occurred during login");
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
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Welcome to Bin Buddy
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Sign in to access your account
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                className="pl-10 w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                required
                placeholder="Enter your username"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <KeyRound className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="pl-10 w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                required
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-6">
          <Link
            to="/admin/login"
            className="w-full py-2.5 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Shield className="w-5 h-5" />
            <span>Login as Administrator</span>
          </Link>
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-600 hover:text-green-700">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
