require('dotenv').config()
const jwt = require('jsonwebtoken')
const {signUpUser,isSignedIn} = require('../../models/auth/auth.model')
async function signUp(req,res){
    user = req.body;
    try{
    return res.json({
        message:await signUpUser(user)
    })
}catch(err){
    return res.status(404).json(err.message)

}
}

async function signIn(req,res){
    const {username,password} = req.body
    try{
    const result = await isSignedIn(username,password)
    const user = {username:username}
     if(result){
        const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
        return res.json({
            accessToken:accessToken
        })
        
    }
    return res.status(404).json({
        error:"User does not exists",
        message:"Check whether you have entered the correct username and password"
    })
}catch(err){
    return res.status(404).json({
        error:err.message,
        message:"Username is wrong"
    
})
}
}



module.exports = {
    signUp,
    signIn
}