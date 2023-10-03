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
userRoute.get('/searchCourses',userController.searchCourses)
userRoute.get('/getAllCategories',userController.getAllCategories)
userRoute.put('/getCompletedLessons/:userId/:lessonId',userController.completedLessons)
userRoute.get('/userProgress/:userId',userController.getUserProgress)
userRoute.post('/userReviews/:courseId/:userId',userAuth,userController.postUserReviews)
userRoute.get('/reviews/:courseId',userController.getUserReviews)
userRoute.post('/userRatings/:courseId',userController.postUserRating)
userRoute.get('/checkPurchase/:courseId/:userId',userAuth,userController.isUserPurchased)
userRoute.get('/averageRating/:courseId',userAuth,userController.getUserRatingsForCourse)
userRoute.get('/listBycategories/:categoryId',userController.listByCategories)
userRoute.get('/getMentorForChat/:courseId',userController.getMentorForChat)
userRoute.get('/getCourseDetailsForCertificate/:courseId',userController.getCourseDetailsForCertificate)

module.exports = userRoute;