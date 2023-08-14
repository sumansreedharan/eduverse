const User = require("../models/userModel");
const Course = require("../models/courseModel");
const Razorpay = require("razorpay");
const Payment = require("../models/paymentModel");
const jwt = require("jsonwebtoken");
require('dotenv').config()

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
    res.json(courseInfo);
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
    const payment = new Payment({
      amount: amount,
      paymentId: order_id,
      courseId: courseId,
      paymentDate: new Date(),
    });
    // console.log(payment);
    await payment.save().then(() => {
      res.json({ status: "ok" });
    });
  } catch (error) {
    console.log("error creating order", error);
    res.status(500).json({ error: "failed to create razorpay order" });
  }
};

module.exports = {
  updateProfile,
  listCourse,
  userCourseView,
  createOrder,
  OrderSuccess,
};
