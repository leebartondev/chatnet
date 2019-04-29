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

/**
 * 
 */
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

/**
 * Resize the chatbox when the window size
 * is less than the chatbox width.
 * :EVENT RESIZE:
 */
window.addEventListener('resize', () => {
    resizeChatBox(window.innerWidth, window.innerHeight);
    resizeLoginBox(window.innerWidth, window.innerHeight);
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

    // Resize chatbox
    resizeChatBox();

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

    // Show in chat user joined
    _chatbox.innerHTML += '<p class="Chattext ' + color + '"> ' + username + ' <span class="Black"> has joined the chat! </span> </p>';
    
    // Always show latest activity
    _chatbox.scrollTop = _chatbox.scrollHeight;
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

function userHasLeft(username) {
    // Get user's color
    let color = getUserColorByUsername(username);

    // Show user has left in chat
    _chatbox.innerHTML += '<p class="Chattext ' + color + '"> ' + username + ' <span class="Black"> has left the chat! </span> </p>';

    // Always show latest activity
    _chatbox.scrollTop = _chatbox.scrollHeight;
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
}

/**
 * Set the size of the chatbox for
 * small windows / mobile devices.
 * 
 * @param {Number} w
 * @param {Number} h
 */
function resizeChatBox(w, h) {
    // Check current window width
    if(w < 720) {
        // Set the chatbox width to the window width
        document.getElementById('container-chat').style.width = (w - 20) + 'px';
    }
}

/**
 * Set the size of the login box for
 * small windows / mobile devices.
 * 
 * @param {Number} w 
 * @param {Number} h 
 */
function resizeLoginBox(w, h) {
    // Check current window width
    if(w < 410) {
        // Set the login box width to the window width
        document.getElementById('container-login').style.width = (w - 20) + 'px';
    }
}