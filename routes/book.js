const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const finds = mongoose.find;
const {tic,ticket} = require("../models/tickets");
const {travel1,coach,seat,coachSchema} = require("../models/travel"); 
const ObjectId = mongoose.Types.ObjectId;

router.post("/",async (req,res)=>{
    if(req.isAuthenticated()){
        const tr = await travel1.findOne({travelId:req.session.tr.travelId});
        const ch = tr.coach.find(ch=> ch.coachName == req.session.ch.coachName);
//     const st = await ch.seats.find(async (st)=> await seat.seatNumber == stnum);
        function trvldtls(){
            var a=[];
            for(let i=0;i<parseInt(req.session.num);i++){
                var s = ch.seats.find(s => s.seatNumber == parseInt(req.body.seats[i]));
                s.set({isBooked:true});
                a.push({
                    name:req.body.n[i],
                    age:req.body.a[i],
                    coachId:req.session.ch._id,
                    seatID:s._id,
                });
                // s.save();
            }
            return a;
        }
    // console.log(req.body,req.session.valueTopass,req.session.num,req.session.tr,req.session.ch);
    var trd= trvldtls();
    var user = req.user.id;
    var newTicket = new ticket({
        userID:user,
        userIdNo:req.body.idd,
        travelId:req.session.tr._id,
        travelDetails:trd,
    });
    tr.save();
    var tick1 = await newTicket.save();
    var tick = await ticket.find({_id:tick1._id}).populate("travelId");
    ff = await tick[0].populate('travelDetails');
    await tick[0].travelId.populate("trainVal");
    var sf =[];
    for(let i=0;i<ff.travelDetails.length;i++){
        var cha = ff.travelId.coach.find(cha => cha._id.equals(new ObjectId(ff.travelDetails[i].coachId)));
        var sh = ch.seats.find(sh => sh._id.equals(new ObjectId(ff.travelDetails[i].seatID)));
        sf.push({
            coach:ch,
            seat:sh
        });
    }
    res.render("confirm",{isauth:req.isAuthenticated(),ticket:tick[0],seat:sf});
    }
    else{
        res.redirect("/login");
    }
});

module.exports = router;












// async function book(travelID,coachN,stnum){
//     const tr = await travel1.findOne(travelID);
//     const ch = await tr.coach.find(async (ch)=> await coach.coachName ==coachN);
//     const st = await ch.seats.find(async (st)=> await seat.seatNumber == stnum);
//     const us = await req.user.id;
//     await st.set({isBooked:true});
//     var newTicket = new ticket({
//         userID:us,
//         userIdNo:"XXXX XXXX XXXX",
//         travelId:tr._id,
//         travelDetails:[
//             {
//                 name:"Karan Balaji R S",
//                 age:19,
//                 coachId:ch._id,
//                 seatID:st._id
//             }
//         ]
// });
// await tr.save();
// const a = await newTicket.save();
// console.log(a._id);
// }
// const travelID = {travelId:"20KESF11SR"};
// const coachN = "S1";
// const stnum = 1;
// //book(travelID,coachN,stnum);