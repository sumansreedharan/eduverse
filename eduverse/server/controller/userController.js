const User = require("../models/userModel");
const jwt = require("jsonwebtoken");



const updateProfile = async (req, res) => {
    
    const { userId, name, email, mobile } = req.body;
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      user.name = name;
      user.email = email;
      user.mobile = mobile;
  
      const updatedUser = await user.save();
  
      res.status(200).json({
        message: "Profile updated successfully",
         updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Could not update profile" });
    }
  };
  

module.exports = {
    updateProfile 
}