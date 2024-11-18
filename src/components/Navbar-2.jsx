// import { Link } from "react-router-dom";
// import logo from "../assets/Logos/Dark.png";
// import { useAuth } from '../context/AuthContext';

// function Navbar() {
//   const { isLoggedIn, username, logout } = useAuth();

//   const handleLogout = () => {
//     logout();
//     window.location.href = '/';
//   };

//   return (
//     <nav className="bg-green-600 text-white shadow-lg">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex justify-between h-16 items-center">
//           <Link
//             to="/"
//             className="font-bold text-3xl flex items-center gap-2
//             transition-all hover:scale-105"
//           >
//             <img
//               src={logo}
//               alt="BinBuddy Logo"
//               className="w-18 h-16 drop-shadow-lg
//                 [filter:_drop-shadow(2px_2px_0_rgb(0_0_0_/_40%))]"
//             />
//             <span
//               className="text-white font-extrabold tracking-wider drop-shadow-lg
//               [text-shadow:_2px_2px_0_rgb(0_0_0_/_40%)]
//               [-webkit-text-stroke:_1px_rgba(0,0,0,0.1)]"
//             >
//               Bin Buddy
//             </span>
//           </Link>

//           <div className="flex space-x-4 items-center">
//             <Link to="/" className="hover:text-green-200 font-semibold text-lg">
//               Home
//             </Link>
//             <Link
//               to="/raise-issue"
//               className="hover:text-green-200 font-semibold text-lg"
//             >
//               Issue
//             </Link>

//             {!isLoggedIn ? (
//               <>
//                 <Link
//                   to="/login"
//                   className="px-4 py-1.5 bg-white text-green-600 rounded-xl
//                     font-semibold transition-all duration-300
//                     border border-green
//                     hover:bg-green-700 hover:text-white
//                     hover:shadow-lg hover:shadow-black-900/30
//                     active:scale-95
//                     transition-all hover:scale-105"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="px-4 py-1.5 bg-green-700 text-white rounded-xl
//                     font-semibold transition-all duration-300
//                     border-2 border-white
//                     hover:bg-white hover:text-green-600
//                     hover:shadow-lg hover:shadow-green-900/30
//                     active:scale-95
//                     transition-all hover:scale-110"
//                 >
//                   Sign Up
//                 </Link>
//               </>
//             ) : (
//               <div className="flex items-center space-x-4">
//                 <span className="font-semibold text-lg">
//                   Welcome, {username}
//                 </span>
//                 <button
//                   onClick={handleLogout}
//                   className="px-4 py-1.5 bg-white text-green-600 rounded-xl
//                     font-semibold transition-all duration-300
//                     border border-green
//                     hover:bg-red-600 hover:text-white
//                     hover:shadow-lg hover:shadow-black-900/30
//                     active:scale-95
//                     transition-all hover:scale-105"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


// import { useAuth } from "../context/AuthContext";
// import {
//   Menu,
//   X,
//   ChevronDown,
//   Home,
//   AlertCircle,
//   LogOut,
//   User,
// } from "lucide-react";

// function Navbar() {
//   const { isLoggedIn, username, logout } = useAuth();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleLogout = () => {
//     logout();
//     window.location.href = "/";
//   };

//   const isActiveLink = (path) => {
//     return location.pathname === path;
//   };

//   return (
//     <nav
//       className={`fixed w-full z-50 transition-all duration-300 ${
//         isScrolled
//           ? "bg-white shadow-lg"
//           : "bg-gradient-to-b from-gray-900/70 to-transparent backdrop-blur-sm"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-20 items-center">
//           {/* Logo Section */}
//           <Link to="/" className="flex items-center space-x-3 group">
//             <div
//               className={`p-2 rounded-xl transition-all duration-300 ${
//                 isScrolled ? "bg-green-100" : "bg-white/10"
//               }`}
//             >
//               <img
//                 src="/logo.png"
//                 alt="BinBuddy Logo"
//                 className="w-10 h-10 object-contain transform group-hover:scale-110 transition-transform duration-300"
//               />
//             </div>
//             <span
//               className={`font-extrabold text-2xl tracking-wider transition-all duration-300 ${
//                 isScrolled
//                   ? "text-green-600"
//                   : "text-green-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]"
//               }`}
//             >
//               Bin Buddy
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             <Link
//               to="/"
//               className={`nav-link group ${
//                 isActiveLink("/")
//                   ? "text-green-500"
//                   : isScrolled
//                   ? "text-gray-600 hover:text-green-600"
//                   : "text-green-500 hover:text-green-400"
//               }`}
//             >
//               <Home className="w-5 h-5 mb-1 transition-colors" />
//               <span>Home</span>
//             </Link>

//             <Link
//               to="/raise-issue"
//               className={`nav-link group ${
//                 isActiveLink("/raise-issue")
//                   ? "text-green-500"
//                   : isScrolled
//                   ? "text-gray-600 hover:text-green-600"
//                   : "text-green-500 hover:text-green-400"
//               }`}
//             >
//               <AlertCircle className="w-5 h-5 mb-1 transition-colors" />
//               <span>Issue</span>
//             </Link>

//             {!isLoggedIn ? (
//               <div className="flex items-center space-x-4">
//                 <Link
//                   to="/login"
//                   className={`px-6 py-2 rounded-full font-semibold transition-all duration-300
//                     ${
//                       isScrolled
//                         ? "bg-green-50 text-green-600 hover:bg-green-100"
//                         : "bg-white/10 text-green-500 hover:bg-white/20"
//                     } hover:scale-105`}
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="px-6 py-2 bg-green-600 text-white rounded-full font-semibold
//                     transition-all duration-300 hover:bg-green-700 hover:scale-105
//                     shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)]"
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             ) : (
//               <div className="relative">
//                 <button
//                   onClick={() =>
//                     setIsProfileDropdownOpen(!isProfileDropdownOpen)
//                   }
//                   className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
//                     isScrolled
//                       ? "hover:bg-gray-100 text-gray-700"
//                       : "hover:bg-white/10 text-green-500"
//                   }`}
//                 >
//                   <div
//                     className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                       isScrolled
//                         ? "bg-green-100 text-green-600"
//                         : "bg-white/10 text-green-500"
//                     }`}
//                   >
//                     <User className="w-5 h-5" />
//                   </div>
//                   <span className="font-medium">{username}</span>
//                   <ChevronDown className="w-4 h-4" />
//                 </button>

//                 {isProfileDropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg py-2 border border-gray-100">
//                     <button
//                       onClick={handleLogout}
//                       className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
//                     >
//                       <LogOut className="w-4 h-4" />
//                       <span>Sign out</span>
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className={`md:hidden p-2 rounded-lg transition-colors ${
//               isScrolled
//                 ? "text-gray-600 hover:bg-gray-100"
//                 : "text-green-500 hover:bg-white/10"
//             }`}
//           >
//             {isMobileMenuOpen ? (
//               <X className="w-6 h-6" />
//             ) : (
//               <Menu className="w-6 h-6" />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden bg-white border-t border-gray-100">
//           <div className="px-4 py-6 space-y-4">
//             <Link
//               to="/"
//               className="flex items-center space-x-2 text-gray-700 hover:text-green-600 py-2"
//               onClick={() => setIsMobileMenuOpen(false)}
//             >
//               <Home className="w-5 h-5" />
//               <span>Home</span>
//             </Link>

//             <Link
//               to="/raise-issue"
//               className="flex items-center space-x-2 text-gray-700 hover:text-green-600 py-2"
//               onClick={() => setIsMobileMenuOpen(false)}
//             >
//               <AlertCircle className="w-5 h-5" />
//               <span>Issue</span>
//             </Link>

//             {!isLoggedIn ? (
//               <div className="grid gap-3 pt-4">
//                 <Link
//                   to="/login"
//                   className="w-full px-6 py-2.5 bg-gray-50 text-gray-700 rounded-xl font-semibold text-center hover:bg-gray-100"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="w-full px-6 py-2.5 bg-green-600 text-white rounded-xl font-semibold text-center hover:bg-green-700"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             ) : (
//               <div className="pt-4 border-t border-gray-100">
//                 <div className="flex items-center space-x-2 mb-4">
//                   <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
//                     <User className="w-6 h-6 text-green-600" />
//                   </div>
//                   <span className="font-medium text-gray-700">{username}</span>
//                 </div>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full px-6 py-2.5 bg-red-50 text-red-600 rounded-xl font-semibold text-center flex items-center justify-center space-x-2 hover:bg-red-100"
//                 >
//                   <LogOut className="w-5 h-5" />
//                   <span>Sign out</span>
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Menu,
  X,
  ChevronDown,
  Home,
  AlertCircle,
  LogOut,
  User,
} from "lucide-react";

function Navbar() {
  const { isLoggedIn, username, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-eco-green-50 to-eco-green-100 shadow-sm border-b border-eco-green-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 rounded-xl bg-white/80 group-hover:bg-white transition-colors duration-300">
              <img
                src="/logo.png"
                alt="BinBuddy Logo"
                className="w-8 h-8 object-contain transform group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="font-extrabold text-2xl tracking-wider text-gray-800">
              Bin Buddy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`nav-link group flex flex-col items-center 
                text-gray-600 hover:text-green-700 transition-colors duration-300
                ${isActiveLink("/") && "text-green-700 font-semibold"}`}
            >
              <Home className="w-5 h-5 mb-1" />
              <span>Home</span>
            </Link>

            <Link
              to="/raise-issue"
              className={`nav-link group flex flex-col items-center 
                text-gray-600 hover:text-green-700 transition-colors duration-300
                ${
                  isActiveLink("/raise-issue") && "text-green-700 font-semibold"
                }`}
            >
              <AlertCircle className="w-5 h-5 mb-1" />
              <span>Issue</span>
            </Link>

            {!isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-6 py-2 bg-white text-green-600 rounded-full font-semibold
                    transition-all duration-300 
                    border border-green-200
                    hover:bg-green-600 hover:text-white
                    hover:shadow-md hover:scale-105"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 bg-green-600 text-white rounded-full font-semibold
                    transition-all duration-300
                    border border-green-600
                    hover:bg-green-700
                    hover:shadow-md hover:scale-105"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center space-x-2 px-4 py-2 rounded-full
                    text-gray-700 hover:bg-white/60 transition-colors duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                    <User className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="font-medium">{username}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg py-2 border border-gray-100">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-red-50 
                        hover:text-red-600 flex items-center space-x-2
                        transition-colors duration-300"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign out</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 
              hover:bg-white/60 transition-colors duration-300"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-6 space-y-4">
            {/* ... Mobile menu content remains the same ... */}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
