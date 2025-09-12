// server.js

//importing the system modules 
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const cors = require('cors');

// importing moducles from other folder 
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const Message = require('./models/Message');

// configration to use .env from getting gobal variable 
dotenv.config();

// Initialize express and HTTP server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/users', userRoutes);
app.use('/messages', messageRoutes);

// Socket.io: Handle new message broadcasts
io.on('connection', (socket) => {
    console.log('A user connected'); // console log when a new user is connect 
    
    socket.on('disconnect', () => {
        console.log('A user disconnected'); // console log when a  user is disconnect
    });
});

// Broadcast new message when it is created
app.post('/messages', async (req, res) => {
    try {
        const { sender, receiver, text } = req.body;

        if (!sender || !receiver || !text) {
            return res.status(400).json({ error: 'Sender, receiver, and text are required' });
        }

        // Save message to the database
        const newMessage = new Message({ sender, receiver, text });
        await newMessage.save();

        // Broadcast the message to all connected clients
        io.emit('new_message', newMessage);  // Emit the new message to all connected clients

        // Send the created message as a response
        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ error: 'Error saving message' });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
