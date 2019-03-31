const socket = io();

socket.on('joined', obj => {
    userHasJoined(obj.username);
    console.log(obj.username + ' has joined!');
});