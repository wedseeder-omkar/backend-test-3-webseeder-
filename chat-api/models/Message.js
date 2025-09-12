// models/Message.js
const mongoose = require('mongoose');

// structure of how messages data will store in database
const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },           // add the current time as timestamp
});

// declared Meesage variable  as model for messageschema 
const Message = mongoose.model('Message', messageSchema);

// exporting the message model 
module.exports = Message;
