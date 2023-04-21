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
<<<<<<< HEAD
        metatags:{
            type:String
        },
=======
>>>>>>> 89f22d1283cfd8e983f92f3cb3b6e1543c71f61a
        mrp:{
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
        },
        reviews:[{
            userid:{
                type: mongoose.Schema.ObjectId,
                ref: "Users",
                required: true,
                unique:true
            },
            name: {
                type: String,
                required: true,
            },
            rating:{
                type:Number,
                require:true,
                min:0,
                max:5
            },
            description:{
                type:String,
            }            
        }]
})

module.exports = mongoose.model("Books",bookSchema);