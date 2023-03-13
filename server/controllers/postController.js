const PostModel = require("../models/PostModel");
const User = require("../models/UserModel");
const React = require("../models/React");

// create  a post
exports.createPost = async (req, res, next) => {
    try{
        const newPost = await new PostModel(req.body).save();
        await newPost.populate("user","first_name last_name username picture email gender coverPicture")
        res.status(201).json(newPost);
    }catch(err){
        return next(err);
    }
};

// get all posts
exports.getAllPosts = async (req, res, next) => {
    try{
        const followingTemp = await User.findById(req.user.id).select("following")
        const following = followingTemp.following
        
        const promises = following.map(userId=>{
            return PostModel.find({user:userId}).populate("user","first_name last_name username picture email gender coverPicture").populate("comments.commentBy", "first_name last_name username picture email").limit(10)
        })

        const followingPost = (await Promise.all(promises)).flat()
        const myPosts = await PostModel.find({user:req.user.id}).populate("user","first_name last_name username picture email gender coverPicture").populate("comments.commentBy", "first_name last_name username picture email").limit(10)

        // spred arryy to add my post
        followingPost.push(...[...myPosts])
        followingPost.sort((a,b)=>b.createdAt - a.createdAt)

        res.status(200).json(followingPost);
    }catch(err){
        return next(err);
    }
};

// add comment
exports.createComment = async (req, res, next) => {
    const {message, image,postId} = req.body;
    try{
        const response = await PostModel.findByIdAndUpdate(postId,{$push:{comments:{
            comment:message,image:image,commentBy:req.user.id
        }}},{new:true}).populate("comments.commentBy","first_name last_name username picture email")

        return res.json(response.comments.reverse())
    }catch(err){
        return next(err);
    }
};

// saved post
exports.savedPost = async (req, res, next) => {
   const postId = req.params.id;
   const {savedAt} = req.body;
    try{
        const mainUser = await User.findById(req.user.id)

        const checkPost = mainUser.savedPost.find(post=>post.post == postId)

        if(checkPost){
            await User.findByIdAndUpdate(mainUser._id,{$pull:{
                savedPost: {
                    _id: checkPost._id,
                }
            }})
            return res.status(200).json({status: "ok", message:"Post unsaved successfull"})
        }else{
            await User.findByIdAndUpdate(mainUser._id,{$push:{
                savedPost: {
                    post: postId,
                    savedAt: savedAt
                }
            }})
            return res.status(201).json({message:"Post saved successfull"})
        }
    }catch(err){
        return next(err);
    }
};

// delete a post
exports.deletePost = async (req, res, next) => {
   
    try{
        await PostModel.findByIdAndDelete(req.params.id)
        await React.deleteMany({postId: req.params.id})
        return res.status(200).json({message:"Post deleted successfull."})
    }catch(err){
        return next(err);
    }
};