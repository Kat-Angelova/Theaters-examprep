const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../constants.js');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        
    },
    password: {
        type: String,
        required: [true, 'All fields are required!'],
        minlength: [4, 'Password must be at least 4 characters long.'],
    },
    likedPlays: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Play',
        } 
    ]

});

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, SALT_ROUNDS)
        .then((hash) => {
            this.password = hash;

            return next();
        })

});

userSchema.method('validatePassword', function(password) {
    return bcrypt.compare(password, this.password);

});


const User = mongoose.model('User', userSchema);


module.exports = User;