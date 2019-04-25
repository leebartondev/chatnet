let _colors = [ // Class names for color
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Orange",
    "Purple",
];

let _users = [];

/**
 * Store the user and apply a random color
 * to the user.
 * @param {String} username 
 */
let addUserAndApplyColor = username => {
    _users.push({
        username: username, // Username
        color: _colors[(Math.floor(Math.random() * _colors.length))] // Random color
    });
};

/**
 * Get the color of a user by the username.
 * @param {String} username
 * :STRING:
 */
let getUserColorByUsername = username => {
    for(let i = 0; i < _users.length; i++) {
        if(_users[i].username === username) {
            return _users[i].color;
        }
    }
    return 'default'; // Error
};