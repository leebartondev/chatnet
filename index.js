const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Middleware
//app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Render static index page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,  'index.html'));
});

// API routes
//require('./routes/getRoutes')(app);

// Handle socket
require('./sockets')(io);

// Listen on a port passed into node process environment
// or port 5000 if it does not exist.
const PORT = process.env.PORT || 5000;
server.listen(PORT);