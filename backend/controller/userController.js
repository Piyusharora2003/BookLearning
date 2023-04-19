const userModel = require("../models/userModel");
const Users = require("../models/userModel");
const sendToken = require("../utils/jwttoken");
const Books = require("../models/booksModel");

exports.createUser =(async (req,res)=>{
    try {
        const User = await Users.create(req.body);
        sendToken(User,201,res)
    } catch (error) {
        res.status(404).json({
            success:false,
            "message":"Error in creating new user",error
        })
    }
})

exports.getallusers = (async (req,res)=>{
    try {
        const userss = await Users.find()
        res.status(200).json({
            success:true,
            userss
        })        
    } catch (error) {
        res.status(404).json({
            success:false,
            "message":"Error in finding users",
                error
        })
    }
})


exports.getuserdetails = (async (req,res)=>{
    try {
        const user =await Users.findById(req.params.id);
        res.status(200).json({
            success:true,
            user
        })

    } catch (error) {
        res.status(404).json({
            success:false,
            "message":"error in finding User Details right now"
        })
    }
})

exports.getmydetailid = (async (req,res)=>{
    try {
        const user =await Users.findById(req.body.id);
        res.status(200).json({
            success:true,
            user
        })

    } catch (error) {
        res.status(404).json({
            success:false,
            "message":"error in finding User Details right now"
        })
    }
})

exports.deleteuser = (async (req,res)=>{
    try {
        const user =await Users.findById(req.params.id); 
        if(!user){
            res.status(404).json({
                success:false,
                "message":`No User Found with ID ${req.params.id}`
            })
        }
        await  Users.findByIdAndRemove(req.params.id);   
        res.status(202).json({
            success:true,
            "message":"The user has been deleted Successfully ",
            user
        }) 
    } catch (error) {
        res.status(404).json({
            success:false,
            "message":"error in Deleting user details"
        })
    }
})

exports.updateprofile = (async(req,res)=>{
    try {
        const profile = await Users.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
        });        
        res.status(200).json({
            success:true,
            profile
        })
        
    } catch (error) {
        res.status(404).json({
            success:false,
            "message":"error in updating book"
        })
    }
})

exports.addtocart = (async (req,res)=>{
    try {
        const profile = await Users.findById(req.params.id);
        let newitemlist = [...profile.itemsincart,req.body];
        await Users.findByIdAndUpdate(req.params.id,newitemlist);


        res.status(200).json({
            success:true,
            profile
        })
    }catch(error){
        res.status(404).json({
            success:false,
            "message":"error in updating book"
        })
    }
})

exports.loginid  = (async (req,res,next)=>{
    try {
    const {email, password} = req.body;
    if(! (email && password)){
        res.status(400).json({
            "message":"Incomplete Data"
        })
        return next();
    }
    const user = await Users.findOne({email:email}).select("+password");
    if(!user){
        res.status(401).json({
            "message":"Invalid Email and Password"
        })
        return next();
    }
    const ispasswordcorrect = (user.password === password);
    if(!ispasswordcorrect){
        res.status(401).json({
            "message":"Imvalid Email and Password"
        })
        return next();
    }
        sendToken(user,200,res)
    } catch (error) {
        res.status(404).json({
            success:false,
            "message":"Error in Logging you In",
                error
        })
    }
})

exports.logOut = (async (req,res)=>{
    try {
         res.cookie('token',null,{
            expires: new Date(Date.now()),
            httpOnly:true
        })

        res.status(200).json({
            success:true,
            "message":"Logged Out Successfully"
        })
    } catch (error) {
        res.status(404).json({
            success:false,
            "message":"Error in Loging Out",
                error
        })  
    }
})


exports.removeFromCart = (async (req,res)=>{
    const itemId = req.params.productId;
    try {
        const user = await Users.findById(req.params.userId);
        // console.log(user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // console.log([...user.itemsincart]);
        const newitemlist = user.itemsincart.filter(item=> (item.productId) != (itemId))  //stops here
        user.itemsincart = newitemlist;
        // console.log(user.itemsincart);
        await user.save()
        res.status(200).json({
            success:true,
            user
        })
        
    } catch (error) {
        res.status(404).json({
            success:false,
            "message":"Error in removing item right now ",
                error
        }) 
    }
})

exports.addReview = (async(req,res)=>{
    try {
        let userid = req.params.userId;
        const user = await Users.findById(req.params.userId);
        const item = await Books.findById(req.params.productId);
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        if(!item){
            return res.status(404).json({ message: 'Book not found' });
        }
        let newReview = {
            description:req.body.description,
            name:user.name,
            rating:req.body.rating,
            userid:userid
           }
        let newReviewList = [...item.reviews,newReview];
        item.reviews = newReviewList;
        let resp = await item.save();
        res.status(200).json({
            success:true,
            user
        })
                

    } catch (error) {
        res.status(404).json({
            success:false,
            "message":"Error in removing item right now ",
                error
        })   
    }
})