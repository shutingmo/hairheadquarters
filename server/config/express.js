var database = require('./database'),
    express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    loginRouter = require('../routes/loginServerRoutes.js'),
    signupRouter = require('../routes/signupServerRoutes.js'),
    userRouter = require('../routes/userServerRoutes.js');



module.exports.init = function(){
    mongoose
        .set('useCreateIndex',true)
        .connect(database.db.uri, { useNewUrlParser: true })
        .then(() => console.log("MongoDB connected"))
        .catch(err => console.log(err));

    // const conn = mongoose.createConnection(database.db.uri);

    var app = express();

    app.use(morgan('dev'));
    // app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());


    // app.use(function(req, res, next) {
    //     if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    //       jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
    //         if (err) req.user = undefined;
    //         req.user = decode;
    //         next();
    //       });
    //     } else {
    //       req.user = undefined;
    //       next();
    //     }
    // });

    app.use('/', express.static('client'));

    

    console.log('express');
    app.use('/signup', signupRouter);

    app.use('/login/auth', loginRouter);

    app.use('/account/getinfo', userRouter);

    app.all('/*', function(req, res){
        res.redirect('/');
        // res.send('Hello World');
    });
    
    return app;
}