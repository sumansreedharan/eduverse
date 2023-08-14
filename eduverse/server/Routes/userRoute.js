const express = require("express")
const userRoute = express()
const cors = require("cors");
const userController = require('../controller/userController')
const userAuth = require('../middleware/userAuth')
const {upload} = require('../middleware/fileUpload')
userRoute.use(cors())


userRoute.post("/updateUser",userAuth,upload.single('image'),userController.updateProfile);
userRoute.get("/listCourses",userAuth,userController.listCourse)
userRoute.get("/userCourseView/:id",userController.userCourseView)
userRoute.post("/createOrder",userAuth,userController.createOrder)
userRoute.post('/orderSuccess',userController.OrderSuccess);


module.exports = userRoute;