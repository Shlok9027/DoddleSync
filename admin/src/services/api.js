// admin/src/services/api.js

import axios from "axios";
import { toast } from "react-toastify";

// ✅ Create custom Axios instance with baseURL
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:4000",
  withCredentials: true,
});

// ✅ Request interceptor – attaches admin token to every outgoing request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor – global error handler
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || "An error occurred";
    if (error.response?.status === 401) {
      // 🔐 Token is missing or expired
      localStorage.removeItem("adminToken");
      toast.error("Session expired. Please log in again.");
      window.location.href = "/login"; // Force redirect
    } else {
      toast.error(message);
    }
    return Promise.reject(error);
  }
);

export const adminApi = {
  // 🔐 Admin login
  login: async (credentials) => {
    return api.post("/api/user/admin-login", credentials);
  },

  // ✅ Admin-only: Get all packages (public + user-defined custom)
  getAllPackages: async () => {
    return api.get("/api/package/admin-list");
  },

  // ✅ Get only public (frontend) packages — mostly for testing/view
  getPackages: async () => {
    return api.get("/api/package/list");
  },

  // ➕ Add a new package
  addPackage: async (packageData) => {
    return api.post("/api/package/add", packageData);
  },

  // ✏️ Update a package
  updatePackage: async (packageData) => {
    return api.put("/api/package/update", packageData);
  },

  // ❌ Delete a package
  deletePackage: async (data) => {
    return api.delete("/api/package/remove", { data });
  },

  // 📥 Get all inquiries
  getInquiries: async () => {
    return api.get("/api/inquiry/list");
  },

  // ✅ Accept an inquiry → converts to client → project → chat
  acceptInquiry: async (data) => {
    return api.post("/api/inquiry/accept", data);
  },

  // 💬 Get all chat sessions
  getClientChats: async () => {
    return api.get("/api/chat/list");
  },

  // 💌 Get messages of a chat thread
  getMessages: async (chatId) => api.get(`/api/chat/message/${chatId}/admin`),
  // 📤 Send message
 sendMessage: async (messageData) => {
  return api.post("/api/chat/send/admin", messageData); // ✅ Admin route
}
};
