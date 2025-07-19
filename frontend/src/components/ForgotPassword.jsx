import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // const url = import.meta.env.VITE_BACKEND_URL; // <-- Corrected

            const url = "https://doddlesync-backend.onrender.com"; // <-- Corrected


      await axios.post(`${url}/api/user/forgot-password`, { email });
      toast.success("🚀 Reset link sent to your email!");
      setEmail("");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "An unexpected error occurred. Please try again.";
      toast.error(`❌ ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-[420px] sm:max-w-[500px] bg-gradient-to-br from-gray-900 to-gray-800 p-6 sm:p-8 rounded-2xl border border-purple-700/50 shadow-xl
         transform transition duration-300 hover:scale-[1.01] hover:shadow-purple-500/30"
      >
        {/* Floating Header Badge */}
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-bold text-base sm:text-lg shadow-md">
          Forgot Password?
        </div>

        {/* Email Input */}
        <div className="mb-6 mt-2">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Your Email
          </label>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-purple-500/60 bg-gray-700 text-white placeholder-gray-400 rounded-lg text-base
                         focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition duration-300
                         hover:border-purple-400"
            required
            disabled={loading}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 text-white font-semibold text-base sm:text-lg rounded-xl
                     bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 shadow-lg
                     transition-transform duration-300 hover:scale-105 hover:shadow-purple-600/30
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending...
            </span>
          ) : (
            "🚀 Send Reset Link"
          )}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
