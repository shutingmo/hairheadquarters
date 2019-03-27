var mongoose = require('mongoose'),
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
    hairType: {
        type: String, 
        requier: true
    },
    yearsNatural:{
        type: Number,
        required: true
    },
    skillLevel: {
        type: Number,
        required: true
    }
})

var User = mongoose.model('User', userSchema);

module.exports = User;