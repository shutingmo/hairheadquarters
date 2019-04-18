'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // hash_password: {
    //     type: String,
    //     required: true
    // },
    hairtype: {
        type: String, 
        required: true
    },
    yearsnatural:{
        type: Number,
        required: true
    },
    skilllevel: {
        type: Number,
        required: true
    }
})

// userSchema.methods.comparePassword = function(password){
//     return bcrypt.compareSync(password, this.hash_password);
// };

var User = mongoose.model('User', userSchema);
module.exports = User;