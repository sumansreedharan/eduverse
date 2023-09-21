const express = require("express")
const cors = require("cors");
const allRoute = express()
const AuthController = require('../controller/AuthController')
// const isUserAuth = require('../middleware/userAuth')

allRoute.use(cors());

allRoute.post("/api/register",AuthController.Register)
allRoute.post("/api/verifyOtp",AuthController.VerifyOTP)
allRoute.post("/api/login",AuthController.methodLogin)
allRoute.get("/api/landingCourseSearch",AuthController.searchCourses)
allRoute.get("/api/landingListCourses",AuthController.listCourse)


module.exports = allRoute

