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

module.exports = adminRoute