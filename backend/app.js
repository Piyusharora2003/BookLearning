const express = require("express");
const app = express();
const cors = require("cors")
const bodyParser = require("body-parser");
const book = require("./routes/booksRoutes.js");
const user = require("./routes/userRoutes.js"); 
const cookieParser = require("cookie-parser");
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());


app.get("/",(req,res)=>{
    res.send("server is running ")
})


app.use("/api/v1", book);
app.use("/api/v1", user);



module.exports = app;
