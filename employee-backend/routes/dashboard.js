const express = require("express");
const router = express.Router();
const { verifyToken, checkRole } = require("../middleware/authMiddleware");

router.get("/admin", verifyToken, checkRole("admin"), (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard" });
});

router.get("/employee", verifyToken, checkRole("employee"), (req, res) => {
  res.json({ message: "Welcome to the Employee Dashboard" });
});

module.exports = router;
