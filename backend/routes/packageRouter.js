import express from "express";
import {
  addPackage,
  listPackages,
  listAllPackages,
  removePackage,
  singlePackage,
  updatePackage,
  updatePackageStatus,
} from "../controllers/packageController.js";
import { adminAuth } from "../middleware/auth.js";
import { isValidObjectId } from "mongoose";

const packageRouter = express.Router();

// Middleware to validate ObjectId
const validateObjectId = (req, res, next) => {
  const packageId = req.params.packageId || req.body.packageId;
  if (!packageId || !isValidObjectId(packageId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid package ID",
    });
  }
  next();
};

// ✅ Public route (Frontend user)
packageRouter.get("/list", listPackages);

// ✅ Admin route
packageRouter.get("/admin-list", adminAuth, listAllPackages);

// ✅ Admin management routes
packageRouter.post("/add", adminAuth, addPackage);
packageRouter.get(
  "/single/:packageId",
  adminAuth,
  validateObjectId,
  singlePackage
);
packageRouter.put("/update", adminAuth, validateObjectId, updatePackage);
packageRouter.put("/status", adminAuth, validateObjectId, updatePackageStatus);
packageRouter.delete("/remove", adminAuth, validateObjectId, removePackage);

export default packageRouter;
