const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

const getCounts = async (req,res)=>{
    try{
        const totalUsers = await User.countDocuments({role:"user"})
        const totalMentors = await User.countDocuments({role:"mentor"})
        
        return res.json({ totalMentors, totalUsers });

    } catch(error){
        console.log(error);
    }
}

const listUser = async (req,res) =>{
    try {
       const users = await User.find({role:"user"}) 
       res.json(users)
    } catch (error) {
       console.log(error); 
       res.status(500).json({error:"cannot send the data"})
    }
}

const blockUnblockUser = async(req,res) =>{
    const { id } = req.params
    try {
        const user = await User.findById(id)
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({ error: "User not found" });
        }
        user.blocked = !user.blocked;
    await user.save();

    res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"failed to block/unblock user"})
    }
}

const listMentor = async (req,res) =>{
    try {
       const mentors = await User.find({role:"mentor"}) 
       
       res.json(mentors)
    } catch (error) {
       console.log(error); 
       res.status(500).json({error:"cannot send the data"})
    }
}

const blockUnblockMentor = async(req,res) =>{
    const { id } = req.params
    try {
        const mentor = await User.findById(id)
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({ error: "Mentor not found" });
        }
        mentor.blocked = !mentor.blocked;
    await mentor.save();

    res.json(mentor);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"failed to block/unblock mentor"})
    }
}


module.exports = {
    getCounts,
    listUser,
    blockUnblockUser,
    listMentor,
    blockUnblockMentor,
}