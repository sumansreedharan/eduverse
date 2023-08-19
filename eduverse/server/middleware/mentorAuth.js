const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const {IS_MENTOR} = require('../Constants/roles')

async function MentorAuth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "secret123");

    const { id } = decoded;
    const user = await User.findById(id);
    if (user) {
      req.user = user;
      if (user.role === IS_MENTOR) {
        req.mentorId = decoded
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

module.exports = MentorAuth;
