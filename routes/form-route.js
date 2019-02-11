const express = require("express");
const User = require("../models/user-model.js");
const Tenant = require("../models/tenant-model.js");
const Property = require("../models/property-model.js");
const router = express.Router();
const bcrypt = require("bcrypt");
const fileUploader = require("../config/file-upload.js");

/////////////////////////////////////////////////////// LOGIN
// login process - routes to the properties page, otherwise to index
router.post("/process-login", (req, res, next) => {
  const { email, originalPassword } = req.body;
  User.findOne({ email: { $eq: email } })
    .then(userDoc => {
      if (!userDoc) {
        res.redirect("/index");
        return;
      }
      const { encryptedPassword } = userDoc;
      if (!bcrypt.compareSync(originalPassword, encryptedPassword)) {
        res.redirect("/index");
      }
      res.redirect("/properties");
    })
    .catch(err => next(err));
});

/////////////////////////////////////////////////////// SIGNUP

/* GET signup page */
router.get("/signup", (req, res, next) => {
  res.render("signup.hbs");
});

// upload multiple of files use fileUploader.array
router.post(
  "/process-signup",
  fileUploader.single("pictureUpload"),
  (req, res, next) => {
    const {
      firstName,
      lastName,
      email,
      originalPassword
      //do not include the profile photo in object
      // profilePhoto
    } = req.body;

    // const host = req.user._id

    //////////cloudinary
    console.log("File upload is ALWAYS in req.file OR req.files", req.file);
    //multer puts all file info into it got from the service into req.file
    const profilePhoto = req.file.secure + url;

    if (!originalPassword) {
      res.redirect("/signup");
      return;
    }
    const encryptedPassword = bcrypt.hashSync(originalPassword, 10);
    User.create({ firstName, lastName, email, encryptedPassword, profilePhoto })
      .then(() => {
        console.log("user created");
        res.redirect("/properties");
      })
      .catch(err => next(err));
    console.log("user fail");
  }
);

module.exports = router;
