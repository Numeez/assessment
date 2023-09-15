const express = require('express')
const apicache = require('apicache')
const proxy = require('express-http-proxy')
const userRouter = require('./router/user/user.router')
const authRouter = require('./router/auth/auth.router')
const cache = apicache.middleware

app = express();
app.use(express.json())
app.use(authRouter)
app.use(userRouter)
app.all("*",(req,res,next)=>{
    return res.status(404).json({
        error: "Oops something went wrong please check your parameters"
    })
})







module.exports = app;
