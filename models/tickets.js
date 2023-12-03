const mongoose = require("mongoose");
const {travel1 , seat ,coach} = require("./travel");
const user = require("./user");
const tick = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    coachId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'coach'
    },
    seatID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'seat'
    }
});

const tic = new mongoose.model("tic",tick);

const ticketSchema = new mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    userIdNo:{
        type:String,
        required:true
    },
    travelId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"travel",
        required:true
    },
    travelDetails:[tick]
});

const ticket = new mongoose.model("ticket",ticketSchema);

module.exports = {tic,ticket};