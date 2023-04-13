const jwt = require("jsonwebtoken")
const Users = require("../models/userModel");
const { getbooks } = require("../controller/booksController");
require('dotenv').config();


exports.isAuthentictedUser = (async (req,res,next)=>{

    try {
        const {token} = req.cookies;
        if(!token){
            res.status(401).json({
                success:true,
                "message":"Please Login to access this resource"
            })
        }
        else{
            const decodedData = jwt.verify(token,process.env.JWT_Secret)
            req.user = await Users.findById(decodedData.id);
            next();
        }
    } catch (error) {
        res.status(404).json({
            success:false,
            "message":"error in retriving data"
        })
    }
});

exports.isAuthentictedRole = (...roles)=>{
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            res.status(401).json({
                success:true,
                "message":`No Entry with designation ${req.user.role}`
            })
        }
        else{
            next();
        }
      };
    };
