// admin/src/components/NavBar.jsx
import React, { useContext } from "react";
import { assets } from "../assets/assets.js";
import { Link, NavLink } from "react-router-dom";
import { AdminContext } from "../context/AdminContext.jsx";
import { useState } from "react";

const NavBar = () => {
  const { token, logout } = useContext(AdminContext);
  const [visible, setVisible] = useState(false);

  const handleLogout = () => {
    logout();
    setVisible(false);
  };

  return (
    <div className="relative top-0 z-50 flex items-center justify-between px-4 sm:px-6 py-4 shadow-lg border-gray-200 rounded-xl font-medium transition-all duration-500 ease-in-out">
   
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

      {/* Desktop Navigation Menu (Center) */}
      {token && (
        <ul className="hidden lg:flex gap-6 xl:gap-10 text-sm sm:text-base text-amber-50 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-3 rounded-2xl shadow-2xl border border-white/50 hover:shadow-purple-200 transition-all duration-500 ease-in-out">
          <NavLink
            to="/latest-inquiries"
            className="relative group transition-all duration-300 hover:scale-105 active:scale-95 px-2"
          >
            <p className="group-hover:text-purple-700 sm:flex tracking-wide transition-all duration-300 ease-in-out">
              INQUIRIES
            </p>
            <span className="absolute -bottom-1 left-1/2 w-0 group-hover:w-3/4 h-[2px] bg-purple-700 rounded-full transition-all duration-500 ease-out transform -translate-x-1/2"></span>
            <span className="nav-line absolute -bottom-1 left-1/2 w-0 h-[2px] bg-purple-700 rounded-full transition-all duration-500 ease-out transform -translate-x-1/2"></span>
          </NavLink>
          <NavLink
            to="/client-chats"
            className="relative group transition-all duration-300 hover:scale-105 active:scale-95 px-2"
          >
             <img
          src={assets.chat}
          alt="Profile"
          className="w-5 h-5 rounded-full shadow-xl border-2 border-purple-400 object-cover hover:scale-110 hover:shadow-purple-300/80 transition-transform duration-500 ease-in-out animate-pulse"
        />
            <span className="absolute -bottom-1 left-1/2 w-0 group-hover:w-3/4 h-[2px] bg-purple-700 rounded-full transition-all duration-500 ease-out transform -translate-x-1/2"></span>
            <span className="nav-line absolute -bottom-1 left-1/2 w-0 h-[2px] bg-purple-700 rounded-full transition-all duration-500 ease-out transform -translate-x-1/2"></span>
          </NavLink>
          <NavLink
            to="/product-packages"
            className="relative group transition-all duration-300 hover:scale-105 active:scale-95 px-2"
          >
            <p className="group-hover:text-purple-700 sm:flex tracking-wide transition-all duration-300 ease-in-out">
              PACKAGES
            </p>
            <span className="absolute -bottom-1 left-1/2 w-0 group-hover:w-3/4 h-[2px] bg-purple-700 rounded-full transition-all duration-500 ease-out transform -translate-x-1/2"></span>
            <span className="nav-line absolute -bottom-1 left-1/2 w-0 h-[2px] bg-purple-700 rounded-full transition-all duration-500 ease-out transform -translate-x-1/2"></span>
          </NavLink>
        </ul>
      )}

      {/* Right Side (Icons and Buttons) */}
      <div className="relative flex flex-col sm:flex-row sm:items-center items-end fixed sm:static right-3 top-18 sm:top-auto transform sm:transform-none -translate-y-1/2 sm:translate-y-0 z-50 gap-3 sm:gap-4">
        {/* <img
          src={assets.chat}
          alt="Profile"
          className="w-11 h-11 rounded-full shadow-xl border-2 border-purple-400 object-cover hover:scale-110 hover:shadow-purple-300/80 transition-transform duration-500 ease-in-out animate-pulse"
        /> */}
        {/* <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon
            
          }
          className="w-8 h-8 p-2 cursor-pointer bg-white/30 backdrop-blur-lg rounded-full shadow-md border border-purple-300 hover:scale-110 hover:rotate-3 transition-all duration-500 ease-in-out lg:hidden"
          alt="Menu"
        /> */}
        {token ? (
          <>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white px-5 py-2 rounded-full shadow-lg hover:shadow-purple-300 hover:scale-105 transition-all duration-500 ease-in-out text-sm font-semibold tracking-wide"
            >
              Logout
            </button>
            <a
              href={import.meta.env.VITE_CLIENT_URL || "http://localhost:5173"}
              className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white px-5 py-2 rounded-full shadow-lg hover:shadow-blue-300 hover:scale-105 transition-all duration-500 ease-in-out text-sm font-semibold tracking-wide"
            >
              Go to Frontend
            </a>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white px-5 py-2 rounded-full shadow-lg hover:shadow-purple-300 hover:scale-105 transition-all duration-500 ease-in-out text-sm font-semibold tracking-wide"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
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
          {token ? (
            <>
              <NavLink
                to="/latest-inquiries"
                className="py-3 pl-6 border-b border-white/20 hover:bg-purple-100/10 hover:text-purple-300 transition-all duration-300 text-left"
                onClick={() => setVisible(false)}
              >
                INQUIRIES
              </NavLink>
              <NavLink
                to="/client-chats"
                className="py-3 pl-6 border-b border-white/20 hover:bg-purple-100/10 hover:text-purple-300 transition-all duration-300 text-left"
                onClick={() => setVisible(false)}
              >
                CHATS
              </NavLink>
              <NavLink
                to="/product-packages"
                className="py-3 pl-6 border-b border-white/20 hover:bg-purple-100/10 hover:text-purple-300 transition-all duration-300 text-left"
                onClick={() => setVisible(false)}
              >
                PACKAGES
              </NavLink>
              <button
                onClick={handleLogout}
                className="py-3 pl-6 border-b border-white/20 hover:bg-purple-100/10 hover:text-purple-300 transition-all duration-300 text-left"
              >
                LOGOUT
              </button>
{/*               <a
                href={"https://doddlesync.onrender.com/"}
                className="py-3 pl-6 border-b border-white/20 hover:bg-blue-100/10 hover:text-blue-300 transition-all duration-300 text-left"
              >
                GO TO FRONTEND
              </a> */}
            </>
          ) : (
            <Link
              to="/login"
              className="py-3 pl-6 border-b border-white/20 hover:bg-purple-100/10 hover:text-purple-300 transition-all duration-300"
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
