const socket = io();
const locationButton = $('#location-button');

locationButton.on('click',(()=>{
    if (!navigator.geolocation){
        return alert('Location is Req');
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit('createLocation',{
            latitude : position.coords.latitude,
            longitude : position.coords.longitude,
        });
    },()=>{
       alert('Unable To Fetch The location')
    });
}));

$('#message-from').on('submit',(e)=>{
    e.preventDefault();
    socket.emit('newMessage',{
        from : 'UUser',
        text : $('#text').val(),
    },(data)=>{
        console.log(data);
    });
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

socket.on('newLocMessage',(message)=>{
    let li = $('<li></li>');
    let a = $('<a target="_blank">My Location</a>');
    a.attr('href',message.url);
    li.text(`${message.from} : `);
    li.append(a);
    $('#messages').append(li);
});