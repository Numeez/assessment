const auth = require('./auth.mongo')

async function signUpUser(user){
    const {username,password} = user;
    const isUsernameExists = await auth.findOne({
        username:username
    })
    if(isUsernameExists){
        throw new Error("Username exists choose other username")
    }
    try{
        const userCredential = await auth.create({
            username:username,
            password:password
        });

        if(userCredential){
            return "signed up successfully";
        }
        
    }catch(err){
        throw new Error(err)

    }
}

async function isSignedIn(username,password){
    try{
    const user = await auth.findOne({
        username:username,
        
    })

    if(user.username==username && user.password==password){
        return true
    }else{
        return false
    }
}catch(err){
    throw new Error(err)
}
    

}

module.exports={
    signUpUser,
    isSignedIn
}

