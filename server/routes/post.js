const express = require("express");
const { createPost,getAllPosts,createComment,savedPost,deletePost } = require("../controllers/postController");
const { authUser } = require("../middlewares/Auth");

const router = express.Router()


router.post("/createPost", authUser, createPost)
router.get("/getAllPosts", authUser, getAllPosts)
router.put("/comment", authUser, createComment)
router.put("/savedPost/:id", authUser, savedPost)
router.delete("/deletePost/:id", authUser, deletePost)



module.exports = router;