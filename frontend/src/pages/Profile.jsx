// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // const Profile = () => {
// //   const [profile, setProfile] = useState({
// //     name: "",
// //     email: "",
// //     mobile: "",
// //     profileImage: "",
// //   });

// //   useEffect(() => {
// //     const fetchUser = async () => {
// //       try {
// //         const res = await axios.get("/api/user/me", {
// //           headers: {
// //             Authorization: `Bearer ${localStorage.getItem("token")}`,
// //           },
// //         });
// //         const { name, email, mobile, profileImage } = res.data.user;
// //         setProfile({
// //           name: name || "",
// //           email: email || "",
// //           mobile: mobile || "",
// //           profileImage: profileImage || "",
// //         });
// //       } catch (err) {
// //         console.error(err);
// //       }
// //     };
// //     fetchUser();
// //   }, []);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await axios.put("/api/user/profile", profile, {
// //         headers: {
// //           Authorization: `Bearer ${localStorage.getItem("token")}`,
// //         },
// //       });
// //       alert("Profile updated!");
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   return (
// //     <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow rounded">
// //       <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
// //       <form onSubmit={handleSubmit}>
// //         <input
// //           type="text"
// //           placeholder="Name"
// //           className="w-full border p-2 mb-3"
// //           value={profile.name}
// //           onChange={(e) => setProfile({ ...profile, name: e.target.value })}
// //         />
// //         <input
// //           type="email"
// //           placeholder="Email"
// //           className="w-full border p-2 mb-3"
// //           value={profile.email}
// //           onChange={(e) => setProfile({ ...profile, email: e.target.value })}
// //         />
// //         <input
// //           type="tel"
// //           placeholder="Mobile Number"
// //           className="w-full border p-2 mb-3"
// //           value={profile.mobile}
// //           onChange={(e) => setProfile({ ...profile, mobile: e.target.value })}
// //         />
// //         <input
// //           type="text"
// //           placeholder="Profile Image URL"
// //           className="w-full border p-2 mb-3"
// //           value={profile.profileImage}
// //           onChange={(e) =>
// //             setProfile({ ...profile, profileImage: e.target.value })
// //           }
// //         />
// //         <button
// //           type="submit"
// //           className="bg-purple-600 text-white px-4 py-2 rounded"
// //         >
// //           Save
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Profile;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify"; // Import toast

// const Profile = () => {
//   const [profile, setProfile] = useState({
//     name: "",
//     email: "", // Added email to state
//     phone: "", // Changed from mobile to phone
//     profileImage: "",
//   });

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get(`${"https://doddlesync-baackend.onrender.com"}/api/user/me`, { // Use VITE_BACKEND_URL
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         const { name, email, phone, profileImage } = res.data.user; // Changed from mobile to phone
//         setProfile({
//           name: name || "",
//           email: email || "",
//           phone: phone || "", // Changed from mobile to phone
//           profileImage: profileImage || "",
//         });
//       } catch (err) {
//         console.error("Error fetching user profile:", err);
//         toast.error("Failed to fetch profile data.");
//       }
//     };
//     fetchUser();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.put(`${https://doddlesync-baackend.onrender.com}/api/user/profile`, profile, 
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       if (res.data.success) {
//         toast.success("Profile updated successfully!"); // Use toast
//       } else {
//         toast.error(res.data.message || "Failed to update profile.");
//       }
//     } catch (err) {
//       console.error("Error updating profile:", err);
//       toast.error(err.response?.data?.message || "An error occurred while updating profile.");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow rounded">
//       <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Name"
//           className="w-full border p-2 mb-3"
//           value={profile.name}
//           onChange={(e) => setProfile({ ...profile, name: e.target.value })}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full border p-2 mb-3"
//           value={profile.email}
//           onChange={(e) => setProfile({ ...profile, email: e.target.value })}
//           disabled // Email is usually not editable via profile page
//         />
//         <input
//           type="tel" // Use type="tel" for phone numbers
//           placeholder="Phone Number"
//           className="w-full border p-2 mb-3"
//           value={profile.phone} // Changed from mobile to phone
//           onChange={(e) => setProfile({ ...profile, phone: e.target.value })} // Changed from mobile to phone
//         />
//         <input
//           type="text"
//           placeholder="Profile Image URL"
//           className="w-full border p-2 mb-3"
//           value={profile.profileImage}
//           onChange={(e) =>
//             setProfile({ ...profile, profileImage: e.target.value })
//           }
//         />
//         <button
//           type="submit"
//           className="bg-purple-600 text-white px-4 py-2 rounded"
//         >
//           Save
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Profile;
