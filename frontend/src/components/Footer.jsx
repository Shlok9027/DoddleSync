import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Title from "../components/Title";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const Footer = () => {
  const particlesInit = async (main) => {
    await loadSlim(main);
  };

  const particlesLoaded = (container) => {};

  const getPath = (itemName) => {
    switch (itemName) {
      case "Home":
        return "/";
      case "About":
        return "/about";
      case "Connect With Us":
        return "/connect";
      case "FAQ":
        return "/faq"; // ✅ Fixed the space issue and made lowercase
      case "Terms & Conditions":
        return "/terms";
      case "Privacy Policy":
        return "/privacy";
      default:
        return "/";
    }
  };

  return (
    <footer className="relative mt-8 px-6 sm:px-10 lg:px-20 py-16 text-white rounded-t-[3rem] border-t border-purple-600/30 animate-fadeIn overflow-hidden z-10">
      <Particles
        id="footer-tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          fullScreen: { enable: false },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "grab" },
              resize: true,
            },
            modes: {
              grab: { distance: 140, links: { opacity: 0.2 } },
            },
          },
          particles: {
            number: { value: 30, density: { enable: true, area: 800 } },
            color: { value: ["#8A2BE2", "#9370DB", "#BA55D3"] },
            shape: { type: "circle" },
            opacity: {
              value: 0.4,
              random: { enable: true, minimumValue: 0.1 },
              animation: {
                enable: true,
                speed: 0.5,
                minimumValue: 0.1,
                sync: false,
              },
            },
            size: {
              value: { min: 1, max: 3 },
              random: true,
              animation: {
                enable: true,
                speed: 2,
                minimumValue: 0.1,
                sync: false,
              },
            },
            links: {
              enable: true,
              distance: 150,
              color: "#ffffff",
              opacity: 0.1,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.5,
              direction: "none",
              random: true,
              straight: false,
              outModes: { default: "bounce" },
            },
          },
          detectRetina: true,
        }}
        style={{
          position: "absolute",
          zIndex: -1,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-0">
        {/* Logo & About */}
        <div className="space-y-4">
          <h2 className="text-4xl font-extrabold tracking-wider text-white drop-shadow-lg flex items-center gap-2">
            <Title text1={"Doddle"} text2={"Sync"} />
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            DoddleSync bridges clients and creators for smart meetings, project
            tracking, and secure payments — all in one elegant system.
          </p>
          <div className="flex gap-4 mt-4">
            <a
              href="https://facebook.com"
              className="hover:scale-125 transition-transform duration-300 text-purple-300 hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              className="hover:scale-125 transition-transform duration-300 text-pink-400 hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              className="hover:scale-125 transition-transform duration-300 text-sky-400 hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.linkedin.com/in/shlok9027/"
              className="hover:scale-125 transition-transform duration-300 text-blue-400 hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-purple-300 tracking-wide">
            Navigation
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            {[
              "Home",
              "About",
              "Connect With Us",
              "FAQ",
              "Terms & Conditions",
              "Privacy Policy",
            ].map((item, index) => (
              <li key={index}>
                <Link
                  to={getPath(item)}
                  className="hover:text-white transition duration-300 hover:translate-x-1 block"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-purple-300 tracking-wide">
            Get In Touch
          </h3>
          <ul className="text-sm space-y-3 text-gray-300">
            <li className="flex items-center gap-3 hover:text-white transition">
              <FaPhoneAlt className="text-purple-400 animate-pulse" />
              +91 84060 90056
            </li>
            <li className="flex items-center gap-3 hover:text-white transition">
              <FaEnvelope className="text-purple-400 animate-pulse" />
              support@doddlesync.com
            </li>
            <li className="flex items-center gap-3 hover:text-white transition">
              <FaMapMarkerAlt className="text-purple-400 animate-pulse" />
              Ranchi, India
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-purple-300 tracking-wide">
            Subscribe
          </h3>
          <p className="text-sm text-gray-300">
            Stay updated with new features & events. No spam, promise!
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              placeholder="Your Email"
              className="w-full px-4 py-2 rounded-xl bg-white/90 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-md"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all text-white font-semibold px-5 py-2 rounded-xl text-sm shadow-xl hover:shadow-purple-500/70"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="my-10 border-t border-purple-700/50"></div>

      <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-4 relative z-0">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-semibold">DoddleSync</span>. All
          rights reserved.
        </p>
        <div className="flex gap-4">
          <Link to="/terms" className="hover:text-purple-300 transition-colors">
            Terms
          </Link>
          <Link to="/privacy" className="hover:text-purple-300 transition-colors">
            Privacy
          </Link>
          <Link to="/faq" className="hover:text-purple-300 transition-colors">
            FAQ
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
