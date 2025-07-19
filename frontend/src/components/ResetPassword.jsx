
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import axios from "axios";
import { toast } from "react-toastify"; // Assuming toast is already configured and available

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Add state for confirm password
  const [loading, setLoading] = useState(false); // State for loading indicator
  const { token } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation for password match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true); // Set loading to true
    try {
      // const url = import.meta.env.VITE_BACKEND_URL;
      
      const url = "https://doddlesync-backend.onrender.com"; // Ensure this env variable is correctly set


      await axios.post(`${url}/api/user/reset-password/${token}`, { password });
      toast.success('✅ Password reset successfully! You can now log in with your new password.');
      setPassword(""); // Clear fields on success
      setConfirmPassword("");
      navigate("/login"); // Redirect to login page after successful reset
    } catch (error) {
      console.error("Reset Password Error:", error); // Log detailed error for debugging

      // Extract and display a user-friendly error message
      const message =
        error?.response?.data?.message ||
        error.message ||
        "An unexpected error occurred during password reset. Please try again.";
      toast.error(`❌ ${message}`);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col gap-6 w-full max-w-md mx-auto p-8 sm:p-10 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-indigo-700/50
                   transform transition-all duration-500 ease-in-out hover:scale-[1.01] hover:shadow-indigo-500/40"
      >
        {/* Decorative header with a dynamic feel */}
        <div className="absolute top-[-25px] left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-2 rounded-full text-lg font-bold shadow-lg
                    transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-blue-400/50">
          Set New Password
        </div>

        {/* New Password Input */}
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-5 py-3 border border-indigo-500/60 bg-gray-700 text-white placeholder-gray-400 rounded-lg text-base
                     focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 ease-in-out
                     hover:border-indigo-400 hover:shadow-md hover:shadow-indigo-500/20"
          required
          disabled={loading}
        />

        {/* Confirm New Password Input */}
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-5 py-3 border border-indigo-500/60 bg-gray-700 text-white placeholder-gray-400 rounded-lg text-base
                     focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 ease-in-out
                     hover:border-indigo-400 hover:shadow-md hover:shadow-indigo-500/20"
          required
          disabled={loading}
        />

        {/* Submit button with impressive effects */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md text-lg
                     transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl hover:from-indigo-600 hover:via-purple-500 hover:to-blue-600
                     active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Resetting...
            </span>
          ) : (
            "⚡ Reset Password"
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
