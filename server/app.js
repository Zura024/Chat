const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const port = process.env.PORT || 9999;
const path = require('path');

const server =  http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket)=>{
    console.log('User connected');

    socket.on('disconnect', ()=>{
        console.log('User Disconnect To Server ');
    });
});

server.listen(port,()=>{
    console.log(`Server Start ${port} port`);
});