const express = require('express') 
const mentorRoute = express()
const cors = require('cors')
const mentorController = require('../controller/mentorController')
const mentorAuth = require('../middleware/mentorAuth')
const {upload,videoUpload} = require('../middleware/fileUpload')

mentorRoute.get("/getLearners",mentorAuth,mentorController.getLearners)
mentorRoute.post("/updateMentor",upload.single('profileImage'),mentorController.updateMentorProfile)
mentorRoute.get('/getCategories',mentorController.showCategories)
mentorRoute.post('/createCourse',upload.single('thumbnail'),mentorController.createCourse)
mentorRoute.get('/getCourses',mentorController.getCourses)
mentorRoute.delete("/deleteCourse/:courseId",mentorAuth,mentorController.deleteCourse)
module.exports = mentorRoute