import React, { useState, useRef } from "react";
import { assets, services } from "../assets/assets";

const Product = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const orbRefs = useRef([]);

  const handleItemInteraction = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div
      className="relative py-24 px-4 sm:px-8 md:px-16 overflow-hidden min-h-screen flex items-center justify-center rounded-3xl"
      style={{
        backgroundImage: `url(${assets.hero})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient Blobs */}
      <div className="absolute top-[-30px] left-[-50px] w-80 h-80 bg-gradient-to-br from-purple-700 to-pink-500 rounded-full blur-3xl pointer-events-none opacity-60 animate-blob z-0 mix-blend-screen" />
      <div className="absolute top-[20%] right-[-60px] w-72 h-72 bg-gradient-to-tl from-cyan-400 to-blue-600 rounded-full blur-3xl pointer-events-none opacity-60 animate-blob animation-delay-2000 z-0 mix-blend-screen" />
      <div className="absolute bottom-[-40px] left-[10%] w-96 h-96 bg-gradient-to-tr from-green-400 to-lime-500 rounded-full blur-3xl pointer-events-none opacity-50 animate-blob animation-delay-4000 z-0 mix-blend-screen" />
      <div className="absolute top-[5%] left-[15%] w-64 h-64 bg-gradient-to-br from-indigo-500 to-fuchsia-600 rounded-full blur-3xl pointer-events-none opacity-55 animate-blob animation-delay-6000 z-0 mix-blend-screen" />

      <div className="relative z-10 max-w-7xl mx-auto text-center px-4">
        {/* Header */}
        <div className="mb-16 space-y-6">
          <div className="flex justify-center items-center gap-4 animate-fade-in-down" style={{ animationDelay: "100ms" }}>
            <span className="w-16 h-[4px] bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600 rounded-full shadow-lg" />
            <p className="text-white tracking-widest font-extrabold uppercase text-base sm:text-lg drop-shadow-xl glowing-text">Explore Our Expertise</p>
            <span className="w-16 h-[4px] bg-gradient-to-l from-blue-400 via-purple-500 to-pink-600 rounded-full shadow-lg" />
          </div>
          <h2 className="prata-regular text-5xl sm:text-6xl md:text-7xl font-black text-white/98 drop-shadow-3xl animate-fade-in tracking-tight" style={{ animationDelay: "300ms" }}>
            <span className="animate-text-shimmer bg-clip-text text-transparent bg-[linear-gradient(110deg,#e2e8f0,45%,#9333ea,55%,#e2e8f0)] bg-[length:250%_100%] leading-tight">
              What We Offer
            </span>
          </h2>
          <p className="text-white/90 text-lg sm:text-xl md:text-2xl max-w-2xl font-[cursive] mx-auto leading-relaxed animate-fade-in-up font-extralight opacity-0 animate-fade-in-up-reveal" style={{ animationDelay: "700ms" }}>
            Discover our suite of innovative and powerful services that accelerate your vision.
          </p>
        </div>

        {/* Services Grid */}
        <div className="flex flex-col items-center gap-y-16 lg:gap-y-20">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-8 lg:gap-x-12 gap-y-16 max-w-6xl mx-auto">
            {services.slice(0, 4).map((service, index) => (
              <OrbCard key={service._id} index={index} activeIndex={activeIndex} setActiveIndex={handleItemInteraction} service={service} />
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 sm:gap-x-12 lg:gap-x-16 gap-y-16 max-w-5xl mx-auto">
            {services.slice(4, 7).map((service, index) => (
              <OrbCard key={service._id} index={index + 4} activeIndex={activeIndex} setActiveIndex={handleItemInteraction} service={service} />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-12 lg:gap-x-16 gap-y-16 max-w-3xl mx-auto">
            {services.slice(7, 9).map((service, index) => (
              <OrbCard key={service._id} index={index + 7} activeIndex={activeIndex} setActiveIndex={handleItemInteraction} service={service} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const OrbCard = ({ index, activeIndex, setActiveIndex, service }) => {
  return (
    <div
      onClick={() => setActiveIndex(index)}
      className="group relative w-44 h-44 sm:w-52 sm:h-52 mx-auto flex flex-col items-center justify-center animate-fade-in-up cursor-pointer perspective-1000 will-change-transform service-orb-animation"
      style={{ animationDelay: `${900 + index * 100}ms` }}
    >
      <div className="relative w-full h-full rounded-full flex items-center justify-center bg-white/5 backdrop-blur-xl border border-white/30 shadow-[0_8px_60px_rgba(0,0,0,0.3)] transition-all duration-700 ease-in-out group-hover:bg-white/10 group-hover:scale-105 group-hover:-translate-y-6 group-hover:shadow-[0_12px_80px_rgba(0,0,0,0.5)] transform-gpu overflow-hidden">
        <div className="absolute inset-0 rounded-full bg-gradient-radial from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute -inset-x-full h-1/4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer-light-band" />
        <div className="absolute -z-10 w-44 h-44 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 blur-3xl opacity-40 group-hover:opacity-80 group-hover:animate-pulse-strong transition-opacity duration-700" />
        <div className="w-20 h-20 sm:w-24 sm:h-24 p-3 bg-white/20 rounded-full border border-white/40 shadow-inner-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:bg-white/30">
          <img src={service.icon} alt={service.title} className="w-full h-full object-contain filter drop-shadow-xl" />
        </div>
      </div>

      {/* Desktop Hover Description */}
      <div className="absolute top-[calc(100%+0.75rem)] text-center w-full transition-all duration-500 ease-out-back opacity-0 group-hover:opacity-100 group-hover:top-[calc(100%+2rem)] hidden sm:block">
        <h3 className="text-white text-lg font-bold drop-shadow-lg leading-tight mb-1">
          {service.title}
        </h3>
        <p className="text-gray-200 text-xs mt-1 px-3 leading-snug tracking-wide">
          {service.description}
        </p>
      </div>

      {/* ✅ Mobile View Popup */}
   {/* ✅ Mobile View Popup */}
{activeIndex === index && (
  <div className="absolute top-[calc(100%+1rem)] left-1/2 transform -translate-x-1/2 w-[90%] max-w-xs sm:hidden bg-black/90 text-white px-5 py-4 rounded-xl shadow-2xl border border-purple-400 z-20 animate-pop-in space-y-2">
    <h3 className="text-base font-bold text-purple-300 break-words">{service.title}</h3>
    <p className="text-sm leading-relaxed tracking-wide text-gray-100 break-words">
      {service.description}
    </p>
  </div>


      )}
    </div>
  );
};

export default Product;
