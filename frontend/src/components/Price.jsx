import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const Price = () => {
  // Destructure BACKEND_URL from ShopContext
  const { selectPackage, currency, token, BACKEND_URL } = useContext(ShopContext);
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/package/list` // <-- Changed to use BACKEND_URL from context
        );
        const data = await response.json();
        if (data.success) {
          setPackages(data.packages);
        } else {
          // toast.error(data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Our website is currently undergoing updates. Please check back soon! ");
      }
    };
    fetchPackages();
  }, [BACKEND_URL]); // <-- Added BACKEND_URL to dependencies

  const handlePackageSelect = (pkg) => {
    if (!token) {
      navigate("/login", { state: { from: "/packages" } }); // Redirect to login if not authenticated
    } else {
      selectPackage(pkg); // This will navigate to /connect
    }
  };

  return (
    <div className="relative py-28 px-4 sm:px-12 md:px-20 overflow-hidden rounded-[3rem] shadow-2xl">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-[30rem] h-[30rem] bg-pink-400 rounded-full blur-[150px] opacity-60 animate-blob z-0" />
      <div className="absolute top-40 right-0 w-[30rem] h-[30rem] bg-yellow-400 rounded-full blur-[150px] opacity-60 animate-blob animation-delay-2000 z-0" />
      <div className="absolute bottom-0 left-[15%] w-[30rem] h-[30rem] bg-purple-500 rounded-full blur-[150px] opacity-60 animate-blob animation-delay-4000 z-0" />
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {" "}
        <div className="mb-24 font-[brillant] space-y-6">
          {" "}
          <div className="flex justify-center items-center gap-4 animate-fade-in-down">
            {" "}
            <span className="w-14 h-[3px] bg-gradient-to-r from-pink-300 via-purple-400 to-indigo-400 rounded-full" />{" "}
            <p className="text-white tracking-widest font-semibold uppercase animate-pulse text-sm sm:text-base">
              Pricing Plans{" "}
            </p>{" "}
            <span className="w-14 h-[3px] bg-gradient-to-l from-pink-300 via-purple-400 to-indigo-400 rounded-full" />{" "}
          </div>{" "}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold animate-text-shimmer bg-clip-text text-transparent bg-[linear-gradient(110deg,#fff,45%,#9333ea,55%,#fff)] bg-[length:250%_100%]">
            Flexible Plans for Every Need{" "}
          </h2>{" "}
          <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Whether you're starting out or scaling fast, we've got a plan
            tailored to your journey.{" "}
          </p>{" "}
        </div>
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {" "}
          {packages.map((pkg) => (
            <div
              key={pkg._id}
              className={`group relative rounded-[2rem] p-10 sm:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.2)] transform hover:scale-[1.05] hover:-translate-y-2 backdrop-blur-md transition-all duration-300
                ${
                  pkg.isCustom
                    ? "bg-gradient-to-br border-2 border-yellow-500 shadow-xl ring-4 ring-yellow-400 ring-opacity-50"
                    : "bg-white/5"
                }
              `}
            >
              {/* Conditional Border Glow */}
              <div
                className={`absolute inset-0 rounded-[2rem] border-2 transition-opacity duration-500 animate-glow-pulse z-0
                ${
                  pkg.isCustom
                    ? "border-yellow-400 opacity-100" // Always visible and yellow for custom
                    : "border-purple-600 opacity-0 group-hover:opacity-100" // Purple glow on hover for normal
                }
              `}
              />{" "}
              <div className="relative z-10 text-left space-y-6">
                {" "}
                <h3
                  className={`text-3xl font-bold capitalize mb-1
                    ${pkg.isCustom ? "text-yellow-300" : "text-purple-200"}
                  `}
                >
                  {pkg.name} Plan{" "}
                </h3>{" "}
                <p className="text-sm text-gray-300 font-[italic]">
                  {" "}
                  {pkg.name === "pro"
                    ? "Perfect for individuals and startups launching their first project."
                    : pkg.isCustom
                    ? "Every idea is different — so we build custom solutions that match your unique needs.You bring the vision. We bring it to life."
                    : "Perfect for individuals and startups launching their first project."}{" "}
                </p>{" "}
                <div className="space-y-1">
                  {" "}
                  <p className="text-2xl text-gray-400 line-through">
                    {currency} {pkg.originalPrice.toLocaleString()}{" "}
                  </p>{" "}
                  {pkg.isCustom ? (
                    <>
                      {" "}
                      <p className="text-3xl font-bold text-yellow-400">
                        {" "}
                        {/* Changed for custom */} {currency}{" "}
                        {pkg.minAdvance.toLocaleString()} Advance{" "}
                      </p>{" "}
                      <p className="text-sm text-gray-300 mt-2">
                        *Minimum advance payment required{" "}
                      </p>{" "}
                    </>
                  ) : (
                    <p className="text-5xl font-bold text-pink-400">
                      {currency} {pkg.price.toLocaleString()}{" "}
                    </p>
                  )}{" "}
                </div>{" "}
                <ul className="space-y-3 text-white/90 font-[cursive] text-base">
                  {" "}
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      {" "}
                      <img src={assets.tick_icon} className="w-6" alt="tick" />
                      {feature}{" "}
                    </li>
                  ))}{" "}
                </ul>{" "}
                <button
                  onClick={() => handlePackageSelect(pkg)}
                  className={`mt-6 w-full px-6 py-3 rounded-full text-white font-semibold tracking-wide shadow-xl transition-all duration-300
                    ${
                      pkg.isCustom
                        ? "bg-gradient-to-r from-yellow-600 to-orange-500 hover:from-orange-500 hover:to-yellow-700"
                        : "bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 hover:from-pink-500 hover:to-purple-700"
                    }
                  `}
                >
                  {pkg.name} {" "}
                </button>{" "}
              </div>{" "}
            </div>
          ))}{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default Price;