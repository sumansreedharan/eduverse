// import {v2 as cloudinary} from 'cloudinary';
const cloudinary = require('cloudinary').v2;


console.log("entered to cloudinary");
          
cloudinary.config({ 
  cloud_name: 'dwkfief7p', 
  api_key: '129684551176452', 
  api_secret: 'ximwscpMWYm9qtmipQL3goMiOR8'
});

module.exports = {
  cloudinary
}