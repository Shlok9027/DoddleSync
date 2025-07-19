import React from 'react';
import { assets } from '../assets/assets';

const Testimonial = () => {
  return (
    <div className="relative rounded-3xl min-h-[50vh] flex items-center justify-center px-4 md:px-12 py-20 text-white font-[Poppins] overflow-hidden z-10 bg-transparent">
      {/* Background blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-overlay blur-3xl opacity-40 animate-blob animate-pulse-slow z-0" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-400 rounded-full mix-blend-overlay blur-3xl opacity-40 animate-blob animate-pulse-slow animation-delay-2000 z-0" />
      <div className="absolute bottom-0 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-overlay blur-3xl opacity-40 animate-blob animate-pulse-slow animation-delay-4000 z-0" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col md:flex-row gap-10 items-start justify-between w-full max-w-7xl border border-white/10 shadow-[0_4px_60px_rgba(0,0,0,0.25)] p-6 md:p-12 bg-white/5 backdrop-blur-md rounded-3xl">
        {/* Left - Text */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-200 animate-slide-up-fade">
            What Our Clients Say
          </h2>
          <p className="text-gray-300 font-[cursive] text-lg animate-slide-up-fade delay-200">
            We’ve had the honor of working with amazing people. Their words fuel our journey and reflect our passion for quality and innovation.
          </p>
          <p className="text-gray-300 font-[cursive] animate-slide-up-fade delay-400">
            Each review you see here is a real screenshot from Google — proof that when we deliver, we go above and beyond.
          </p>
        </div>

        {/* Right - Scrollable Images */}
      <div className="md:w-1/2 w-full">
  <div className="overflow-hidden relative">
    <div className="flex gap-4 pr-2 scroll-animation w-max">
      {[assets.testimonials, assets.testimonials2, assets.testimonials3, assets.about].map((src, idx) => (
        <div
          key={idx}
          className="w-[160px] h-[220px] sm:w-[200px] sm:h-[260px] flex-shrink-0 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 border border-white/20"
        >
          <img
            src={src}
            alt={`Testimonial ${idx + 1}`}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      ))}
      {/* Repeat to loop seamlessly */}
      {[assets.testimonials, assets.testimonials2, assets.testimonials3, assets.about].map((src, idx) => (
        <div
          key={`repeat-${idx}`}
          className="w-[160px] h-[220px] sm:w-[200px] sm:h-[260px] flex-shrink-0 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 border border-white/20"
        >
          <img
            src={src}
            alt={`Testimonial duplicate ${idx + 1}`}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      ))}
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default Testimonial;
