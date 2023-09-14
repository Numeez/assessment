const users = require('./user.mongo')
const DEFAULT_USER_ID = 100;

async function getLatestUserId(){
    const latestUserId = await users.findOne()
    .sort('-userId');

    if(!latestUserId){
        return DEFAULT_USER_ID
    }
    return latestUserId.userId
}


async function saveUser(user){
    
    user['userId'] = await getLatestUserId()+1;
    await users.updateOne({
        userId : user.userId
    },user,{
        upsert:true
    }) 
}
async function getUsers(skip,limit){
   return  await users.find({},{
    '_id':0,
    '__v':0
   })
   .sort({userId:1})
   .skip(skip)
   .limit(limit)
}
async function getUser(userId){
    return await users.findOne({
        userId:userId
    },{
        '_id':0,
        "__v":0
    })

}

async function removeUser(userId){
    const user = await users.findOne({ userId: userId });
    if(!user){
        throw new Error("The user id does not exits")
    }
    return await users.deleteOne({userId:userId})
}

async function updateUser(data,id){
    const name = data.name;
    const email=data.email;
    const mobileNumber = data.mobileNumber;

    const filter = {userId:id}
    const updateObject = {}
    if (name !== null) {
        updateObject.$set = { name };
      }
      if (email !== null) {
        updateObject.$set = { ...updateObject.$set, email };
      }
      if (mobileNumber !== null) {
        updateObject.$set = { ...updateObject.$set, mobileNumber };
      }

      try{
        const result = await users.updateOne(filter,updateObject)
        if(result){
            return true
        }else{
            return false
        }
      }catch(err){
        throw new Error(err)

      }
    

   
    
}


module.exports = {
    saveUser,
    getUsers,
    removeUser,
    getUser,
    updateUser,
}
