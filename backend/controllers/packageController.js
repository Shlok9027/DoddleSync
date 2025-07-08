import packageModel from "../models/packageModel.js";
import mongoose from "mongoose";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// ✅ Add Package
const addPackage = async (req, res) => {
  try {
    const {
      name,
      price,
      originalPrice,
      isCustom,
      minAdvance,
      features,
      status,
    } = req.body;

    if (
      !name ||
      originalPrice === undefined ||
      originalPrice === null ||
      !Array.isArray(features)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Validation failed: Name, original price, and features are required",
      });
    }

    if (features.length === 0 || features.some((f) => f.trim() === "")) {
      return res.status(400).json({
        success: false,
        message: "All features must be non-empty strings",
      });
    }

    if (!isCustom && (price === undefined || price === null || isNaN(price))) {
      return res.status(400).json({
        success: false,
        message: "Standard Packages must have a valid price",
      });
    }

    if (
      isCustom &&
      (minAdvance === undefined || minAdvance === null || isNaN(minAdvance))
    ) {
      return res.status(400).json({
        success: false,
        message: "Custom Packages require a valid minimum advance",
      });
    }

    const packageData = new packageModel({
      name: name.toLowerCase(),
      price: isCustom ? null : Number(price),
      originalPrice: Number(originalPrice),
      isCustom: isCustom === "true" || isCustom === true,
      minAdvance: isCustom ? Number(minAdvance) : null,
      features,
      status: status || "active",
    });

    const savedPackage = await packageData.save();

    res.json({
      success: true,
      message: "Package added successfully",
      package: savedPackage,
    });
  } catch (error) {
    console.error("Error adding package:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ List Admin-Only Packages
const listPackages = async (req, res) => {
  try {
    const packages = await packageModel.find({
      isUserCustom: { $ne: true },
    });
    res.json({ success: true, packages });
  } catch (error) {
    console.error("Error listing packages:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ List All Packages (Admin)
const listAllPackages = async (req, res) => {
  try {
    const packages = await packageModel.find({});
    res.json({ success: true, packages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get Single Package
const singlePackage = async (req, res) => {
  try {
    const { packageId } = req.params;

    if (!packageId || !isValidObjectId(packageId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid package ID" });
    }

    const packageData = await packageModel.findById(packageId);

    if (!packageData) {
      return res
        .status(404)
        .json({ success: false, message: "Package not found" });
    }

    res.json({ success: true, package: packageData });
  } catch (error) {
    console.error("Error fetching package:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Package
const updatePackage = async (req, res) => {
  try {
    const {
      packageId,
      name,
      price,
      originalPrice,
      isCustom,
      minAdvance,
      features,
      status,
    } = req.body;

    if (!packageId || !isValidObjectId(packageId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid package ID" });
    }

    if (!name || !originalPrice || !Array.isArray(features)) {
      return res.status(400).json({
        success: false,
        message:
          "Name, original price, and features (as an array) are required",
      });
    }

    if (features.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "At least one feature is required" });
    }

    if (!isCustom && (price === undefined || price === null)) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Price is required for standard packages",
        });
    }

    if (isCustom && (minAdvance === undefined || minAdvance === null)) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Minimum advance is required for custom packages",
        });
    }

    const updateData = {
      ...(name && { name: name.toLowerCase() }),
      ...(price !== undefined && { price: isCustom ? null : Number(price) }),
      ...(originalPrice !== undefined && {
        originalPrice: Number(originalPrice),
      }),
      ...(isCustom !== undefined && {
        isCustom: isCustom === "true" || isCustom === true,
      }),
      ...(minAdvance !== undefined && {
        minAdvance: isCustom ? Number(minAdvance) : null,
      }),
      ...(features && { features }),
      status: status || "active",
      updatedAt: Date.now(),
    };

    const updatedPackage = await packageModel.findByIdAndUpdate(
      packageId,
      updateData,
      { new: true }
    );

    if (!updatedPackage) {
      return res
        .status(404)
        .json({ success: false, message: "Package not found" });
    }

    res.json({
      success: true,
      message: "Package updated successfully",
      package: updatedPackage,
    });
  } catch (error) {
    console.error("Error updating package:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Package
const removePackage = async (req, res) => {
  try {
    const { packageId } = req.body;

    if (!packageId || !isValidObjectId(packageId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid package ID" });
    }

    const deletedPackage = await packageModel.findByIdAndDelete(packageId);

    if (!deletedPackage) {
      return res
        .status(404)
        .json({ success: false, message: "Package not found" });
    }

    res.json({ success: true, message: "Package removed successfully" });
  } catch (error) {
    console.error("Error removing package:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Status (active, inactive, draft)
const updatePackageStatus = async (req, res) => {
  try {
    const { packageId, status } = req.body;

    if (!packageId || !isValidObjectId(packageId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid package ID" });
    }

    if (!["active", "inactive", "draft"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status value" });
    }

    const updatedPackage = await packageModel.findByIdAndUpdate(
      packageId,
      { status, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedPackage) {
      return res
        .status(404)
        .json({ success: false, message: "Package not found" });
    }

    res.json({
      success: true,
      message: "Package status updated successfully",
      package: updatedPackage,
    });
  } catch (error) {
    console.error("Error updating package status:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  addPackage,
  listPackages,
  singlePackage,
  updatePackage,
  removePackage,
  updatePackageStatus,
  listAllPackages,
};
