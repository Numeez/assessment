const http = require('http')

const app = require('./app')
const {eventEmitter} = require('./router/user/user.controller')
const mongoose = require('mongoose')
const io = require('socket.io-client');

const PORT = process.env.PORT|| 8000;

const server = http.createServer(app)

const MONGO_URL = "mongodb+srv://numeezbaloch17:z7JHqYUOpbsaRYtG@user-management-cluster.fg5zcvw.mongodb.net/?retryWrites=true&w=majority"

mongoose.connection.once('open',()=>{
    console.log("MongoDB connected");
})
mongoose.connection.on('error',(err)=>{
console.log(`Error occured : ${err}`)
})




const socket = io.connect('http://localhost:3000',{auth:{token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik51bWVleiIsImlhdCI6MTY5NDU5NjMwOH0.V2DRY2YUGpVcg1OzBAnl5JewQ30MVUtjgW1tIKuN9aQ"}})

eventEmitter.on('server-info',(message)=>{
   socket.emit('server-info',message);
})

async function startServer(){
await mongoose.connect(MONGO_URL)    
server.listen(PORT,()=>{
   console.log(`Server is running on port ${PORT}....`)
})

}

startServer();


