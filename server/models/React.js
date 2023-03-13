const mongoose = require('mongoose')


const ReactSchema = new mongoose.Schema({
    react: {type: String,enum: ['like','love','haha','sad','angry','wow'], required: true},
    postId: {type: mongoose.Schema.Types.ObjectId, ref: "Post",required: true},
    reactBy: {type: mongoose.Schema.Types.ObjectId, ref: "User",required: true},
},{timestamps:true})



module.exports = mongoose.model("React", ReactSchema)
