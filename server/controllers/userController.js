const { validateEmail, validateLength, validateUsername } = require("../helpers/validations");
const { createError } = require("../middlewares/ErrorHandler");
const User = require("../models/UserModel")
const Code = require("../models/Code")
const bcrypt = require("bcrypt");
const { ganareteToken, verifyToken } = require("../helpers/tokens");
const { sendVerificationEmail, sendResetCode } = require("../helpers/mailer");
const ganareteCode = require("../helpers/ganareteCode")
const Post = require("../models/PostModel");
const mongoose = require("mongoose")

// Register
exports.register = async (req,res,next) => {

    const {first_name, last_name, email, password,gender,bYear, bMonth, bDay} = req.body;

    if(!validateEmail(email)){
        return next(createError(400, 'Invalid email address.'));
    }
    if(!validateLength(first_name,3,30)){
        return next(createError(400, 'First name must between 3-30 characters.'));
    }
    if(!validateLength(last_name,3,16)){
        return next(createError(400, 'Last name must between 3-16 characters.'));
    }
    if(!validateLength(password,6,30)){
        return next(createError(400, 'Password must be 6 characters and special symbol'));
    }
    // check email
    const checkEmail = await User.findOne({email: email});
    if(checkEmail){
        return next(createError(400, 'Email already exists, please use a different email.'));
    }
    // ganate username
    const genusername = first_name+last_name;
    const username = await validateUsername(genusername)
    // password hashing
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password,salt)

   
    try{
       const newUser = new User({first_name, last_name, username, email, password:hashPassword,gender,bYear, bMonth, bDay})
       const user = await newUser.save();
       //verifycation token
       const emailVerificationToken = ganareteToken({id:user._id}, "30m")
       
       const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`
       sendVerificationEmail(user.email, user.first_name, url)
   
       // access token
       const token = ganareteToken({id:user._id}, "7d")

       return res.status(200).json({
        id: user._id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        picture: user.picture,
        verified: user.verified,
        token: token,
        message: "Registered successfully! please activate your account"
       });
    }catch(err){
        return next(err)
    }
}


// activate account
exports.activateAcount = async (req, res, next) => {

    const {token} = req.body;
    if(!token) return next(createError(400, "Invalid token."));

    const validUser = req.user.id;
  
    try{
        const user = verifyToken(token);
        if(!user) return next(createError(400, "Invalid user."));

        if(validUser !== user.id) return next(createError(400, "Your are a don't valid user."));

        const checkUser = await User.findById(user.id);
        if(!checkUser) return next(createError(400, "Somthing went wrong!"));

        if(checkUser.verified){
            return next(createError(400, "This email is already activated!"));
        }else{
            await User.findByIdAndUpdate(checkUser._id,{verified: true});
            res.status(200).json({message: "Account has been activated successfully."});
        }
    }catch(err){
        return next(err)
    }
}


// Login
exports.login = async (req,res,next) => {

    const {email,password} = req.body;
    try{
        const checkUser = await User.findOne({email: email});
        if(!checkUser){
            return next(createError(400, 'Invalid email or password!'));
        }
        const varifyPassword = bcrypt.compareSync(password, checkUser.password);
        if(!varifyPassword){
            return next(createError(400, 'Invalid email or password!'));
        }

        // access token
       const token = ganareteToken({id:checkUser._id}, "7d")
       return res.status(200).json({
        id: checkUser._id,
        username: checkUser.username,
        first_name: checkUser.first_name,
        last_name: checkUser.last_name,
        email: checkUser.email,
        picture: checkUser.picture,
        verified: checkUser.verified,
        token: token,
        message: "Login successfully!"
       });
    }catch(err){
        return next(err)
    }
}

// resend activation email link
exports.reSendVerification = async (req, res, next) => {

    const validUserId = req.user.id

    try{

        const user = await User.findById(validUserId)
        if(!user) return next(createError(400, "You are not a valid user."))
        if(user.verified === true) return next(createError(400, "This account is already activated."))

        //verifycation token
       const emailVerificationToken = ganareteToken({id:user._id}, "30m")
       
       const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
       sendVerificationEmail(user.email, user.first_name, url)

       res.status(200).json({message: "Email varification link has been send to your email, Please check your email and verify your account!"})

    }catch(err){
        return next(err)
    }

}

// find user by email
exports.findUser = async (req,res,next) => {

    const {email} = req.body;
    if(!email) return next(createError(400, "Invalid email address."));
    try{
        const user = await User.findOne({email: email}).select("-password")
        if(!user) return next(createError(400, "Account not found."));

        res.status(200).json({
            email: user.email,
            picture: user.picture,
            first_name: user.first_name,
            last_name: user.last_name,
            id: user._id,
        });
    }catch(err){
        return next(err)
    }
}


// send code to email for reset facebook account

exports.resendPasswordCode = async (req, res, next) => {
    const {email} = req.body;
    if(!email) return next(createError(400, "Invalid email address."));
    try{
        const user = await User.findOne({email: email}).select("-password");
        if(!user) return next(createError(400, "Account not found."));

        await Code.findOneAndRemove({user: user._id})
        const code = ganareteCode(6)
        await Code.create({ code: code, user: user._id })

        sendResetCode(user.email, user.first_name, code)
        res.status(200).json({message: "Email reset code has been send to your email."})

    }catch(err){
        return next(err)
    }
}


// validate reset code 

exports.validateCode = async (req, res, next) => {
    const {code,email} = req.body;

    if(!code && !email) return next(createError(400, "All field is required."));
    try{
        const user = await User.findOne({email: email});
  
        if(!user) return next(createError(400, "Account not found."));

        const verifyCode = await Code.findOne({user: user._id})

        if(verifyCode.code !== code) return next(createError(400, "Verification code is wrong."));
        
        res.status(200).json({message: "Verification successfull."})
    }catch(err){
        return next(err)
    }
}
// change password

exports.passwordUpdate = async (req, res, next) => {
    const {email,password} = req.body;

    if(!email && !password) return next(createError(400, "All field is required."));
    try{
        const user = await User.findOne({email: email});
        if(!user) return next(createError(400, "Account not found."));
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt)
        await User.findByIdAndUpdate(user._id,{$set: {password: hashPassword}},{new: true})
        
        res.status(200).json({message: "Password updated successfull."})
    }catch(err){
        return next(err)
    }
}


exports.getProfile = async (req, res, next) => {
    
    const username = req.params.username;
    
    try{
        const user = await User.findById(req.user.id)
        const profile = await User.findOne({username: username}).select("-password").populate("friends","picture first_name username last_name");
        if(!profile) return next(createError(404, "Account not found."));


        const friendship = {
            friends: false,
            following: false,
            requestSend: false,
            requestReceived: false,
        }

        if(user.friends.includes(profile._id)){
            friendship.friends = true
        }
        if(user.following.includes(profile._id)){
            friendship.following = true
        }
        if(user.requests.includes(profile._id)){
            friendship.requestReceived = true
        }
        if(profile.requests.includes(user._id)){
            friendship.requestSend = true
        }

        const posts = await Post.find({user: profile._id}).sort({'createdAt': -1 }).populate("user","-password").populate("comments.commentBy", "first_name last_name username picture email").limit(10)

        res.status(200).json({...profile.toObject(),posts,friendship})
    }catch(err){
        return next(err)
    }
}


exports.updateProfilePicture = async (req, res, next) => {
    
    const {url} = req.body;
    if(!url) return next(createError(404, "Url not found."));

    try{
        await User.findByIdAndUpdate(req.user.id, {$set:{picture: url}})
        res.status(200).json(url)
    }catch(err){
        return next(err)
    }
}


exports.updateCoverPicture = async (req, res, next) => {
    
    const {url} = req.body;
    if(!url) return next(createError(404, "Url not found."));

    try{
        await User.findByIdAndUpdate(req.user.id, {$set:{coverPicture: url}})
        res.status(200).json(url)
    }catch(err){
        return next(err)
    }
}

exports.updateDetails = async (req, res, next) => {
    const {userDetails} = req.body;
    try{
      const updatedUser = await User.findByIdAndUpdate(req.user.id, {$set:{details: userDetails}},{new: true})
        res.status(200).json(updatedUser.details)
    }catch(err){
        return next(err)
    }
}

exports.addFriend = async (req, res, next) => {

    if(req.user.id !== req.params.id){

        try{
            const sender = await User.findById(req.user.id)
            const receiver = await User.findById(req.params.id)
            if(!sender.following.includes(receiver._id)) {
                await sender.updateOne({$push: {following: receiver._id}})
            }
            if(!receiver.followers.includes(sender._id)) {
                await receiver.updateOne({$push: {followers: sender._id}})
            }
            if(!sender.requests.includes(sender._id) && !receiver.friends.includes(sender._id))
            {
                await receiver.updateOne({$push: {requests: sender._id}})
               
                res.status(200).json({message: "Friend request sent successfully."})
            }else{
                return next(createError(400, "Already Send."))
            }
          }catch(err){
              return next(err)
          }

    }else{
        return next(createError(400, "Forbidden."))
    }
}

exports.cancelFriend = async (req, res, next) => {

    if(req.user.id !== req.params.id){

        try{
            const sender = await User.findById(req.user.id)
            const receiver = await User.findById(req.params.id)
            if(receiver.requests.includes(sender._id) && !receiver.friends.includes(sender._id)){
                await receiver.updateOne({$pull: {requests: sender._id}})
                await receiver.updateOne({$pull: {followers: sender._id}})
                await sender.updateOne({$pull: {following: receiver._id}})

                res.status(200).json({message: "Friend request cancel successfully."})
            }else{
                return next(createError(400, "Already Canceled."))
            }
          }catch(err){
              return next(err)
          }

    }else{
        return next(createError(400, "Forbidden."))
    }
}


exports.follow = async (req, res, next) => {

    if(req.user.id !== req.params.id){

        try{
            const sender = await User.findById(req.user.id)
            const receiver = await User.findById(req.params.id)
            if(!receiver.followers.includes(sender._id) && !sender.following.includes(receiver._id)){
                await receiver.updateOne({$push: {followers: sender._id}})
                await sender.updateOne({$push: {following: receiver._id}})

                res.status(200).json({message: "Following success."})
            }else{
                return next(createError(400, "Already following."))
            }
          }catch(err){
              return next(err)
          }

    }else{
        return next(createError(400, "Forbidden."))
    }
}


exports.unFollow = async (req, res, next) => {

    if(req.user.id !== req.params.id){

        try{
            const sender = await User.findById(req.user.id)
            const receiver = await User.findById(req.params.id)
            if(receiver.followers.includes(sender._id) && sender.following.includes(receiver._id)){
                await receiver.updateOne({$pull: {followers: sender._id}})
                await sender.updateOne({$pull: {following: receiver._id}})

                res.status(200).json({message: "unfollow success."})
            }else{
                return next(createError(400, "Already Unfollow."))
            }
          }catch(err){
              return next(err)
          }

    }else{
        return next(createError(400, "Forbidden."))
    }
}


exports.acceptRequest = async (req, res, next) => {

    if(req.user.id !== req.params.id){

        try{
            const receiver = await User.findById(req.user.id)
            const sender = await User.findById(req.params.id)
            if(receiver.requests.includes(sender._id)){
                await receiver.update({$push: {friends: sender._id, following: sender._id}})
                await sender.update({$push: {friends: receiver._id, followers: receiver._id}})
                await receiver.updateOne({$pull: {requests: sender._id}})

                res.status(200).json({message: "Friend request accepted."})
            }else{
                return next(createError(400, "Already accecpt yout friend request."))
            }
          }catch(err){
              return next(err)
          }

    }else{
        return next(createError(400, "Forbidden."))
    }
}


exports.unFriend = async (req, res, next) => {

    if(req.user.id !== req.params.id){

        try{
            const sender = await User.findById(req.user.id)
            const receiver = await User.findById(req.params.id)
          
            if(receiver.friends.includes(sender._id || sender.friends.includes(receiver._id))){
                await receiver.update({$pull: {friends: sender._id, following: sender._id, followers: sender._id}})
                await sender.update({$pull: {friends: receiver._id, following: receiver._id, followers: receiver._id}})

                res.status(200).json({message: "unFriend accepted."})
            }else{
                return next(createError(400, "Already unFriend."))
            }
          }catch(err){
              return next(err)
          }

    }else{
        return next(createError(400, "Forbidden."))
    }
}


exports.deleteRequest = async (req, res, next) => {

    if(req.user.id !== req.params.id){

        try{
            const receiver = await User.findById(req.user.id)
            const sender = await User.findById(req.params.id)
            if(receiver.requests.includes(sender._id)){
                await receiver.update({$pull: {requests: sender._id, followers: sender._id}})
                await sender.update({$pull: {following: receiver._id}})

                res.status(200).json({message: "delete request."})
            }else{
                return next(createError(400, "Already deleted."))
            }
          }catch(err){
              return next(err)
          }

    }else{
        return next(createError(400, "Forbidden."))
    }
}


exports.searchFriends = async (req, res, next) => {

    const searchTerms = req.params.searchTerms;
    try{
        const result = await User.find({$text:{$search: searchTerms}}).select("first_name last_name username picture email")
           
        return res.status(200).json(result)
    }catch(err){
        return next(err)
    }
}

exports.addToSearchHistry = async (req, res, next) => {

    const {searchUserId,createdAt} = req.body;
    try{
        const mainUser = await User.findById(req.user.id).select("-password")
        const check = mainUser.search.find(x=>x.user.toString() === searchUserId)

        const search = {
            user: searchUserId,
            createdAt:createdAt
        }
        if(check) {
         await User.updateOne({_id: req.user.id,"search._id":check._id},{$set:{"search.$.createdAt":createdAt}},{new:true})

            return res.json({message:"Ok if"})
        }else{
            await User.findByIdAndUpdate(req.user.id,{$push: {search:search}})
            return res.json({message:"Ok else"})
        }
    }catch(err){
        return next(err)
    }
}

exports.getSearchHistry = async (req, res, next) => {
    try{
        const results = await User.findById(req.user.id).select("search").populate("search.user","first_name last_name username picture email")

        return res.status(200).json(results.search)
    }catch(err){
        return next(err)
    }
}

exports.removeSearchHistry = async (req, res, next) => {
    const {removeId} = req.body;
    try{
        await User.updateOne({_id:req.user.id},{$pull:{search:{user:removeId}}})
        return res.status(200).json({message:"search remove successfull"})
    }catch(err){
        return next(err)
    }
}

exports.getFriendsPageInfo = async (req, res, next) => {
 
    try{
        const user = await User.findById(req.user.id).select("friends requests").populate("friends","first_name last_name username picture email").populate("requests","first_name last_name username picture email")

        const sendRequests = await User.find({requests: mongoose.Types.ObjectId(req.user.id)}).select("first_name last_name username picture email")

        return res.status(200).json({friends:user.friends,requests:user.requests,sendRequests:sendRequests})
    }catch(err){
        return next(err)
    }
}