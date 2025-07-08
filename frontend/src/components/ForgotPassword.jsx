// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const url = import.meta.env.VITE_BACKEND_URL;
//       await axios.post(`${url}/api/user/forgot-password`, { email });
//       toast.success("Reset link sent to your email");
//     } catch (error) {
//       console.error("Forgot Password Error:", error); // 👈 log to debug

//       // Properly show error message from server, or fallback
//       const message =
//         error?.response?.data?.message ||
//         error.message ||
//         "Something went wrong";
//       toast.error(message);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="flex flex-col gap-4 w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-20"
//     >
//       <input
//         type="email"
//         placeholder="Enter your Email"
//         onChange={(e) => setEmail(e.target.value)}
//         className="border p-3 rounded"
//         required
//       />
//       <button
//         type="submit"
//         className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
//       >
//         Send Reset Link
//       </button>
//     </form>
//   );
// };

// export default ForgotPassword;

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Assuming toast is already configured and available

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submission starts
    try {
      const url = import.meta.env.VITE_BACKEND_URL; // Ensure this env variable is correctly set
      await axios.post(`${url}/api/user/forgot-password`, { email });
      toast.success("🚀 Reset link sent to your email!");
      setEmail(""); // Clear email field on success
    } catch (error) {
      console.error("Forgot Password Error:", error); // Log detailed error for debugging

      // Extract and display a user-friendly error message
      const message =
        error?.response?.data?.message ||
        error.message ||
        "An unexpected error occurred. Please try again.";
      toast.error(`❌ ${message}`);
    } finally {
      setLoading(false); // Set loading to false after request completes
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col gap-6 w-full max-w-md mx-auto p-8 sm:p-10 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-purple-700/50
                   transform transition-all duration-500 ease-in-out hover:scale-[1.01] hover:shadow-purple-500/40"
      >
        {/* Decorative header with a dynamic feel */}
        <div className="absolute top-[-25px] left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-6 py-2 rounded-full text-lg font-bold shadow-lg
                    transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-purple-400/50">
          Forgot Password?
        </div>

        {/* Input field with enhanced styling */}
        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-5 py-3 border border-purple-500/60 bg-gray-700 text-white placeholder-gray-400 rounded-lg text-base
                     focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 ease-in-out
                     hover:border-purple-400 hover:shadow-md hover:shadow-purple-500/20"
          required
          disabled={loading} // Disable input while loading
        />

        {/* Submit button with impressive effects */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md text-lg
                     transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl hover:from-purple-600 hover:via-blue-500 hover:to-indigo-500
                     active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
