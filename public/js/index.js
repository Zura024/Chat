const socket = io();

$('#message-from').on('submit',(e)=>{
    e.preventDefault();
    socket.emit('newMessage',{
        from : 'UUser',
        text : $('#text').val(),
    },(data)=>{
        console.log(data);
    })
});

socket.on('connect', ()=>{
});

socket.on('disconnect', ()=>{
});

socket.on('newMessage',(message)=>{
    let li = $('<li></li>');
    li.text(`${message.from} :  ${message.text} `);
    $('#messages').append(li);
});