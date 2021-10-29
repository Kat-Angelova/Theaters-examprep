const jwt = require('../utils/jwt.js');
const User = require('../models/User.js');
const { TOKEN_SECRET } = require('../constants.js');

exports.login = async ({ username, password }) => {
    let user = await User.findOne({ username: username });

    if(!user) {
        throw new Error('Invalid username or password');
    }

    let isValid = await user.validatePassword(password);

    if(!isValid) {
        throw new Error('Invalid username or password');
    } 

    let payload = {
        _id: user._id,
        username: user.username,
    }

    let token = await jwt.sign(payload, TOKEN_SECRET, { expiresIn: '5h'});
    
    return token;
};

exports.register = async (userData) => User.create(userData);