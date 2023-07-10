const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const getCounts = async (req,res)=>{
    try{
        const totalUsers = await User.countDocuments({role:"user"})
        const totalMentors = await User.countDocuments({role:"mentor"})
        
        return res.json({ totalMentors, totalUsers });

    } catch(error){
        console.log(error);
    }
}

module.exports = {
    getCounts
}