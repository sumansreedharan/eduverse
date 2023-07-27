const express = require("express")
const userRoute = express()
const cors = require("cors");
const userController = require('../controller/userController')
const userAuth = require('../middleware/userAuth')
const {upload} = require('../middleware/fileUpload')
userRoute.use(cors())


userRoute.post("/updateUser",userAuth,upload.single('image'),userController.updateProfile);
userRoute.get("/listCourses",userController.listCourse)



module.exports = userRoute;