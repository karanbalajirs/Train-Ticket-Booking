const mongoose = require("mongoose");

var user = new mongoose.Schema({
    email:{
        type:String,
    },
    googleId:String,
    isAdmin:{
        type:Boolean,
        default:false,
    }
});

module.exports = user;