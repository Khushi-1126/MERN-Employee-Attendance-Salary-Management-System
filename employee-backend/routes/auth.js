
const express = require("express");
const router = express.Router();

const {
  loginUser,
  registerUser,
  changePassword,
  adminResetPassword,
  getUserProfile, // ✅ Add this import
} = require("../controllers/authController");

const { verifyToken } = require("../middleware/authMiddleware");

// ✅ Auth Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/change-password", changePassword); // token check skip kiya as per your choice
router.put("/admin-reset-password", adminResetPassword);

// ✅ NEW: Get employee profile by email (for Profile page)
router.get("/profile/:email", getUserProfile); // 🔥 Final addition

module.exports = router;
