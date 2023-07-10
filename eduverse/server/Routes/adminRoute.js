const express = require('express')
const adminRoute = express()
const cors = require("cors");
const adminController = require('../controller/adminController')
const adminAuth = require('../middleware/adminAuth')
adminRoute.use(cors())


adminRoute.get("/totalCounts",adminController.getCounts)

module.exports = adminRoute