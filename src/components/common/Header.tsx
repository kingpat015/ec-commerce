import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if scrolled more than 20px for transparency effect
      setScrolled(currentScrollY > 20);

      // Show/hide navigation based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setShowNav(false);
      } else {
        // Scrolling up
        setShowNav(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Main Topbar */}
      <div
        className={`transition-all duration-300 border-b border-gray-100 ${
          scrolled
            ? "bg-white/95 backdrop-blur-lg shadow-lg"
            : "bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Using actual Exelpack Corporation logo */}
            <Link to="/" className="flex items-center group">
              <img
                src="https://exelpackcorp.com/wp-content/themes/exelpack2014/img/logo.png"
                alt="Exelpack Corporation"
                className="h-12 w-auto transform group-hover:scale-105 transition-transform duration-300"
              />
            </Link>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {isAuthenticated && user ? (
                <>
                  <div className="hidden md:flex items-center space-x-3 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                    <span>
                      Welcome,{" "}
                      <span className="font-semibold text-gray-900">
                        {user.name}
                      </span>
                    </span>
                    <div className="w-px h-4 bg-gray-300"></div>
                    <span className="px-3 py-1 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full text-xs font-semibold shadow-md shadow-green-500/30">
                      {user.role.replace("_", " ").toUpperCase()}
                    </span>
                  </div>

                  {(user.role === "admin" ||
                    user.role === "hr_user" ||
                    user.role === "sales_user") && (
                    <Link
                      to="/admin"
                      className="hidden md:inline-flex items-center px-5 py-2.5 text-sm font-semibold text-green-700 bg-green-50 hover:bg-green-100 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md border border-green-200 hover:border-green-400"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                        />
                      </svg>
                      Dashboard
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-red-700 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 hover:-translate-y-0.5"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-green-700 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 hover:-translate-y-0.5"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs - Hidden on scroll down */}
      <nav
        className={`bg-gradient-to-b from-gray-50 to-white backdrop-blur-sm border-b border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all duration-300 ${
          showNav ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex space-x-2">
            <NavLink to="/" active={location.pathname === "/"}>
              Home
            </NavLink>
            <NavLink to="/about" active={location.pathname === "/about"}>
              About Us
            </NavLink>
            <NavLink to="/products" active={location.pathname === "/products"}>
              Products
            </NavLink>
            <NavLink to="/bulletin" active={location.pathname === "/bulletin"}>
              Bulletin
            </NavLink>
            <NavLink to="/contact" active={location.pathname === "/contact"}>
              Contact Us
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

const NavLink: React.FC<{
  to: string;
  children: React.ReactNode;
  active?: boolean;
}> = ({ to, children, active }) => {
  return (
    <Link
      to={to}
      className={`relative px-5 py-3 text-sm font-semibold transition-all duration-200 group ${
        active ? "text-green-700" : "text-gray-700 hover:text-green-700"
      }`}
    >
      {children}
      <span
        className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-600 to-yellow-500 transform transition-transform duration-200 origin-left ${
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
      ></span>
      {active && (
        <span className="absolute inset-0 bg-green-50 rounded-t-lg -z-10"></span>
      )}
    </Link>
  );
};

export default Header;
