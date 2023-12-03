const mongoose = require("mongoose");
const storedTrains = require("./train");
const seatSchema = require("./seat");

// mongoose.connect("mongodb://localhost:27017/user");

const coachSchema = new mongoose.Schema({
    coachType:{type:String,required:true},
    coachName:{type:String,required:true},
    seats:[seatSchema]
})

const seat = new mongoose.model("seat",seatSchema);
const coach = new mongoose.model("coach",coachSchema);


const travel = new mongoose.Schema({
    travelDate:{
        type:Date,
    },
    travelId:{
        type:String,
        unique:true
    },
    trainVal:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'storedTrains',
        required:true
    },
    coach:[coachSchema],
})

const travel1 = new mongoose.model("travel",travel);
async function some(trainnum){
    
    var vals =1;
    var vala =1;
    function s(){
    const coaS = new coach({
        coachType:"S",
        coachName:`S${[vals]}`,
        seats:[{
            seatNumber:1
        },
        {
            seatNumber:2
        },{
            seatNumber:3
        },{
            seatNumber:4
        },{
            seatNumber:5
        },{
            seatNumber:6
        },{
            seatNumber:7
        },{
            seatNumber:8
        },{
            seatNumber:9
        },{
            seatNumber:10
        },{
            seatNumber:11
        },{
            seatNumber:12
        },{
            seatNumber:13
        },{
            seatNumber:14
        },{
            seatNumber:15
        },{
            seatNumber:16
        },{
            seatNumber:17
        },{
            seatNumber:18
        },{
            seatNumber:19
        },{
            seatNumber:20
        },{
            seatNumber:21
        },{
            seatNumber:22
        },{
            seatNumber:23
        },{
            seatNumber:24
        },{
            seatNumber:25
        },{
            seatNumber:26
        },{
            seatNumber:27
        },{
            seatNumber:28
        },{
            seatNumber:29
        },{
            seatNumber:30
        },{
            seatNumber:31
        },{
            seatNumber:32
        },{
            seatNumber:33
        },{
            seatNumber:34
        },{
            seatNumber:35
        },{
            seatNumber:36
        },{
            seatNumber:37
        },{
            seatNumber:38
        },{
            seatNumber:39
        },{
            seatNumber:40
        },{
            seatNumber:41
        },{
            seatNumber:42
        },{
            seatNumber:43
        },{
            seatNumber:44
        },{
            seatNumber:45
        },{
            seatNumber:46
        },{
            seatNumber:47
        },{
            seatNumber:48
        },{
            seatNumber:49
        },{
            seatNumber:50
        },{
            seatNumber:51
        },{
            seatNumber:52
        },{
            seatNumber:53
        },{
            seatNumber:54
        },{
            seatNumber:55
        },{
            seatNumber:56
        },{
            seatNumber:57
        },{
            seatNumber:58
        },{
            seatNumber:59
        },{
            seatNumber:60
        },{
            seatNumber:61
        },{
            seatNumber:62
        },{
            seatNumber:63
        },{
            seatNumber:64
        },{
            seatNumber:65
        },{
            seatNumber:66
        },{
            seatNumber:67
        },{
            seatNumber:68
        },{
            seatNumber:69
        },{
            seatNumber:70
        },{
            seatNumber:71
        },{
            seatNumber:72
        },
        ]
    });
    vals+=1;
    return coaS;
}
function a(){
    const coaS = new coach({
        coachType:"A",
        coachName:`A${[vala]}`,
        seats:[{
            seatNumber:1
        },
        {
            seatNumber:2
        },{
            seatNumber:3
        },{
            seatNumber:4
        },{
            seatNumber:5
        },{
            seatNumber:6
        },{
            seatNumber:7
        },{
            seatNumber:8
        },{
            seatNumber:9
        },{
            seatNumber:10
        },{
            seatNumber:11
        },{
            seatNumber:12
        },{
            seatNumber:13
        },{
            seatNumber:14
        },{
            seatNumber:15
        },{
            seatNumber:16
        },{
            seatNumber:17
        },{
            seatNumber:18
        },{
            seatNumber:19
        },{
            seatNumber:20
        },{
            seatNumber:21
        },{
            seatNumber:22
        },{
            seatNumber:23
        },{
            seatNumber:24
        },{
            seatNumber:25
        },{
            seatNumber:26
        },{
            seatNumber:27
        },{
            seatNumber:28
        },{
            seatNumber:29
        },{
            seatNumber:30
        },{
            seatNumber:31
        },{
            seatNumber:32
        },{
            seatNumber:33
        },{
            seatNumber:34
        },{
            seatNumber:35
        },{
            seatNumber:36
        },{
            seatNumber:37
        },{
            seatNumber:38
        },{
            seatNumber:39
        },{
            seatNumber:40
        },{
            seatNumber:41
        },{
            seatNumber:42
        },{
            seatNumber:43
        },{
            seatNumber:44
        },{
            seatNumber:45
        },{
            seatNumber:46
        },{
            seatNumber:47
        },{
            seatNumber:48
        }
        ]
    });
    vala+=1;
    return coaS;
}
    const train = await storedTrains.findOne(trainnum);
    const trav = new travel1({
        travelDate: new Date('2023-11-21T16:45:00'),
        travelId:"21HYBSFCC11SR",
        trainVal: train._id,
        coach:[s(),s(),a()],
});

trav.save();
console.log(train._id);}

// some({trainNumber:12603});
module.exports = {travel1 , seat , coach , coachSchema};
