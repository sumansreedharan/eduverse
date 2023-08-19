const express = require("express")
const userRoute = express()
const cors = require("cors");
const userController = require('../controller/userController')
const userAuth = require('../middleware/userAuth')
const {upload} = require('../middleware/fileUpload')
userRoute.use(cors())


userRoute.post("/updateUser",userAuth,upload.single('image'),userController.updateProfile);
userRoute.get("/listCourses",userAuth,userController.listCourse);
userRoute.get("/userCourseView/:id",userController.userCourseView);
userRoute.post("/createOrder",userAuth,userController.createOrder);
userRoute.post('/orderSuccess',userAuth,userController.OrderSuccess);
userRoute.get('/yourCourses/:userId',userController.fetchYourCourses);
userRoute.get('/courseVideoDetails/:courseId',userController.getCourseDetailsWithVideos);


module.exports = userRoute;