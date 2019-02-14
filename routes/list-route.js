const express = require("express");
const User = require("../models/user-model.js");
const Tenant = require("../models/tenant-model.js");
const Property = require("../models/property-model.js");
const router = express.Router();
const bcrypt = require("bcrypt");
const fileUploader = require("../config/file-upload.js");
const checkLandlord = checkRoles("Landlord");

/* Authentiation Permissions*/

function checkRoles(role) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect("/login");
    }
  };
}

router.get("/properties", checkLandlord, (req, res, next) => {
  res.render("lists/properties.hbs");
});

router.get("/tenants", checkLandlord, (req, res, next) => {
  res.render("lists/tenants.hbs");
});

router.get("/payments", checkLandlord, (req, res, next) => {
  res.render("lists/payments.hbs");
});

router.get("/messages", checkLandlord, (req, res, next) => {
  res.render("lists/messages.hbs");
});

module.exports = router;
