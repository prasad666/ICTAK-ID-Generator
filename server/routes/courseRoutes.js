var express = require("express");
var router = express.Router();
var courseController = require("../controllers/courseController.js");
var authController = require("../controllers/authController");

/*
 * GET
 */
router.get("/", authController.protect, authController.restrictTo('student','batchManager','admin'), courseController.list);

router.get("/all", courseController.listAll);

/*
 * GET
 */
router.get("/:id", authController.protect, authController.restrictTo('student','batchManager','admin'), courseController.show);

/*
 * POST
 */
router.post("/", authController.protect, authController.restrictTo('batchManager','admin'), courseController.create);

/*
 * PUT
 */
router.put("/:id", authController.protect, authController.restrictTo('batchManager','admin'), courseController.update);

/*
 * DELETE
 */
router.delete("/:id", authController.protect, authController.restrictTo('batchManager','admin'), courseController.remove);

module.exports = router;
