import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; 

const Header = () => {
  const { navigate } = useContext(ShopContext);

  const particlesInit = async (main) => {
    await loadSlim(main);
  };

  const particlesLoaded = (container) => {
    console.log("Header Particles container loaded", container);
  };

  const onClickHandle = () => {
    navigate('/products');
  };

  return (
    <div
      className="relative w-full my-5 h-[60vh] bg-cover bg-center rounded-3xl bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url(${assets.hero})` }}
    >
      <Particles
        id="header-tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "transparent", 
            },
          },
          fpsLimit: 120,
          fullScreen: {
            enable: false, 
          },
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push", 
              },
              onHover: {
                enable: true,
                mode: "bubble",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 100,
                duration: 2,
                opacity: 0.8,
                size: 8,
                speed: 3,
              },
              push: {
                quantity: 4, 
              },
              repulse: {
                distance: 150,
                duration: 0.4,
              },
            },
          },
          particles: {
            number: {
              value: 50, 
              density: {
                enable: true,
                area: 800,
              },
            },
            color: {
              value: ["#FFD700", "#00FFFF", "#F200FF"], 
            },
            shape: {
              type: "star", 
            },
            opacity: {
              value: 0.7,
              random: {
                enable: true,
                minimumValue: 0.4,
              },
              animation: {
                enable: true,
                speed: 1,
                minimumValue: 0.4,
                sync: false,
              },
            },
            size: {
              value: { min: 1, max: 5 },
              random: true,
              animation: {
                enable: true,
                speed: 4,
                minimumValue: 0.1,
                sync: false,
              },
            },
            links: {
              enable: false, 
            },
            move: {
              enable: true,
              speed: 1, 
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "bounce",
              },
            },
          },
          detectRetina: true,
        }}
        style={{
          position: "absolute",
          zIndex: 15,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      {/* Overlay - now at z-index 10 */}
      <div className="absolute inset-0  bg-gradient-to-br rounded-3xl from-indigo-800/50 via-purple-800/40 to-black/60 z-10"></div>

      {/* Content Overlay - now at z-index 20 */}
      <div className="relative z-20 text-center px-6 sm:px-16 max-w-4xl animate-fade-in-up space-y-6">
        <div className="flex justify-center items-center gap-3">
          <span className="w-12 sm:w-16 h-[3px] bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 rounded-full"></span>
          <p className="text-white tracking-widest font-semibold uppercase text-sm sm:text-base drop-shadow-lg">
            Where Your Imagination Meets Our Innovation
          </p>
          <span className="w-12 sm:w-16 h-[3px] bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-400 rounded-full"></span>
        </div>

        <h1 className="prata-regular text-4xl sm:text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 drop-shadow-2xl animate-pulse">
          Transforming Ideas Into Digital Realities
        </h1>

        <p className="text-white/80 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed animate-fade-in delay-200">
          Craft smarter workflows, automate bookings, and collaborate with intelligence — all under one futuristic platform.
        </p>

        <div className="flex justify-center">
          <button
            onClick={onClickHandle}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 hover:shadow-pink-400 transition duration-300"
          >
            Start Exploring!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
