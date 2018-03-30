const socket = io();
const locationButton = $('#location-button');

locationButton.on('click',(()=>{
    if (!navigator.geolocation){
        return alert('Location is Req');
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit('createLocation',{
            from : $('#from').val(),
            latitude : position.coords.latitude,
            longitude : position.coords.longitude,
        });
    },()=>{
       alert('Unable To Fetch The location')
    });
}));

$('#message-from').on('submit',(e)=>{
    e.preventDefault();
    let from = $('#from').val();
    let text = $('#text').val();
    if (from !== '' && text !== ''){
        socket.emit('newMessage',{
            from : from,
            text : text,
        },(data)=>{
            console.log(data);
        });
    }
});

socket.on('connect', ()=>{
    getParams().then(params=>{
        socket.emit('join',params,(err)=>{
            if (err){
                alert(err);
                window.location.href = '/'
            }else {
                console.log('not error');
            }
        });
    });
});

socket.on('disconnect', ()=>{
});

socket.on('newMessage',(message)=>{
    let div = $('<div></div>');
    let h = $('<h5></h5>');
    h.text(`${message.from} ${message.createdAt}`);
    let li = $(`<p class="msg"></p>`);
    li.text(`${message.text} `);
    div.append(h);
    div.append(li);
    $('#messages').append(div);
    $('#text').val('');
});

socket.on('newLocMessage',(message)=>{
    let div = $('<div></div>');
    let h = $('<h5></h5>');
    h.text(`${message.from} ${message.createdAt}`);
    let a = $('<a target="_blank">My Location</a>');
    a.attr('href',message.url);
    div.append(h);
    div.append(a);
    $('#messages').append(div);
});

const getParams = ()=>{
    return new Promise((resolve,reject)=>{
        let paramsUri = window.location.search.split('?');
        let p = paramsUri[1];
        let param = p.split('&');
        const params = {};
        param.forEach((obj)=>{
            let o = obj.split('=');
            let key = o[0];
            params[key] =o[1];
        });
        $('#from').val(params.name);
        resolve(params);
    });
};