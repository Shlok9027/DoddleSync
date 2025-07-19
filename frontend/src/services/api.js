
import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  // baseURL: import.meta.env.VITE_BACKEND_URL,

    baseURL: "https://doddlesync-backend.onrender.com",

  withCredentials: true,
});

// Interceptor
api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
    } else if (!err.response) {
      // This means a network error (e.g., backend is down, CORS issue before response)
      toast.error("Network error. Could not reach the server. Please check your internet connection or try again later.");
    } else if (err.response.data?.message) {
      // If the backend sent a specific JSON error message
      toast.error(err.response.data.message);
    } else {
      // Generic error, likely the HTML parsing error will fall here
      // The FinalPayment component will have more specific handling for the HTML error
      toast.error("An unexpected error occurred. Please check console for details.");
    }
    return Promise.reject(err);
  }
);

// Payments API
export const paymentApi = {
  createStripeSession: async (paymentData) => {
    const token = localStorage.getItem("token");

    if (!token) {
      // This error will be caught by the calling function (handleStripePayment)
      throw new Error("User not authenticated. Please log in.");
    }

    try {
      // Axios will automatically parse JSON if the response content-type is application/json
      const response = await api.post("/api/order/create", paymentData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response; // This will be the parsed JSON data (res.data from interceptor)
    } catch (error) {
      console.error("Payment API error in paymentApi.js:", error);
      // Re-throw the error so FinalPayment.jsx can handle it specifically
      throw error;
    }
  },
};