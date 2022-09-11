var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController.js");
var authController = require("../controllers/authController");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/uploads");
  },
  filename: function (req, file, callback) {
    [filename, ext] = file.originalname.split(".");
    callback(null, file.fieldname + "-" + Date.now() + "." + ext);
  },
});

const upload = multer({ storage: storage });

//router.post("/register", authController.register);
router.post("/login", authController.login);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

/*
 * GET
 */
router.get(
  "/",
  authController.protect,
  authController.restrictTo("student", "batchManager", "admin"),
  userController.list
);
router.get("/all", userController.listAll);
/* authController.protect, authController.restrictTo('student','batchManager','admin')
 * GET
 */
router.get(
  "/:id",
  authController.protect,
  authController.restrictTo("student", "batchManager", "admin"),
  userController.show
);

/*
 * POST
 */
router.post(
  "/",
  authController.protect,
  authController.restrictTo("admin"),
  userController.create
);
router.post("/register", upload.single("photo"), userController.register);

/*
 * PUT
 */
router.put(
  "/:id",
  authController.protect,
  authController.restrictTo("student", "batchManager", "admin"),
  userController.update
);

/*
 * DELETE
 */
router.delete(
  "/:id",
  authController.protect,
  authController.restrictTo("student", "batchManager", "admin"),
  userController.remove
);

module.exports = router;
