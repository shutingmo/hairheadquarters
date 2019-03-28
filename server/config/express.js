var database = require('./database'),
    express = require('express'),
    mongoose = require('mongoose');


module.exports.init = function(){
    mongoose
        .connect(database.db.uri, { useNewUrlParser: true })
        .then(() => console.log("MongoDB connected"))
        .catch(err => console.log(err));

    // const conn = mongoose.createConnection(database.db.uri);

    var app = express();

    app.use('/', express.static('client'));

    app.all('/*', function(req, res){
        res.redirect('/');
        // res.send('Hello World');
    });

    return app;
}