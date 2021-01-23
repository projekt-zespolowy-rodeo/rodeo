const sock = io();
let identification=0;
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
const set_id = (id)=>{
    identification = id;
}
(()=>{
    sock.on('chat_message',print);
    sock.on('id',(id)=>set_id(id));
    document.querySelector('#form').addEventListener('submit',after_submition_chat(sock));
})();