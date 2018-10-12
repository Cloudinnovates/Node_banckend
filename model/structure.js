'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userprofile = new Schema({

name: {type: String},
email: {type: String, unique: true},
phone:{type: Number, unique: true},
facebook_id:{type: String, unique: true,},
google_id:{type: String, unique: true},
password: {type: String}
});




module.exports = mongoose.model('userprofile', userprofile);

