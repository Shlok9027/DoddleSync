import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { AdminContext } from "../context/AdminContext";
import { adminApi } from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await adminApi.login({ email, password });
      if (response.success) {
        login(response.token);
        toast.success("Login successful!");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" flex items-center justify-center w-full">
      <form
        onSubmit={onSubmitHandler}
        className="relative border-[3px] border-purple-500 p-8 sm:p-10 rounded-3xl bg-white/10 backdrop-blur-lg shadow-2xl 
        transition-all duration-500 ease-in-out w-full sm:max-w-md mx-auto mt-10 mb-10 text-gray-900 flex flex-col items-center gap-6 hover:shadow-purple-500/30"
      >
        <div className="absolute top-[-25px] left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-5 py-1 rounded-full text-sm shadow-md font-semibold">
          Welcome Back!
        </div>
        <div className="inline-flex items-center gap-3 mt-6">
          <p className="serif text-3xl font-bold text-purple-700 hover:text-indigo-400 transition-colors duration-300">
            Admin Login
          </p>
          <hr className="border-none h-[3px] w-10 bg-indigo-400 hover:w-16 transition-all duration-500 rounded-full" />
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@email.com"
          required
          disabled={isLoading}
          className="w-full px-4 py-3 border border-gray-300 bg-white/70 backdrop-blur-sm rounded-md text-gray-900 placeholder-gray-600 
          focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-indigo-400 transition-all duration-300 hover:shadow-lg"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your secure password"
          required
          disabled={isLoading}
          className="w-full px-4 py-3 border border-gray-300 bg-white/70 backdrop-blur-sm rounded-md text-gray-900 placeholder-gray-600 
          focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-indigo-400 transition-all duration-300 hover:shadow-lg"
        />
        <div className="w-full text-xs text-gray-700 text-right">
          <p className="cursor-pointer hover:text-indigo-500 transition duration-300">
            Forgot Password?
          </p>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full mt-3 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md 
          transition-all duration-500 hover:scale-105 hover:shadow-xl hover:from-purple-600 hover:via-blue-500 hover:to-indigo-500 hover:text-yellow-200 active:scale-95 ${
            isLoading ? "opacity-75 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Logging in...
            </span>
          ) : (
            "🚀 Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
