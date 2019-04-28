module.exports = io => {

    let _users_count = 0;
    
    // When client connects
    io.on('connection', socket => {
        /**
         * User logs in.
         */
        socket.on('log in', username => {
            socket.username = username; // Store client username in client's socket session
            console.log(socket.username + ' logged in!');
            _users_count++;
            console.log('Users: ' + _users_count);

            // Inform all other clients of new user
            socket.broadcast.emit('joined', {
                username: socket.username
            });
        });

        /**
         * User sends message.
         */
        socket.on('send msg', obj => {
            // Inform all other clients of message
            socket.broadcast.emit('message', {
                username: obj.username,
                message: obj.message
            });
        });

        /**
         * User has left.
         */
        socket.on('disconnect', () => {
            socket.broadcast.emit('left', {
                username: socket.username
            })
            console.log(socket.username + ' disconnected');

            if(_users_count > 0) { _users_count--; }
            console.log('Users: ' + _users_count);
            
        });
    });
};