import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { packages } from "../assets/assets";
import io from "socket.io-client";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const navigate = useNavigate();
  const currency = "₹";

  // Correctly use import.meta.env for Vite environment variables
  // const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // <-- Corrected

    const BACKEND_URL = "https://doddlesync-backend.onrender.com"; // <-- Corrected


  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [projectDetails, setProjectDetails] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);

  const customPackage = packages.find((pkg) => pkg.isCustom);

  const [selectedPackage, setSelectedPackage] = useState(
    JSON.parse(localStorage.getItem("selectedPackage")) || customPackage
  );

  const [userDetails, setUserDetails] = useState(
    JSON.parse(localStorage.getItem("userDetails")) || {
      name: "",
      email: "",
      phone: "",
      idea: "",
      description: "",
    }
  );

  // frontend/src/context/ShopContext.jsx
  useEffect(() => {
    // Ensure BACKEND_URL is available before trying to connect
    if (!BACKEND_URL) {
      console.error("BACKEND_URL is not defined. Cannot establish socket connection.");
      return;
    }

    const newSocket = io(BACKEND_URL, { // <-- Use BACKEND_URL
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to server");
    });

    newSocket.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => newSocket.close();
  }, [BACKEND_URL]); // <-- Added BACKEND_URL to dependencies

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        const response = await fetch(`${BACKEND_URL}/api/user/me`, { // <-- Use BACKEND_URL
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.success) {
          setUser(data.user);
        } else {
          // Token might be expired or invalid → logout only if user visits a protected page
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
        }
      } catch (error) {
        console.error("Session check failed:", error.message);
        // Don't force logout — just let user stay until their next protected action
      }
    };

    fetchUser();
  }, [token, BACKEND_URL]); // <-- Added BACKEND_URL to dependencies

  const login = (token) => {
    localStorage.setItem("token", token); // the key part
    setToken(token);
    toast.success("Login successful");
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    localStorage.removeItem("selectedPackage");
    setToken(null);
    setUser(null);
    setUserDetails({
      name: "",
      email: "",
      phone: "",
      idea: "",
      description: "",
    });
    setSelectedPackage(customPackage);
    toast.info("Logged out successfully");
    navigate("/login");
  };

  const selectPackage = (pkg) => {
    setSelectedPackage(pkg);
    localStorage.setItem("selectedPackage", JSON.stringify(pkg));
    toast.success("Package selected successfully");
    navigate("/connect");
  };

  const saveUserDetails = (details) => {
    setUserDetails(details);
    localStorage.setItem("userDetails", JSON.stringify(details));
  };

  const saveInquiry = (inquiry) => {
    const stored = JSON.parse(localStorage.getItem("inquiries")) || [];
    stored.push(inquiry);
    localStorage.setItem("inquiries", JSON.stringify(stored));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("userDetails");
    const storedPackage = localStorage.getItem("selectedPackage");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUserDetails(parsed);
    }

    if (storedPackage) {
      setSelectedPackage(JSON.parse(storedPackage));
    }
  }, []);

  const value = {
    navigate,
    currency,
    selectPackage,
    selectedPackage,
    userDetails,
    saveUserDetails,
    saveInquiry,
    socket,
    messages,
    setMessages,
    projectDetails,
    setProjectDetails,
    setSelectedPackage,
    token,
    user,
    login,
    logout,
    BACKEND_URL, // Provided in context
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
