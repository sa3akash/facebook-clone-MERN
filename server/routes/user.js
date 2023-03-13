const express = require("express");
const { register, login, activateAcount,reSendVerification, findUser, resendPasswordCode, validateCode, passwordUpdate, getProfile,updateProfilePicture,updateCoverPicture, updateDetails,addFriend,cancelFriend,follow,unFollow,acceptRequest,unFriend,deleteRequest, searchFriends, addToSearchHistry, getSearchHistry,removeSearchHistry,getFriendsPageInfo} = require("../controllers/userController");
const { authUser } = require("../middlewares/Auth");

const router = express.Router()


router.post("/register",register)
router.post("/login",login)
router.post("/activate", authUser, activateAcount)
router.post("/resendVerification", authUser, reSendVerification)
router.post("/findUser", findUser)
router.post("/passwordResetCode", resendPasswordCode)
router.post("/validateCode", validateCode)
router.post("/updatePassword", passwordUpdate)
router.get("/getProfile/:username",authUser, getProfile)
router.put("/updateProfilePicture",authUser, updateProfilePicture)
router.put("/updateCoverPicture",authUser, updateCoverPicture)
router.put("/updateDetails",authUser, updateDetails)
router.put("/addFriend/:id",authUser, addFriend)
router.put("/cancelFriend/:id",authUser, cancelFriend)
router.put("/follow/:id",authUser, follow)
router.put("/unFollow/:id",authUser, unFollow)
router.put("/acceptRequest/:id",authUser, acceptRequest)
router.put("/unFriend/:id",authUser, unFriend)
router.put("/deleteRequest/:id",authUser, deleteRequest)
router.get("/search/:searchTerms",authUser, searchFriends)
router.put("/addToSearchHistry",authUser, addToSearchHistry)
router.get("/getSearchHistry",authUser, getSearchHistry)
router.put("/removeSearchHistry",authUser, removeSearchHistry)
router.get("/getFriendsPageInfo",authUser, getFriendsPageInfo)


module.exports = router;