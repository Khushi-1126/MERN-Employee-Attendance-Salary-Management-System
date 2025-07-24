const Leave = require("../models/Leave");

// ✅ Create Leave Request
const createLeaveRequest = async (req, res) => {
  try {
    const { userId, fromDate, toDate, reason, type } = req.body;

    if (!userId || !fromDate || !toDate || !reason) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newLeave = new Leave({
      user: userId,
      fromDate,
      toDate,
      reason,
      type,
    });

    await newLeave.save();
    res.status(201).json({ message: "Leave request submitted successfully." });
  } catch (error) {
    console.error("Leave Request Error:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

// ✅ Get All Leave Requests (Admin)
const getAllLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await Leave.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(leaveRequests);
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

const updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const leaveId = req.params.id;

    const updatedLeave = await Leave.findByIdAndUpdate(
      leaveId,
      { status },
      { new: true }
    );

    if (!updatedLeave) {
      return res.status(404).json({ message: "Leave request not found." });
    }

    res.status(200).json({ message: "Leave status updated.", leave: updatedLeave });
  } catch (error) {
    console.error("Error updating leave status:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
};


module.exports = {
  createLeaveRequest,
  getAllLeaveRequests,
  updateLeaveStatus,
};
