const mongoose = require("mongoose");
const User = require("../models/userModel");
const Category = require("../models/categoryModel");
const { ObjectId } = require("mongodb");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    mentorId: {
      type:String,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
      validate: {
        validator: async function (value) {
          const user = await this.model("User").findOne({
            _id: value,
            role: "mentor",
          });
          return !!user;
        },
        message: "The selected instructor must have the role mentor",
      },
    },
    duration: {
      type: Number,
      // required: true,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      // required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      // required: true,
      validate: {
        validator: function (value) {
          // You can use a regular expression or a library like validator.js to validate URLs
          return /^https?:\/\/\S+$/.test(value);
        },
        message: "Invalid video URL",
      },
    },
    usersBought: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          // required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
