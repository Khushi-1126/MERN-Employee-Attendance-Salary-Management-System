const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  workingDays: Number,
  presents: Number,
  leaveDays: Number,
  absents: Number,
  baseMonthlySalary: Number,
  salary: Number,
  status: {
    type: String,
    enum: ["Unpaid", "Paid"],
    default: "Unpaid", // 👈 default set to Unpaid
  },
});

module.exports = mongoose.model("Salary", salarySchema);
