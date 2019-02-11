const express = require("express");
const User = require("../models/user-model.js");
const Tenant = require("../models/tenant-model.js");
const Property = require("../models/property-model.js");
const router = express.Router();
const bcrypt = require("bcrypt");
const fileUploader = require("../config/file-upload.js");

router.get("/properties", (req, res, next) => {
  res.render("properties.hbs");
});

router.get("/tenants", (req, res, next) => {
  res.render("tenants.hbs");
});

module.exports = router;
