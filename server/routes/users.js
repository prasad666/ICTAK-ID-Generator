var express = require('express');
var router = express.Router();

const authController = require('../controllers/authController')
const userController = require('../controllers/userController')

router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);
router.post('/:id/apply',authController.protect, userController.upload.single('photo'), userController.applyForId)

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
