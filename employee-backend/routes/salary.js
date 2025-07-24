const express = require("express");
const router = express.Router();

const {
  getSalaryHistory,
  getAllSalaryHistories,
} = require("../controllers/salaryController");

const Salary = require("../models/Salary");
const User = require("../models/User"); 

router.get("/history", getSalaryHistory);

// Admin: Get all users' salary history
router.get("/all", getAllSalaryHistories);

// Admin: Mark salary as paid
router.put("/:id/pay", async (req, res) => {
  try {
    const updated = await Salary.findByIdAndUpdate(
      req.params.id,
      { status: "Paid" },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update salary status" });
  }
});

// POST /api/salary/pay/:email/:month
router.post("/pay/:email/:month", async (req, res) => {
  const { email, month } = req.params;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const entry = user.salaryHistory.find(e => e.month === month);
    if (!entry) return res.status(404).json({ msg: "Salary record not found" });

    entry.paid = true;
    await user.save();
    res.status(200).json({ msg: "Salary marked as paid" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
