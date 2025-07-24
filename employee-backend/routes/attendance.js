
const express = require("express");
const router = express.Router();
const {
  getUnapprovedAttendance,
  markAttendance,
  getMyAttendance,
  approveAttendance,
  getTodayOverview
} = require("../controllers/attendanceController");

// ✅ Unapproved Attendance for Admin
router.get("/unapproved", getUnapprovedAttendance);

// ✅ Other routes
router.post("/", markAttendance);
router.post("/my", getMyAttendance);
router.put("/:id/approve", approveAttendance);
router.get("/overview-today", getTodayOverview);

module.exports = router;

