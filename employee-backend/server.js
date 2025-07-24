const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect DB
const connectDB = require("./config/db");
connectDB();

// Routes
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const attendanceRoutes = require("./routes/attendance"); 
const leaveRoutes = require("./routes/leave");
const salaryRoutes = require("./routes/salary");

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/attendance", attendanceRoutes); 
app.use("/api/leave", leaveRoutes);
app.use("/api/salary", salaryRoutes);

// Base Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Server Start
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

