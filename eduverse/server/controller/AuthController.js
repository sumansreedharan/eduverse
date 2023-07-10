const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');

const Register = async (req, res) => {
  try {
    const { name, email, mobile, password, role } = req.body;

    const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });


    // Send OTP to the registered email using Nodemailer
    sendOTPByEmail(email, otp)
      .then(async () => {
        await User.create({
          name,
          email,
          mobile,
          password,
          role,
          otp, // Store the OTP in the user object
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
      user: 'verifyyourmail0007@gmail.com',
      pass: 'ahywtvcavokgbivc',
    },
  });

  
  const mailOptions = {
    from: 'verifyyourmail0007@gmail.com',
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP is: ${otp}`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
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

    
    const token = jwt.sign({ userId: user._id }, "secret123");

    res.json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "An error occurred during OTP verification" });
  }
};


const methodLogin = async (req,res) => {
  try {
    const {email,password} = req.body
    const user = await User.findOne({email,password})
    if(user){
      const token = jwt.sign(
        {
          id:user._id
        },
        "secret123"
      );
      let role = ''
      if(user.role==='admin'){
        role = 'admin'
      }else if(user.role === 'mentor'){
        role = 'mentor'
      }else{
        role = user;
      }
      return res.json({ status: "ok", token, role,user });
    } else {
      return res.json({ status: "error", user: false });  

    }
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"server error"})
  }
}

module.exports = {
  Register,
  VerifyOTP,
  methodLogin,
};





