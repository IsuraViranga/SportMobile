const { registerUser, loginUser, getUsername } = require('../services/authService');

const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await registerUser(username, password);
        res.status(201).json({ message: 'User registered successfully', userId: user._id });
    } catch (err) {
        res.status(400).json({ error: err.message }); 
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const token = await loginUser(username, password);
        res.status(200).json({ token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getProfile = async (req, res) => {
    try {
        const username = await getUsername(req.user.id);
        res.status(200).json({ username });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = { register, login, getProfile };
