// const jwt  = require("jsonwebtoken")
// const User = require("../models/userModel")
// async function Auth(req, res, next) {
//     try {
//       const token = req.headers.authorization.split(" ")[1];
//       const decoded = jwt.verify(token, "secret123");
  
//       const { id } = decoded;
//       const user = await User.findById(id);
//       if (user) {
//         req.user = user;
//       } else {
//         res.json({ status: "error" });
//       }
//       next();
//     } catch (error) {
//       console.log(error.message);
//     }
//   }
//   module.exports = Auth;


const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

async function UserAuth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "secret123");

    const { id } = decoded;
    const user = await User.findById(id);
    if (user) {
      req.user = user;

      // Check if user is a regular user
      if (user.role === "user") {
        // Add user-specific logic here
        console.log("User role");

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

