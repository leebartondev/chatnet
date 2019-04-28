let _username;
let _loggedIn;
let _chatbox = document.getElementById('chatbox');

/* -------------------------------------------------------------- */

/**
 * "Done" button at login event listener.
 * :EVENT CLICK:
 */
document.getElementById('btn-login')
    .addEventListener('click', () => {
        loginUser(document.getElementById('input-login').value);
        document.getElementById('input-login').value = '';
    });

document.getElementById('btn-send')
    .addEventListener('click', () => {
        sendMessage(document.getElementById('input-msg').value);
        document.getElementById('input-msg').value = '';
    });

/**
 * Log the user in when enter is pressed.
 * :EVENT KEYUP:
 */
document.addEventListener('keyup', e => {
    if (e.keyCode === 13) { // 13 = enter key
        // Check if user is logging in or sending a message
        if(_loggedIn) { // User is loggedin, so send a message
            document.getElementById('btn-send').click();
        } else { // User has not logged in, so log in
            document.getElementById('btn-login').click();
        }
    }
});

/* -------------------------------------------------------------- */

/**
 * Allow the user to join the chat.
 * @param {String} username 
 * :VOID:
 */
function loginUser(username) {
    // Blank username not allowed
    if(username === '') return;

    // Set global client info
    _username = username;
    _loggedIn = true;

    // Show chat
    displayChat();

    // Broadcast user login
    socket.emit('log in', _username);

    // Apply color to self
    addUserAndApplyColor(username);
}

/**
 * Allow the user to send a message to the chat.
 * @param {String} msg
 * :VOID: 
 */
function sendMessage(msg) {
    // Blank message not allowed
    if(msg === '') return;

    // Show message in chat
    userSentMessage(_username, msg);

    // Broadcast user sent a message
    socket.emit('send msg', { username: _username, message: msg });
}

/** ----------------------------------------------------------------- */

/**
 * Show that a user has joined the chat.
 * @param {String} username 
 * :VOID:
 */
function userHasJoined(username) {
    // Apply color to the new user
    addUserAndApplyColor(username);

    // Get user's color
    let color = getUserColorByUsername(username);
    console.log(color);
    // Show in chat user joined
    _chatbox.innerHTML += '<p class="Chattext ' + ' id="'+username+'" '+ color + '"> ' + username + ' <span class="Black"> has joined the chat! </span> </p>';
    userContainerAdd(username);
}

function userSentMessage(username, msg) {
    // Get user's color
    let color = getUserColorByUsername(username);
    
    // Check if user needs to be added (joined before current user)
    if(color === 'default') {
        addUserAndApplyColor(username);
        color = getUserColorByUsername(username);
    }

    // Show message sent in chat
    _chatbox.innerHTML += '<p class="Chattext ' + color + '"> ' + username + ': <span class="Black"> ' + msg + ' </span> </p>';

    // Always show latest activity
    _chatbox.scrollTop = _chatbox.scrollHeight;
}

function userLeft(username) {

    _chatbox.innerHTML = username + " has left.. ";
    userContainerRemove(username);
}

/**
 * Show Change from login to chat.
 */
function displayChat() {
    // Hide login
    let container_login = document.getElementById('container-login')
        container_login.classList.remove('Flex');
        container_login.classList.add('Hidden');

    // Show chat
    document.getElementById('container-chat')
        .classList.remove('Hidden');
        
    document.getElementById('container-users')
        .classList.remove('Hidden');

    document.getElementById('user-title')
        .classList.remove('Hidden')
}

// add user to users container
function userContainerAdd(username){

    var par = document.createElement("LI");
    par.setAttribute("id", username)
    var node = document.createTextNode(username);
    par.appendChild(node);

    var element = document.getElementById("container-users");
    element.appendChild(par);
}
// remove user from users container
function userContainerRemove(username){

    var parent = document.getElementById("container-users");
    var child = document.getElementById(username);
    parent.removeChild(child);
}