const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/user");

const trainSchema = new mongoose.Schema({
    trainName:{type:String,required:true},
    trainNumber:{type:Number,required:true,unique:true},
    trainstart:{type:String,required:true},
    traindest:{type:String,required:true},
    trainroute:{type:[String]}
});

const storedTrains = new mongoose.model("storedTrains",trainSchema);

// const stored = new storedTrains({
//     trainName:"Hyderabad - MGR Chennai Central SF Express",
//     trainNumber:12604,
//     trainstart:"Hyderabad",
//     traindest:"Chennai Egmore",
//     trainroute:["Miryalaguda","Guntur","Nellore"],
// });
// stored.save();
module.exports = storedTrains;



