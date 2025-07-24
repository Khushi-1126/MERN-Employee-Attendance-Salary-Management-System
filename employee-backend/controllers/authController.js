const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); 

//Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, employeeType } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      role,
      employeeType,
      mustChangePassword: role === "employee", // true for Employee only
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};





// Admin Reset Employee Password
const adminResetPassword = async (req, res) => {
  const email = req.body.email.trim().toLowerCase(); 
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.mustChangePassword = true; //employee have to change password after admin resets
    await user.save();

    res.status(200).json({ message: "Password reset successfully by admin" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// Login Controller
const loginUser = async (req, res) => {
  const email = req.body.email.trim().toLowerCase(); 
  const { password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password); 

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        mustChangePassword: user.mustChangePassword,
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 👇 Change Password Controller
const changePassword = async (req, res) => {
  const { email, newPassword } = req.body; 

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.mustChangePassword = false;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


module.exports = { loginUser, registerUser, changePassword, adminResetPassword };



// Get User Profile by Email
const getUserProfile = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email }).select("-password"); // remove password from response
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Export it too:
module.exports = {
  loginUser,
  registerUser,
  changePassword,
  adminResetPassword,
  getUserProfile, // 
};
