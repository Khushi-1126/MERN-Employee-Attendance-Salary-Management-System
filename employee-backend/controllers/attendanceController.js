const Attendance = require("../models/Attendance");
const Leave = require("../models/Leave");
const User = require("../models/User");

// Controller: Get Today's Attendance Overview (Admin)
const getTodayOverview = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const startOfDay = new Date(today);
    const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);

    const allEmployees = await User.find({ role: "employee" });
    const attendanceRecords = await Attendance.find({
      date: { $gte: startOfDay, $lt: endOfDay },
    }).populate("user", "name email");

    const leaveRecords = await Leave.find({
      startDate: { $lte: endOfDay },
      endDate: { $gte: startOfDay },
      status: "Approved",
    }).populate("user", "name email");

    const present = attendanceRecords.map((a) => a.user._id.toString());
    const onLeave = leaveRecords.map((l) => l.user._id.toString());

    const presentEmployees = attendanceRecords.map((a) => a.user);
    const onLeaveEmployees = leaveRecords.map((l) => l.user);

    const absentEmployees = allEmployees
      .filter((emp) => !present.includes(emp._id.toString()) && !onLeave.includes(emp._id.toString()));

    res.status(200).json({
      present: presentEmployees,
      approvedLeaves: onLeaveEmployees,
      notMarked: absentEmployees,
    });
  } catch (error) {
    console.error("Error in getTodayOverview:", error);
    res.status(500).json({ message: "Server error while fetching today's overview" });
  }
};

// Controller: Mark attendance (Employee)
const markAttendance = async (req, res) => {
  try {
    const { userId } = req.body;
    const today = new Date().toISOString().split("T")[0];

    const alreadyMarked = await Attendance.findOne({
      user: userId,
      date: {
        $gte: new Date(today),
        $lt: new Date(new Date(today).getTime() + 24 * 60 * 60 * 1000),
      },
    });

    if (alreadyMarked) {
      return res.status(400).json({ message: "Attendance already marked for today." });
    }

    const newAttendance = new Attendance({
      user: userId,
      date: new Date(),
      status: "Present",
      approved: false,
    });

    await newAttendance.save();
    res.status(201).json({ message: "Attendance marked as: Present" });
  } catch (error) {
    console.error("Attendance marking error:", error);
    res.status(500).json({ message: "Something went wrong while marking attendance." });
  }
};

// Controller: Get all attendance (Admin)
const getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find().populate("user", "name email");
    res.status(200).json(records);
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller: Get unapproved attendance (Admin)
const getUnapprovedAttendance = async (req, res) => {
  try {
    const unapprovedRecords = await Attendance.find({ approved: false }).populate("user", "name email");
    res.status(200).json(unapprovedRecords);
  } catch (error) {
    console.error("Error fetching unapproved attendance:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//  Controller: Get my attendance (Employee)
const getMyAttendance = async (req, res) => {
  try {
    const { userId } = req.body;
    const records = await Attendance.find({ user: userId }).sort({ date: -1 });
    res.status(200).json(records);
  } catch (error) {
    console.error("Error fetching your attendance:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller: Approve attendance (Admin)
const approveAttendance = async (req, res) => {
  try {
    const attendanceId = req.params.id;

    const updated = await Attendance.findByIdAndUpdate(
      attendanceId,
      { approved: true },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    res.status(200).json({ message: "Attendance approved", updated });
  } catch (error) {
    console.error("Error approving attendance:", error);
    res.status(500).json({ message: "Server error while approving attendance" });
  }
};

module.exports = {
  getUnapprovedAttendance,
  getAllAttendance,
  markAttendance,
  getMyAttendance,
  approveAttendance,
  getTodayOverview
};
