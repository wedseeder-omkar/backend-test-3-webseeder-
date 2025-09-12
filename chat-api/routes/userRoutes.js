// routes/userRoutes.js
//importing express for routing and controller to create or get users 
const express = require('express');
const { createUser, getUsers } = require('../controllers/userController');

// creating & using express router to router the to route get or post request on home page for users 
const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);

//exporting the router 
module.exports = router;
