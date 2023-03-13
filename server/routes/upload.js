const express = require("express");
const { uploadImages, listImages } = require("../controllers/upload");
const ImageUpload = require("../middlewares/imageUpload");
const { authUser } = require("../middlewares/Auth");

const router = express.Router()


router.post("/uploadImages",authUser,ImageUpload, uploadImages)
router.post("/listImages",authUser, listImages)



module.exports = router;