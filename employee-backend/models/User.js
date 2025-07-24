// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["admin", "employee"],
    default: "employee",
  },

  employeeType: {
    type: String,
    enum: [
      "Sr. Faculty",
      "Faculty",
      "Project Manager",
      "Associate",
      "Accountant",
      "Sr. Accountant",
    ],
    default: "Faculty",
  },

  mustChangePassword: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
