import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./pages/Home.jsx";
import Connect from "./pages/Connect";
import Login from "./pages/Login";
import About from "./pages/About";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import { assets } from "./assets/assets";
import Toast from "./components/Toast";
import ChatWithClient from "./pages/ChatWithClient";
import Price from "./components/Price";
import FinalPayment from "./components/FinalPayment";
import ProtectedRoute from "./components/ProtectedRoute";
import Verify from "./pages/Verify";
import ForgotPassword from "./components/ForgotPassword.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import FAQ from "./components/FAQ.jsx";
import VerifyOtp from "./components/VerifyOTP.jsx";

function App() {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${assets.hero})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 px-4 md:px-[7vw] lg:px-[9vw]">
        <Toast />
        <NavBar />

        <div className="pt-[151px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/connect"
              element={
                <ProtectedRoute>
                  <Connect />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <ChatWithClient />
                </ProtectedRoute>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/packages" element={<Price />} />
            <Route
              path="/final-payment"
              element={
                <ProtectedRoute>
                  <FinalPayment />
                </ProtectedRoute>
              }
            />
            <Route path="/verify" element={<Verify />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
