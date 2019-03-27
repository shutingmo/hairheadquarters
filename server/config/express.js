var database = require('./database'),
    express = require('express'),
    mongoose = require('mongoose');


module.exports.init = function(){
    mongoose.connect(database.db.uri);
    const conn = mongoose.createConnection(config.db.uri);

}