var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    passport: String
});

//user şemasına passport-local-mongoose ile gelen özellikleri enject ediyoruz.
userSchema.plugin(passportLocalMongoose);

//appp.js  de kullanabilmek için export ediyoruz.
module.exports = mongoose.model('user',userSchema);
