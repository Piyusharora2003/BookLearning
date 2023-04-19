const Books = require("../models/booksModel");

exports.addbook = (async (req,res)=>{
    try {
        //  const {title,authorName,description,price,image,filelink} = req.body
        //  console.log(req.body);
        const book = await Books.create(req.body);
        res.status(201).json({
            success: true,
            book,
          });
    } catch (error) {
        console.log("error is :",error.message);
        res.status(401).json({
            "message":"error in adding book",error
        })
    }
})

exports.getbooks = (async (req,res)=>{
    try{
        const books = await Books.find();
        
        res.status(200).json({
            success:true,
            books
        })
    }catch(error){
        res.status(404).json({
            success:false,
            "message":"error in getting books"
        })
    }
})

exports.updateBook = (async(req,res)=>{
    try {
        const book = await Books.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
        });
        res.status(200).json({
            success:true,
            book
        })
        
    } catch (error) {
        res.status(404).json({
            success:false,
            "message":"error in updating book"
        })
    }
})

exports.getBookByID = (async (req,res)=>{
    try {
        const book =await Books.findById(req.params.id);
        res.status(200).json({
            success:true,
            book
        })

    } catch (error) {
        res.status(404).json({
            success:false,
            "message":"error in finding  book"
        })
    }
})

exports.deleteBook = (async (req,res)=>{
    try {
        const book = await Books.findById(req.params.id);
        if(!book){
            res.status(201).json({
                success:false,
                "message":"No book found with provided id"
            })
        }
        else{
        await Books.findByIdAndRemove(req.params.id);
        res.status(200).json({
            success:true,
            "message":"Book Deleted with details : ",
            book
        })
    }
    } catch (error) {
        res.status(404).json({
            success:false,
            "message":"error in finding  book"
        })
    }

})

exports.removeReview = (async (req,res)=>{
    const productId = req.params.productid;
    try {
        const book = await Books.findById(productId);
        const reviewList = book.reviews;
        const newReviewlist = reviewList.filter(e => e._id != req.params.reviewid );
        book.reviews = newReviewlist;

        await book.save()
        res.status(200).json({
            success:true,
            book
        })
        
    } catch (error) {
        res.status(404).json({
            success:false,
            "message":"Error in removing review right now ",
                error
        }) 
    }
})


