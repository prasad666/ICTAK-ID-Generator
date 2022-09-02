var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController.js");
var authController = require('../controllers/authController')

router.post('/register', authController.register);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

/*
 * GET
 */
router.get("/", authController.protect, authController.restrictTo('student','batchManager','admin'),  userController.list);

/*
 * GET
 */
router.get("/:id", authController.protect, authController.restrictTo('student','batchManager','admin'), userController.show);

/*
 * POST
 */
router.post("/", authController.protect, authController.restrictTo('student','batchManager','admin'),  userController.create);

/*
 * PUT
 */
router.put("/:id", authController.protect, authController.restrictTo('student','batchManager','admin'),  userController.update);

/*
 * DELETE
 */
router.delete("/:id", authController.protect, authController.restrictTo('student','batchManager','admin'),  userController.remove);

module.exports = router;
