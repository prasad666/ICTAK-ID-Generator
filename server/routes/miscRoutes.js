var express = require("express");
var router = express.Router();
var sharedController = require("../controllers/sharedController.js");

router.post("/contact", sharedController.contactFormHandler);

module.exports = router;
