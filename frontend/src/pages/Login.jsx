import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Login = () => {
  const [currState, setCurrState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login, BACKEND_URL } = useContext(ShopContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (currState === "Login") {
        response = await axios.post(`${BACKEND_URL}/api/user/login`, { email, password });

        if (response.data.success) {
          login(response.data.token);
          navigate("/");
        } else {
          // toast.error(response.data.message);
          if (response.data.message.includes("Email not verified") && response.data.userId) {
            navigate("/verify-otp", { state: { userId: response.data.userId } });
          }
        }

      } else {
        // Sign Up: register and redirect to OTP
        response = await axios.post(`${BACKEND_URL}/api/user/register`, {
          name,
          email,
          password,
        });

        if (response.data.success) {
          toast.success("OTP sent to your email. Please verify your account.");
          navigate("/verify-otp", {
            state: { userId: response.data.userId },
          });
        } else {
          // toast.error(response.data.message);
          if (response.data.message.includes("User already exists but not verified") && response.data.userId) {
            navigate("/verify-otp", { state: { userId: response.data.userId } });
          }
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      if (error.response?.status === 401 && error.response?.data?.message.includes("Email not verified") && error.response?.data?.userId) {
        navigate("/verify-otp", { state: { userId: error.response.data.userId } });
      }
    }
  };

  return (
    <div className="flex items-center font-[cursive] justify-center text-white px-4">
      
       <div className="absolute top-[100px] left-[50px] w-40 h-80 bg-gradient-to-br from-purple-700 to-pink-500 rounded-full blur-3xl pointer-events-none opacity-60 animate-blob z-0 mix-blend-screen" />
      <div className="absolute top-[20%] right-[-60px] w-72 h-72 bg-gradient-to-tl from-cyan-400 to-blue-600 rounded-full blur-3xl pointer-events-none opacity-60 animate-blob animation-delay-2000 z-0 mix-blend-screen" />
      <div className="absolute bottom-[-40px] left-[10%] w-96 h-96 bg-gradient-to-tr from-green-400 to-lime-500 rounded-full blur-3xl pointer-events-none opacity-50 animate-blob animation-delay-4000 z-0 mix-blend-screen" />
      <div className="absolute top-[5%] left-[15%] w-64 h-64 bg-gradient-to-br from-indigo-500 to-fuchsia-600 rounded-full blur-3xl pointer-events-none opacity-55 animate-blob animation-delay-6000 z-0 mix-blend-screen" />

      <form
        onSubmit={handleSubmit}
        className="relative border-[3px] border-purple-500 p-8 sm:p-10 rounded-3xl  shadow-2xl
        transition-all duration-500 ease-in-out w-full sm:max-w-md mx-auto mt-20 mb-20 text-gray-900 flex flex-col items-center gap-6 hover:shadow-purple-500/30"
      >
        <div className="absolute top-[-25px] left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-5 py-1 rounded-full text-sm shadow-md font-semibold">
          {currState === "Login" ? "Welcome Back!" : "Join Us"}
        </div>

        <div className="inline-flex items-center gap-3 mt-6">
          <p className="serif text-3xl font-bold text-purple-700 hover:text-indigo-400 transition-colors duration-300">
            {currState}
          </p>
          <hr className="border-none h-[3px] w-10 bg-indigo-400 hover:w-16 transition-all duration-500 rounded-full" />
        </div>

        {currState !== "Login" && (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 bg-white/70 backdrop-blur-sm rounded-md text-gray-900 placeholder-gray-600
            focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-indigo-400 transition-all duration-300 hover:shadow-lg"
            placeholder="Your Name"
            required
          />
        )}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="w-full px-4 py-3 border border-gray-300 bg-white/70 backdrop-blur-sm rounded-md text-gray-900 placeholder-gray-600
          focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-indigo-400 transition-all duration-300 hover:shadow-lg"
          placeholder="Email Address"
          required
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="w-full px-4 py-3 border border-gray-300 bg-white/70 backdrop-blur-sm rounded-md text-gray-900 placeholder-gray-600
          focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-indigo-400 transition-all duration-300 hover:shadow-lg"
          placeholder="Password"
          required
        />

        <div className="w-full flex justify-between text-xs text-gray-100">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Forgot Password?
          </Link>
          <p
            onClick={() =>
              setCurrState(currState === "Login" ? "Sign Up" : "Login")
            }
            className="cursor-pointer hover:text-green-400 transition duration-300 font-medium"
          >
            {currState === "Login" ? "Create Account" : "Back to Login"}
          </p>
        </div>

        <button
          type="submit"
          className="w-full mt-3 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md
          transition-all duration-500 hover:scale-105 hover:shadow-xl hover:from-purple-600 hover:via-blue-500 hover:to-indigo-500 hover:text-yellow-200 active:scale-95"
        >
          🚀 {currState === "Login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Login;
