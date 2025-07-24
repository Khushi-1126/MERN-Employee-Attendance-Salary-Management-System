// const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // { userId, role, iat, exp }
//     next();
//   } catch (error) {
//     return res.status(403).json({ message: "Invalid or expired token" });
//   }
// };

// // Role checker
// const checkRole = (role) => {
//   return (req, res, next) => {
//     if (req.user.role !== role) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     next();
//   };
// };

// module.exports = { verifyToken, checkRole };



// ✅ TEMPORARY authMiddleware.js (bypassing token + role checks)

// const jwt = require("jsonwebtoken");

// ✅ TEMPORARY: Dummy middleware (bypasses JWT check for now)
const verifyToken = (req, res, next) => {
  // Simulate a dummy user (admin or employee)
  req.user = { role: "admin", userId: "dummy-user-id" }; // change to "employee" if testing employee routes
  next();
};

// ✅ TEMPORARY: Dummy role check (bypasses role restriction)
const checkRole = (role) => {
  return (req, res, next) => {
    // Always pass for now
    next();
  };
};

module.exports = { verifyToken, checkRole };
