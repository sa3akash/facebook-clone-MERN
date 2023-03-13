const express = require("express");
const { reactPost,getReactsById } = require("../controllers/react");
const { authUser } = require("../middlewares/Auth");

const router = express.Router()


router.put("/reactPost", authUser, reactPost)
router.get("/getReactsById/:id", authUser, getReactsById)



module.exports = router;