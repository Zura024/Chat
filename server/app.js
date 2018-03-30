const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const port = process.env.PORT || 9999;
const path = require('path');
const {generateMessage} = require('./utils/message');

const server =  http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket)=>{
    console.log('User connected');

    socket.on('newMessage', (message,callback)=>{
        io.emit('newMessage', generateMessage(message));
        callback('It is from server');
    });

    socket.on('createLocation',(location)=>{
        io.emit('newMessage', generateMessage({from:'admin', text:`${location.latitude} ::: ${location.longitude}`}));
    });

    socket.on('disconnect', ()=>{
        console.log('User Disconnect To Server ');
    });
});

server.listen(port,()=>{
    console.log(`Server Start ${port} port`);
});