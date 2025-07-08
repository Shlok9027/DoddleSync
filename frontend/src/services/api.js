import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:4000",
  withCredentials: true,
});

// Add interceptors (Optional)
api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response?.status === 401) {
      toast.error("Your session expired. Please log in again.");
    }
    return Promise.reject(err);
  }
);
export const paymentApi = {
  createStripeSession: async (paymentData) => {
    const token = localStorage.getItem("token"); // ✅ get token

    if (!token) {
      throw new Error("User token missing. Please login again.");
    }

    return api.post("/api/order/create", paymentData, {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ pass token here
      },
    });
  },
};