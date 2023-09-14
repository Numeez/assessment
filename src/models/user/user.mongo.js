const mongoose = require('mongoose')

const usersSchema  =mongoose.Schema({
    userId:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('User',usersSchema)