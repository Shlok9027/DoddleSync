
import React, { useContext, useState, useEffect } from "react";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/assets";
import { adminApi } from "../services/api";
import { toast } from "react-toastify";

const ProductPackages = () => {
  const { currency } = useContext(AdminContext);
  const [editablePackages, setEditablePackages] = useState([]);
  const [editingPackage, setEditingPackage] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const newPackageTemplate = {
    name: "",
    price: "",
    originalPrice: "",
    isCustom: false,
    minAdvance: "",
    features: [""],
  };

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setIsLoading(true);
        const response = await adminApi.getPackages();
        if (response.success) {
          setEditablePackages(response.packages);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("Failed to fetch packages.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const handleEdit = (pkg) => {
    setEditingPackage({
      ...pkg,
      price: pkg.price || "",
      minAdvance: pkg.minAdvance || "",
    });
    setIsAddingNew(false);
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingPackage({ ...newPackageTemplate });
  };

  const handleSave = async () => {
    try {
      if (!editingPackage?.name || editingPackage.originalPrice === "") {
        toast.error("Package name and original price are required.");
        return;
      }

      const isCustom = editingPackage.isCustom;
      const features = (editingPackage.features || []).filter(
        (feature) => feature && feature.trim() !== ""
      );

      if (features.length === 0) {
        toast.error("At least one non-empty feature is required.");
        return;
      }

      const payload = {
        name: editingPackage.name,
        originalPrice: Number(editingPackage.originalPrice),
        isCustom,
        features,
      };

      if (isCustom) {
        if (!editingPackage.minAdvance) {
          toast.error("Minimum advance is required for custom packages.");
          return;
        }
        payload.minAdvance = Number(editingPackage.minAdvance);
      } else {
        if (!editingPackage.price) {
          toast.error("Price is required for standard packages.");
          return;
        }
        payload.price = Number(editingPackage.price);
      }

      let response;
      if (isAddingNew) {
        response = await adminApi.addPackage(payload);
      } else {
        response = await adminApi.updatePackage({
          ...payload,
          packageId: editingPackage._id,
        });
      }

      if (response.success) {
        toast.success("Package saved successfully");
        setEditingPackage(null);
        setIsAddingNew(false);
        const res = await adminApi.getPackages();
        setEditablePackages(res.packages || []);
      } else {
        toast.error(response.message || "Failed to save package");
      }
    } catch (err) {
      toast.error("Error saving package.");
    }
  };

  const handleDelete = async (packageId) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      try {
        const response = await adminApi.deletePackage({ packageId });
        if (response.success) {
          setEditablePackages((prev) =>
            prev.filter((pkg) => pkg._id !== packageId)
          );
          toast.success("Package deleted!");
        } else {
          toast.error(response.message);
        }
      } catch (err) {
        toast.error("Failed to delete package.");
      }
    }
  };

  const handleChange = (field, value) => {
    setEditingPackage((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFeatureChange = (index, value) => {
    setEditingPackage((prev) => ({
      ...prev,
      features: prev.features.map((feature, i) =>
        i === index ? value : feature
      ),
    }));
  };

  const handleAddFeature = () => {
    setEditingPackage((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const handleRemoveFeature = (index) => {
    setEditingPackage((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  if (isLoading) {
    return (
      <div className="text-white min-h-screen flex items-center justify-center">
        <div className="animate-spin w-16 h-16 border-4 border-purple-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-8 text-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
            Product Packages Management
          </h1>
          <button
            onClick={handleAddNew}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold hover:from-purple-700 hover:to-pink-600 transition-all"
          >
            Add New Package
          </button>
        </div>

        {/* All Packages Section */}
        <div className="flex flex-wrap gap-8 justify-center">
          {editablePackages.map((pkg) => (
            <div
              key={pkg._id}
              className="w-full max-w-lg border border-white/10 rounded-xl bg-white/5 p-6"
            >
              {editingPackage?._id === pkg._id && !isAddingNew ? (
                // 🛠️ Edit mode
                renderEditForm(editingPackage)
              ) : (
                // 📦 View Mode
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-purple-300">
                      {pkg.name}
                    </h2>
                    <div className="flex gap-3">
                      <button onClick={() => handleEdit(pkg)} className="btn">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(pkg._id)}
                        className="btn bg-red-500/20 hover:bg-red-400/30"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-white/70">
                    Original Price: ₹{pkg.originalPrice?.toLocaleString()}
                  </p>
                  <p className="text-sm text-white/70">
                    {pkg.isCustom
                      ? `Advance: ₹${pkg.minAdvance?.toLocaleString()}`
                      : `Price: ₹${pkg.price?.toLocaleString()}`}
                  </p>
                  <ul className="mt-3 space-y-1 text-white/80">
                    {pkg.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <img src={assets.tick_icon} alt="" className="w-5" />{" "}
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          {/* ➕ Add New Package Form */}
          {isAddingNew && editingPackage && !editingPackage._id && (
            <div className="w-full max-w-lg border border-white/10 rounded-xl bg-white/5 p-6">
              <h2 className="text-xl font-bold mb-4 text-purple-300">
                Add New Package
              </h2>
              {renderEditForm(editingPackage)}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // 📦 Shared editable form
  function renderEditForm(pkg) {
    return (
      <div className="space-y-4">
        <div>
          <label className="text-sm text-white/80">Package Name</label>
          <input
            type="text"
            value={pkg.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="input"
          />
        </div>
        <div>
          <label className="text-sm text-white/80">Original Price (₹)</label>
          <input
            type="number"
            value={pkg.originalPrice}
            onChange={(e) => handleChange("originalPrice", e.target.value)}
            className="input"
          />
        </div>

        {/* Standard or Custom */}
        {pkg.isCustom ? (
          <div>
            <label className="text-sm text-white/80">Minimum Advance (₹)</label>
            <input
              type="number"
              value={pkg.minAdvance}
              onChange={(e) => handleChange("minAdvance", e.target.value)}
              className="input"
            />
          </div>
        ) : (
          <div>
            <label className="text-sm text-white/80">Price (₹)</label>
            <input
              type="number"
              value={pkg.price}
              onChange={(e) => handleChange("price", e.target.value)}
              className="input"
            />
          </div>
        )}

        {/* Toggle Radio for Package Type */}
        <div className="flex items-center gap-6 mt-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={!pkg.isCustom}
              onChange={() => handleChange("isCustom", false)}
            />
            Standard
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={pkg.isCustom}
              onChange={() => handleChange("isCustom", true)}
            />
            Custom
          </label>
        </div>

        {/* Features */}
        <div>
          <label className="text-sm text-white/80">Features:</label>
          {pkg.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-2 mt-1">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(i, e.target.value)}
                className="input flex-1"
              />
              <button
                onClick={() => handleRemoveFeature(i)}
                className="text-red-400 px-3"
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={handleAddFeature}
            className="text-sm text-purple-300 mt-2"
          >
            + Add Feature
          </button>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => {
              setIsAddingNew(false);
              setEditingPackage(null);
            }}
            className="btn bg-red-500/20 hover:bg-red-400/40"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="btn bg-green-500/20 hover:bg-green-500/40"
          >
            {isAddingNew ? "Add Package" : "Save Changes"}
          </button>
        </div>
      </div>
    );
  }
};

export default ProductPackages;
