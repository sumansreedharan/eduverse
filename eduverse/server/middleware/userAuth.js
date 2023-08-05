const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const {IS_USER} = require('../Constants/roles')

async function UserAuth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.COMMON_SECRET_KEY);

    const { id } = decoded;
    const user = await User.findById(id);
    if (user) {
      req.user = user;
      // Check if user is a regular user
      if (user.role === IS_USER) {
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

module.exports = UserAuth;
