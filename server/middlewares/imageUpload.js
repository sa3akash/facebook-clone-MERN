const {createError} = require("../middlewares/ErrorHandler")
const fs = require("fs")

const ImageUpload = async (req, res, next) => {
    
    try{
        if(!req.files || Object.values(req.files).flat().length === 0){
            return next(createError(400, "No files selected."))
        } 
       const files = Object.values(req.files).flat()
       files.forEach(file =>{
        if(file.mimetype !== "image/jpeg" && file.mimetype !== "image/png" && file.mimetype !== "image/gif" && file.mimetype !== "image/webp"){
            tempRemove(file.tempFilePath)
            return next(createError(400, "Unsupported format."))
        }

        if(file.size > 1024 * 1024 * 5){
            tempRemove(file.tempFilePath)
            return next(createError(400, "File size is too large."))
        }
       })
        next();
        
    }catch(err){
        return next(err);
    }
};


module.exports = ImageUpload;


const tempRemove = (path) => {
    fs.unlink(path, (err)=>{
        if(err){
            throw err;
        }
    })
}