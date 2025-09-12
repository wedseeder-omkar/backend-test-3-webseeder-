// controllers/userController.js
const User = require('../models/User');

// creating  user 
const createUser = async (req, res) => {
    const { username } = req.body; // extracting the user name 

    if (!username) {
        return res.status(400).json({ error: 'Username is required' }); // checking if user name is available 
    }

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' }); // if findone throw user is alway existed 
        }

        const newUser = new User({ username }); // making new user from pre-exisiting user schema
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Server error' }); // fecthing any servor side error 
    }
};

const getUsers = async (req, res) => {    // getting the users from database 
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error' }); // fecthing any server side error 
    }
};

module.exports = { createUser, getUsers }; // export both create and get user function 
