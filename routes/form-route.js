const express = require("express");
const User = require("../models/user-model.js");
const Property = require("../models/property-model.js");
const router = express.Router();
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const fileUploader = require("../config/file-upload.js");
const checkLandlord = checkRoles("Landlord");

/* Authentition Permissions*/

function checkRoles(role) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect("/login");
    }
  };
}

/* SIGNUP Page */

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
        .then(userDoc => {
          console.log("😎 user created");
          req.logIn(userDoc, () => {
            req.flash("success", "Log in success! 😎");
            res.redirect("/properties");
          });
        })

        .catch(err => next(err));
    });
  }
);

/* LOGIN Page */

router.get("/login", (req, res, next) => {
  res.render("index.hbs");
});

router.post("/process-login", (req, res, next) => {
  const { email, originalPassword } = req.body;
  User.findOne({
    email: { $eq: email }
  })
    .then(userDoc => {
      if (!userDoc) {
        req.flash("error", "Email is incorrect. 🤦🏾‍♂️");
        res.redirect("/login");
        return;
      }

      const { encryptedPassword } = userDoc;
      if (!bcrypt.compareSync(originalPassword, encryptedPassword)) {
        req.flash("error", "Password is incorrect. 🤦🏾‍♂️");
        res.redirect("/login");
        return;
      }
      req.logIn(userDoc, () => {
        req.flash("success", "Log in success! 😎");
        res.redirect("/properties");
      });
    })
    .catch(err => next(err));
});

module.exports = router;

/*  LOG OUT page */

router.get("/process-logout", (req, res, next) => {
  req.logOut();
  req.flash("success", "Logged out successfully! 🙋‍");
  res.redirect("/");
});

/*  EDIT PROFILE page */
router.get("/edit-profile", checkLandlord, (req, res, next) => {
  res.render("forms/edit-profile.hbs");
});

router.post(
  "/process-edit-profile",
  fileUploader.single("profilePhoto"),
  (req, res, next) => {
    const { firstName, lastName, email, originalPassword, phone } = req.body;
    let profilePhoto = req.user.profilePhoto;

    if (req.file) {
      profilePhoto = req.file.secure_url;
    }

    User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          firstName,
          lastName,
          email,
          originalPassword,
          phone,
          profilePhoto
        }
      },
      { runValidators: true }
    )
      .then(() => res.redirect("/properties"))
      .catch(err => next(err));
  }
);

// /*  ADD PROPERTY page */
router.get("/add-property", checkLandlord, (req, res, next) => {
  res.render("forms/add-property.hbs");
});

router.post(
  "/process-add-property",
  fileUploader.single("featurePhoto"),
  (req, res, next) => {
    const {
      name,
      description,
      rentAmount,
      amenities,
      street1,
      street2,
      city,
      zipcode,
      country,
      bedroom,
      bathroom,
      interiorSize
    } = req.body;

    const featurePhoto = req.file.secure_url;
    const property = new Property({
      name: name,
      description: description,
      rentAmount: rentAmount,
      amenities,
      address: { street1, street2, city, zipcode, country },
      featurePhoto,
      bedroom: bedroom,
      bathroom: bathroom,
      interiorSize: interiorSize,
      parking: parking,
      deposit: deposit
    });
    console.log(property);
    property
      .save()
      .then(newProperty => {
        console.log("😎 property created");
        res.redirect("/properties");
      })
      .catch(err => next(err));
  }
);

// /*  EDIT PROPERTY page */

router.get("/property/:propertyId/edit", checkLandlord, (req, res, next) => {
  const { propertyID } = req.params;
  Property.findById(propertyID)
    .then(propertyDoc => {
      res.locals.propertyItem = propertyDoc;
      res.render("forms/edit-property.hbs");
    })
    .catch(err => next(err));
});

module.exports = router;
