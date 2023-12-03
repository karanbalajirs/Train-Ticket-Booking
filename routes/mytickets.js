const express = require("express");
const router = express.Router();
var session = require("express-session");
const nodemon = require("nodemon");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const {tic,ticket} = require("../models/tickets");
const {travel1,coach,seat,coachSchema} = require("../models/travel"); 
const ObjectId = mongoose.Types.ObjectId;

router.get("/",async (req,res)=>{

    if(req.isAuthenticated()){
    var user= await req.user.id;
    // console.log(user);
    var f=[];
    var seat=[];
    var tic = await ticket.find({"userID":user}).populate('travelDetails');
    for(let i=0;i<tic.length;i++){
        var tr = await tic[i].populate("travelId");
        var train = await tr.travelId.populate("trainVal");
        var ch = tr.travelId.coach.find(ch => ch._id.equals(new ObjectId(tic[i].travelDetails[0].coachId)));
        var dum =[];
        for(let j=0;j<tic[i].travelDetails.length;j++){
            var sm = ch.seats.find(sm => sm._id.equals(new ObjectId(tic[i].travelDetails[j].seatID)));
            dum.push(sm);
        }
        seat.push(dum);
        // console.log(ch.coachName);
        f.push(ch);
    }
    //var tr = await train[0].populate("trainVal");
    console.log(tic);
    res.render("mytickets",{isauth:req.isAuthenticated(),ticket:tic,ch:f,seat:seat});}
    else{
        res.redirect("/login");
    }
});

module.exports = router;