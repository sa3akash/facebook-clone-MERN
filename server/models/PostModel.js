const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({

    type: {type: String, enum: ["profilePicture", "cover",null], default: null},
    text: {type: String},
    images: {type: Array},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    background: {type: String},
    comments: [
        {
            comment:{type: String},
            image:{type: String},
            commentBy: {type: mongoose.Types.ObjectId, ref:"User"},
            commentAt: {type: Date, required: true}

        }
    ],

},{timestamps:true})


module.exports = mongoose.model("Post", PostSchema)
