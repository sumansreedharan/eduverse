const express = require('express')
const app = express();
const cors = require("cors")
const mongoose = require('mongoose')
const allRoutes = require('./Routes/allRoute');
const adminRoute = require('./Routes/adminRoute') 
const userRoute = require('./Routes/userRoute')


app.use(cors())
app.use(express.json())

app.use('/',allRoutes)
app.use('/',userRoute)
app.use('/admin',adminRoute)



mongoose.connect("mongodb://127.0.0.1:27017/eduverse")
app.listen(3001, () => {
    console.log("server on port 3001");
  });

