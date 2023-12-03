const express = require("express");
const nodemon = require("nodemon");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const ObjectId = mongoose.Types.ObjectId;
const {tic,ticket} = require("./models/tickets");

require("dotenv").config();

const app = express();

const home = require("./routes/home");
const myticket = require("./routes/mytickets");
const user=require("./models/user");
const book=require("./routes/booking");
const coachselection = require("./routes/coachselection");
const ticketbook = require("./routes/book");
app.use(express.static ("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.set("view engine","ejs");

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  }));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/user");
// mongoose.set("useCreateIndex",true);
user.plugin(passportLocalMongoose);
user.plugin(findOrCreate);
var User = new mongoose.model("user",user);

passport.use(User.createStrategy());
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL:"https://www.googleapis.com/oauth2/v3/userinfo",
  },
     function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));



app.get("/register", (req,res)=>{
    res.render("register");
});

app.post("/register",(req,res)=>{
        // res.send(req.body.password);
    User.register(new User({username:req.body.username,email:req.body.email} ),req.body.password,(err,user)=>{
        if(err){
            console.log(err);
        }
        else{   
                passport.authenticate('local')(req, res, () => {
                res.statusCode = 200;
                res.redirect("/");
        });
}});
});

app.use("/",home);
app.use("/mytickets",myticket);
app.use("/booking",book);
app.use("/book",ticketbook);
app.use("/coach",coachselection);

app.get("/login", (req,res)=>{
    res.render("login");
});

app.post("/login",(req,res)=>{
    const usr = new User({
        username:req.body.username,
        password:req.body.password
    });
    req.login(usr,(err)=>{
        if(err){
            console.log(err);
        }else{
            passport.authenticate('local')(req, res, () => {
                res.statusCode = 200;
                res.redirect("/");
        });
}});
});

// app.get("/confirm",async (req,res)=>{
//     var a = new ObjectId("6550a6c9db61ab296fec3210");
//     s = await ticket.find({_id:a}).populate("travelId");;
//     f = await s[0].populate("travelDetails");
//     await s[0].travelId.populate("trainVal");  
//     var sf =[];
//     for(let i=0;i<f.travelDetails.length;i++){
//         var ch = f.travelId.coach.find(ch => ch._id.equals(new ObjectId(f.travelDetails[i].coachId)));
//         var sh = ch.seats.find(sh => sh._id.equals(new ObjectId(f.travelDetails[i].seatID)));
//         sf.push({
//             coach:ch,
//             seat:sh
//         });
//     }
//     console.log(s[0]);
//     res.render("confirm",{ticket:s[0],seat:sf});
// })

app.get("/auth/google" ,
    passport.authenticate("google",{scope:["profile"]})
);
app.get('/auth/google/secrets', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.get("/logout", (req,res)=>{
    req.logout((err)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/register");
        }
    });
    
});



app.listen(3000, ()=>{
    console.log("I am Listening in port 3000");
});
