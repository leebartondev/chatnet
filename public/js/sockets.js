const socket = io();

socket.on('joined', obj => {
    userHasJoined(obj.username);
});

socket.on('message', obj => {
    userSentMessage(obj.username, obj.message);
});

socket.on('left', obj => {
    userHasLeft(obj.username);
});