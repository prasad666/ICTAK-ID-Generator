var express = require("express");
var router = express.Router();
var contact_messageController = require("../controllers/contact_messageController.js");

/*
 * GET
 */
router.get("/", contact_messageController.list);

/*
 * GET
 */
router.get("/:id", contact_messageController.show);

/*
 * POST
 */
router.post("/", contact_messageController.create);

/*
 * PUT
 */
router.put("/:id", contact_messageController.update);

/*
 * DELETE
 */
router.delete("/:id", contact_messageController.remove);

module.exports = router;
