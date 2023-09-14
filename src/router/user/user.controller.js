const EventEmitter = require('events')
const {isEmailValid,isMobileNumberValid} = require('../../utils/validation')
const {getPagination} = require('../../utils/query')
const {saveUser,getUsers,removeUser,getUser,updateUser} = require('../../models/user/user.model')


const eventEmitter = new EventEmitter()

async function getAllUsers(req,res){
    const {skip,limit} = getPagination(req.query);
    eventEmitter.emit('server-info',"User is fetching all resources info")
    return res.status(200).json(await getUsers(skip,limit))

}

async function addUser(req,res){
    const {name,email,mobileNumber} = req.body
    
    if(name==null||email==null||mobileNumber==null){
        return res.status(404).json({
            "error":"required fields are missing"
        })
    }else{
    if(!isEmailValid(email)){
        return res.status(404).json({
            "error":"Enter valid email"
        })
    }
    if(!isMobileNumberValid(mobileNumber)){
        return res.status(404).json({
            "error":"Enter valid mobile number"
        })

    }
    if(saveUser(req.body)){
        eventEmitter.emit('server-info',"User added an resource")
        return res.status(200).json({
            "message":"user added"
        })
    }else{
        return res.status(404).json({
            "error":"Something went wrong"
        })
    }


}


}

async function deleteUser(req,res){

   try{
    await removeUser(Number(req.params.id))
    eventEmitter.emit('server-info',"User deleted a resource")
    return res.status(200).json({
        "message":"User deleted successfully"
    })
   }catch(err){
    return res.status(404).json({
        "error":err.message
    })
   }


}
async function getSingleUser(req,res){
    const id = Number(req.params.id)
    try{
       user = await getUser(id)
       if(user!=null){
        eventEmitter.emit('server-info',"User fetched a single resource info")
        return res.status(200).json(user)
    }
    return res.status(404).json({
        "message":"Something went wrong,you might want to check the id by which you are searching"
    })
    }catch(err){
        return res.status(404).json({
            "error":err
        })

    }

}
async function updateUserInfo(req,res){
    const {name,email,mobileNumber} = req.body
    const id = Number(req.params.id)
    console.log(req.body);
    try{

    if(Object.keys(req.body).length==0){
        return res.status(400).json({
            message:"No information was passed to update in the body"
        })
    }

    if(name==""){
        return res.status(400).json({
            message:"name should not be empty"
        })
    }
    

    if(email && !isEmailValid(email)){
        return res.status(404).json({
            "error":"Enter valid email"
        })
    }
    if(mobileNumber && !isMobileNumberValid(mobileNumber)){
        return res.status(404).json({
            "error":"Enter valid mobile number"
        })
    }
    
    if(await updateUser(req.body,id)){
        eventEmitter.emit('server-info',"User updated the resource")
        return res.status(200).json({
            message:"User information update successfully"
        })
    }else{
        return res.status(404).json({
            error:"Something went wrong"
        })
    }


    }catch(err){
        return res.status(404).json({
            error : err.message
        })

    }
}


module.exports={
    eventEmitter,
    getAllUsers,
    addUser,
    deleteUser,
    getSingleUser,
    updateUserInfo
}