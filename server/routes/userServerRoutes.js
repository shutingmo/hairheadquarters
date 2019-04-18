var userCtrl = require('../controllers/userServerController.js');

var express = require('express');
var router = express.Router();

router.route('/')
  .get(userCtrl.getCurrentUser);

module.exports = router;