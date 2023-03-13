const express = require('express');
const cors = require('cors');
const {readdirSync} = require("fs")
require("dotenv").config()
const mongoose = require('mongoose');
const fileUpload = require("express-fileupload")
const { customErrorHandler } = require('./middlewares/ErrorHandler');


const app = express();

// cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use(fileUpload({useTempFiles: true}));
// all the routes file loop and import
readdirSync("./routes").map((f)=> app.use("/api", require("./routes/" + f)))

// Database Connection  "mongodb://0.0.0.0:27017/facebook"
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("DB connected...");
  });




// error handler
app.use(customErrorHandler)
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`listening on port ${PORT}`));
