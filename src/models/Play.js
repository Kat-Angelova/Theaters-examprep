const mongoose = require('mongoose');


const playSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'All fields are required!'],
        unique: true,
    },
    description: {
        type: String,
        required: [true, 'All fields are required!'],
        minlength: [50, 'Description must be at least 50 characters!']
    },
    imageUrl: {
        type: String,
        required: [true, 'All fields are required!'],
        match: [/^https?:\/\/.+/, 'Image URL is not in the valid format!']
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    usersLikedPlay: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    creator: { 
        type: mongoose.Types.ObjectId,
        ref: 'User' 
    }

}, {
    timestamps: true,
});

playSchema.method('getUsersLikes', function() {
    return this.usersLikedPlay.map(x => x.username).join(', ');
})

const Play = mongoose.model('Play', playSchema);

module.exports = Play;
