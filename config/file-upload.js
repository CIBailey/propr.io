const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDIFY_API_CLOUD_NAME,
  api_key: process.env.CLOUDIFY_API_KEY,
  api_secret: process.env.CLOUDIFY_API_SECRET
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: "profile-pictures"
  // this is to upload thnigs NOT images:
  // params: {
  //   resource_type: "raw"
});

//this is a Multer file upoad object that connects to a ROUTE
const fileUploader = multer({ storage });
module.exports = fileUploader;
