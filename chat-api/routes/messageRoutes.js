// routes/messageRoutes.js
//importing express for routing and controller to create or get users 
const express = require('express');
const { sendMessage, getMessages } = require('../controllers/messageController');

// creating & using express router to router the to route get or post request on home page for sending message  
const router = express.Router();

router.post('/', sendMessage);
router.get('/:user1/:user2', getMessages);   // or getting two user chat (note :- using object.id of mongodb)

//exporting the router 
module.exports = router;
