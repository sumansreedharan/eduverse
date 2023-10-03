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
      return res.status(404).json({ message: "User not found" });
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
    res.status(500).json({ message: "Could not update profile" });
  }
};

const listCourse = async (req, res) => {
  try {
    const courseDetails = await Course.find().populate("category");
    res.json(courseDetails);
  } catch (error) {
    console.log("error fetching courseDetails");
    res.status(500).json({ message: "failed to fetch cours details" });
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
    res.status(500).json({ message: "failed to fetch cours details" });
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
    res.status(500).json({ message: "failed to create razorpay order" });
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
    // const paymentSave = await payment.save()
    // if(paymentSave){
    //   const getCourse = await Course.findById(courseId)
    //   const mentorData = getCourse.mentorId
    //   const mentorUpdate = await User.findByIdAndUpdate(idInfo,{mentorId:mentorData})
    //   if(mentorUpdate){
    //     res.json({ status: "ok" });
    //   }
    // }
    await payment.save().then(() => {
      res.json({ status: "ok" });
    });
  } catch (error) {
    console.log("error creating order", error);
    res.status(500).json({ message: "failed to create razorpay order" });
  }
};

const fetchYourCourses = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch purchased courses for the user from the database
    const purchasedCourses = await Payment.find({ userId: userId }).populate(
      "courseId"
    ); // Assuming you have a reference to the Course model in the Purchase schema
    // .exec();

    res.status(200).json(purchasedCourses);
  } catch (error) {
    console.error("Error fetching purchased courses:", error);
    res.status(500).json({ message: "Failed to fetch purchased courses" });
  }
};

const getCourseDetailsWithVideos = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    const courseDetails = await Lesson.find({ course: courseId });

    if (!courseDetails) {
      return res.status(404).json({ message: "Course not found" });
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
    res.status(500).json({ message: "Failed to fetch course details" });
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
      .json({ message: "An error occurred while searching for courses." });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({}, "name"); // Retrieve only the "name" field
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// const completedLessons = async (req, res) => {
//   const { userId, lessonId } = req.params;
//   try {
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     if (!user.completedLessons.includes(lessonId)) {
//       user.completedLessons.push(lessonId);
//       await user.save();
//     }
//     res.json({ message: "Lesson marked as completed" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// const getUserProgress = async (req, res) => {
//   const { userId } = req.params;
//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json({ completedLessons: user.completedLessons });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

const completedLessons = async (req, res) => {
  const { userId, lessonId } = req.params;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.completedLessons.includes(lessonId)) {
      user.completedLessons.push(lessonId);
      await user.save();
    }

    // Return the updated list of completed lessons
    res.json({ completedLessons: user.completedLessons });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserProgress = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ completedLessons: user.completedLessons });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const postUserReviews = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { text } = req.body;
    const userId = req.params.userId;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    const newReview = {
      user: userId,
      text,
      date: new Date(),
    };

    console.log(newReview);

    course.reviews.push(newReview);
    await course.save();

    res.status(201).json({ message: "Review posted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getUserReviews = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId)
      .populate("reviews.user")
      .exec();
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json(course.reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const postUserRating = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { rating } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    course.ratings.push(rating);
    await course.save();
    res.status(201).json({ message: "Rating submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const isUserPurchased = async (req, res) => {
  const { courseId, userId } = req.params;
  try {
    const payment = await Payment.findOne({ userId, courseId });

    if (payment) {
      // User has purchased the course
      res.json({ hasPurchased: true });
    } else {
      // User has not purchased the course
      res.json({ hasPurchased: false });
    }
  } catch (error) {
    console.error("Error checking course purchase:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserRatingsForCourse = async (req, res) => {
  const courseId = req.params.courseId;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    const ratingsArray = course.ratings || [];

    res.status(200).json(ratingsArray);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching user ratings" });
  }
};

const listByCategories = async(req,res)=>{
  const categoryId = req.params.categoryId;
  try {
    const courses = await Course.find({ category:categoryId})
    res.status(200).json(courses)
  } catch (error) {
    console.log(error,"error to list category wise");
    res.status(500).json({error:"internal server error"})
  }
}

const getMentorForChat = async(req,res)=>{
  const courseId = req.params.courseId;
  console.log(courseId);
  try {
    const courses = await Course.findById(courseId)
    res.status(200).json(courses.mentorId)
    console.log('summmm',courses);
  } catch (error) {
    
  }
}

const getCourseDetailsForCertificate = async(req,res)=>{
  const courseId = req.params.courseId;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

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
  completedLessons,
  getUserProgress,
  postUserReviews,
  getUserReviews,
  postUserRating,
  isUserPurchased,
  getUserRatingsForCourse,
  listByCategories,
  getMentorForChat,
  getCourseDetailsForCertificate
};
