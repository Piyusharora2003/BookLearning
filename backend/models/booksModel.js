const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
        title:{
            type:String,
            required:[true,"Please Enter the Book Title"],
            trim:true,
            unique:true
        },
        author:{
            type:String,
            required:[true,"Please Enter The Authors Name"]
        },
        description:{
            type:String,
            minlength:[50,"A min of 50 length is required"],
            required:[true,"Description required "]
        },
        price:{
            type:Number,
            default:0
        },
        image: {
            type: String,
            required: true,
        },
        bookpdf:{
            type:String,
            required:true
        }
})

module.exports = mongoose.model("Books",bookSchema);