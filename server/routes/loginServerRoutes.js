var userController = require ('../controllers/userServerController'),
    express = require('express'),
    router = express.Router();

router.route('/')
    .post(userController.authenticateUser)
    .put(userController.sendPassLink);

module.exports = router;