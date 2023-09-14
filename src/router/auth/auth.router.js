const express = require('express')
const {signUp,signIn} = require('./auth.controller')
const authRouter = express.Router()


authRouter.post('/signUp',signUp)

authRouter.post('/signIn',signIn)

module.exports = authRouter