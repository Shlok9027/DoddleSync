
import React, { useState, useEffect } from "react";
import { adminApi } from "../services/api";
import { toast } from "react-toastify";

const LatestInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all"); 

  const fetchInquiries = async () => {
    try {
      const result = await adminApi.getInquiries();
      if (result.success) {
        // Filter based on selected status
        const filtered = result.inquiries.filter(inquiry => {
          if (filterStatus === "all") return true;
          return inquiry.status === filterStatus;
        });
        setInquiries(filtered.reverse());
      } else {
        toast.error(result.message || "Could not load inquiries.");
      }
    } catch (err) {
      console.error("Error while loading inquiries:", err);
      toast.error("Error while loading inquiries.");
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [filterStatus]); // Re-fetch when filterStatus changes

  const handleAccept = async (inquiry) => {
    try {
   
      const response = await adminApi.acceptInquiry({
        inquiryId: inquiry._id,
        clientName: inquiry.name,
        projectDetails: {
          idea: inquiry.idea,
          description: inquiry.description,
          contact: {
            email: inquiry.email,
            phone: inquiry.phone,
          },
          selectedPackage: inquiry.selectedPackage, // Add this if your backend accept endpoint requires it
        },
      });

      if (response.success) {
        toast.success("Inquiry accepted successfully!");
        setInquiries((prev) =>
          prev.map((i) =>
            i._id === inquiry._id ? { ...i, status: "accepted" } : i
          ).filter(i => filterStatus === "all" || i.status === filterStatus) // Re-filter after update
        );
      } else {
        toast.error(response.message || "Error accepting inquiry.");
      }
    } catch (error) {
      console.error("Failed to accept inquiry:", error);
      toast.error("Failed to accept inquiry.");
    }
  };

  // Helper function to get status badge color
  const getStatusBadge = (status) => {
    let colorClass = "bg-gray-500/20 text-gray-300";
    let text = status;
    switch (status) {
      case "pending":
        colorClass = "bg-blue-500/20 text-blue-300";
        text = "Pending Review";
        break;
      case "pending-payment":
        colorClass = "bg-yellow-500/20 text-yellow-300";
        text = "Awaiting Payment";
        break;
      case "accepted":
        colorClass = "bg-green-500/20 text-green-300";
        text = "Accepted (Paid)";
        break;
      case "payment-failed":
        colorClass = "bg-red-500/20 text-red-300";
        text = "Payment Failed";
        break;
      case "rejected":
        colorClass = "bg-purple-500/20 text-purple-300";
        text = "Rejected";
        break;
      default:
        break;
    }
    return <span className={`${colorClass} px-3 py-1 rounded-full text-sm`}>{text}</span>;
  };


  return (
    <div className="max-w-4xl mx-auto text-white">
      <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 mb-10">
        Latest Inquiries
      </h1>

      {/* Status Filter */}
      <div className="mb-6 flex justify-center gap-4 flex-wrap">
        <button
          onClick={() => setFilterStatus("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
            filterStatus === "all" ? "bg-purple-600 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilterStatus("pending")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
            filterStatus === "pending" ? "bg-blue-600 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"
          }`}
        >
          Pending Review
        </button>
        <button
          onClick={() => setFilterStatus("pending-payment")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
            filterStatus === "pending-payment" ? "bg-yellow-600 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"
          }`}
        >
          Awaiting Payment
        </button>
        <button
          onClick={() => setFilterStatus("accepted")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
            filterStatus === "accepted" ? "bg-green-600 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"
          }`}
        >
          Accepted (Paid)
        </button>
        <button
          onClick={() => setFilterStatus("payment-failed")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
            filterStatus === "payment-failed" ? "bg-red-600 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"
          }`}
        >
          Payment Failed
        </button>
      </div>


      {inquiries.length === 0 && (
        <p className="text-center text-purple-300">No inquiries found for the selected filter.</p>
      )}

      <div className="space-y-6">
        {inquiries.map((inquiry, index) => (
          <div
            key={inquiry._id}
            className="rounded-xl bg-white/5 p-6 border border-white/10 shadow hover:bg-white/10 backdrop-blur transition"
          >
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
              <h2 className="text-xl font-bold text-purple-300">
                #{inquiries.length - index} — {inquiry.name}
              </h2>
              {getStatusBadge(inquiry.status)} {/* Display status badge */}
            </div>

            <div className="text-sm text-pink-300 bg-pink-500/20 border border-pink-500/30 rounded-full px-4 py-1 w-fit mb-4">
              {inquiry.selectedPackage?.isCustom
                ? `Custom Package (₹${inquiry.selectedPackage.minAdvance.toLocaleString()})`
                : `${inquiry.selectedPackage?.name} — ₹${inquiry.selectedPackage?.price?.toLocaleString()}`}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <p><span className="text-gray-400">Email:</span> {inquiry.email}</p>
              <p><span className="text-gray-400">Phone:</span> {inquiry.phone}</p>
              <p className="md:col-span-2"><span className="text-gray-400">Project Idea:</span> {inquiry.idea}</p>
            </div>

            <button
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className="text-purple-300 hover:text-white mb-4"
            >
              {expandedIndex === index ? "Hide Details ▲" : "Show Details ▼"}
            </button>

            {expandedIndex === index && (
              <div className="bg-purple-900/20 p-4 rounded-xl space-y-4">
                <div>
                  <h3 className="font-semibold text-white mb-1">Description</h3>
                  <p className="text-purple-200">{inquiry.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Package Details</h3>
                  <p className="text-purple-200">Name: {inquiry.selectedPackage.name}</p>
                  <p className="text-purple-200">Type: {inquiry.selectedPackage.isCustom ? "Custom" : "Standard"}</p>
                  {inquiry.selectedPackage.isCustom && (
                    <p className="text-purple-200">Min Advance: ₹{inquiry.selectedPackage.minAdvance?.toLocaleString()}</p>
                  )}
                  {inquiry.selectedPackage.features && inquiry.selectedPackage.features.length > 0 && (
                    <p className="text-purple-200">Features: {inquiry.selectedPackage.features.join(", ")}</p>
                  )}
                </div>
                {inquiry.projectId && (
                  <div>
                    <h3 className="font-semibold text-white mb-1">Linked Project ID</h3>
                    <p className="text-purple-200 text-sm">{inquiry.projectId}</p>
                  </div>
                )}
                <div>
                  <p className="text-gray-400">
                    Submitted: {new Date(inquiry.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            )}

            <div className="text-right mt-4">
              {/* Conditional rendering of Accept button based on status */}
              {inquiry.status === "pending" || inquiry.status === "pending-payment" || inquiry.status === "payment-failed" ? (
                <button
                  onClick={() => handleAccept(inquiry)}
                  className="bg-green-500/20 text-green-300 rounded-full px-4 py-2 hover:bg-green-500/30"
                >
                  Accept
                </button>
              ) : (
                <span className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full">
                  {inquiry.status === "accepted" ? "Accepted" : inquiry.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestInquiries;