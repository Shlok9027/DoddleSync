import React, { useState, useEffect } from "react";
import { adminApi } from "../services/api";
import { toast } from "react-toastify";

const LatestInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const result = await adminApi.getInquiries();
        if (result.success) {
          setInquiries(result.inquiries.reverse());
        } else {
          toast.error(result.message || "Could not load inquiries.");
        }
      } catch (err) {
        toast.error("Error while loading inquiries.");
      }
    };
    fetchInquiries();
  }, []);

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
        },
      });

      if (response.success) {
        toast.success("Inquiry accepted successfully!");
        setInquiries((prev) =>
          prev.map((i) =>
            i._id === inquiry._id ? { ...i, status: "accepted" } : i
          )
        );
      } else {
        toast.error(response.message || "Error accepting inquiry.");
      }
    } catch (error) {
      toast.error("Failed to accept inquiry.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto text-white">
      <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 mb-10">
        Latest Inquiries
      </h1>

      {inquiries.length === 0 && (
        <p className="text-center text-purple-300">No inquiries found.</p>
      )}

      <div className="space-y-6">
        {inquiries.map((inquiry, index) => (
          <div
            key={inquiry._id}
            className="rounded-xl bg-white/5 p-6 border border-white/10 shadow hover:bg-white/10 backdrop-blur transition"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-purple-300">
                #{inquiries.length - index} — {inquiry.name}
              </h2>
              <div className="text-sm text-pink-300 bg-pink-500/20 border border-pink-500/30 rounded-full px-4 py-1">
                {inquiry.selectedPackage?.isCustom
                  ? `Custom Package (₹${inquiry.selectedPackage.minAdvance.toLocaleString()})`
                  : `${inquiry.selectedPackage?.name} — ₹${inquiry.selectedPackage?.price?.toLocaleString()}`}
              </div>
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
                </div>
                <div>
                  <p className="text-gray-400">
                    Submitted: {new Date(inquiry.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            )}

            <div className="text-right mt-4">
              {inquiry.status !== "accepted" ? (
                <button
                  onClick={() => handleAccept(inquiry)}
                  className="bg-green-500/20 text-green-300 rounded-full px-4 py-2 hover:bg-green-500/30"
                >
                  Accept
                </button>
              ) : (
                <span className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full">
                  Accepted
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
