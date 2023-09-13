const mongoose = require('mongoose');
const Course = require('../models/courseModel')

const LessonSchema = new mongoose.Schema({
  part: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course', // Reference to the Course collection
    // required: true,
  },
});

const Lesson = mongoose.model('Lesson', LessonSchema);

module.exports = Lesson;
