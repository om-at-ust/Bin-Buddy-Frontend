import { Link } from "react-router-dom";
import logo from "../assets/Logos/Dark.png";

function Navbar() {
  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link
            to="/"
            className="font-bold text-3xl flex items-center gap-2 
            transition-all hover:scale-105"
          >
            <img
              src={logo}
              alt="BinBuddy Logo"
              className="w-18 h-16 drop-shadow-lg
                [filter:_drop-shadow(2px_2px_0_rgb(0_0_0_/_40%))]"
            />
            <span
              className="text-white font-extrabold tracking-wider drop-shadow-lg 
              [text-shadow:_2px_2px_0_rgb(0_0_0_/_40%)] 
              [-webkit-text-stroke:_1px_rgba(0,0,0,0.1)]"
            >
              Bin Buddy
            </span>
          </Link>
          <div className="flex space-x-4 items-center">
            <Link to="/" className="hover:text-green-200 font-semibold text-lg">
              Home
            </Link>
            <Link
              to="/raise-issue"
              className="hover:text-green-200 font-semibold text-lg"
            >
              Issue
            </Link>
            <Link
              to="/login"
              className="px-4 py-1.5 bg-white text-green-600 rounded-xl
                font-semibold transition-all duration-300
                border border-green
                hover:bg-green-700 hover:text-white
                hover:shadow-lg hover:shadow-black-900/30
                active:scale-95
                transition-all hover:scale-105                
                "
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-1.5 bg-green-700 text-white rounded-xl
                font-semibold transition-all duration-300
                border-2 border-white
                hover:bg-white hover:text-green-600
                hover:shadow-lg hover:shadow-green-900/30
                active:scale-95
                transition-all hover:scale-110
                "
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
