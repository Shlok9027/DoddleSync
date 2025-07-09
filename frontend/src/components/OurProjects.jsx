import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick"; // Import Slider component
import { assets } from "../assets/assets"; // Assuming assets contains your project images
import { CSSTransition, TransitionGroup } from 'react-transition-group'; // For text animation


const OurProjects = () => {
  // Array of your project data
  const projects = [
    {
      id: 1,
      name: "ShopSphere E-commerce",
      type: "E-commerce Platform",
      image: assets.about, // Make sure these assets exist and are imported in assets.js
      description: "A comprehensive e-commerce solution for seamless online shopping experiences.",
    },
    {
      id: 2,
      name: "Creative Portfolio Pro",
      type: "Personal Portfolio",
      image: assets.about,
      description: "Showcasing artistic and professional works with elegant design and user-friendly navigation.",
    },
    {
      id: 3,
      name: "Global News Blog",
      type: "Content & Publishing",
      image: assets.about,
      description: "A dynamic platform delivering breaking news and insightful articles worldwide.",
    },
   
    // Add more projects here with their respective images from assets
  ];

  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const sliderRef = useRef(null); // Ref for controlling the Slider component

  // Settings for the react-slick carousel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Show only one image at a time in the carousel
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // 5 seconds autoplay
    cssEase: "linear",
    arrows: false,
    afterChange: (current) => setCurrentProjectIndex(current), // Update index after slide changes
    responsive: [ // Still include responsive settings if you want image size to adapt
      {
        breakpoint: 1024,
        settings: { slidesToShow: 1 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  const currentProject = projects[currentProjectIndex];

  return (
    <div className="py-16 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-purple-700 tracking-tight sm:text-4xl">
            Our Completed Projects
          </h1>
          <h2 className="mt-2 text-xl text-gray-600">
            Best Websites & Applications with Exclusive Design
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Known at DoddleSync for our commitment to excellence, derived from our
            valuable customers’ past web designing and development experience.
            Our work ethic positions us as one of India’s best web design
            companies. Flown Developer forms a major part of the list of top
            design services.
          </p>
        </div>

        {/* Two-Column Layout for Project Showcase */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          {/* Left Column: Project Name & Type with Animation */}
          <div className="text-left p-6">
            <TransitionGroup>
              <CSSTransition
                key={currentProject.id} // Key changes to trigger transition
                timeout={300} // Match CSS transition duration
                classNames="fade" // Class prefix for CSS transitions
              >
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">
                    {currentProject.name}
                  </h3>
                  <p className="text-purple-600 text-xl font-semibold mb-4">
                    {currentProject.type}
                  </p>
                  <p className="text-gray-600 leading-relaxed text-md">
                    {currentProject.description}
                  </p>
                  {/* Optional: Add a "View Project" button */}
                  <button className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    View Project
                  </button>
                </div>
              </CSSTransition>
            </TransitionGroup>
          </div>

          {/* Right Column: Projects Carousel Section */}
          <div className="w-full max-w-xl mx-auto lg:mx-0"> {/* Constrain width for carousel */}
            <Slider {...sliderSettings} ref={sliderRef}>
              {projects.map((project) => (
                <div key={project.id} className="p-4 outline-none"> {/* Add p-4 for spacing */}
                  <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-2xl p-6 text-center">
                    {/* Circular Image - Larger for single display */}
                    <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden mb-4 border-4 border-purple-300 shadow-xl flex items-center justify-center">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover object-center"
                      />
                      {/* Subtle overlay for visual effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurProjects;
