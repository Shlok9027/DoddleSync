// Toast.jsx
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  return (
    <ToastContainer
      position="top-center" // Centered for maximum impact
      autoClose={3000} // Slightly longer for complex animations
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      className="z-[9999] w-full max-w-md mx-auto" // High z-index, wider for more elaborate designs
      toastClassName={({ type }) => {
        let baseClasses = "relative overflow-hidden p-0 rounded-2xl shadow-2xl backdrop-blur-md transition-all duration-500 ease-in-out transform hover:scale-105 active:scale-95 cursor-pointer border-2 "; // More sophisticated base styling

        switch (type) {
          case "success":
            return (
              baseClasses +
              "bg-gradient-to-br from-green-500/80 via-teal-600/80 to-blue-700/80 border-green-400 text-white font-extrabold " +
              "before:content-[''] before:absolute before:inset-0 before:bg-white/10 before:opacity-0 before:animate-pulse " + // Pulsing effect
              "after:content-['🎉'] after:absolute after:bottom-2 after:right-2 after:text-3xl after:opacity-0 after:animate-bounce-in " + // Confetti emoji
              "data-[state=entered]:translate-y-0 data-[state=exiting]:translate-y-full" // More dynamic enter/exit animation
            );
          case "error":
            return (
              baseClasses +
              "bg-gradient-to-br from-red-600/80 via-orange-700/80 to-yellow-800/80 border-red-500 text-white font-extrabold " +
              "before:content-[''] before:absolute before:inset-0 before:bg-red-900/20 before:animate-spin-slow " + // Subtle error spin
              "after:content-['🚨'] after:absolute after:bottom-2 after:right-2 after:text-3xl after:opacity-0 after:animate-shake " + // Alert emoji
              "data-[state=entered]:translate-x-0 data-[state=exiting]:-translate-x-full" // More dynamic enter/exit animation
            );
          case "info":
            return (
              baseClasses +
              "bg-gradient-to-br from-blue-500/80 via-indigo-600/80 to-purple-700/80 border-blue-400 text-white font-extrabold " +
              "before:content-[''] before:absolute before:inset-0 before:bg-purple-900/15 before:animate-fade-in " + // Gentle fade
              "after:content-['💡'] after:absolute after:bottom-2 after:right-2 after:text-3xl after:opacity-0 after:animate-pop-in " + // Idea emoji
              "data-[state=entered]:translate-y-0 data-[state=exiting]:-translate-y-full" // More dynamic enter/exit animation
            );
          case "warning":
            return (
              baseClasses +
              "bg-gradient-to-br from-yellow-500/80 via-amber-600/80 to-orange-700/80 border-yellow-400 text-white font-extrabold " +
              "before:content-[''] before:absolute before:inset-0 before:bg-orange-900/20 before:animate-flash " + // Warning flash
              "after:content-['⚠️'] after:absolute after:bottom-2 after:right-2 after:text-3xl after:opacity-0 after:animate-wobble " + // Warning emoji
              "data-[state=entered]:translate-y-0 data-[state=exiting]:translate-y-full" // More dynamic enter/exit animation
            );
          default:
            return (
              baseClasses +
              "bg-gradient-to-br from-gray-500/80 via-gray-600/80 to-gray-700/80 border-gray-400 text-white font-extrabold" +
              "data-[state=entered]:translate-y-0 data-[state=exiting]:translate-y-full" // More dynamic enter/exit animation
            );
        }
      }}
      progressClassName="bg-white/50 h-1.5" // Thicker, more visible progress bar
      bodyClassName="text-base text-center p-4" // Centered text for cleaner look
    />
  );
};

export default Toast;