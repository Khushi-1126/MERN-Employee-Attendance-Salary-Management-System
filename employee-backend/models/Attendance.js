
const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Present", "Absent", "Leave"],
    required: true,
  },
  approved: {
    type: Boolean,
    default: false, // new field for admin approval
  },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
