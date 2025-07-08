


/// admin/src/context/AdminContext.jsx
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { toast } from "react-toastify";
import { adminApi } from "../services/api";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const navigate = useNavigate();
  const currency = "₹";

  const [socket, setSocket] = useState(null);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("adminToken") || null);
  const [messages, setMessages] = useState([]);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_BACKEND_URL || "http://localhost:4000", {
      withCredentials: true,
    });

    newSocket.on("connect", () => {
      console.log("Admin connected to server");
    });

    newSocket.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  // Validate token on mount
  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          // Make a test API call to validate the token (e.g., fetch packages)
          await adminApi.getPackages();
        } catch (error) {
          if (error.response?.status === 401) {
            localStorage.removeItem("adminToken");
            setToken(null);
            setClients([]);
            setSelectedClient(null);
            setMessages([]);
            toast.error("Session expired. Please log in again.");
            navigate("/login");
          }
        }
      }
    };
    validateToken();
  }, [token, navigate]);

  // Login function
  const login = (token) => {
    localStorage.setItem("adminToken", token);
    setToken(token);
    toast.success("Admin login successful");
    navigate("/latest-inquiries");
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
    setClients([]);
    setSelectedClient(null);
    setMessages([]);
    toast.info("Logged out successfully");
    navigate("/login");
  };

  const value = {
    navigate,
    currency,
    socket,
    clients,
    selectedClient,
    setClients,
    setSelectedClient,
    token,
    login,
    logout,
    messages,
    setMessages,
  };

  return <AdminContext.Provider value={value}>{props.children}</AdminContext.Provider>;
};

export default AdminContextProvider;