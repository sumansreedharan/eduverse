const express = require("express")
const userRoute = express()
const cors = require("cors");
const userController = require('../controller/userController')
const userAuth = require('../middleware/userAuth')


userRoute.post("/updateUser",userAuth,userController.updateProfile);
userRoute.use(cors())



module.exports = userRoute;