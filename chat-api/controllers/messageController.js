// controllers/messageController.js
const Message = require('../models/Message');
const User = require('../models/User');

// Send a message
const sendMessage = async (req, res) => {
    const { sender, receiver, text } = req.body;

    if (!sender || !receiver || !text) {
        return res.status(400).json({ error: 'Sender, receiver, and message text are required' }); // checking if any field is empty 
    }

    try {
        const senderUser = await User.findById(sender);  // finding the sending user by it object id in mongodb 
        const receiverUser = await User.findById(receiver);  // finding the receiver user by it object id in mongodb 

        if (!senderUser || !receiverUser) {
            return res.status(400).json({ error: 'Invalid sender or receiver ID' });  // checking if both id(user) is existed your not 
        }

        const newMessage = new Message({
            sender,
            receiver,
            text,                                     // passing the body in the new message schema to store in db   
        });

        await newMessage.save();
        res.status(201).json(newMessage);            // send 201 status code if message send or save 
    } catch (error) {
        res.status(500).json({ error: 'Server error' });  // fetching any server error
    }
};

// Get messages between two users
const getMessages = async (req, res) => {
    const { user1, user2 } = req.params;     // taking user 1 and user 2 

    try {
        const messages = await Message.find({
            $or: [
                { sender: user1, receiver: user2 },   //getting all the by object id of users in mongodb 
                { sender: user2, receiver: user1 },
            ],
        }).populate('sender receiver', 'username');

        res.json(messages);                          //sending all the message between two user 
    } catch (error) {
        res.status(500).json({ error: 'Server error' });  // fecting the servor error
    }
};

module.exports = { sendMessage, getMessages }; // exporting as module 
