const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { IS_ADMIN } = require('../Constants/roles')

async function AdminAuth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.COMMON_SECRET_KEY);
    const { id } = decoded;
    const admin = await User.findById(id);
    if (admin) {
      req.admin = admin;
      // Check if user is a regular user
      if (admin.role === IS_ADMIN) {
        next();
      } else {
        res.json({ status: "error", message: "Unauthorized" });
      }
    } else {
      res.json({ status: "error", message: "User not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: "An error occurred" });
  }
}

module.exports = AdminAuth;
