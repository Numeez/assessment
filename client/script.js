import {io} from 'socket.io-client';

const joinRoomBtn = document.getElementById("room-button");
const messageInpt = document.getElementById("message-input");
const roomInpt = document.getElementById("room-input");
const form = document.getElementById("form");




const socket = io('http://localhost:3000',{auth:{token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik51bWVleiIsImlhdCI6MTY5NDU5NjMwOH0.V2DRY2YUGpVcg1OzBAnl5JewQ30MVUtjgW1tIKuN9aQ"}})


socket.on('connect',()=>{
    displayMessage(`You are connected with id : ${socket.id}`)
})

socket.on('server-info-socket',(message)=>{
    displayServerInfo(message)
})

socket.on('receive-message',(message)=>{
    displayMessage(message)
})

form.addEventListener("submit",e=>{
    e.preventDefault();
    const message = messageInpt.value
    const room = roomInpt.value

    if(message==="") return
    
    displayMessage(message)
    socket.emit('send-msg',message,room)
    messageInpt.value = ""
})

joinRoomBtn.addEventListener("click",()=>{
    const room = roomInpt.value
    socket.emit('join-room',room,(message)=>{
        displayMessage(message);
    })
})

function displayMessage(message){
    const div = document.createElement("div");
    div.textContent = message
    document.getElementById("message-container").append(div)
}
function displayServerInfo(message){
    const div = document.createElement("div")
    div.style.backgroundColor = "salmon";
    div.textContent = message
    document.getElementById("message-container").append(div)
}