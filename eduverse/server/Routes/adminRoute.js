const express = require('express')
const adminRoute = express()
const cors = require("cors");
const adminController = require('../controller/adminController')
const adminAuth = require('../middleware/adminAuth')
adminRoute.use(cors())


adminRoute.get("/totalCounts",adminController.getCounts)
adminRoute.get("/listUsers",adminController.listUser)
adminRoute.get("/listMentors",adminController.listMentor)
adminRoute.put("/blockUser/:id",adminAuth,adminController.blockUnblockUser)
adminRoute.put("/blockMentor/:id",adminAuth,adminController.blockUnblockMentor)
adminRoute.get("/getCategories",adminController.fetchCategories)
adminRoute.post("/addCategories",adminController.addCategory)
adminRoute.put("/editCategories/:id",adminAuth,adminController.editCategory)
adminRoute.delete("/deleteCategory/:categoryId",adminAuth,adminController.deleteCategory)
adminRoute.get("/viewCourses",adminController.courseView)

module.exports = adminRoute