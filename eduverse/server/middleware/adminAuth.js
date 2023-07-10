// const jwt = require("jsonwebtoken")
// const User = require("../models/userModel");


// async function AudminAuth(req,res,next){
//  try {
//     const token = req.headers.authorization.split(" ")[1];
//     const decoded = jwt.verify(token,"secret123");

//     const {id} = decoded
//     const user = await User.findById(id);
//     if(user){
//         if(user.role === "admin"){
//             req.user = user
//             console.log("Admin role");
//             next()
//         }else{
//             res.json({ status: "error", message: "Unauthorized" }); 
//         }
//     }else{
//         res.json({ status: "error", message: "User not found" });  
//     }
//  } catch (error) {
//     console.log(error.message);
//     res.json({ status: "error", message: "An error occurred" }); 
//  }
// }

// module.exports = AudminAuth


const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

async function AdminAuth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "secret123");

    const { id } = decoded;
    const user = await User.findById(id);
    if (user && user.role === "admin") {
      req.user = user;
      console.log("Admin role");
      next();
    } else {
      res.status(401).json({ status: "error", message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
}

module.exports = AdminAuth;
