const express  = require('express');
const http = require('http');
const socketio = require('socket.io');
const app = express();
app.use(express.static(`${__dirname}/../client`));
const server = http.createServer(app);
const io = socketio(server);
let list_of_id = [];
function check_if_correct_word(chat_message,id){
        io.emit('chat_message',id+" : "+chat_message);   
}
io.on('connection',(sock)=>{
    let id = 0
    // Generating user id, when reddis will be aviable exchange id to username.
    for(var i=0;i<list_of_id.length;i++){
        if(list_of_id[i]==id){
            id+=1;
        }
    }
    list_of_id.push(id);
    sock.emit('id',id);
    io.emit('chat_message',"User: "+id+" has just joined the game");
    sock.on('chat_guess',([text,id]) => check_if_correct_word(text,id))
});
server.listen(9999,()=>{
    console.log("OK");
})