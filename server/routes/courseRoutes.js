var express = require("express");
var router = express.Router();
var courseController = require("../controllers/courseController.js");

/*
 * GET
 */
router.get("/", courseController.list);

router.get("/all", courseController.listAll);

/*
 * GET
 */
router.get("/:id", courseController.show);

/*
 * POST
 */
router.post("/", courseController.create);

/*
 * PUT
 */
router.put("/:id", courseController.update);

/*
 * DELETE
 */
router.delete("/:id", courseController.remove);

module.exports = router;
