import React, { useContext } from "react";
import { assets } from "./assets/assets";
import NavBar from "./components/NavBar";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SideBar from "./components/SideBar";
import LatestInquiries from "./pages/LatestInquiries";
import ClientChat from "./pages/ClientChat";
import ProductPackages from "./pages/ProductPackages";
import { AdminContext } from "./context/AdminContext";
import Toast from "./components/Toast";

import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AdminContext);
  if (!token) return <Navigate to="/login" />;
  return children;
};

function App() {
  const particlesInit = async (main) => {
    await loadSlim(main);
  };

  const particlesLoaded = () => {};

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
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: { value: "transparent" },
          },
          fpsLimit: 90,
          fullScreen: { enable: false },
          interactivity: {
            events: {
              onClick: { enable: true, mode: ["bubble", "repulse"] },
              onHover: { enable: true, mode: "trail" },
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
            shape: { type: "circle" },
            opacity: {
              value: 0.6,
              random: { enable: true, minimumValue: 0.3 },
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
              random: true,
              straight: false,
              direction: "none",
              outModes: { default: "bounce" },
              trail: { enable: false },
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

      {/* Content Layer */}
      <div className="relative z-10 px-4 md:px-[7vw] lg:px-[9vw]">
        <Toast />
        <NavBar />
        <div >
          <SideBar />
          <div className="w-[87%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/latest-inquiries"
                element={
                  <ProtectedRoute>
                    <LatestInquiries />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/client-chats"
                element={
                  <ProtectedRoute>
                    <ClientChat />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/product-packages"
                element={
                  <ProtectedRoute>
                    <ProductPackages />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
