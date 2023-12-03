const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/train");

const seatSchema = new mongoose.Schema({
    seatNumber:{
        type:Number,
        required:true
    },
    isBooked:{
        type:Boolean,
        default:false,
        required:true,
    }
});

module.exports = seatSchema;
