const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["admin","user","mentor"],
        default:"user"

    },
    blocked:{
        type:Boolean,
        default:false
    },
    profileImage:{
        type:String,
        default:true
    },
    otp:{
        type:String,
        default:''
    }
    

})

const User = mongoose.model('User',userSchema);
module.exports = User