var userCtrl = require('../controllers/userServerController.js');

var express = require('express');
var router = express.Router();

router.route('/getInfo')
  .get(userCtrl.getCurrentUser);

router.route('/hairJournal')
  .post(userCtrl.submitJourEnt);

module.exports = router;