// frontend/src/pages/Verify.jsx

import React, { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

// 💡 Replace the path if your context location is different
import { ShopContext } from "../context/ShopContext";

export const Verify = () => {
  const {
    navigate,
    token,
    saveUserDetails,
    setSelectedPackage,
  } = useContext(ShopContext);

  const [searchParams] = useSearchParams();
  const success = searchParams.get("success") === "true";
  const stripeSessionId = searchParams.get("orderId");

  // 👇 Handles Stripe session verification
  const verifyPayment = async () => {
    try {
      if (!token) {
        toast.error("Please log in to verify payment.");
        navigate("/login");
        return;
      }

      const orderId = localStorage.getItem("orderId");
      if (!orderId) {
        toast.error("Order ID not found. Please try again.");
        navigate("/connect");
        return;
      }

      const response = await axios.post(
        `${"https://doddlesync-baackend.onrender.com"}/api/order/verify`,
        { success, orderId, stripeSessionId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        // ✅ Clean up localStorage
        localStorage.removeItem("selectedPackage");
        localStorage.removeItem("userDetails");
        localStorage.removeItem("orderId");

        // ✅ Reset context (if available)
        if (typeof saveUserDetails === "function") {
          saveUserDetails({
            name: "",
            email: "",
            phone: "",
            idea: "",
            description: "",
          });
        }

        if (typeof setSelectedPackage === "function") {
          setSelectedPackage(null);
        }

        navigate("/chat");
      } else {
        navigate("/connect");
      }
    } catch (error) {
      console.error("❌ Payment verification error:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred during payment verification."
      );
      navigate("/connect");
    }
  };

  useEffect(() => {
    if (token && stripeSessionId) {
      verifyPayment();
    }
  }, [token, stripeSessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-[30rem] h-[30rem] bg-pink-400 rounded-full blur-[150px] opacity-60 animate-blob z-0" />
      <div className="absolute top-40 right-0 w-[30rem] h-[30rem] bg-yellow-400 rounded-full blur-[150px] opacity-60 animate-blob animation-delay-2000 z-0" />
      <div className="absolute bottom-0 left-[15%] w-[30rem] h-[30rem] bg-purple-500 rounded-full blur-[150px] opacity-60 animate-blob animation-delay-4000 z-0" />

      <div className="backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl px-12 py-16 max-w-2xl w-full z-10 text-center">
        <div className="animate-spin w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-8"></div>
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 mb-4">
          Verifying Your Payment
        </h2>
        <p className="text-white/80 text-lg mb-6">
          Please wait while we confirm your payment and set up your project.
        </p>
        <div className="flex items-center justify-center gap-4 text-white/60">
          <span className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></span>
          <span className="w-2 h-2 bg-white/60 rounded-full animate-pulse delay-100"></span>
          <span className="w-2 h-2 bg-white/60 rounded-full animate-pulse delay-200"></span>
        </div>
      </div>
    </div>
  );
};

export default Verify;
