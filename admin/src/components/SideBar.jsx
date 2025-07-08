// import React from "react";
// import { NavLink } from "react-router-dom";
// import { assets } from "../assets/assets";

// const SideBar = () => {
//   return (
//     <div className="w-full px-4 py-3  flex items-center justify-center gap-51 overflow-x-auto scrollbar-thin scrollbar-thumb-purple-600/40 scrollbar-track-transparent">
//       <NavLink
//         to="/latest-inquiries"
//         className="flex items-center gap-2 px-4 py-2 border border-purple-500/20 rounded-xl bg-white/5
//           hover:bg-purple-500/10 hover:border-purple-500/30 
//           hover:scale-[1.02] active:bg-purple-500/20 transition-all duration-300 ease-in-out"
//       >
//         <img
//           src={assets.latest_inquiries}
//           alt="Inquiries"
//           className="w-5 h-5 transition-transform duration-300 hover:rotate-6"
//         />
//         <p className="text-purple-300 group-hover:text-purple-200 text-sm">
//           Latest Inquiries
//         </p>
//       </NavLink>

//       <NavLink
//         to="/client-chats"
//         className="flex items-center gap-2 px-4 py-2 border border-blue-500/20 rounded-xl bg-white/5
//           hover:bg-blue-500/10 hover:border-blue-500/30
//           hover:scale-[1.02] active:bg-blue-500/20 transition-all duration-300 ease-in-out"
//       >
//         <img
//           src={assets.chat}
//           alt="Chats"
//           className="w-5 h-5 transition-transform duration-300 hover:rotate-6"
//         />
//         <p className="text-blue-300 group-hover:text-blue-200 text-sm">
//           Client Chats
//         </p>
//       </NavLink>

//       <NavLink
//         to="/product-packages"
//         className="flex items-center gap-2 px-4 py-2 border border-green-500/20 rounded-xl bg-white/5
//           hover:bg-green-500/10 hover:border-green-500/30
//           hover:scale-[1.02] active:bg-green-500/20 transition-all duration-300 ease-in-out"
//       >
//         <img
//           src={assets.plans}
//           alt="Plans"
//           className="w-5 h-5 transition-transform duration-300 hover:rotate-6"
//         />
//         <p className="text-green-300 group-hover:text-green-200 text-sm">
//           Product Plan Section
//         </p>
//       </NavLink>
//     </div>
//   );
// };

// export default SideBar;

import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const SideBar = () => {
  return (
    <div className="w-full gap-3 px-2 sm:px-4 py-3 flex items-center justify-start sm:justify-center sm:gap-5 overflow-x-auto scrollbar-thin scrollbar-thumb-purple-600/40 scrollbar-track-transparent">
      
      {/* Latest Inquiries */}
      <NavLink
        to="/latest-inquiries"
        className={({ isActive }) =>
          `group flex items-center gap-2 px-4 py-2 rounded-xl border bg-white/5 text-sm transition-all duration-300 ease-in-out backdrop-blur-md
          ${
            isActive
              ? "border-purple-500/40 bg-purple-700/30 text-purple-100 shadow-md shadow-purple-500/20"
              : "border-purple-500/20 text-purple-300 hover:bg-purple-700/10 hover:border-purple-600/30 hover:text-purple-100 hover:scale-[1.03] hover:shadow-lg hover:shadow-purple-500/30 active:scale-95"
          }`
        }
      >
        <img
          src={assets.latest_inquiries}
          alt="Inquiries"
          className="w-8 h-8 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105"
        />
        <p className="transition-all duration-300 group-hover:text-purple-100 group-hover:drop-shadow-md">
          Latest Inquiries
        </p>
      </NavLink>

      {/* Client Chats */}
      <NavLink
        to="/client-chats"
        className={({ isActive }) =>
          `group flex items-center gap-2 px-4 py-2 rounded-xl border bg-white/5 text-sm transition-all duration-300 ease-in-out backdrop-blur-md
          ${
            isActive
              ? "border-blue-500/40 bg-blue-700/30 text-blue-100 shadow-md shadow-blue-500/20"
              : "border-blue-500/20 text-blue-300 hover:bg-blue-700/10 hover:border-blue-600/30 hover:text-blue-100 hover:scale-[1.03] hover:shadow-lg hover:shadow-blue-500/30 active:scale-95"
          }`
        }
      >
        <img
          src={assets.chat}
          alt="Chats"
          className="w-8 h-8 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105"
        />
        <p className="transition-all duration-300 group-hover:text-blue-100 group-hover:drop-shadow-md">
          Client Chats
        </p>
      </NavLink>

      {/* Product Plan Section */}
      <NavLink
        to="/product-packages"
        className={({ isActive }) =>
          `group flex items-center gap-2 px-4 py-2 rounded-xl border bg-white/5 text-sm transition-all duration-300 ease-in-out backdrop-blur-md
          ${
            isActive
              ? "border-green-500/40 bg-green-700/30 text-green-100 shadow-md shadow-green-500/20"
              : "border-green-500/20 text-green-300 hover:bg-green-700/10 hover:border-green-600/30 hover:text-green-100 hover:scale-[1.03] hover:shadow-lg hover:shadow-green-500/30 active:scale-95"
          }`
        }
      >
        <img
          src={assets.plans}
          alt="Plans"
          className="w-8 h-8 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105"
        />
        <p className="transition-all duration-300 group-hover:text-green-100 group-hover:drop-shadow-md">
          Product Plan Section
        </p>
      </NavLink>
      
    </div>
  );
};

export default SideBar;
