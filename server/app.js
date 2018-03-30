const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const port = process.env.PORT || 9999;
const path = require('path');
const {generateMessage, generateLocMessage} = require('./utils/message');
const {isString} = require('./utils/validation');

const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('newMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message));
        callback('It is from server');
    });

    socket.on('join', (params, callback) => {
        if (!isString(params.name) || !isString(params.room))
            callback('Name and Room are required');

        socket.join(params.room);

        socket.emit('newMessage', generateMessage({from: 'Admin', text: 'Welcome, Here We go'}));
        socket.broadcast.to(params.room).emit('newMessage',generateMessage({from: 'Admin', text: `${params.name} joins chat`}));

        callback();
    });

    socket.on('createLocation', (location) => {
        io.emit('newLocMessage', generateLocMessage(location));
    });

    socket.on('disconnect', () => {
        console.log('User Disconnect To Server ');
    });
});

server.listen(port, () => {
    console.log(`Server Start ${port} port`);
});