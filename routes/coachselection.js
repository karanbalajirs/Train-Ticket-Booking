const express = require('express');
const router = express.Router();
const {travel1,coach,seat} = require("../models/travel");

const {aggregate} = require('mongoose');
const { Int32 } = require('mongodb');
// const {travel} = require("../models/travel")

router.post("/:trave",async (req,res)=>{
    if(req.isAuthenticated()){
    var trave = req.params.trave;
    const tr = await travel1.findOne({travelId:trave});
    const fr= await tr.populate("trainVal");
    var ch = await tr.coach;
    var arr = Array.from({length:ch.length});
    for(var j=0;j<ch.length;j++){
        var st = await ch[j].seats.toObject();
        var count=0;
    for(var i=0;i<st.length;i++){
        if(st[i].isBooked=== false){
            count++;
        }};
        if(count!=0){
    arr[j]={"coachName":ch[j].coachName,"coachId":ch[j].id,
    "no_of_seats":count};}
}
    // console.log(arr);
    const sss= arr.map(obj => parseInt(obj.no_of_seats));
    // console.log(Math.max.apply(Math,sss));
    req.session.valueTopass = trave;
    res.render("coachsel",{isauth:req.isAuthenticated(),coach:arr,train:fr,travelID:trave,travel:tr});}
    else{
        res.redirect('/login');
    }
})


module.exports = router;