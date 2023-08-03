const express = require('express')
const app = express();
const cors = require("cors")
const mongoose = require('mongoose')
const allRoutes = require('./Routes/allRoute');
const adminRoute = require('./Routes/adminRoute') 
const userRoute = require('./Routes/userRoute')
const mentorRoute = require('./Routes/mentorRoute')
const path = require("path")


app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname,"public")))

app.use('/',allRoutes)
app.use('/user',userRoute)
app.use('/admin',adminRoute)
app.use('/mentor',mentorRoute)



mongoose.connect("mongodb://127.0.0.1:27017/eduverse")
app.listen(3001, () => {
    console.log("server on port 3001");
  });

