const express = require('express') 
const mentorRoute = express()
const cors = require('cors')
const mentorController = require('../controller/mentorController')
const {upload,videoUpload} = require('../middleware/fileUpload')

mentorRoute.get("/getLearners",mentorController.getLearners)
mentorRoute.post("/updateMentor",upload.single('profileImage'),mentorController.updateMentorProfile)
mentorRoute.get('/getCategories',mentorController.showCategories)
mentorRoute.post('/createCourse',upload.single('thumbnail'),mentorController.createCourse)
mentorRoute.get('/getCourses',mentorController.getCourses)
mentorRoute.delete("/deleteCourse/:courseId",mentorController.deleteCourse)
module.exports = mentorRoute