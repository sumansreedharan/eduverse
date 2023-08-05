const User = require("../models/userModel");
const Course = require("../models/courseModel")
const Category = require("../models/categoryModel")
const jwt = require("jsonwebtoken");
const {IS_USER} = require('../Constants/roles')

const getLearners = async(req,res)=>{
    try {
        const totalLearners = await User.countDocuments({role:IS_USER})
        return res.json({totalLearners})
    } catch (error) {
       console.log(error);
    }
}

const updateMentorProfile = async(req,res)=>{
    const {userId,name,email,contact,specialization,profileImage} = req.body;
    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ error: "User not found" });
          }
          user.name = name;
          user.email = email;
          user.mobile = contact;
          user.profileImage = profileImage
          user.specialization = specialization
          const updatedUser = await user.save()
          res.status(200).json({message:"Mentor profile updated successfully",updatedUser})
    } catch (error) {
      console.log(error);
      res.status(500).json({error: "cant update the profile"})  
    }
}

const showCategories = async(req,res)=>{
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Error fetching categories' });
  }
}

const createCourse = async(req,res)=>{
  try {
    const { title, description, courseType, category, paid,price } = req.body;
    const newCourse = new Course({
      title,
      description,
      courseType,
      category,
      paid,
      price,
      imageUrl: req.file.filename,
    });
    const savedCourse = await newCourse.save()
    res.status(201).json(savedCourse)
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({ message: 'Failed to add course.' });
  }
}


// const getCourses = async(req,res)=>{
//   try {
//     const courses = await Course.find()
//     console.log(courses);
//     res.status(201).json(courses)
//   } catch (error) {
//     console.error('Error fetching courses:', error);
//     res.status(500).json({ message: 'Failed to fetch courses.' });
//   }
// }

const getCourses = async (req, res) => {
  try {
    const courses = await Course.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryData",
        },
      },
      {
        $unwind: "$categoryData", 
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          paid: 1,
          price:1,
          imageUrl: 1,
          usersBought: 1,
          createdAt: 1,
          updatedAt: 1,
          category: "$categoryData.name", // Replace "name" with the field in the Category collection that contains the category name
          __v: 1,
        },
      },
    ]);

    res.status(201).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Failed to fetch courses.' });
  }
};

const deleteCourse = async (req,res)=>{
  const {courseId} = req.params;
  const deleted = await Course.findByIdAndRemove(courseId)
 try {
  if(!deleted){
    return res.status(404).json({ error: "course not found"})
  }
  res.status(200).json(deleted)
 } catch (error) {
  console.log("error deleted category",error);
  res.status(500).json({error:"failed to delete category"})
 }
}


module.exports = {
 getLearners,
 updateMentorProfile,
 showCategories,
 createCourse,
 getCourses,
 deleteCourse,
}