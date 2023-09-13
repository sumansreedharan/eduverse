const User = require("../models/userModel");
const Course = require("../models/courseModel");
const Category = require("../models/categoryModel");
const Lesson = require("../models/lessonModel");
const Payment = require("../models/paymentModel")
const { uploadVideo } = require("../middleware/fileUpload");
const jwt = require("jsonwebtoken");
const { IS_USER } = require("../Constants/roles");

const getLearners = async (req, res) => {
  try {
    const totalLearners = await User.countDocuments({ role: IS_USER });
    return res.json({ totalLearners });
  } catch (error) {
    console.log(error);
  }
};

const updateMentorProfile = async (req, res) => {
  const { userId, name, email, contact, specialization, profileImage } =
    req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.name = name;
    user.email = email;
    user.mobile = contact;
    user.profileImage = profileImage;
    user.specialization = specialization;
    const updatedUser = await user.save();
    res
      .status(200)
      .json({ message: "Mentor profile updated successfully", updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "cant update the profile" });
  }
};

const showCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Error fetching categories" });
  }
};

const createCourse = async (req, res) => {
  try {
    const { title, description, courseType, category, paid, price } = req.body;
    const idInfo = req.mentorId.id; // Assuming req.mentorId contains the token
    const newCourse = new Course({
      title,
      description,
      courseType,
      category,
      paid,
      price,
      mentorId: idInfo,
      imageUrl: req.file.filename,
    });
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ message: "Failed to add course." });
  }
};

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
          price: 1,
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
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Failed to fetch courses." });
  }
};

const deleteCourse = async (req, res) => {
  const { courseId } = req.params;
  const deleted = await Course.findByIdAndRemove(courseId);
  try {
    if (!deleted) {
      return res.status(404).json({ error: "course not found" });
    }
    res.status(200).json(deleted);
  } catch (error) {
    console.log("error deleted category", error);
    res.status(500).json({ error: "failed to delete category" });
  }
};

// const uploadVideo = async(req,res)=>{
//   try {
//     const {title,part,description} = req.body
//     const file = req.files.file
//     const uploadResponse = await cloudinary.uploader.upload(file.tempFilepath,{
//       folder: 'video-uploads', // Set your desired folder name
//       resource_type: 'video',
//     })

//     const videoUrl = uploadResponse.secure_url
//     const newLesson = new Lesson({
//       title,
//       part,
//       description,
//       videoUrl,
//     });
//     await newLesson.save()
//     return res.status(200).json({ message: 'Video uploaded successfully' });
//   } catch (error) {
//     console.error('Error uploading video:', error);
//     return res.status(500).json({ error: 'Error uploading video' });
//   }
// }

const processVideo = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, part, description,note } = req.body;

    // The uploaded video URL from the uploadVideoToCloud middleware
    const videoUrl = req.url;

    // Create a new lesson in the database with the Cloudinary URL
    const newLesson = new Lesson({
      title,
      part,
      description,
      videoUrl,
      note,
      course: courseId,
    });
    await newLesson.save();

    return res.status(200).json({
      message: "Video uploaded successfully",
    });
  } catch (error) {
    console.error("Error uploading video:", error);
    return res.status(500).json({ error: "Error uploading video" });
  }
};

const fetchUploadedCourses = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const courseDetails = await Lesson.find({ course: courseId });
    res.json(courseDetails);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "Error fetching videos" });
  }
};

const updateCourse = async (req, res) => {
  const courseId = req.params.id;
  const updatedCourseData = req.body;

  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      updatedCourseData,
      { new: true } // Return the updated document
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.json(updatedCourse);
  } catch (error) {
    console.error("Error updating course:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getPurchaseList = async(req,res)=>{
  try {
    const purchaseDetails = await Payment.find()
    .populate('courseId','title')
    .populate('userId','name')
    res.status(200).json(purchaseDetails)
    console.log(purchaseDetails);
  } catch (error) {
    console.error('Error fetching payment history:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = {
  getLearners,
  updateMentorProfile,
  showCategories,
  createCourse,
  getCourses,
  deleteCourse,
  processVideo,
  fetchUploadedCourses,
  updateCourse,
  getPurchaseList,
};
