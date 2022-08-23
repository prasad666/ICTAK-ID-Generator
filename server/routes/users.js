var express = require('express');
var router = express.Router();

const authController = require('../controllers/authController')
const studentController = require('../controllers/studentController')

router.post('/signup', studentController.signUp);
router.post('/signin', studentController.signIn);
router.post('/:id/apply',authController.protect, studentController.upload.single('photo'), studentController.applyForId)

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
