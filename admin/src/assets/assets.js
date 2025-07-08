import hero from "./hero.png";
import logo from "./logo_icon.png";
import chat from "./chat.png";
import latest_inquiries from "./latest_inquiries.png";
import plans from "./plans.png";
import tick_icon from "./tick_icon.png"; // Make sure you have this icon
import send_icon from "./send_icon.png"; // Added send icon for 
import menu_icon from "./menu_icon.png"; // Added menu icon for mobile navigation

import upload_icon from "./upload.png"; // Added upload icon for file uploads

export const assets = {
  hero,
  logo,
  chat,
  latest_inquiries,
  plans,
  tick_icon,
  send_icon,
  menu_icon,

  upload_icon
  
};

export const dummyInquiries = [
  {
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+91 98765 43210",
    idea: "E-commerce Website",
    description:
      "Looking to build a modern e-commerce platform for my fashion brand with integrated payment gateway and inventory management system.",
    selectedPackage: {
      name: "Premium",
      price: 10999,
      isCustom: false,
    },
    timestamp: new Date("2024-03-15T10:30:00"),
  },
  {
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+91 87654 32109",
    idea: "Custom Web Application",
    description:
      "Need a custom CRM solution for my real estate business with client management and property listing features.",
    selectedPackage: {
      name: "Custom",
      minAdvance: 1499,
      isCustom: true,
    },
    timestamp: new Date("2024-03-14T15:45:00"),
  },
  {
    name: "Michael Chen",
    email: "m.chen@example.com",
    phone: "+91 76543 21098",
    idea: "Portfolio Website",
    description:
      "Professional portfolio website with gallery integration and blog functionality for my photography business.",
    selectedPackage: {
      name: "Pro",
      price: 4999,
      isCustom: false,
    },
    timestamp: new Date("2024-03-14T09:15:00"),
  },
];

export const editablePackages = [
  {
    id: "pro-package", // Added unique IDs
    name: "pro",
    price: 4999,
    originalPrice: 10999,
    isCustom: false,
    status: "active", // Added status
    features: [
      "5 pages Website",
      "1 Year Free Domain Name ( .com .in .org )",
      "Dynamic Website ( Premium Design )",
      "Live Chat Integration",
      "Payment Gateway Integration",
      "1 Year Free Technical Support For Website",
    ],
  },
  {
    id: "custom-package",
    name: "custom",
    price: null, // Changed from string to null
    originalPrice: 19999,
    minAdvance: 1499,
    isCustom: true,
    status: "active",
    features: [
      "Choose Your Page Count",
      "1 Year Free Domain Name ( .com .in .org )",
      "Dynamic Website ( Premium Design )",
      "Live Chat Integration",
      "Payment Gateway Integration",
      "100% Responsive Website",
      "OTP Verification Features",
      "Lifetime 24/7 Free Hosting Support",
      "1 Year Free Technical Support For Website",
    ],
  },
  {
    id: "premium-package",
    name: "premium", // Fixed typo in name
    price: 10999,
    originalPrice: 15999,
    isCustom: false,
    status: "active",
    features: [
      "12 pages Website",
      "1 Year Free Domain Name ( .com .in .org )",
      "Dynamic Website ( Premium Design )",
      "Live Chat Integration",
      "100% Responsive Website",
      "OTP Verification Features",
      "Lifetime 24/7 Free Hosting Support",
      "1 Year Free Technical Support For Website",
    ],
  },
];

// Added package template for new packages
export const newPackageTemplate = {
  id: null,
  name: "",
  price: 0,
  originalPrice: 0,
  minAdvance: 0,
  isCustom: false,
  status: "active",
  features: [""],
};

// Added package types
export const packageTypes = {
  STANDARD: "standard",
  CUSTOM: "custom",
};

// Added package statuses
export const packageStatuses = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  DRAFT: "draft",
};