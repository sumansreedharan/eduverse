const User = require("../models/userModel");
const Category = require("../models/categoryModel");
const Course = require("../models/courseModel");
const Payment = require("../models/paymentModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { IS_ADMIN, IS_MENTOR, IS_USER } = require("../Constants/roles");

const getCounts = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: IS_USER });
    const totalMentors = await User.countDocuments({ role: IS_MENTOR });

    return res.json({ totalMentors, totalUsers });
  } catch (error) {
    console.log(error);
  }
};

const listUser = async (req, res) => {
  try {
    const users = await User.find({ role: IS_USER });
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "cannot send the data" });
  }
};

const blockUnblockUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "User not found" });
    }
    user.blocked = !user.blocked;
    await user.save();

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to block/unblock user" });
  }
};

const listMentor = async (req, res) => {
  try {
    const mentors = await User.find({ role: IS_MENTOR });

    res.json(mentors);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "cannot send the data" });
  }
};

const blockUnblockMentor = async (req, res) => {
  const { id } = req.params;
  try {
    const mentor = await User.findById(id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Mentor not found" });
    }
    mentor.blocked = !mentor.blocked;
    await mentor.save();

    res.json(mentor);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to block/unblock mentor" });
  }
};

const fetchCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.log("error fetching categories");
    res.status(500).json({ message: "failed to fetch categories" });
  }
};

const addCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Please provide the category name" });
  }

  try {
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res
        .status(409)
        .json({ error: "Category with the same name already exists" });
    }

    const newCategory = new Category({
      name,
    });

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ error: "Failed to add category" });
  }
};

const editCategory = async (req, res) => {
  const { _id, name } = req.body;
  try {
    const category = await Category.findById(_id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    category.name = name;
    const updatedCategory = await category.save();
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Error editing category:", error);
    res.status(500).json({ message: "Failed to edit category" });
  }
};

const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const deletedCategory = await Category.findByIdAndRemove(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json(deletedCategory);
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Failed to delete category" });
  }
};

const courseView = async (req, res) => {
  try {
    const courses = await Course.find().populate("category");
    res.json(courses);
  } catch (error) {
    console.log("Error fetching courses:", error);
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};

const adminPaymentReports = async (req, res) => {
  try {
    const paymentReports = await Payment.find();
    res.status(200).json(paymentReports);
  } catch (error) {
    console.log(error);
  }
};

const getMonthlySales = async (req, res) => {
  try {
    const monthlySales = await Payment.aggregate([
      {
        $match: {
          // Add any filters you need (e.g., specific date range)
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m", date: "$paymentDate" },
          },
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $sort: { _id: 1 }, // Sort by month in ascending order
      },
    ]);

    res.json(monthlySales);
  } catch (error) {
    console.error("Error fetching monthly sales:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getTotalPayments = async (req, res) => {
  try {
    const totalPayments = await Payment.aggregate([
      {
        $group: {
          _id: "$courseId",
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $lookup: {
          from: "courses", // Use the name of the Course collection
          localField: "_id",
          foreignField: "_id",
          as: "course",
        },
      },
      {
        $unwind: "$course", // Unwind the course array created by the lookup
      },
      {
        $project: {
          courseName: "$course.title", // Use the desired field from the Course model
          totalAmount: 1, // Include totalAmount in the result
        },
      },
    ]);

    res.json(totalPayments);
  } catch (error) {
    console.error("Error fetching total payments:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getCounts,
  listUser,
  blockUnblockUser,
  listMentor,
  blockUnblockMentor,
  fetchCategories,
  addCategory,
  editCategory,
  deleteCategory,
  courseView,
  adminPaymentReports,
  getMonthlySales,
  getTotalPayments,
};
