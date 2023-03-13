const { createError } = require("../middlewares/ErrorHandler");
const React = require("../models/React")
const mongoose = require("mongoose");
const UserModel = require("../models/UserModel");

exports.reactPost = async (req,res,next) => {
    const {postId,react} = req.body
    try{
        const check = await React.findOne({postId:postId,reactBy:mongoose.Types.ObjectId(req.user.id)})
        if(!check) {
            const newReact = new React({
                postId:postId,
                reactBy:req.user.id,
                react : react
            })
            await newReact.save()
            return res.status(200).json({
                message:"React Added Successfully"
            })
        }else{
            if(check.react == react) {
                await React.findByIdAndRemove(check._id)
                return res.status(200).json({
                    message:"React Remove Successfully"
                })
            }else{
                await React.findByIdAndUpdate(check._id,{react:react})
                return res.status(200).json({
                    message:"React Update Successfully"
                })
            }
        }
    }catch(err){
        return next(err)
    }
}


exports.getReactsById = async (req,res,next) => {
    
    try{
        const getReactById = await React.find({postId:req.params.id})
        const newReacts = getReactById.reduce((group,react)=>{
           let key = react["react"]
            group[key] = group[key] || []
            group[key].push(react)
            return group
        },{})

      const reacts = [
        {
            react: "like",
            count: newReacts.like ? newReacts.like.length : 0,
        },
        {
            react: "love",
            count: newReacts.love ? newReacts.love.length : 0,
        },
        {
            react: "haha",
            count: newReacts.haha ? newReacts.haha.length : 0,
        },
        {
            react: "wow",
            count: newReacts.wow ? newReacts.wow.length : 0,
        },
        {
            react: "sad",
            count: newReacts.sad ? newReacts.sad.length : 0,
        },
        {
            react: "angry",
            count: newReacts.angry ? newReacts.angry.length : 0,
        },
      ]

      const user = await UserModel.findById(req.user.id).select("-password")

      const checkPost = user.savedPost.find(x=>x.post == req.params.id)

        const check = await React.findOne({postId:req.params.id, reactBy: req.user.id})

        return res.json({check: check?.react,reacts,total: getReactById.length,checkPost: checkPost ? true : false})
    }catch(err){
        return next(err)
    }
}