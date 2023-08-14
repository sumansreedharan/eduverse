const express = require('express') 
const mentorRoute = express()
const cors = require('cors')
const mentorController = require('../controller/mentorController')
const mentorAuth = require('../middleware/mentorAuth')
const {upload,uploadVideo} = require('../middleware/fileUpload')

const {cloudinary} = require('../cloudinary/cloudStorage')
const uploadVideoTocloudinary = require('../cloudinary/uploadToCloudinary').uploadVideoToCloud


mentorRoute.get("/getLearners",mentorAuth,mentorController.getLearners)
mentorRoute.post("/updateMentor",upload.single('profileImage'),mentorController.updateMentorProfile)
mentorRoute.get('/getCategories',mentorController.showCategories)
mentorRoute.post('/createCourse',upload.single('thumbnail'),mentorController.createCourse)
mentorRoute.get('/getCourses',mentorController.getCourses)
mentorRoute.delete("/deleteCourse/:courseId",mentorAuth,mentorController.deleteCourse)
mentorRoute.post(
   '/videoUpload/:courseId',
   uploadVideo.fields([
     { name: 'videos', maxCount: 1 },
     { name: 'title', maxCount: 1 },
     { name: 'part', maxCount: 1 },
     { name: 'description', maxCount: 1 },
   ]),
   uploadVideoTocloudinary,
   mentorController.processVideo
 );
 mentorRoute.get('/uploadedCourses/:courseId',mentorController.fetchUploadedCourses)


module.exports = mentorRoute