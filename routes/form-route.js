const express = require("express");
const User = require("../models/user-model.js");
const Tenant = require("../models/tenant-model.js");
const Property = require("../models/property-model.js");
const router = express.Router();
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const fileUploader = require("../config/file-upload.js");

/////////////////////////////////////////////////////// LOGIN
// login process - routes to the properties page, otherwise to index

router.get("/", (req, res, next) => {
  res.render("index.hbs");
});

router.post("/process-login", (req, res, next) => {
  var useremail = req.body.email;
  var userpass = req.body.encryptedPassword;

  if (useremail === "" || userpass === "") {
    res.render("index.hbs", {
      errorMessage: "Indicate username and password to sign in"
    });
    return;
  }

  User.findOne({ useremail }, "_id useremail password", (err, user) => {
    if (err || !user) {
      res.render("index.hbs", { errorMessage: "This account doesn't exist" });
    } else {
      if (bcrypt.compareSync(userpass, user.password)) {
        req.session.currentUser = user;
        res.redirect("/properties");
      } else {
        res.render("index.hbs", { errorMessage: "Incorrect password" });
      }
    }
  });
});

/////////////////////////////////////////////////////// SIGNUP

/* GET signup page */
router.get("/signup", (req, res, next) => {
  res.render("forms/signup.hbs");
});

router.post(
  "/process-signup",
  fileUploader.single("profilePhoto"),
  (req, res, next) => {
    const { firstName, lastName, confirmPassword, role, phone } = req.body;

    var useremail = req.body.email;
    var userpass = req.body.originalPassword;

    if (confirmPassword !== userpass) {
      res.render("forms/signup.hbs", {
        errorMessage: "Please check the spelling of your password."
      });
      return;
    }

    if (useremail === "" || userpass === "") {
      res.render("forms/signup.hbs", {
        errorMessage: "Please fill all form fields to sign up."
      });
      return;
    }

    User.findOne({ email: useremail }, "email", (err, user) => {
      if (user !== null) {
        res.render("forms/signup.hbs", {
          errorMessage: "This email already exists in our system."
        });
        return;
      }

      const profilePhoto = req.file.secure_url;
      var salt = bcrypt.genSaltSync(bcryptSalt);
      var encryptedPassword = bcrypt.hashSync(userpass, salt);

      var newUser = User({
        firstName,
        lastName,
        email: useremail,
        encryptedPassword,
        role,
        phone,
        profilePhoto
      });

      newUser
        .save()
        .then(() => {
          console.log("user created");
          res.redirect("/properties");
        })
        .catch(err => next(err));
    });
  }
);

module.exports = router;

/////////////////logout

router.get("/process-logout", (req, res, next) => {
  if (!req.session.currentUser) {
    req.flash("success", "Logged out successfully! 🙋‍");
    res.redirect("/");
    return;
  }

  req.session.destroy(err => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

/*  ADD PROPERTY page */
router.get("/add-property", (req, res, next) => {
  res.render("forms/add-property.hbs");
});
