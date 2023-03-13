const cloudinary = require("cloudinary")
const fs = require("fs")


cloudinary.config({
    cloud_name: process.env.CLOUD_NEME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY
})

const folder = process.env.CLOUD_FOLDER_NAME;

exports.uploadImages = async (req, res, next) => {
    try{
        let {path} = req.body
        let cloudFolder = folder + "/" + path;

        let files = Object.values(req.files).flat()
        let images = [];
        for (let file of files) {
            let url = await uploadToCloudinary(file, cloudFolder)
            images.push(url)
            tempRemove(file.tempFilePath)
        }
        res.status(201).json(images);
    }catch(err){
        return next(err);
    }
};
//    let cloudFolder = folder + "/" + path;

exports.listImages = (req, res) => {
    const { path, sort, max } = req.body;
  
    let cloudFolder = folder + "/" + path;
    cloudinary.v2.search
      .expression(cloudFolder)
      .sort_by("created_at", `${sort}`)
      .max_results(max)
      .execute()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        return next(err)
      });
  };

// cludinary
const uploadToCloudinary = async (file, path) =>{
   return new Promise((resolve, reject) =>{
        cloudinary.v2.uploader.upload(file.tempFilePath,{folder: path},(err, res) =>{
            if(err){
                tempRemove(file.tempFilePath)
                return {message: "Fail",};
            }
            resolve({url: res.secure_url})
        })
   })
}


const tempRemove = (path) => {
    fs.unlink(path, (err)=>{
        if(err){
            throw err;
        }
    })
}
