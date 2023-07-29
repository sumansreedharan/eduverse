// models/Payment.js

const mongoose = require("mongoose");
const User = require("../models/userModel")
const Course = require('../models/courseModel')

const paymentSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  amount: {
    type: Number,
    required: true,
  },
  paymentId: {
    type: String,
  },
  paymentDate: {
    type: Date,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
