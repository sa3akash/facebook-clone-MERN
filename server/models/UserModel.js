const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    first_name:{type: String, required:[true,"first name is required"],trim:true,text:true,lowercase:true},
    last_name:{type: String, required:[true,"last name is required"],trim:true,text:true,lowercase:true},
    username:{type: String, required:[true,"username is required"],trim:true,text:true,unique:true,lowercase:true},
    email:{type: String, required:[true,"email is required"],trim:true,unique:true},
    password:{type: String, required:[true,"password is required"]},
    picture:{type: String, default:"https://res.cloudinary.com/dd8rotjjg/image/upload/v1671813965/samples/default_pic_we1kbk.png"},
    coverPicture:{type: String, default:""},
    gender:{type: String, required:[true,"gender is required"],trim:true},
    bYear:{type: Number, required:true,trim:true},
    bMonth:{type: Number, required:true,trim:true},
    bDay:{type: Number, required:true,trim:true},
    verified:{type: Boolean, default:false},
    friends:[{type: mongoose.Schema.Types.ObjectId,ref: "User"}],
    following:[{type: mongoose.Schema.Types.ObjectId,ref: "User"}],
    followers:[{type: mongoose.Schema.Types.ObjectId,ref: "User"}],
    requests:[{type: mongoose.Schema.Types.ObjectId,ref: "User"}],
    search:[
        {
            user:{
                type: mongoose.Types.ObjectId,
                ref: "User",
                required:true
            },
            createdAt:{
                type: Date,
                required: true,
            }
        }
    ],
    details:{
        bio:{
            type:String
        },
        otherName:{
            type:String
        },
        workPlace:{
            type:String
        },
        job:{
            type:String
        },
        highSchool:{
            type:String
        },
        college:{
            type:String
        },
        currentCity:{
            type:String
        },
        homeTown:{
            type:String
        },
        relationShip:{
            type:String,
            enum:["Single","In a relationship","Married","Divorced"]
        },
        instagram:{
            type:String
        },
    },
    savedPost:[
        {
            post:{
                type: mongoose.Types.ObjectId,
                ref: "Post",
            },
            savedAt: {type: Date, required:true}
        }
    ]
},{timestamps:true})


module.exports = mongoose.model("User", UserSchema, "users")