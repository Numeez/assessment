require('dotenv').config()
const jwt = require('jsonwebtoken')
const io = require('socket.io')(3000,{
    cors:{
        origin:['http://localhost:8080','http://localhost:8000']
    }
})

io.use((socket,next)=>{
    const token = socket.handshake.auth.token
    if(token){
        console.log(getUsernamefromToken(token))
       socket.username = getUsernamefromToken(token)
        next();
    }else{
        next(new Error("Please send token"))
    }

})
io.on('connection',(socket)=>{
console.log(socket.id)
console.log(socket.username)


socket.on('server-info',(message)=>{
    socket.broadcast.emit('server-info-socket',message)
})

socket.on('send-msg',(message,room)=>{
    
    if(room===""){
        socket.broadcast.emit('receive-message',message)
    }else{
        socket.to(room).emit('receive-message',message)
    }
    console.log(message)
})
socket.on('join-room',(room,cb)=>{
    socket.join(room)
    cb(`Joined ${room}`)
})



})

function getUsernamefromToken(token){
   jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
    
    if(err){
     console.log(err)
    }
    console.log(user.username)
    return user.username
    
 })
   
}
