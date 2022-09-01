var express = require('express');
var router = express.Router();
var batchController = require('../controllers/batchController.js');

/*
 * GET
 */
router.get('/', batchController.list);

/*
 * GET
 */
router.get('/:id', batchController.show);

/*
 * POST
 */
router.post('/', batchController.create);

/*
 * PUT
 */
router.put('/:id', batchController.update);

/*
 * DELETE
 */
router.delete('/:id', batchController.remove);

module.exports = router;
