module.exports = io => {
    
    // When client connects
    io.on('connection', socket => {

        /**
         * User logs in.
         */
        socket.on('log in', username => {
            socket.username = username; // Store client username in client's socket session
            console.log(socket.username + ' logged in!');
            // Inform all other clients of new user
            socket.broadcast.emit('joined', {
                username: socket.username
            });
        });
    });
};