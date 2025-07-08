import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { scroller } from "react-scroll";

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

import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import ForgotPassword from "./components/ForgotPassword.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import FAQ from "./components/FAQ.jsx";
import VerifyOtp from "./components/VerifyOTP.jsx";

function App() {
  const location = useLocation();

  const particlesInit = async (main) => {
    await loadSlim(main);
  };

  const particlesLoaded = (container) => {};

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const handleHashScroll = () => {
      const hash = location.hash;
      if (hash) {
        const targetId = hash.substring(1);
        setTimeout(() => {
          scroller.scrollTo(targetId, {
            duration: 900,
            delay: 0,
            smooth: "easeInOutCubic",
            offset: -70,
          });
        }, 150);
      }
    };

    window.addEventListener("hashchange", handleHashScroll);

    handleHashScroll();

    return () => {
      window.removeEventListener("hashchange", handleHashScroll);
    };
  }, [location]);

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
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 90,
          fullScreen: {
            enable: false,
          },
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: ["bubble", "repulse"],
              },
              onHover: {
                enable: true,
                mode: "trail",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 200,
                duration: 2,
                opacity: 0.8,
                size: 10,
                speed: 3,
              },
              repulse: {
                distance: 150,
                duration: 0.4,
              },
              trail: {
                delay: 0.005,
                quantity: 5,
                particles: {
                  color: {
                    value: ["#00FFFF", "#FF00FF", "#FFD700", "#00FF00"],
                  },
                  move: {
                    speed: 2,
                    outModes: {
                      default: "destroy",
                    },
                  },
                },
              },
            },
          },
          particles: {
            number: {
              value: 100,
              density: {
                enable: true,
                area: 1000,
              },
            },
            color: {
              value: ["#FF6AC1", "#32CDFF", "#FFD700", "#82FF9E"],
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: 0.6,
              random: {
                enable: true,
                minimumValue: 0.3,
              },
              animation: {
                enable: true,
                speed: 1,
                minimumValue: 0.3,
                sync: false,
              },
            },
            size: {
              value: { min: 2, max: 6 },
              random: true,
              animation: {
                enable: true,
                speed: 5,
                minimumValue: 0.1,
                sync: false,
              },
            },
            links: {
              enable: true,
              distance: 120,
              color: "#ffffff",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "bounce",
              },
              trail: {
                enable: false,
                length: 10,
                fillColor: "#000000",
              },
            },
          },
          detectRetina: true,
        }}
        style={{
          position: "absolute",
          zIndex: 0,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      <div className="relative z-10 px-4 md:px-[7vw] lg:px-[9vw]">

        
        <Toast />
        <NavBar />

        <div className="pt-[111px]">
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
            <Route path="faq" element={<FAQ />} />
            <Route path="verify-otp" element={<VerifyOtp />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
