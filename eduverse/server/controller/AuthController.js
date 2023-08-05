const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
// const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const {IS_ADMIN,IS_MENTOR,IS_USER} = require('../Constants/roles')

require('dotenv').config()

const Register = async (req, res) => {
  try {
    const { name, email, mobile, password, role } = req.body;

    const otp = generateNumericOTP(6); // Generate a numeric OTP of length 6

    sendOTPByEmail(email, otp)
      .then(async () => {
        await User.create({
          name,
          email,
          mobile,
          password,
          role,
          otp: Number(otp), // Save the OTP as a number
        });

        res.status(200).json({ message: "Your registration is successful" });
      })
      .catch((error) => {
        console.error('Failed to send OTP:', error);
        res.status(500).json({ error: 'Failed to send OTP' });
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "An error occurred during registration" });
  }
};

async function sendOTPByEmail(email, otp) {

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SECRET_EMAIL,
      pass: process.env.PASSWORD_KEY,
    },
  });

  
  const mailOptions = {
    from: process.env.SECRET_EMAIL,
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP is: ${otp}`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}

function generateNumericOTP(length) {
  const digits = '0123456789';
  let otp = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    otp += digits[randomIndex];
  }

  return otp;
}

const VerifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.COMMON_SECRET_KEY);

    res.json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "An error occurred during OTP verification" });
  }
}



// const methodLogin = async (req,res) => {
//   try {
//     const {email,password} = req.body
//     const user = await User.findOne({email,password})
//     if(user){
//       const token = jwt.sign(
//         {
//           id:user._id
//         },
//         "secret123"
//       );
//       let role = ''
//       if(user.role==='admin'){
//         role = 'admin'
//       }else if(user.role === 'mentor'){
//         role = 'mentor'
//       }else{
//         role = user;
//       }
//       return res.json({ status: "ok", token, role,user });
//     } else {
//       return res.json({ status: "error", user: false });  

//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({error:"server error"})
//   }
// }

const methodLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (user) {
      if (user.blocked) {
        
        return res.json({ status: "blocked", message: "You are temporarily blocked by the admin." });
      }

      const token = jwt.sign({ id: user._id },process.env.COMMON_SECRET_KEY);
      let role = "";

      if (user.role === IS_ADMIN) {
        role = "admin";
      } else if (user.role === IS_MENTOR) {
        role = "mentor";
      } else {
        role = user;
      }

      return res.json({ status: "ok", token, role, user });
    } else {
      return res.json({ status: "error", user: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
};


module.exports = {
  Register,
  VerifyOTP,
  methodLogin,
};





