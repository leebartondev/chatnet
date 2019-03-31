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
    });

/**
 * Log the user in when enter is pressed.
 * :EVENT KEYUP:
 */
document.addEventListener('keyup', e => {
    if (e.keyCode === 13) { // 13 = enter key
        loginUser(document.getElementById('input-login').value);
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
}

/**
 * Show that a user has joined the chat.
 * @param {String} username 
 */
function userHasJoined(username) {
    console.log(username + ' has joined!');
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