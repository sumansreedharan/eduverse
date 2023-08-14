const cloudinary = require('cloudinary').v2;

const uploadVideoToCloud = async(req,res,next) =>{
    try {
        const video = await cloudinary.uploader.upload(req.files.videos[0].path,{resource_type:'video'})
        req.url = video.url
        next()
    } catch (error) {
        console.error("Error uploading video to Cloudinary:", error);
        res.status(500).json({ message: error }); 
    }
}

module.exports = {
    uploadVideoToCloud
}