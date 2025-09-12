// models/User.js
const mongoose = require('mongoose');

// structure of how user data will store in database
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
});

// declared user as model for user 
const User = mongoose.model('User', userSchema);

// exporting the user model 
module.exports = User;
