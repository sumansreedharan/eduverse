// const mongoose = require('mongoose');

// const categorySchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     // unique: true,
//   },
// }, { timestamps: true });

// const Category = mongoose.model('Category', categorySchema);
// module.exports = Category;

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          // Custom validation function to check if the category name is in uppercase
          return value === value.toUpperCase();
        },
        message: 'Category name must be in all uppercase letters',
      },
    },
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;

