const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const registerUser = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    return newUser;
};

const loginUser = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) throw new Error('Invalid username or password');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid username or password');

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

const getUsername = async (userId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    return user.username;
};

module.exports = { registerUser, loginUser, getUsername };
