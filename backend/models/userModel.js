const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
        name:{
            type:String,
            require:[true,"User name is required"],
            trim:true,
        },
        mobileno:{
                type: String,
                trim: true,
                validate: {
                  validator: function (v) {
                    return /^[0-9]{10}/.test(v);
                  },
                  message: '{VALUE} is not a valid 10 digit number!'
                }
            
        },
        email:{
                type: String,
                required: [true, "Please Enter Your Email"],
                unique: true,
                validate: [validator.isEmail, "Please Enter a valid Email"],
              },
        role:{
          type:"string",
          default:"User"
        }
              ,
        itemsincart:[{
            name: {
              type: String,
              required: true,
            },
            mrp:{
              type:Number,
              required:true
            },
            price: {
              type: Number,
              required: true,
            },
            quantity: {
              type: Number,
              required: true,
            },
            image: {
              type: String,
              required: true,
            },
            productId: {
              type: mongoose.Schema.ObjectId,
              ref: "Books",
              required: true,
            },
          },
        ],
        orders:[{
            name: {
              type: String,
              required: true,
            },
            price: {
              type: Number,
              required: true,
            },
            mrp: {
              type: Number,
              required: true,
            },
            quantity: {
              type: Number,
              required: true,
            },
            image: {
              type: String,
              required: true,
            },
            productId: {
              type: mongoose.Schema.ObjectId,
              ref: "Books",
              required: true,
            },
          },
        ],
        password:{
          type:String,
          required:true,
          select : false
        },
        date:{
          type: Date,
          default: Date.now
        }
});

UserSchema.methods.getJWTToken =async function (){
  return  jwt.sign({id:this._id},process.env.JWT_Secret,{
    expiresIn:process.env.JWT_Expire
  })
}


module.exports = mongoose.model("Users",UserSchema);