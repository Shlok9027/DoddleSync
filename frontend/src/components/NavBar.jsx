import React, { useContext, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";
import { toast } from "react-toastify";
import { scroller } from "react-scroll";
import { assets } from "../assets/assets.js";

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const { navigate, token, logout, BACKEND_URL } = useContext(ShopContext);
  const location = useLocation();

  const handleProfileClick = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/user/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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
        toast.error(data.message || "Failed to fetch user.");
        logout();
      }
    } catch (error) {
      console.error("Error checking profile", error);
      // toast.error("This feature is exclusively available to clients.");
      navigate("/");
    }
  };

  const handleLogout = () => {
    logout();
  };

  const isHashLinkActive = (hashTarget) => {
    return location.pathname === "/" && location.hash === `#${hashTarget}`;
  };

  const handleNavLinkClick = async (path, hashTarget = "") => {
    setVisible(false);

    if (location.pathname !== path) {
      await navigate(path);
      setTimeout(() => {
        if (hashTarget) {
          scroller.scrollTo(hashTarget, {
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuart",
            offset: -100,
          });
        }
      }, 100);
    } else {
      if (hashTarget) {
        scroller.scrollTo(hashTarget, {
          duration: 800,
          delay: 0,
          smooth: "easeInOutQuart",
          offset: -100,
        });
      }
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

      <ul
        className="hidden lg:flex items-center gap-8 px-10 py-3 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
        text-sm sm:text-base font-medium text-white bg-white/10 border border-purple-300/30 backdrop-blur-md rounded-full shadow-xl transition-all duration-500"
      >
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
          <span className="nav-line absolute -bottom-1 left-1/2 h-[2px] bg-purple-700 rounded-full transition-all duration-500 ease-out transform -translate-x-1/2"></span>
        </NavLink>

        <Link
          to="/#products"
          className={`relative group transition-all duration-300 hover:scale-105 active:scale-95 px-2 ${
            isHashLinkActive("products") ? "active" : ""
          }`}
          onClick={() => handleNavLinkClick("/", "services")}
        >
          <p className="group-hover:text-purple-700 mb-3 sm:flex tracking-wide transition-all duration-300 ease-in-out">
            SERVICES
          </p>
          <span className="nav-line absolute -bottom-1 left-1/2 h-[2px] bg-purple-700 rounded-full transition-all duration-500 ease-in-out transform -translate-x-1/2"></span>
        </Link>

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

      <div className="relative flex flex-col sm:flex-row sm:items-center items-end fixed sm:static right-3 top-18 sm:top-auto transform sm:transform-none -translate-y-1/2 sm:translate-y-0 z-50 gap-3 sm:gap-4">
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
          <img
            src={assets.lock}
            alt="Locked"
            className="absolute top-5 right-0 w-5 h-5 sm:w-4 sm:h-4 rounded-full bg-white/80 backdrop-blur-md border border-purple-500 p-1 shadow-md transition-transform group-hover:scale-125"
          />
        </div>

        <img
          onClick={() => setVisible(true)}
          src={assets.menu}
          className="w-10 h-10 p-2 cursor-pointer bg-white/20 backdrop-blur-md rounded-full shadow-xl border border-purple-400 hover:scale-110 hover:rotate-6 transition-transform duration-500 ease-in-out lg:hidden"
          alt="Menu"
          aria-label="Open Menu"
        />

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
        className={`fixed top-0 right-0 bottom-0 bg-white/10 backdrop-blur-3xl border-l border-purple-200 shadow-[0_8px_40px_rgba(147,51,234,0.3)] transition-all duration-700 ease-in-out lg:hidden overflow-y-auto ${
          visible ? "w-[85%] h-[60vh] px-8 py-10" : "w-0 px-0 py-0"
        } rounded-l-3xl z-40`}
      >
        <div className="flex flex-col text-white font-semibold tracking-wide text-xl space-y-6">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 cursor-pointer text-purple-200 hover:text-white hover:scale-105 hover:animate-pulse transition-all duration-300"
          >
            <img
              src={assets.dropdown}
              className="h-5 rotate-180 filter drop-shadow-md"
              alt="Back"
            />
            <p className="text-lg font-bold">Back</p>
          </div>

          <Link to="/" onClick={() => handleNavLinkClick("/", "home")}>
            HOME
          </Link>
          <Link
            to="/#products"
            onClick={() => handleNavLinkClick("/", "products")}
          >
            SERVICES
          </Link>
          <Link
            to="/#packages"
            onClick={() => handleNavLinkClick("/", "packages")}
          >
            PACKAGES
          </Link>
          <Link
            to="/#connect"
            onClick={() => handleNavLinkClick("/", "connect")}
          >
            CONNECT WITH US
          </Link>
          <Link to="/#about" onClick={() => handleNavLinkClick("/", "about")}>
            ABOUT
          </Link>

          {token ? (
            <button
            className="font-bold from-neutral-950 to-fuchsia-900"
              onClick={() => {
                handleLogout();
                setVisible(false);
              }}
            >
              LOGOUT
            </button>
          ) : (
            <Link to="/login" onClick={() => setVisible(false)}>
              LOGIN
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
