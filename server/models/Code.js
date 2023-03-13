const mongoose = require('mongoose')


const CodeSchema = new mongoose.Schema({
    code: {type: String, required: true},
    user: {type: mongoose.Types.ObjectId, ref:"User",required: true}
},{timestamps:true})



module.exports = mongoose.model("Code", CodeSchema)
