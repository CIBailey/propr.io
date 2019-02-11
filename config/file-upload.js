const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "proprio",
  api_key: "258886777749585",
  api_secret: "dw-SeSBdk_FAQFhwtuC6Za_eSPc"
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
