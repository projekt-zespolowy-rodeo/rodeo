const express  = require('express');
const http = require('http');
const socketio = require('socket.io');
const app = express();
app.use(express.static(`${__dirname}/../client`));
const server = http.createServer(app);
const io = socketio(server);
// -1 means this field is empty
// 0 and 1 mean id of player
let board =[[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
let list_of_id=[];
let starting_whose_turn = 0;
let whose_turn = 0;
let wX=Math.floor(500/3);
let wY=Math.floor(500/3);
const checkWinning = () => {
    for(var i = 0; i<3;i++){
        if(board[i][0] != -1 && board[i][1] != -1 && board[i][2] != -1){
        if(board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] == board[i][2]){
            return board[i][0];
        }}
        if(board[0][i] != -1 && board[1][i] != -1 && board[2][i] != -1){
        if(board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[0][i] == board[2][i]){
            return board[0][i];
        }
        }
    if(board[0][0] != -1 && board[1][1] != -1 && board[2][2] != -1){
        if(board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] == board[2][2]){
            return board[0][0];
        }
        }
    if(board[0][2] != -1 && board[1][1] != -1 && board[2][0] != -1){
        if(board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] == board[2][0]){
            return board[0][2];
        }
        }
    }
    return -1;
}
const ifCondition = () =>{
    let value = -1;
    let checkConditions = checkWinning();
    if(checkConditions != -1){
        value =checkConditions;
        return value; //id of winner
    }
    let ifDraw = 0;
    for(var i=0;i<3;i++){
        for(var j=0;j<3;j++){
            if(board[i][j] != -1){
                ifDraw++;
            }
        }
    }
    if(ifDraw == 9){
        return -1; //draw
    }
    else{
        return -2; //not finished
    }


}

const board_fuctionality = (x,y,id,colour) => {
    var indexX = -1;
    var indexY= -1;
    for(let i=0;i<3;i++){
        if(500+wX*i<x && x<500+wX+wX*i){
            indexX=i;
        }
        if(140+wY*i<y && y<140+wY+wY*i){
            indexY=i;
            }
    }
    if (whose_turn == id){
    if(board[indexX][indexY] == -1){
    board[indexX][indexY] = id;
    let checkConditions = ifCondition();
    if(checkConditions == -2){
    io.emit("checked_value",[x,y,colour]);
    if(whose_turn == 0){
        whose_turn = 1
        }
    else{
        whose_turn = 0
        }
    
}
else if(checkConditions == -1){
    io.emit("checked_value",[x,y,colour]);
    io.emit("winning",checkConditions);
}
else{
    io.emit("checked_value",[x,y,colour]);
    io.emit("winning",checkConditions);
}
    }
}
}

io.on('connection',(sock)=>{
    let id = 0;
    for(var i=0;i<list_of_id.length;i++){
        if(list_of_id[i]==id){
            id+=1;
        }
    }
    list_of_id.push(id);
    if(list_of_id.length>2){
        sock.disconnect();
    }
    if(id == 0){
        sock.emit('id',[id,"#A80006"]);
    }
    else{
        sock.emit('id',[id,"#181818"]);  
    }
    sock.emit('draw_board',"");
    sock.on("coordinates_pointed",([x,y,identification,colour])=>board_fuctionality(x,y,identification,colour)); 
    sock.on('whoseTurn',(message)=>{
        for(var i=0;i<3;i++){
            for(var j=0;j<3;j++){
                board[i][j] = -1;
            }
        }
        if(starting_whose_turn == 0){
            starting_whose_turn =1;
            whose_turn =1;
        }
        else{
            starting_whose_turn =0;
            whose_turn = 0;
        }});
});
server.listen(9996,()=>{
    console.log("OK");
})