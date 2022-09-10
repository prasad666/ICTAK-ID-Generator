var express = require('express');
var router = express.Router();
var batchController = require('../controllers/batchController.js');
var authController = require('../controllers/authController')

/*
 * GET
 */
router.get('/', authController.protect, authController.restrictTo('student','batchManager','admin'), batchController.list);

/*
 * GET
 */
router.get('/:id', authController.protect, authController.restrictTo('student','batchManager','admin'), batchController.show);

/*
 * GET batches of batchmanager
 */
router.get('/batchmanager/:batchmanagerId', authController.protect, authController.restrictTo('batchManager','admin'), batchController.listBatchesByBatchManager);
/*
 * POST
 */
router.post('/', authController.protect, authController.restrictTo('batchManager','admin'), batchController.create);

/*
 * PUT
 */
router.put('/:id', authController.protect, authController.restrictTo('batchManager','admin'), batchController.update);

/*
 * DELETE
 */
router.delete('/:id', authController.protect, authController.restrictTo('batchManager','admin'), batchController.remove);

module.exports = router;
