const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const finds = mongoose.find;
const {tic,ticket} = require("../models/tickets");
const {travel1,coach,seat,coachSchema} = require("../models/travel"); 
// router.get("/",(req,res)=>{
//     if(req.isAuthenticated){
//         res.render("booking");
//     }
//     else{
//         res.redirect("login");
//     }
// });

router.post("/",async (req,res)=>{
    if(req.isAuthenticated()){
    const f = await travel1.findOne({travelId:req.session.valueTopass}).populate('trainVal');
    var coac = req.body.coach;
    var s = coac.split("|");
    coac = String(s[0]);
    // Cars.find({}, function(err, cars) {
    //     assert.equal(err, null);
    //     res.json(cars);
    // });
    const coach1 = f.coach.find(coach1=> coach1.coachName == coac);
    // await f.coach.find({} , (err, result) =>{
    //     if (err) {
    //       res.send(err);
    //     } else {
    //       return result;
    //     }});
    // var dd = coach1.seats;
    // console.log(dd);
    req.session.tr = f;
    req.session.ch = coach1;
    req.session.num = req.body.num;
    res.render("booking",{isauth:req.isAuthenticated(),coach:coach1,Num:req.body.num,travelID:f});
    }
    else{
        res.redirect("/login");
    
    }
});
module.exports = router;