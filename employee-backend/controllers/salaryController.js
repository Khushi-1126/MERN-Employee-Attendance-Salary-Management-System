// salaryController.js
const Attendance = require("../models/Attendance");
const Leave = require("../models/Leave");
const User = require("../models/User");
const Salary = require("../models/Salary");

const getSalaryHistory = async (req, res) => {
  try {
    const userId = req.user?._id || req.query.userId || req.body.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID not provided" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const employeeType = user.employeeType;
    const salaryMap = {
      "Sr. Faculty": 80000,
      Faculty: 60000,
      "Project Manager": 90000,
      Accountant: 50000,
      "Sr. Accountant": 65000,
      Associate: 45000,
    };
    const baseMonthlySalary = salaryMap[employeeType] || 50000;
    const salaryPerDay = baseMonthlySalary / 22;

    const currentYear = new Date().getFullYear();
    const history = [];

    for (let month = 0; month < 12; month++) {
      const start = new Date(currentYear, month, 1);
      const end = new Date(currentYear, month + 1, 0);

      const attendances = await Attendance.find({
        user: userId,
        date: { $gte: start, $lte: end },
      });

      const leaves = await Leave.find({
        user: userId,
        fromDate: { $lte: end },
        toDate: { $gte: start },
        status: "approved",
      });

      const presents = attendances.length;
      let leaveDays = 0;

      leaves.forEach((leave) => {
        const from = new Date(leave.fromDate);
        const to = new Date(leave.toDate);
        const overlapStart = from > start ? from : start;
        const overlapEnd = to < end ? to : end;
        const days = Math.ceil((overlapEnd - overlapStart) / (1000 * 60 * 60 * 24)) + 1;

        if (leave.leaveType === "Half Day") {
          leaveDays += 0.5;
        } else {
          leaveDays += days;
        }
      });

      let workingDays = 0;
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const day = d.getDay();
        if (day !== 0 && day !== 6) workingDays++;
      }

      const absents = Math.max(workingDays - (presents + leaveDays), 0);
      const salary = ((presents + leaveDays) * salaryPerDay).toFixed(2);

      history.push({
        month: start.toLocaleString("default", { month: "long" }),
        presents,
        leaveDays: Number(leaveDays.toFixed(2)),
        absents,
        workingDays,
        employeeType,
        baseMonthlySalary,
        salary: Number(salary),
      });
    }

    res.status(200).json({ history });
  } catch (error) {
    console.error("Salary History Error:", error);
    res.status(500).json({
      message: "Error generating salary history",
      error: error.message,
    });
  }
};

const getAllSalaryHistories = async (req, res) => {
  try {
    const users = await User.find({ role: "employee" });

    const salaryMap = {
      "Sr. Faculty": 80000,
      Faculty: 60000,
      "Project Manager": 90000,
      Accountant: 50000,
      "Sr. Accountant": 65000,
      Associate: 45000,
    };

    const currentYear = new Date().getFullYear();

    const result = [];

    for (const user of users) {
      const employeeType = user.employeeType;
      const baseMonthlySalary = salaryMap[employeeType] || 50000;
      const salaryPerDay = baseMonthlySalary / 22;

      const history = [];

      for (let month = 0; month < 12; month++) {
        const start = new Date(currentYear, month, 1);
        const end = new Date(currentYear, month + 1, 0);

        const attendances = await Attendance.find({
          user: user._id,
          date: { $gte: start, $lte: end },
        });

        const leaves = await Leave.find({
          user: user._id,
          fromDate: { $lte: end },
          toDate: { $gte: start },
          status: "approved",
        });

        const presents = attendances.length;
        let leaveDays = 0;

        leaves.forEach((leave) => {
          const from = new Date(leave.fromDate);
          const to = new Date(leave.toDate);
          const overlapStart = from > start ? from : start;
          const overlapEnd = to < end ? to : end;
          const days = Math.ceil((overlapEnd - overlapStart) / (1000 * 60 * 60 * 24)) + 1;

          if (leave.leaveType === "Half Day") {
            leaveDays += 0.5;
          } else {
            leaveDays += days;
          }
        });

        let workingDays = 0;
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          const day = d.getDay();
          if (day !== 0 && day !== 6) workingDays++;
        }

        const absents = Math.max(workingDays - (presents + leaveDays), 0);
        const salary = ((presents + leaveDays) * salaryPerDay).toFixed(2);

        history.push({
          month: start.toLocaleString("default", { month: "long" }),
          presents,
          leaveDays: Number(leaveDays.toFixed(2)),
          absents,
          workingDays,
          employeeType,
          baseMonthlySalary,
          salary: Number(salary),
        });
      }

      result.push({
        name: user.name,
        email: user.email,
        salaryHistory: history,
      });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching all salary histories:", err);
    res.status(500).json({ message: "Failed to fetch salary data" });
  }
};

module.exports = {
  getSalaryHistory,
  getAllSalaryHistories,
};