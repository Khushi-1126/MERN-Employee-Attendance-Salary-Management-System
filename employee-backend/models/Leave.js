const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    type: {
      type: String,
      enum: ["full", "half"],
      default: "full",
    },
    halfDaySlot: {
      type: String,
      enum: ["First Half", "Second Half", ""],
      default: "",
    },
    category: {
      type: String,
      default: "Casual Leave",
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Leave || mongoose.model("Leave", leaveSchema);


// // models/Leave.js
// const mongoose = require("mongoose");

// const leaveSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   fromDate: {
//     type: Date,
//     required: true,
//   },
//   toDate: {
//     type: Date,
//     required: true,
//   },
//   reason: String,
//   type: {
//     type: String,
//     enum: ["Full Day", "Half Day"],
//     default: "Full Day",
//   },
//   halfDaySlot: {
//     type: String,
//     enum: ["First Half", "Second Half", ""],
//     default: "",
//   },
//   category: {
//     type: String,
//     enum: ["Medical Leave", "Casual Leave", "Earned Leave", "Other Leave"],
//     default: "Casual Leave",
//   },
//   status: {
//     type: String,
//     enum: ["Pending", "Approved", "Rejected"],
//     default: "Pending",
//   },
// }, { timestamps: true });

// module.exports = mongoose.model("Leave", leaveSchema);
