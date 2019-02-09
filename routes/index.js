const express = require("express");
const User = require("../models/user-model.js");
const router = express.Router();
const bcrypt = require("bcrypt");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/properties", (req, res, next) => {
  res.render("properties.hbs");
});

router.get("/tenants", (req, res, next) => {
  res.render("tenants.hbs");
});

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

///////////////////////////////////////////////////////SIGNUP

/* GET singup page */
router.get("/signup", (req, res, next) => {
  res.render("signup.hbs");
});

router.post("/process-signup", (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    originalPassword,
    profilePhoto
  } = req.body;
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
});

module.exports = router;
