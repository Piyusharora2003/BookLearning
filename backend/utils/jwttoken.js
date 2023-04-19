const sendToken = async (user,statusCode,res)=>{
    const token = await user.getJWTToken();
    // options for cookie
    const options = {
        expires: new Date(
             Date.now() + 1 * 24 * 60 * 60 * 1000  //1 for no of days you want to store cookie
        ),
        httpOnly:true
    };
    // let temp = {...user};
    // delete temp.password;
    res.status(statusCode).cookie('token',token,options).json({
        user,token
    })
}

module.exports = sendToken 