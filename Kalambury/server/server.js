const express  = require('express');
const http = require('http');
const socketio = require('socket.io');
const app = express();
app.use(express.static(`${__dirname}/../client`));
const server = http.createServer(app);
const io = socketio(server);
let list_of_id = [];
let id_to_start = 0;
let chosen_id = 0;
let chosen_word = "";
let is_more_than_2 =false;
let array_with_words = ["pies","kot","krowa","czajnik","gitara"];
function check_if_correct_word(chat_message,word,id){
    console.log(chat_message+" - "+word);
    if(chosen_id == id) return;
    if(is_more_than_2){
    if(chat_message == word) {
        io.emit('chat_message',"Tak");
    }
    else{
        io.emit('chat_message',chat_message);
    }
}
else{
    io.emit('chat_message',chat_message);
}
}
io.on('connection',(sock)=>{
    let id = 0
    for(var i=0;i<list_of_id.length;i++){
        if(list_of_id[i]==id){
            id+=1;
        }
    }
    list_of_id.push(id);
    if(list_of_id.length>2){
        sock.emit('chat_message', 'Too many players ... Disconnected');
        sock.disconnect();
    }
    sock.emit('chat_message', 'Connection established with id: '+id);
    sock.emit('id',id);
    if(list_of_id.length==2){
        chosen_word = array_with_words[Math.floor(Math.random()*array_with_words.length)]
        chosen_id = list_of_id[id_to_start];
        io.emit('whose_turn',[chosen_id,chosen_word]);
        is_more_than_2=true;
    }
    sock.on('chat_guess',([text,id]) => check_if_correct_word(text,chosen_word,id))
    sock.on('turn_coordinates',({x,y,w,z}) => io.emit('turn_coordinates',{x,y,w,z}));
});
server.listen(9997,()=>{
    console.log("OK");
})