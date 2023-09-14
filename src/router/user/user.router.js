const express = require('express')
const {getAllUsers,addUser,deleteUser, getSingleUser, updateUserInfo} = require('./user.controller')
const userRouter = express.Router();
const {authenticateToken} = require('../../utils/customMiddleware');
const { middleware } = require('apicache');
const apicache = require('apicache')
const cache = apicache.middleware



userRouter.get('/getUsers',authenticateToken,cache('5 minutes'),getAllUsers)
userRouter.post('/addUser',addUser)
userRouter.delete('/deleteUser/:id',deleteUser)
userRouter.get('/getUser/:id',getSingleUser)
userRouter.put('/updateUser/:id',updateUserInfo)


module.exports = userRouter;  