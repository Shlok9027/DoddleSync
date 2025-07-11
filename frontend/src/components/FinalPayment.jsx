import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { loadStripe } from "@stripe/stripe-js";
import { paymentApi } from "../services/api";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const FinalPayment = () => {
    const navigate = useNavigate();
    // Destructure BACKEND_URL from ShopContext
    const { userDetails, selectedPackage, currency, token, BACKEND_URL } = useContext(ShopContext);
    const [paymentMethod, setPaymentMethod] = useState("stripe");
    const [isProcessing, setIsProcessing] = useState(false);

    const handleEdit = () => {
        navigate("/connect", { state: { fromFinal: true } });
    };

    const handleStripePayment = async () => {
        try {
            setIsProcessing(true);

            // 1. Prepare payment data
            const amountToPay = selectedPackage.isCustom ? selectedPackage.minAdvance : selectedPackage.price;
            const paymentData = {
                amount: amountToPay,
                packageDetails: selectedPackage,
                userDetails: userDetails,
            };

            // 2. Submit Inquiry (this was hardcoded before, now uses BACKEND_URL)
            const inquiryResponse = await fetch(`${BACKEND_URL}/api/inquiry/new`, { // <-- Changed
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: userDetails.name,
                    email: userDetails.email,
                    phone: userDetails.phone,
                    idea: userDetails.idea,
                    description: userDetails.description,
                    selectedPackage: selectedPackage,
                    // You might remove timestamp and paymentMethod here if your backend inquiry schema doesn't need them
                    // timestamp: new Date().toISOString(),
                    // paymentMethod: "stripe",
                }),
            });

            const inquiryData = await inquiryResponse.json();

            if (!inquiryResponse.ok) {
                throw new Error(inquiryData.message || "Failed to submit inquiry before payment.");
            }
            toast.success(inquiryData.message || "Inquiry recorded, redirecting to payment...");


            // 3. Create Stripe Checkout Session
            const stripeSessionResponse = await paymentApi.createStripeSession(paymentData);

            if (stripeSessionResponse.success) {
                // Store order ID to track (if needed, this comes from backend order creation)
                localStorage.setItem("orderId", stripeSessionResponse.orderId);

                // Redirect to Stripe Checkout
                window.location.href = stripeSessionResponse.url;
            } else {
                throw new Error(stripeSessionResponse.message || "Payment initialization failed.");
            }
        } catch (error) {
            console.error("Payment error:", error);
            toast.error(error.message || "Payment failed. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handlePayment = async () => {
        // Consolidated pre-checks
        if (!token) {
            toast.error("Please log in to proceed with payment.");
            navigate("/login");
            return;
        }
        if (!selectedPackage) {
            toast.error("Please select a package before proceeding with payment.");
            navigate("/packages");
            return;
        }
        if (
            !userDetails.name ||
            !userDetails.email ||
            !userDetails.phone ||
            !userDetails.idea ||
            !userDetails.description
        ) {
            toast.error(
                "Please fill out all project details before proceeding with payment."
            );
            navigate("/connect");
            return;
        }

        if (paymentMethod === "stripe") {
            await handleStripePayment();
        } else {
            // Handle Razorpay payment (you'd move inquiry submission logic here too if Razorpay is primary)
            toast.info("Razorpay integration coming soon!");
            // navigate("/razorpay-payment");
        }
    };

    // Ensure userDetails and selectedPackage are loaded before rendering meaningful content
    if (!userDetails || !selectedPackage) {
        return (
            <div className="min-h-screen rounded-3xl px-4 py-20 text-white flex justify-center items-center relative overflow-hidden">
                <p className="text-xl">Loading details or missing information. Redirecting...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen rounded-3xl px-4 py-20 text-white flex justify-center items-center relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 left-0 w-[30rem] h-[30rem] bg-pink-400 rounded-full blur-[150px] opacity-60 animate-blob z-0" />
            <div className="absolute top-40 right-0 w-[30rem] h-[30rem] bg-yellow-400 rounded-full blur-[150px] opacity-60 animate-blob animation-delay-2000 z-0" />
            <div className="absolute bottom-0 left-[15%] w-[30rem] h-[30rem] bg-purple-500 rounded-full blur-[150px] opacity-60 animate-blob animation-delay-4000 z-0" />

            <div className="backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl px-8 py-12 max-w-2xl w-full z-10">
                {/* Title */}
                <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 mb-10">
                    Let's Lock In Your Vision
                </h2>
                {/* Project Details Section */}
                <div className="space-y-4 mb-10">
                    <h3 className="text-2xl font-semibold text-pink-400">
                        🚀 Your Project Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base">
                        <p>
                            <strong>Name:</strong> {userDetails.name}
                        </p>
                        <p>
                            <strong>Email:</strong> {userDetails.email}
                        </p>
                        <p>
                            <strong>Phone:</strong> {userDetails.phone}
                        </p>
                        <p>
                            <strong>Idea:</strong> {userDetails.idea}
                        </p>
                        <p className="md:col-span-2">
                            <strong>Description:</strong> {userDetails.description}
                        </p>
                    </div>
                </div>

                {/* Package Details */}
                <div className="space-y-4 mb-6">
                    <h3 className="text-2xl font-semibold text-blue-400">
                        🎯 Selected Package
                    </h3>
                    <div className="text-sm sm:text-base">
                        <p>
                            <strong>Plan:</strong> {selectedPackage?.name}
                        </p>
                        {selectedPackage?.isCustom ? (
                            <>
                                <p>
                                    <strong>Advance Payment:</strong> {currency}
                                    {selectedPackage.minAdvance.toLocaleString()}
                                </p>
                                <p className="text-red-400 text-sm mt-1">
                                    For custom solutions, an advance of {currency}
                                    {selectedPackage.minAdvance.toLocaleString()} is required.
                                </p>
                            </>
                        ) : (
                            <p>
                                <strong>Total Cost:</strong> {currency}
                                {selectedPackage?.price.toLocaleString()}
                            </p>
                        )}
                    </div>
                </div>

                {/* Payment Method Selector */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-green-300 mb-2">
                        🧾 Choose Payment Method
                    </h3>
                    <div className="flex gap-6 text-white">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="payment"
                                value="stripe"
                                checked={paymentMethod === "stripe"}
                                onChange={() => setPaymentMethod("stripe")}
                                className="text-purple-500 focus:ring-purple-500"
                            />
                            <span className="flex items-center gap-2">
                                <img src={assets.stripe} alt="Stripe" className="h-6" />
                                Stripe
                            </span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="payment"
                                value="razorpay"
                                checked={paymentMethod === "razorpay"}
                                onChange={() => setPaymentMethod("razorpay")}
                                className="text-purple-500 focus:ring-purple-500"
                            />
                            <span className="flex items-center gap-2">
                                <img src={assets.razorpay} alt="Razorpay" className="h-6" />
                                Razorpay
                            </span>
                        </label>
                    </div>
                </div>

                {/* Payment Button */}
                <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className={`w-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600
                        hover:from-pink-500 hover:to-yellow-400 transition-all duration-300
                        text-white font-bold py-4 px-6 rounded-xl shadow-xl tracking-wide text-lg
                        ${isProcessing ? "opacity-75 cursor-not-allowed" : ""}`}
                >
                    {isProcessing ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                            Processing...
                        </span>
                    ) : (
                        `Pay ${currency}${(selectedPackage?.isCustom
                            ? selectedPackage.minAdvance
                            : selectedPackage?.price
                        ).toLocaleString()} via ${paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}`
                    )}
                </button>

                {/* Edit Button */}
                <button
                    onClick={handleEdit}
                    disabled={isProcessing}
                    className="mt-6 text-sm underline text-white/70 hover:text-white/90 text-center w-full"
                >
                    ✏️ Edit Information
                </button>

                {/* Security Note */}
                <p className="text-xs text-center text-white/60 mt-4">
                    Your information is encrypted and secure. 🔒
                </p>
            </div>
        </div>
    );
};

export default FinalPayment;