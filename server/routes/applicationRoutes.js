var express = require("express");
var router = express.Router();
var applicationController = require("../controllers/applicationController.js");

/*
 * GET
 */
router.get("/", applicationController.list);

/*
 * GET
 */
router.get("/:id", applicationController.show);

/*
 * POST
 */
router.post("/", applicationController.create);

/*
 * PUT
 */
router.put("/:id", applicationController.update);

/*
 * DELETE
 */
router.delete("/:id", applicationController.remove);

module.exports = router;
