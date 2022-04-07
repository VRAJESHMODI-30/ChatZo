//Node server:- which will handle socket io connection
const io = require('socket.io')(8000, {
    cors: {
        origin: '*',
    }
});

//Create a array for saving user entries
const users = {};

//After connection established
io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        console.log("New user", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name)
    });

    socket.on('send', message => {

        socket.broadcast.emit('receive', { message: message, Name: users[socket.id] });

    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id];
    });


})
