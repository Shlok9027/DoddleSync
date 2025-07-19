import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const Connect = () => {
    const navigate = useNavigate();
    const { userDetails, saveUserDetails, selectedPackage, token } = useContext(ShopContext);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        idea: "",
        description: "",
    });

    const [agreed, setAgreed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); // New state to handle button disabling

    useEffect(() => {
        if (!token) {
            const redirectTimer = setTimeout(() => {
                navigate("/login", { state: { from: "/connect" } });
            }, 0);
            return () => clearTimeout(redirectTimer);
        } else if (userDetails && Object.keys(userDetails).length > 0) {
            // Populate form from userDetails if available
            setForm({
                name: userDetails.name || "",
                email: userDetails.email || "",
                phone: userDetails.phone || "",
                idea: userDetails.idea || "",
                description: userDetails.description || "",
            });
        }
    }, [userDetails, token, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Frontend validation
        const { name, email, phone, idea, description } = form;

        if (!name || !email || !phone || !idea || !description) {
            toast.error("Please fill all the fields.");
            return;
        }

        if (!agreed) {
            toast.error("Please confirm you are human by checking the box.");
            return;
        }

        setIsSubmitting(true);
        try {
            saveUserDetails(form);
            toast.success("Details saved! Proceeding to payment summary.");
            navigate("/final-payment");
        } catch (err) {
            console.error("Error saving form data:", err);
            toast.error("Failed to save details. Please try again.");
        } finally {
            setIsSubmitting(false); // Re-enable button
        }
    };
    // --- END MAJOR CHANGE ---

    const handleClear = () => {
        const emptyForm = {
            name: "",
            email: "",
            phone: "",
            idea: "",
            description: "",
        };
        setForm(emptyForm);
        localStorage.removeItem("userDetails"); // Clear from local storage
        saveUserDetails(emptyForm); // Clear from context
        toast.info("Form details cleared.");
    };

    return (
        <div className="relative rounded-3xl min-h-screen flex items-center justify-center px-6 md:px-12 py-24 text-white font-[Poppins] overflow-hidden z-10">
            {/* Floating blobs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-40 animate-blob z-0" />
            <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-400 rounded-full blur-3xl opacity-40 animate-blob animation-delay-2000 z-0" />
            <div className="absolute bottom-0 left-20 w-72 h-72 bg-pink-500 rounded-full blur-3xl opacity-40 animate-blob animation-delay-4000 z-0" />

            {/* Form Card */}
            <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-center justify-center w-full max-w-7xl backdrop-blur-3xl bg-white/5 rounded-3xl border border-white/10 shadow-[0_4px_60px_rgba(0,0,0,0.25)] p-8 md:p-12">
                <div className="w-full max-w-4xl lg:w-3/5 space-y-8">
                    <h2 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-100 to-white">
                        Let's Shape Your Vision.
                    </h2>

                    {selectedPackage && (
                        <div className="text-center">
                            <span className="px-6 py-3 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 font-semibold">
                                Selected Package: {selectedPackage.name.charAt(0).toUpperCase() + selectedPackage.name.slice(1)}
                                {selectedPackage.isCustom && " (Custom)"} {/* Added clearer custom indicator */}
                            </span>
                        </div>
                    )}

                    <p className="text-center text-lg text-gray-300">
                        Share your ideas and let's build something that matters.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <input
                                name="name"
                                onChange={handleChange}
                                value={form.name}
                                type="text"
                                placeholder="Your Name"
                                className="form-input"
                                required
                            />
                            <input
                                name="email"
                                onChange={handleChange}
                                value={form.email}
                                type="email"
                                placeholder="Your Email"
                                className="form-input"
                                required
                            />
                            <input
                                name="phone"
                                onChange={handleChange}
                                value={form.phone}
                                type="text"
                                placeholder="Phone Number"
                                className="form-input"
                                required
                            />
                            <input
                                name="idea"
                                onChange={handleChange}
                                value={form.idea}
                                type="text"
                                placeholder="Your Idea"
                                className="form-input"
                                required
                            />
                        </div>

                        <textarea
                            name="description"
                            onChange={handleChange}
                            value={form.description}
                            rows="4"
                            placeholder="Describe your vision..."
                            className="form-input w-full"
                            required
                        />

                        <div className="flex items-center gap-3 text-gray-300">
                            <input
                                type="checkbox"
                                id="human"
                                checked={agreed}
                                onChange={() => setAgreed((prev) => !prev)}
                                className="w-5 h-5 rounded-md"
                            />
                            <label htmlFor="human" className="text-sm">
                                I'm a human visionary
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting} // Disable button during submission
                            className={`group w-full py-4 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl font-bold text-xl text-white shadow-xl hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            <div className="flex flex-col items-center font-[Pacifico] justify-center gap-2">
                                <div className="flex items-center justify-center gap-3">
                                    <img
                                        src={assets.message}
                                        alt="Send"
                                        className={`w-6 ${isSubmitting ? 'animate-spin' : 'animate-bounce group-hover:animate-spin-360'}`}
                                    />
                                    {isSubmitting ? "Proceeding..." : "Proceed to Payment"}
                                </div>
                                {selectedPackage && (
                                    <span className="text-sm font-normal opacity-90">
                                        Selected: {selectedPackage.name.charAt(0).toUpperCase() + selectedPackage.name.slice(1)} Package
                                    </span>
                                )}
                            </div>
                        </button>
                        <button
                            type="button"
                            onClick={handleClear}
                            className="mt-4 px-6 py-2 text-sm rounded-lg bg-red-500 hover:bg-red-600 transition-all"
                        >
                            Clear Details
                        </button>
                    </form>

                    {/* Contact Info */}
                    <div className="flex flex-col sm:flex-row justify-between items-center text-sm mt-8 text-gray-300 border-t border-white/10 pt-6 gap-6">
                        <div className="flex items-center gap-3">
                            <img
                                src={assets.telephone}
                                alt="Phone"
                                className="w-5 grayscale hover:grayscale-0"
                            />
                            <span className="hover:text-purple-400 cursor-pointer">
                                +91-8406090056
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <img
                                src={assets.mail}
                                alt="Mail"
                                className="w-5 grayscale hover:grayscale-0"
                            />
                            <span className="hover:text-purple-400 cursor-pointer">
                                contact@DoddleSync.com
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Illustration */}
                <div className="w-full lg:w-2/5 text-center lg:text-left space-y-8">
                    <p className="text-xl font-medium text-purple-300 tracking-wide uppercase">
                        Ready For <span className="font-extrabold">New Challenges</span>
                    </p>
                    <h3 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                        Empower Your Vision Through Innovation.
                    </h3>

                    <div className="relative group mt-6">
                        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 blur-xl opacity-40 group-hover:opacity-80 animate-pulse-slow" />
                        <div className="relative">
                            <img
                                src={assets.support_illustration}
                                alt="Innovation"
                                className="rounded-2xl shadow-2xl border-2 border-white/20"
                            />
                            <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                <p className="text-2xl font-bold tracking-widest uppercase">
                                    Let's Connect
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className="text-gray-300 pt-4 max-w-md mx-auto lg:mx-0">
                        We don't just create — we{" "}
                        <span className="font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                            transform
                        </span>
                        . Let's start something remarkable.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Connect;