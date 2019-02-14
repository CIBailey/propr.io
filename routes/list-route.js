const express = require("express");
const User = require("../models/user-model.js");
const Property = require("../models/property-model.js");
const router = express.Router();
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
  Property.find()
    .then(propertyResults => {
      //send the databse query results to the HBS file as book array
      res.locals.propertyArray = propertyResults;
      res.render("lists/properties.hbs");
    })
    .catch(err => next(err));
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

router.get("/property/:propertyId", (req, res, next) => {
  res.send(req.params);
  const { propertyId } = req.params;
  Property.findById(propertyId)

    .then(propertyDoc => {
      res.locals.propertyItem = propertyDoc;
      res.render("property-details.hbs");
    })
    .catch(err => next(err));
});

module.exports = router;
