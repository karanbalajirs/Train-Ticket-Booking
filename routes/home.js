const express = require("express");
const router = express.Router();
const nodemon = require("nodemon");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const {travel1} = require("../models/travel.js");

router.get("/",async (req,res)=>{
        const tra = await travel1.find({"travelId":{$ne:null}}).populate('trainVal');
        res.render("home",{isauth:req.isAuthenticated(),travel:tra});
});

module.exports = router;