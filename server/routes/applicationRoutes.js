var express = require("express");
var router = express.Router();
var applicationController = require("../controllers/applicationController.js");
var authController = require('../controllers/authController')

/*
 * GET
 */
router.get("/", authController.protect, authController.restrictTo('student','batchManager','admin'), applicationController.list);
/*
 * GET ID pdf if approved
 */
router.get("/getPdf", authController.protect, authController.restrictTo('student','batchManager','admin'), applicationController.getPdf);

/*
 * history of approved/rejected applications
 */
router.get("/history", authController.protect, authController.restrictTo('batchManager','admin'), applicationController.history);
/*
 * GET pending applications for a specific batch
 */
router.get("/pending", authController.protect, authController.restrictTo('batchManager','admin'), applicationController.pendingApplications);

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
