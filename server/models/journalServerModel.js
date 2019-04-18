'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;

var journalSchema = new Schema({
    // username: {
    //     type: String,
    //     // required: true,
    //     // unique: true
    // },
    entry:{
        type: String,
        required: true
    }
});

// userSchema.methods.comparePassword = function(password){
//     return bcrypt.compareSync(password, this.hash_password);
// };

var Journal = mongoose.model('Journal', journalSchema);
module.exports = Journal;