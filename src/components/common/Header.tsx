import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const styles = `
  @keyframes bounceIn {
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }
    60% {
      transform: translateY(10px);
      opacity: 1;
    }
    80% {
      transform: translateY(-5px);
    }
    100% {
      transform: translateY(0);
    }
  }

  @keyframes slideDown {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -200% center;
    }
    100% {
      background-position: 200% center;
    }
  }

  .animate-bounce-in {
    animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .animate-slide-down {
    animation: slideDown 0.4s ease-out;
  }

  .shimmer-effect {
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.3) 50%,
      transparent 100%
    );
    background-size: 200% 100%;
    animation: shimmer 3s infinite;
  }
`;

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNav, setShowNav] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNav(false);
      } else {
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
    <>
      <style>{styles}</style>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{ fontFamily: "'Roboto', 'Open Sans', sans-serif" }}
      >
        {/* Main Topbar - Enhanced with elevation */}
        <div
          className={`relative transition-all duration-500 ${
            scrolled
              ? "bg-white/90 backdrop-blur-xl shadow-2xl"
              : "bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
          }`}
          style={{ zIndex: 2 }}
        >
          <div className="container mx-auto px-4 lg:px-6">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <Link to="/" className="flex items-center group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-yellow-400/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                  src="https://exelpackcorp.com/wp-content/themes/exelpack2014/img/logo.png"
                  alt="Exelpack Corporation"
                  className="h-14 w-auto transform group-hover:scale-105 transition-all duration-300 relative z-10 drop-shadow-lg"
                />
              </Link>

              {/* Desktop User Menu */}
              <div className="hidden md:flex items-center space-x-3">
                {isAuthenticated && user ? (
                  <>
                    <div className="flex items-center space-x-3 bg-gradient-to-r from-gray-50 to-white px-5 py-2.5 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 leading-none">
                            Welcome,
                          </p>
                          <p className="font-semibold text-gray-900 text-sm leading-tight">
                            {user.name}
                          </p>
                        </div>
                      </div>
                      <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
                      <span className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-green-500/40 uppercase tracking-wide">
                        {user.role.replace("_", " ")}
                      </span>
                    </div>

                    {(user.role === "admin" ||
                      user.role === "hr_user" ||
                      user.role === "sales_user") && (
                      <Link
                        to="/admin"
                        className="group relative inline-flex items-center px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-green-600 to-green-700 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-green-500/50 hover:-translate-y-1"
                      >
                        <span className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100"></span>
                        <svg
                          className="w-4 h-4 mr-2 relative z-10"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                          />
                        </svg>
                        <span className="relative z-10">Dashboard</span>
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="group relative inline-flex items-center px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-red-500/50 hover:-translate-y-1"
                    >
                      <span className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100"></span>
                      <svg
                        className="w-4 h-4 mr-2 relative z-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span className="relative z-10">Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-6 py-2.5 text-sm font-bold text-gray-700 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      className="group relative inline-flex items-center px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-green-600 to-green-700 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-green-500/50 hover:-translate-y-1"
                    >
                      <span className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100"></span>
                      <span className="relative z-10">Register</span>
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs - With visible separation */}
        <nav
          className={`relative bg-gradient-to-b from-gray-50 via-white to-gray-50 border-t-2 border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-500 ease-out ${
            showNav
              ? "translate-y-0 opacity-100 animate-bounce-in"
              : "-translate-y-full opacity-0"
          }`}
          style={{ zIndex: 1 }}
        >
          <div className="container mx-auto px-4 lg:px-6">
            <div className="hidden md:flex items-center space-x-1 py-1">
              <NavLink to="/" active={location.pathname === "/"}>
                <svg
                  className="w-4 h-4 mr-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Home
              </NavLink>
              <NavLink to="/about" active={location.pathname === "/about"}>
                <svg
                  className="w-4 h-4 mr-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                About Us
              </NavLink>
              <NavLink
                to="/products"
                active={location.pathname === "/products"}
              >
                <svg
                  className="w-4 h-4 mr-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                Products
              </NavLink>
              <NavLink
                to="/bulletin"
                active={location.pathname === "/bulletin"}
              >
                <svg
                  className="w-4 h-4 mr-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Bulletin
              </NavLink>
              <NavLink to="/contact" active={location.pathname === "/contact"}>
                <svg
                  className="w-4 h-4 mr-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Contact Us
              </NavLink>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200 shadow-xl animate-slide-down">
            <div className="container mx-auto px-4 py-4 space-y-2">
              <MobileNavLink
                to="/"
                active={location.pathname === "/"}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </MobileNavLink>
              <MobileNavLink
                to="/about"
                active={location.pathname === "/about"}
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </MobileNavLink>
              <MobileNavLink
                to="/products"
                active={location.pathname === "/products"}
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </MobileNavLink>
              <MobileNavLink
                to="/bulletin"
                active={location.pathname === "/bulletin"}
                onClick={() => setMobileMenuOpen(false)}
              >
                Bulletin
              </MobileNavLink>
              <MobileNavLink
                to="/contact"
                active={location.pathname === "/contact"}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </MobileNavLink>

              {isAuthenticated && user ? (
                <div className="pt-4 mt-4 border-t border-gray-200">
                  {(user.role === "admin" ||
                    user.role === "hr_user" ||
                    user.role === "sales_user") && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-green-700 rounded-xl text-center mb-2"
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-xl text-center"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="pt-4 mt-4 border-t border-gray-200 space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full px-4 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl text-center"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-green-700 rounded-xl text-center"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
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
      className={`relative inline-flex items-center px-6 py-4 text-sm font-bold transition-all duration-300 group ${
        active ? "text-green-700" : "text-gray-700 hover:text-green-700"
      }`}
    >
      {children}

      <span
        className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-600 via-green-500 to-yellow-500 transform transition-all duration-300 origin-left rounded-t-full ${
          active
            ? "scale-x-100 opacity-100"
            : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
        }`}
      ></span>

      {active && (
        <span className="absolute inset-0 bg-gradient-to-b from-green-50/80 to-transparent rounded-t-2xl -z-10 animate-slide-down"></span>
      )}

      <span className="absolute inset-0 bg-gradient-to-b from-green-50/0 to-transparent rounded-t-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
    </Link>
  );
};

const MobileNavLink: React.FC<{
  to: string;
  children: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}> = ({ to, children, active, onClick }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
        active
          ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg shadow-green-500/30"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {children}
    </Link>
  );
};

export default Header;
