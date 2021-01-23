let can_paint = false;
let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
const sock = io();
let identification=0;
let my_turn = false;
const print = (text)=>{
    const parent = document.querySelector('#wydarzenie');
    const list_element = document.createElement('li');
    list_element.innerHTML = text
    parent.appendChild(list_element);

};
const after_submition_chat = (sock)=>(element) =>{
element.preventDefault();
const input = document.querySelector('#napis');
sock.emit('chat_guess',[input.value,identification]);
input.value = '';
};
const start_drawing = (element)=>{
    can_paint =true;
    send_drawing_coordinates(element);
}
const finish_drawing = (element)=>{
    ctx.beginPath();
    can_paint=false;
}
const set_id = (id)=>{
    identification = id;
}
const set_chosen_id=(id_from_emit,word)=>{
    console.log(id_from_emit);
    if(identification == id_from_emit){
        my_turn= true;
        console.log(word);
        print("Musisz narysowac: "+word);
    }
    else{
        my_turn = false;
    }
}
const send_drawing_coordinates =(element)=>{
    if(!can_paint || !my_turn) return;
	//change it to adjust to frontend
    x=element.clientX+100;
    y=element.clientY-120;
    sock.emit('turn_coordinates',{x,y,x,y});

}

const draw_from = (x,y,w,z)=>{
	let canvas = document.querySelector('#canvas');
	let ctx = canvas.getContext('2d');
    ctx.lineWidth=7;
    ctx.lineCap="round";
	ctx.lineTo(x,y);
	ctx.stroke();
    ctx.beginPath(); 
    ctx.moveTo(x,y);
}

(()=>{
    sock.on('chat_message',print);
    sock.on('id',(id)=>set_id(id));
    sock.on('turn_coordinates',({x,y,w,z})=>draw_from(x,y,w,z));
    sock.on('whose_turn',([id_from_emit,chosen_word])=>set_chosen_id(id_from_emit,chosen_word));
    canvas.addEventListener("mousedown",start_drawing);
    canvas.addEventListener("mousemove",send_drawing_coordinates);
    canvas.addEventListener("mouseup",finish_drawing);
    document.querySelector('#form').addEventListener('submit',after_submition_chat(sock));
})();