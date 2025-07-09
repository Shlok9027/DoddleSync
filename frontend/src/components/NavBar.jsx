import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { Link, NavLink, useLocation } from "react-router-dom"; // Keep NavLink for direct routes
import { ShopContext } from "../context/ShopContext.jsx";
import { toast } from "react-toastify";
import { scroller } from "react-scroll";

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const { navigate, token, logout } = useContext(ShopContext);
  const location = useLocation();

  const handleProfileClick = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/me`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();

      if (data.success && data.user) {
        const { name, email, phone } = data.user;

        if (name && email && phone) {
          navigate("/chat");
        } else {
          toast.error("This feature is exclusively available to clients.");
          navigate("/");
        }
      } else {
        toast.error(
          data.message || "Failed to fetch user."
        );
        logout();
      }
    } catch (error) {
      console.error("Error checking profile", error);
      toast.error(
        "This feature is exclusively available to clients."
      );
      navigate("/");
    }
  };

  const handleLogout = () => {
    logout();
  };

  const isHashLinkActive = (hashTarget) => {
    return location.pathname === "/" && location.hash === `#${hashTarget}`;
  };

  const handleNavLinkClick = (path, hashTarget = "") => {
    setVisible(false); // Close mobile sidebar

    if (hashTarget) {
      navigate(`/#${hashTarget}`);
    } else {
      navigate(path);
    }
  };

  return (
    <div className="relative top-1 left-0  right-0 w-full z-50 flex items-center justify-between px-4 sm:px-6 py-4 shadow-lg border-gray-200 rounded-xl font-medium transition-all duration-500 ease-in-out bg-transparent backdrop-blur-md">
      <Link to="/" className="flex-shrink-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-900 rounded-full mix-blend-overlay filter blur-3xl pointer-events-none opacity-40 animate-blob z-0" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full blur-3xl mix-blend-overlay filter pointer-events-none opacity-40 animate-blob animation-delay-2000 z-0" />
        <div className="absolute bottom-0 left-20 w-72 h-72 bg-pink-500 rounded-full blur-3xl mix-blend-overlay filter pointer-events-none opacity-40 animate-blob animation-delay-4000 z-0" />
        <div className="w-[221px] h-[111px] bg-gradient-to-br from-purple-100 to-purple-500 rounded-2xl flex items-center justify-center p-2 transition-transform duration-500 hover:rotate-2 hover:scale-111">
          <img
            src={assets.logo}
            alt="Logo"
            className="w-full h-full object-contain transition-transform  duration-500 ease-in-out"
          />
        </div>
      </Link>

      {/* Navigation Links (Centered in Navbar) */}
      <ul
        className="hidden lg:flex items-center gap-8 px-10 py-3 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
        text-sm sm:text-base font-medium text-white bg-white/10 border border-purple-300/30 backdrop-blur-md rounded-full shadow-xl transition-all duration-500"
      >
        {/* HOME NavLink (Direct Route or Default Hash) */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `relative group transition-all duration-300 hover:scale-105 active:scale-95 px-2 ${
              isActive ||
              (location.pathname === "/" && location.hash === "#home") ||
              (location.pathname === "/" && location.hash === "")
                ? "active"
                : ""
            }`
          }
          onClick={(e) => {
            e.preventDefault();
            handleNavLinkClick("/", "home");
          }}
        >
          <p className="group-hover:text-purple-700 mb-3 sm:flex tracking-wide transition-all duration-300 ease-in-out">
            HOME
          </p>
          {/* span for the underline. CSS will control its width. */}
          <span className="nav-line absolute -bottom-1 left-1/2 h-[2px] bg-purple-700 rounded-full transition-all duration-500 ease-out transform -translate-x-1/2"></span>
        </NavLink>

        {/* SERVICES Link (Goes to Home page, then scrolls) */}
        <Link
          to="/#services" // The actual target URL for browser navigation/history
          className={`relative group transition-all duration-300 hover:scale-105 active:scale-95 px-2 ${
            isHashLinkActive("services") ? "active" : ""
          }`}
          onClick={() => handleNavLinkClick("/", "services")} // Triggers navigation/scroll logic
        >
          <p className="group-hover:text-purple-700 mb-3 sm:flex tracking-wide transition-all duration-300 ease-in-out">
            SERVICES
          </p>
          <span className="nav-line absolute -bottom-1 left-1/2 h-[2px] bg-purple-700 rounded-full transition-all duration-500 ease-in-out transform -translate-x-1/2"></span>
        </Link>

        {/* PACKAGES Link (Goes to Home page, then scrolls) */}
        <Link
          to="/#packages"
          className={`relative group transition-all duration-300 hover:scale-105 active:scale-95 px-2 ${
            isHashLinkActive("packages") ? "active" : ""
          }`}
          onClick={() => handleNavLinkClick("/", "packages")}
        >
          <p className="group-hover:text-purple-700 mb-3 sm:flex tracking-wide transition-all duration-300 ease-in-out">
            PACKAGES
          </p>
          <span className="nav-line absolute -bottom-1 left-1/2 h-[2px] bg-purple-700 rounded-full transition-all duration-500 ease-in-out transform -translate-x-1/2"></span>
        </Link>

        {/* CONNECT WITH US Link (Goes to Home page, then scrolls) */}
        <Link
          to="/#connect"
          className={`relative group transition-all duration-300 hover:scale-105 active:scale-95 px-2 ${
            !token ? "pointer-events-none opacity-50" : ""
          } ${isHashLinkActive("connect") ? "active" : ""}`}
          onClick={() => handleNavLinkClick("/", "connect")}
          title={!token ? "Please log in to access this page" : ""}
        >
          <p className="group-hover:text-purple-700 sm:flex tracking-wide transition-all duration-300 ease-in-out font-semibold">
            CONNECT WITH
          </p>
          <p className="ml-12 group-hover:text-purple-700 sm:flex tracking-widest transition-all duration-300 ease-in-out font-mono">
            US
          </p>
          <span className="nav-line absolute -bottom-1 left-1/2 h-[2px] bg-purple-700 rounded-full transition-all duration-500 ease-out transform -translate-x-1/2"></span>
        </Link>

        {/* ABOUT Link (Goes to Home page, then scrolls) */}
        <Link
          to="/#about"
          className={`relative group transition-all duration-300 hover:scale-105 active:scale-95 px-2 ${
            isHashLinkActive("about") ? "active" : ""
          }`}
          onClick={() => handleNavLinkClick("/", "about")}
        >
          <p className="group-hover:text-purple-700 mb-3 sm:flex tracking-wide transition-all duration-300 ease-in-out">
            ABOUT
          </p>
          <span className="nav-line absolute -bottom-1 left-1/2 h-[2px] bg-purple-700 rounded-full transition-all duration-500 ease-in-out transform -translate-x-1/2"></span>
        </Link>
      </ul>

      {/* Icons Section (Right Side) */}
      <div className="relative flex flex-col sm:flex-row sm:items-center items-end fixed sm:static right-3 top-18 sm:top-auto transform sm:transform-none -translate-y-1/2 sm:translate-y-0 z-50 gap-3 sm:gap-4">
        {/* Chat Icon with Conditional Lock Overlay */}
        <div
          className="relative group w-10 h-10 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-md rounded-full shadow-xl border-2 border-purple-300 overflow-hidden hover:scale-110 hover:shadow-purple-400 transition-all duration-500 ease-in-out cursor-pointer"
          onClick={handleProfileClick}
          aria-label={token ? "Go to Chat" : "Log in"}
        >
          <img
            src={assets.chat}
            alt="Chat"
            className="w-full h-full object-cover"
          />

          {/* Lock overlay */}
          <img
            src={assets.lock}
            alt="Locked"
            className="absolute top-5 right-0 w-5 h-5 sm:w-4 sm:h-4 rounded-full bg-white/80 backdrop-blur-md border border-purple-500 p-1 shadow-md transition-transform group-hover:scale-125"
          />
        </div>

        {/* Menu Icon (Only visible when navbar <ul> is hidden) */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu}
          className="w-10 h-10 p-2 cursor-pointer bg-white/20 backdrop-blur-md rounded-full shadow-xl border border-purple-400 hover:scale-110 hover:rotate-6 transition-transform duration-500 ease-in-out lg:hidden"
          alt="Menu"
          aria-label="Open Menu"
        />

        {/* Conditional Login/Logout Button */}
        {token ? (
          <button
            onClick={handleLogout}
            className="bg-gradient-to-tr from-purple-600 via-pink-500 to-purple-700 text-white px-6 py-2 rounded-full shadow-xl backdrop-blur-md hover:shadow-pink-400 hover:scale-110 transition-all duration-500 ease-in-out text-sm font-semibold tracking-wide"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-gradient-to-tr from-purple-600 via-pink-500 to-purple-700 text-white px-6 py-2 rounded-full shadow-xl backdrop-blur-md hover:shadow-pink-400 hover:scale-110 transition-all duration-500 ease-in-out text-sm font-semibold tracking-wide"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 bottom-0 bg-white/10 backdrop-blur-2xl border-l border-purple-200 shadow-[0_8px_30px_rgba(147,51,234,0.3)] transition-all duration-700 ease-in-out lg:hidden overflow-y-auto ${
          visible ? "w-4/5 px-6 py-8" : "w-0 px-0 py-0"
        } rounded-l-3xl z-40`}
      >
        <div className="flex flex-col text-white font-semibold tracking-wide text-lg space-y-4">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-3 cursor-pointer text-purple-200 hover:text-white hover:scale-105 hover:animate-pulse transition-all duration-300"
          >
            <img src={assets.dropdown} className="h-4 rotate-180" alt="" />
            <p>Back</p>
          </div>
          <Link
            className={`py-3 pl-6 border-b border-white/20 hover:bg-purple-100/10 hover:text-purple-300 transition-all duration-300 ${
              isHashLinkActive("home") ||
              (location.pathname === "/" && location.hash === "")
                ? "active"
                : ""
            }`}
            to="/"
            onClick={() => handleNavLinkClick("/", "home")}
          >
            HOME
          </Link>
          <Link
            className={`py-3 pl-6 border-b border-white/20 hover:bg-purple-100/10 hover:text-purple-300 transition-all duration-300 ${
              isHashLinkActive("services") ? "active" : ""
            }`}
            to="/#services"
            onClick={() => handleNavLinkClick("/", "services")}
          >
            SERVICES
          </Link>
          <Link
            className={`py-3 pl-6 border-b border-white/20 hover:bg-purple-100/10 hover:text-purple-300 transition-all duration-300 ${
              isHashLinkActive("packages") ? "active" : ""
            }`}
            to="/#packages"
            onClick={() => handleNavLinkClick("/", "packages")}
          >
            PACKAGES
          </Link>
          <Link
            className={`py-3 pl-6 border-b border-white/20 hover:bg-purple-100/10 hover:text-purple-300 transition-all duration-300 ${
              !token ? "pointer-events-none opacity-50" : ""
            } ${isHashLinkActive("connect") ? "active" : ""}`}
            to="/#connect"
            onClick={() => handleNavLinkClick("/", "connect")}
            title={!token ? "Please log in to access this page" : ""}
          >
            CONNECT WITH US
          </Link>
          <Link
            className={`py-3 pl-6 border-b border-white/20 hover:bg-purple-100/10 hover:text-purple-300 transition-all duration-300 ${
              isHashLinkActive("about") ? "active" : ""
            }`}
            to="/#about"
            onClick={() => handleNavLinkClick("/", "about")}
          >
            ABOUT
          </Link>
          {/* Conditional Login/Logout in Mobile Sidebar */}
          {token ? (
            <button
              onClick={() => {
                handleLogout();
                setVisible(false);
              }}
              className="py-3 pl-6 border-b border-white/20 hover:bg-purple-100/10 hover:text-purple-300 transition-all duration-300 text-left"
            >
              LOGOUT
            </button>
          ) : (
            <Link
              className={`py-3 pl-6 border-b border-white/20 hover:bg-purple-100/10 hover:text-purple-300 transition-all duration-300 ${
                location.pathname === "/login" ? "active" : ""
              }`}
              to="/login"
              onClick={() => setVisible(false)}
            >
              LOGIN
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
