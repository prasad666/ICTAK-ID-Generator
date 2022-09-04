var express = require("express");
var router = express.Router();
var applicationController = require("../controllers/applicationController.js");
var authController = require('../controllers/authController')

/*
 * GET
 */
router.get("/", authController.protect, authController.restrictTo('student','batchManager','admin'), applicationController.list);

/*
 * GET
 */
router.get("/:id", authController.protect, authController.restrictTo('student','batchManager','admin'), applicationController.show);

/*
 * POST
 */
router.post("/", authController.protect, authController.restrictTo('student','batchManager','admin'), applicationController.create);

/*
 * PUT
 */
router.put("/:id", authController.protect, authController.restrictTo('student','batchManager','admin'), applicationController.update);

/*
 * DELETE
 */
router.delete("/:id", authController.protect, authController.restrictTo('student','batchManager','admin'), applicationController.remove);

module.exports = router;
