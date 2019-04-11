var userCtrl = require('../controllers/userServerController.js');

var express = require('express');
var router = express.Router();

router.route('/')
    .post(userCtrl.signupUser);

// router.route('/:URL')
//     .get(userCtrl.confirmUser);

module.exports = router;