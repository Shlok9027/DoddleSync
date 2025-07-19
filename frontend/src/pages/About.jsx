import React, { useState } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";

const About = () => {
  const [showMore, setShowMore] = useState(false);

  // Optimized CSS for Super Sonic Fonts and Effects - Embedded directly
  const superSonicStyles = `
    /* --- Import Custom Fonts from Google Fonts --- */
    @import url('https://fonts.googleapis.com/css2?family=Audiowide&family=Michroma&family=Nova+Square&family=Electrolize&family=Share+Tech+Mono&family=Syncopate:wght@400;700&family=Quantico:wght@400;700&display=swap');

    /* --- Keyframe Animations (Simplified) --- */
    @keyframes pulseSimpleGlow {
      0% { text-shadow: 0 0 10px rgba(255, 105, 180, 0.7); }
      50% { text-shadow: 0 0 20px rgba(138, 43, 226, 0.9); }
      100% { text-shadow: 0 0 10px rgba(255, 105, 180, 0.7); }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeInLeft {
      from { opacity: 0; transform: translateX(-30px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes fadeInRight {
      from { opacity: 0; transform: translateX(30px); }
      to { opacity: 1; transform: translateX(0); }
    }

    /* --- Custom Font Classes --- */
    .font-audiowide {
        font-family: 'Audiowide', cursive;
        letter-spacing: 0.08em;
    }

    .font-michroma {
        font-family: 'Michroma', sans-serif;
        letter-spacing: 0.05em;
    }

    .font-nova-square {
        font-family: 'Nova Square', cursive;
        letter-spacing: 0.03em;
    }

    .font-electrolize {
        font-family: 'Electrolize', sans-serif;
        letter-spacing: 0.01em;
    }

    .font-share-tech-mono {
        font-family: 'Share Tech Mono', monospace;
        letter-spacing: 0.02em;
    }

    .font-quantico {
        font-family: 'Quantico', sans-serif;
        letter-spacing: 0.02em;
    }

    /* --- Super Sonic Text Gradient and Glow (for the H2) - Simplified --- */
    .text-super-sonic-heading {
      background: linear-gradient(135deg, #FF00FF, #8A2BE2, #00FFFF); /* Simplified gradient */
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      color: transparent; /* Fallback */
      text-shadow: 0 0 15px rgba(255, 105, 180, 0.8); /* Single, prominent glow */
      animation: pulseSimpleGlow 3s infinite alternate ease-in-out; /* Simpler animation */
    }

    /* --- General Text Styling --- */
    .text-overlay-effect {
      font-family: 'Syncopate', sans-serif;
      font-size: 1.1rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.9);
      text-shadow: 0 0 5px rgba(255, 255, 255, 0.5); /* Subtle glow */
    }

    /* Adjusting existing Tailwind animations to use injected keyframes */
    /* Removed .animate-blob as they are resource-intensive. If needed, reintroduce with simpler animation properties or less frequent updates. */
    .animate-fade-in { animation: ${'fadeIn'} 0.8s ease-out forwards; }
    .animate-fade-in-left { animation: ${'fadeInLeft'} 0.8s ease-out forwards; }
    .animate-fade-in-right { animation: ${'fadeInRight'} 0.8s ease-out forwards; }
  `;

  return (
    <div className="relative rounded-3xl min-h-screen flex flex-col items-center justify-center px-6 md:px-12 py-24 text-white font-[Poppins] overflow-hidden z-10 transition-all duration-700 ease-in-out">
      {/* Injecting the custom styles */}
       <div className="absolute rounded-3xl inset-0 bg-radial-gradient-dark opacity-70"></div>
      <div className="absolute top-0 left-0 w-[30rem] h-[30rem] bg-pink-700 rounded-full blur-[150px] opacity-60 animate-blob z-0" />
      <div className="absolute top-40 right-0 w-[30rem] h-[30rem] bg-yellow-700 rounded-full blur-[150px] opacity-60 animate-blob animation-delay-2000 z-0" />
      <div className="absolute bottom-0 left-[15%] w-[30rem] h-[30rem] bg-purple-600 rounded-full blur-[150px] opacity-60 animate-blob animation-delay-4000 z-0" />
      <style>{superSonicStyles}</style>

      {/* Removed Background blobs for performance. If absolutely necessary, consider
          using static, less complex shapes or a single, very subtle animation. */}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-center justify-center w-full max-w-7xl backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 shadow-[0_4px_60px_rgba(0,0,0,0.15)] p-8 md:p-12 transition-all duration-500 hover:shadow-purple-600/20">
        {/* Left Side Image with optional expanded content below */}
        <div className="flex flex-col items-center w-full lg:w-1/2 animate-fade-in-left transition-all duration-700 ease-in-out">
          <div className="relative group w-full max-w-md">
            <img
              src={assets.about}
              alt="About DoddleSync"
              className="w-full h-auto object-contain drop-shadow-lg rounded-3xl border border-white/20 transition duration-300 group-hover:scale-103 group-hover:shadow-lg"
            />
            <div className="absolute inset-0 bg-black/20 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
              {/* Applied new overlay text style */}
              <p className="text-overlay-effect">Doddle Sync</p>
            </div>
          </div>

          {/* Expanded paragraph BELOW image */}
          {showMore && (
            <div className="mt-8 px-4 py-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md animate-fade-in text-white/80 text-base leading-relaxed max-w-2xl transition-all duration-700 font-electrolize">
              <p className="mb-4">
                DoddleSync is not just a platform — it’s a digital ecosystem built for streamlined project collaboration. We bridge the gap between service providers and clients through live meetings, contextual discussions, real-time updates, and secure milestone-based payments. Our tools are crafted to simplify conversations, eliminate delays, and drive clarity throughout every phase of development.
              </p>
              <p className="mb-4">
                We prioritize transparency by offering live project dashboards, auto-generated summaries after meetings, and built-in chat tools. Our recording and transcription system ensures that no key point is lost, enabling teams to focus on outcomes, not just process.
              </p>
              <p>
                Whether you're ideating your first digital product or refining a large-scale enterprise tool, DoddleSync provides the infrastructure and expert support to help you thrive. We’re not another freelance platform — we’re your long-term digital growth partner.
              </p>
            </div>
          )}
        </div>

        {/* Right Side Text */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6 animate-fade-in-right">
          {/* Title component is assumed to be self-styled */}
          <Title text1={'About'} text2={'DoddleSync'}/>

          {/* Applied super sonic heading style and new font */}
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight text-super-sonic-heading font-audiowide">
            We Don’t Just Build Websites –<br />
            We Build Complete Digital Solutions
          </h2>

          {/* Applied new body text fonts */}
          <p className="text-white/80 text-lg leading-relaxed font-michroma">
            At Doddle Sync, our mission is to simplify digital growth for businesses of all sizes. With a sharp focus on web, mobile, and cloud solutions, we deliver elegant systems that work seamlessly — combining technical expertise with beautiful design.
          </p>

          <p className="text-white/70 text-base leading-relaxed font-nova-square">
            DoddleSync was born out of a need for unified collaboration. It connects clients and service providers into a shared environment where tasks, expectations, and progress remain transparent and traceable. The result? Faster development, better alignment, and powerful outcomes.
          </p>

          <p className="text-gray-300 pt-3 max-w-md mx-auto lg:mx-0 font-share-tech-mono">
            Built to scale with you — from idea to execution — DoddleSync ensures every interaction is meaningful and every milestone is met.
          </p>

          <button
            onClick={() => setShowMore(!showMore)}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-pink-600/30 transition-all duration-300 transform hover:scale-105 font-quantico uppercase tracking-wider"
          >
            {showMore ? "Hide Info" : "Learn More"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;