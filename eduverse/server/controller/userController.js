const User = require("../models/userModel");
const Course = require("../models/courseModel")
const jwt = require("jsonwebtoken");



const updateProfile = async (req, res) => {
  try {
  console.log(req.file);
    
    const { name, mobile } = req.body;
    
      const user = await User.findById(req.user._id);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      user.name = name;
      // user.email = email;
      user.mobile = mobile;
      if(req.file){
        user.profileImage = req.file.filename;
      }
  
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

  const listCourse = async(req,res) =>{
    try {
      const courseDetails = await Course.find().populate("category");
      res.json(courseDetails)
    } catch (error) {
      console.log("error fetching courseDetails");
      res.status(500).json({error:"failed to fetch cours details"})
    }
  }
  

module.exports = {
    updateProfile,
    listCourse,
}