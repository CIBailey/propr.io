const express = require("express");
const User = require("../models/user-model.js");
const Tenant = require("../models/tenant-model.js");
const Property = require("../models/property-model.js");
const router = express.Router();
const bcrypt = require("bcrypt");
const fileUploader = require("../config/file-upload.js");

router.get("/properties", (req, res, next) => {
  res.render("lists/properties.hbs");
});

router.get("/tenants", (req, res, next) => {
  res.render("lists/tenants.hbs");
});

router.get("/payments", (req, res, next) => {
  res.render("lists/payments.hbs");
});

router.get("/messages", (req, res, next) => {
  res.render("lists/messages.hbs");
});

module.exports = router;
