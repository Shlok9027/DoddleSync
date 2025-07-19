import React, { useState, useEffect, useRef, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const VerifyEmail = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const userId = state?.userId;
  const inputRefs = useRef([]);
  const { login } = useContext(ShopContext);

  useEffect(() => {
    if (!userId) {
      toast.error("User ID not provided. Please register or log in again.");
      navigate("/login");
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [userId, navigate]);

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join("");
    if (fullOtp.length !== 6) {
      toast.error("Please enter a 6-digit OTP.");
      return;
    }

    // const url = import.meta.env.VITE_BACKEND_URL; // <-- Corrected


        const url = "https://doddlesync-backend.onrender.com"; // <-- Corrected


    try {
      const { data } = await axios.post(`${url}/api/user/verify-otp`, { userId, otp: fullOtp });
      if (data.success) {
        toast.success(data.message);
        if (data.token) {
          login(data.token);
          navigate("/");
        } else {
          toast.error("Verification successful, but no login token received.");
          navigate("/login");
        }
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Verification failed");
    }
  };

  const handleResendOtp = async () => {
    // const url = import.meta.env.VITE_BACKEND_URL; // <-- Corrected

        const url = "https://doddlesync-backend.onrender.com"

    try {
      const { data } = await axios.post(`${url}/api/user/resend-otp`, { userId });
      if (data.success) {
        toast.success(data.message);
        setTimer(600);
        setCanResend(false);
        setOtp(new Array(6).fill(""));
        inputRefs.current[0].focus();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP.");
    }
  };

  return (
    <div className="flex rounded-4xl items-center justify-center p-2 relative z-10">
      {/* Background gradient and subtle animation */}
      <div className="absolute inset-0 rounded-4xl bg-gradient-to-br animate-gradient-shift"></div>

      <form
        onSubmit={handleVerify}
        className="relative z-20 border-4 rounded-3xl shadow-neon-blue-purple
        transition-all duration-700 ease-in-out w-full max-w-lg mx-auto py-7 px-2 sm:px-10 text-white flex flex-col items-center gap-8
        hover:shadow-neon-pink-purple transform hover:scale-[1.01]"
      >
        {/* Supersonic Title */}
        <div className="relative inline-block overflow-hidden pb-2 mb-4">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-wider">
            VERIFY ACCOUNT
          </h2>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400 transform scale-x-0 origin-left transition-transform duration-500 ease-out-expo group-hover:scale-x-100"></div>
          <p className="text-purple-300 text-sm sm:text-base mt-2">
            Enter the cosmic code sent to your inbox.
          </p>
        </div>

        {/* OTP Input Fields */}
        <div className="flex justify-center gap-3 sm:gap-4 mb-6 relative z-10">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleOtpChange(e.target, index)}
              onFocus={(e) => e.target.select()}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              className="w-12 h-12 sm:w-14 sm:h-14 text-center text-3xl font-bold
                bg-gray-800/50 border-2 border-purple-500 text-cyan-400 rounded-lg shadow-md
                focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500
                transition-all duration-300 ease-in-out transform hover:scale-105"
            />
          ))}
          {/* Animated glow */}
          <div className="absolute inset-0 -m-1 rounded-lg pointer-events-none animate-pulse-light -z-10" />
        </div>

        {/* Timer and Resend Info */}
        <div className="text-center text-sm font-medium mb-6">
          {canResend ? (
            <p className="text-red-400 text-lg font-semibold animate-pulse">
              OTP expired. Resend sequence initiated!
            </p>
          ) : (
            <p className="text-purple-200 text-lg">
              Time remaining:{" "}
              <span className="font-bold text-yellow-300 text-xl">
                {formatTime(timer)}
              </span>
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-gray-900 font-extrabold px-6 py-4 rounded-xl shadow-xl
            transition-all duration-500 ease-in-out transform hover:scale-105 hover:from-cyan-400 hover:to-blue-500 hover:tracking-wide
            active:scale-95 border border-transparent hover:border-cyan-200 text-lg sm:text-xl"
        >
          Activate Hyperdrive!
        </button>

        <button
          type="button"
          onClick={handleResendOtp}
          disabled={!canResend}
          className={`w-full mt-4 p-4 rounded-xl shadow-lg border-2
            transition-all duration-300 ease-in-out transform
            ${canResend
              ? "bg-gradient-to-r from-green-500 to-emerald-400 text-white hover:scale-105 hover:shadow-green-glow border-green-300"
              : "bg-gray-700/50 text-gray-400 cursor-not-allowed border-gray-600"
            } text-lg sm:text-xl font-semibold`}
        >
          {canResend ? "Resend Warp Code" : "Resend in " + formatTime(timer)}
        </button>
      </form>

      {/* Global styles for animations */}
      <style jsx>{`
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient-shift {
          background-size: 400% 400%;
          animation: gradient-shift 15s ease infinite;
        }

        @keyframes pulse-light {
          0%, 100% {
            box-shadow: 0 0 15px rgba(100, 255, 255, 0.7), 0 0 30px rgba(100, 255, 255, 0.4);
          }
          50% {
            box-shadow: 0 0 25px rgba(100, 255, 255, 1), 0 0 50px rgba(100, 255, 255, 0.6);
          }
        }

        .shadow-neon-blue-purple {
          box-shadow: 0 0 25px rgba(139, 92, 246, 0.6), 0 0 50px rgba(59, 130, 246, 0.4);
        }

        .shadow-neon-pink-purple {
          box-shadow: 0 0 35px rgba(236, 72, 153, 0.7), 0 0 70px rgba(139, 92, 246, 0.5);
        }

        .animate-pulse-light {
          animation: pulse-light 2s infinite ease-in-out;
        }

        .hover\\:shadow-green-glow:hover {
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.8), 0 0 40px rgba(34, 197, 94, 0.5);
        }
      `}</style>
    </div>
  );
};

export default VerifyEmail;
