const express = require("express");
const router = express.Router();
const { createLeaveRequest, getAllLeaveRequests, updateLeaveStatus } = require("../controllers/leaveController");

// POST leave request – no auth
router.post("/", createLeaveRequest);

// GET all leave requests – still admin only, so keep token for admin if needed
router.get("/", getAllLeaveRequests);

// PUT leave status update – still admin only
router.put("/:id/status", updateLeaveStatus);

module.exports = router;
