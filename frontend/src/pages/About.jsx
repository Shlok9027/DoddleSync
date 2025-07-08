import React, { useState } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";

const About = () => {
  const [showMore, setShowMore] = useState(false);

  // CSS for Super Sonic Fonts and Effects - Embedded directly
  const superSonicStyles = `
    /* --- Import Custom Fonts from Google Fonts --- */
    @import url('https://fonts.googleapis.com/css2?family=Audiowide&family=Michroma&family=Nova+Square&family=Electrolize&family=Share+Tech+Mono&family=Syncopate:wght@400;700&family=Quantico:wght@400;700&display=swap');

    /* --- Keyframe Animations --- */
    @keyframes pulseGlow {
      0% {
        text-shadow:
          0 0 5px rgba(255, 255, 255, 0.4),
          0 0 15px rgba(138, 43, 226, 0.7),
          0 0 30px rgba(255, 105, 180, 0.8),
          0 0 50px rgba(255, 255, 0, 0.5); /* Added yellow glow */
      }
      50% {
        text-shadow:
          0 0 10px rgba(255, 255, 255, 0.9),
          0 0 30px rgba(138, 43, 226, 1),
          0 0 60px rgba(255, 105, 180, 1),
          0 0 90px rgba(255, 255, 0, 0.7); /* Intensified yellow glow */
      }
      100% {
        text-shadow:
          0 0 5px rgba(255, 255, 255, 0.4),
          0 0 15px rgba(138, 43, 226, 0.7),
          0 0 30px rgba(255, 105, 180, 0.8),
          0 0 50px rgba(255, 255, 0, 0.5);
      }
    }

    @keyframes textWarpShimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
    }

    @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0px, 0px) scale(1); }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeInLeft {
      from { opacity: 0; transform: translateX(-50px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes fadeInRight {
      from { opacity: 0; transform: translateX(50px); }
      to { opacity: 1; transform: translateX(0); }
    }

    /* --- Custom Font Classes --- */
    .font-audiowide {
        font-family: 'Audiowide', cursive;
        letter-spacing: 0.1em; /* More spacing for impact */
    }

    .font-michroma {
        font-family: 'Michroma', sans-serif;
        letter-spacing: 0.08em;
    }

    .font-nova-square {
        font-family: 'Nova Square', cursive;
        letter-spacing: 0.05em;
    }

    .font-electrolize {
        font-family: 'Electrolize', sans-serif;
        letter-spacing: 0.02em;
    }

    .font-share-tech-mono {
        font-family: 'Share Tech Mono', monospace;
        letter-spacing: 0.04em;
    }

    .font-quantico {
        font-family: 'Quantico', sans-serif;
        letter-spacing: 0.03em;
    }

    /* --- Super Sonic Text Gradient and Glow (for the H2) --- */
    .text-super-sonic-heading {
      background: linear-gradient(135deg, #FF00FF, #8A2BE2, #00FFFF, #FFD700); /* Neo-cyber gradient: Magenta, BlueViolet, Cyan, Gold */
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      color: transparent; /* Fallback */
      text-shadow:
        0 0 8px rgba(255, 0, 255, 0.7),   /* Magenta glow */
        0 0 20px rgba(138, 43, 226, 0.8),  /* BlueViolet glow */
        0 0 40px rgba(0, 255, 255, 0.9),   /* Cyan glow */
        0 0 60px rgba(255, 215, 0, 0.6);   /* Gold glow */
      -webkit-box-reflect: below 1px linear-gradient(transparent, rgba(0,0,0,0.4)); /* Stronger reflection */
      animation: pulseGlow 4s infinite alternate ease-in-out, textWarpShimmer 8s linear infinite;
      background-size: 300% auto; /* For shimmer effect */
    }

    /* --- General Text Styling --- */
    .text-overlay-effect {
      font-family: 'Syncopate', sans-serif; /* Already used, good for bold overlay */
      font-size: 1.25rem; /* Slightly larger */
      letter-spacing: 0.15em; /* More tracking */
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.9);
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.7); /* Subtle white glow */
    }

    /* Adjusting existing Tailwind animations to use injected keyframes */
    .animate-blob { animation: ${'blob'} 7s infinite ease-in-out; }
    .animation-delay-2000 { animation-delay: 2s; }
    .animation-delay-4000 { animation-delay: 4s; }
    .animate-fade-in { animation: ${'fadeIn'} 1s ease-out forwards; }
    .animate-fade-in-left { animation: ${'fadeInLeft'} 1s ease-out forwards; }
    .animate-fade-in-right { animation: ${'fadeInRight'} 1s ease-out forwards; }
  `;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-12 py-24 text-white font-[Poppins] overflow-hidden z-10 transition-all duration-700 ease-in-out">
      {/* Injecting the custom styles */}
      <style>{superSonicStyles}</style>

      {/* Background blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-40 animate-blob z-0" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-400 rounded-full mix-blend-overlay filter blur-3xl opacity-40 animate-blob animation-delay-2000 z-0" />
      <div className="absolute bottom-0 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-overlay filter blur-3xl opacity-40 animate-blob animation-delay-4000 z-0" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-center justify-center w-full max-w-7xl backdrop-blur-2xl bg-white/10 rounded-3xl border border-white/10 shadow-[0_4px_60px_rgba(0,0,0,0.25)] p-8 md:p-12 transition-all duration-500 hover:shadow-purple-600/30">
        {/* Left Side Image with optional expanded content below */}
        <div className="flex flex-col items-center w-full lg:w-1/2 animate-fade-in-left transition-all duration-700 ease-in-out">
          <div className="relative group w-full max-w-md">
            <img
              src={assets.about}
              alt="About DoddleSync"
              className="w-full h-auto object-contain drop-shadow-2xl rounded-3xl border border-white/20 transition duration-500 group-hover:scale-105 group-hover:shadow-2xl"
            />
            <div className="absolute inset-0 bg-black/30 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
              {/* Applied new overlay text style */}
              <p className="text-overlay-effect">Doddle Sync</p>
            </div>
          </div>

          {/* Expanded paragraph BELOW image */}
          {showMore && (
            <div className="mt-8 px-4 py-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl animate-fade-in text-white/80 text-base leading-relaxed max-w-2xl transition-all duration-700 font-electrolize">
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
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8 animate-fade-in-right">
          {/* Title component is assumed to be self-styled */}
          <Title text1={'About'} text2={'DoddleSync'}/>

          {/* Applied super sonic heading style and new font */}
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight text-super-sonic-heading font-audiowide">
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

          <p className="text-gray-300 pt-4 max-w-md mx-auto lg:mx-0 font-share-tech-mono">
            Built to scale with you — from idea to execution — DoddleSync ensures every interaction is meaningful and every milestone is met.
          </p>

          <button
            onClick={() => setShowMore(!showMore)}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl shadow-xl hover:shadow-pink-600/40 transition-all duration-300 transform hover:scale-105 font-quantico uppercase tracking-wider"
          >
            {showMore ? "Hide Info" : "Learn More"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;