const User = require("../models/userModel");
const Course = require("../models/courseModel");
const Razorpay = require("razorpay");
const Payment = require("../models/paymentModel");
const Lesson = require("../models/lessonModel");
const Category = require("../models/categoryModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.RAZOR_PAY_ID,
  key_secret: process.env.RAZOR_PAY_KEY_SECRET,
});

const updateProfile = async (req, res) => {
  try {
    const { name, mobile } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.name = name;
    // user.email = email;
    user.mobile = mobile;
    if (req.file) {
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

const listCourse = async (req, res) => {
  try {
    const courseDetails = await Course.find().populate("category");
    res.json(courseDetails);
  } catch (error) {
    console.log("error fetching courseDetails");
    res.status(500).json({ error: "failed to fetch cours details" });
  }
};

const userCourseView = async (req, res) => {
  try {
    const { id } = req.params;
    const courseInfo = await Course.findOne({ _id: id }).populate("category");
    const mentorDetails = await User.findOne({ _id: courseInfo.mentorId });
    const lessonDetails = await Lesson.find({ course: id }).count();
    // res.json(courseInfo);
    res.json({ courseInfo, mentorDetails, lessonDetails });
  } catch (error) {
    console.log("error fetching details");
    res.status(500).json({ error: "failed to fetch cours details" });
  }
};

const createOrder = async (req, res) => {
  try {
    const { courseId, amount, currency } = req.body;
    // console.log(req.body);
    const options = {
      amount: amount,
      currency: currency,
      // receipt:`course_${courseId}_${Date.now()}`,
      receipt: "rcp1",
      // payment_capture:1,
    };
    const order = await razorpay.orders.create(options);
    res.json({ order });
  } catch (error) {
    console.log("error creating order", error);
    res.status(500).json({ error: "failed to create razorpay order" });
  }
};

const OrderSuccess = async (req, res) => {
  try {
    const { amount, order_id, courseId } = req.body;
    const idInfo = req.userId.id;

    const payment = new Payment({
      amount: amount,
      paymentId: order_id,
      courseId: courseId,
      userId: idInfo,
      paymentDate: new Date(),
    });
    await payment.save().then(() => {
      res.json({ status: "ok" });
    });
  } catch (error) {
    console.log("error creating order", error);
    res.status(500).json({ error: "failed to create razorpay order" });
  }
};

const fetchYourCourses = async (req, res) => {
  try {
    // console.log('njn backil yathi');
    const userId = req.params.userId;

    // Fetch purchased courses for the user from the database
    const purchasedCourses = await Payment.find({ userId: userId }).populate(
      "courseId"
    ); // Assuming you have a reference to the Course model in the Purchase schema
    // .exec();

    res.status(200).json(purchasedCourses);
  } catch (error) {
    console.error("Error fetching purchased courses:", error);
    res.status(500).json({ error: "Failed to fetch purchased courses" });
  }
};

// const getCourseDetailsWithVideos = async (req, res) => {
//   try {
//     const courseId = req.params.courseId;
//     const course = await Lesson.find({courseId:course});
//     console.log(course);

//     if (!course) {
//       return res.status(404).json({ error: "Course not found" });
//     }

//     const videos = await UploadedVideo.find({ course: courseId }); // Fetch uploaded videos for the course

//     const courseDetailsWithVideos = {
//       _id: course._id,
//       part: course.part,
//       title: course.title,
//       description: course.description,
//       videos: videos, // Attach the videos array to the course details
//     };

//     res.json(courseDetailsWithVideos);
//   } catch (error) {
//     console.error("Error fetching course details:", error);
//     res.status(500).json({ error: "Failed to fetch course details" });
//   }
// };

const getCourseDetailsWithVideos = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    const courseDetails = await Lesson.find({ course: courseId });
    console.log(courseDetails);

    if (!courseDetails) {
      return res.status(404).json({ error: "Course not found" });
    }
    // const courseDetails = {
    //   _id: course._id,
    //   part: course.part,
    //   title: course.title,
    //   description: course.description,
    //   videoUrl: course.videoUrl, // Include videoUrl here if you want to
    // };

    res.status(200).json(courseDetails);
  } catch (error) {
    console.error("Error fetching course details:", error);
    res.status(500).json({ error: "Failed to fetch course details" });
  }
};

const searchCourses = async (req, res) => {
  const searchQuery = req.query.q;

  try {
    const regex = new RegExp(searchQuery, "i");
    const filteredCourses = await Course.find({
      title: { $regex: regex },
    });
    console.log("Filtered courses:", filteredCourses);
    res.json(filteredCourses);
  } catch (error) {
    console.error("Error searching for courses:", error);
    res
      .status(500)
      .json({ error: "An error occurred while searching for courses." });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({}, "name"); // Retrieve only the "name" field
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  updateProfile,
  listCourse,
  userCourseView,
  createOrder,
  OrderSuccess,
  fetchYourCourses,
  getCourseDetailsWithVideos,
  searchCourses,
  getAllCategories,
};
