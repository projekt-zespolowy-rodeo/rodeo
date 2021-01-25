let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
const sock = io();
let wX=Math.floor(500/3);
let wY=Math.floor(500/3);
var identyfication=-1;
var colour ="";
let point = 0;
const click_on_the_box = (element)=>{
    
    x=element.clientX;
    y=element.clientY;
    sock.emit("coordinates_pointed",[x,y,identyfication,colour]);
}
const points= ()=>{
    document.getElementById('score').innerHTML = "Points: "+point;
}
const click_on_the_box_print = (x,y,col)=>{
    indexX=-1;
    indexY=-1;
    for(let i=0;i<3;i++){
    if(500+wX*i<x && x<500+wX+(wX*i)){
        indexX=i;
    }
    if(140+wY*i<y && y<140+wY+wY*i){
        indexY=i;
        }
    }
    const helper=(x,y)=>{
    console.log(col);
    ctx.fillStyle = col;
    ctx.fillRect(x*wX+2,y*wY+2,wX-4,wY-4);
    }
    helper(indexX,indexY);
}

const draw_board =(width,heigth) => {
    ctx.beginPath();
    for(let i=0;i<4;i++){
        ctx.lineWidth=5;
        ctx.lineCap="round";
        ctx.moveTo(wX*i,0);
        ctx.lineTo(wX*i,heigth);
        ctx.moveTo(0,wY*i);
        ctx.lineTo(width,wY*i);
    }
    ctx.stroke();
}
const setId = (id,col) => {
    identyfication = id;
    colour = col;
    console.log(colour);
}

(()=>{
    sock.on('draw_board',(message)=>{
        draw_board(500,500);
        points();
    });
    sock.on("checked_value",([x,y,col])=>{click_on_the_box_print(x,y,col)});
    sock.on('id',([id,colour])=>setId(id,colour));
    canvas.addEventListener("mousedown",click_on_the_box);
    sock.on('winning',(id)=>
    {   
        if(id == identyfication){
        point ++;
        points();
        sock.emit('whoseTurn',"");
        window.alert("You win !!!");
        }
        else if(id != -1){
            window.alert("You lose !!!");
        }
        else{
            sock.emit('whoseTurn',"Draw");
            window.alert("It's a draw");
        }
        ctx.clearRect(0,0,500,500);
        draw_board(500,500);
        
    }
    )
})();