const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const DB_FILE = path.join(__dirname, 'users.json');
const MSG_FILE = path.join(__dirname, 'messages.json');

// --- HELPER: Generate Token ---
const generateToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

// --- HELPER: Verify Token ---
const verifyToken = (token) => {
    if (!token) return null;
    
    const users = readData(DB_FILE);
    const user = users.find(u => u.token === token);
    
    if (user && user.tokenExpiry && new Date(user.tokenExpiry) > new Date()) {
        return user;
    }
    return null;
};

// --- HELPER: Read Database ---
const readData = (file) => {
    try {
        if (!fs.existsSync(file)) {
            fs.writeFileSync(file, JSON.stringify([], null, 2));
            return [];
        }
        const data = fs.readFileSync(file, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading ${file}:`, error.message);
        return [];
    }
};

// --- HELPER: Write Database ---
const writeData = (file, data) => {
    try {
        fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error(`Error writing to ${file}:`, error.message);
        throw error;
    }
};

// ==========================
//      API ROUTES
// ==========================

// 1. REGISTER
app.post('/api/register', (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ status: 'error', message: 'All fields are required' });
        }
        if (password.length < 6) {
            return res.status(400).json({ status: 'error', message: 'Password must be at least 6 characters' });
        }
        const users = readData(DB_FILE);
        if (users.find(u => u.email === email)) {
            return res.status(409).json({ status: 'error', message: 'Email already exists' });
        }
        const newUser = { name, email, password, role: 'Member', subscriptions: [], token: null, tokenExpiry: null };
        users.push(newUser);
        writeData(DB_FILE, users);
        res.json({ status: 'success' });
    } catch (error) {
        console.error('Error in /api/register:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

// 2. LOGIN
app.post('/api/login', (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ status: 'error', message: 'Email and password are required' });
        }
        const users = readData(DB_FILE);
        const userIndex = users.findIndex(u => u.email === email && u.password === password);
        if (userIndex !== -1) {
            const token = generateToken();
            const tokenExpiry = new Date();
            tokenExpiry.setHours(tokenExpiry.getHours() + 24);
            users[userIndex].token = token;
            users[userIndex].tokenExpiry = tokenExpiry.toISOString();
            writeData(DB_FILE, users);
            res.json({ status: 'success', user: users[userIndex], token: token });
        } else {
            res.status(401).json({ status: 'error', message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error in /api/login:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

// 3. GET PROFILE
app.get('/api/profile', (req, res) => {
    try {
        const email = req.query.email;
        if (!email) {
            return res.status(400).json({ status: 'error', message: 'Email is required' });
        }
        const users = readData(DB_FILE);
        const user = users.find(u => u.email === email);
        if (user) {
            res.json({ full_name: user.name, email: user.email, role: user.role, subscriptions: user.subscriptions });
        } else {
            res.status(404).json({ status: 'error', message: 'User not found' });
        }
    } catch (error) {
        console.error('Error in /api/profile:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

// 4. CHANGE PASSWORD
app.post('/api/changePassword', (req, res) => {
    try {
        const { email, currentPassword, newPassword } = req.body;
        if (!email || !currentPassword || !newPassword) {
            return res.status(400).json({ status: 'error', message: 'All fields are required' });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ status: 'error', message: 'New password must be at least 6 characters' });
        }
        const users = readData(DB_FILE);
        const userIndex = users.findIndex(u => u.email === email);
        if (userIndex === -1) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }
        if (users[userIndex].password !== currentPassword) {
            return res.status(401).json({ status: 'error', message: 'Current password is wrong' });
        }
        users[userIndex].password = newPassword;
        writeData(DB_FILE, users);
        res.json({ status: 'success', message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error in /api/changePassword:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

// 5. UNSUBSCRIBE (Requires Authentication)
app.post('/api/unsubscribe', (req, res) => {
    try {
        const { token, subscription } = req.body;
        if (!token || !subscription) {
            return res.status(400).json({ status: 'error', message: 'Authentication token and subscription are required' });
        }
        const authenticatedUser = verifyToken(token);
        if (!authenticatedUser) {
            return res.status(401).json({ status: 'error', message: 'Please login first to unsubscribe' });
        }
        const users = readData(DB_FILE);
        const user = users.find(u => u.email === authenticatedUser.email);
        if (user) {
            user.subscriptions = user.subscriptions.filter(sub => sub !== subscription);
            writeData(DB_FILE, users);
            res.json({ status: 'success', message: 'Unsubscribed successfully', subscriptions: user.subscriptions });
        } else {
            res.status(404).json({ status: 'error', message: 'User not found' });
        }
    } catch (error) {
        console.error('Error in /api/unsubscribe:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

// 6. SUBSCRIBE (Requires Authentication)
app.post('/api/subscribe', (req, res) => {
    try {
        const { token, subscription } = req.body;
        if (!token || !subscription) {
            return res.status(400).json({ status: 'error', message: 'Authentication token and subscription are required' });
        }
        const authenticatedUser = verifyToken(token);
        if (!authenticatedUser) {
            return res.status(401).json({ status: 'error', message: 'Please login first to subscribe', requiresLogin: true });
        }
        const users = readData(DB_FILE);
        const user = users.find(u => u.email === authenticatedUser.email);
        if (user) {
            if (!user.subscriptions.includes(subscription)) {
                user.subscriptions.push(subscription);
                writeData(DB_FILE, users);
            }
            res.json({ status: 'success', message: 'Subscribed successfully', subscriptions: user.subscriptions });
        } else {
            res.status(404).json({ status: 'error', message: 'User not found' });
        }
    } catch (error) {
        console.error('Error in /api/subscribe:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

// 7. CONTACT US
app.post('/api/contact', (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ status: 'error', message: 'All fields are required.' });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ status: 'error', message: 'Invalid email format.' });
        }
        const messages = readData(MSG_FILE);
        const newMessage = { date: new Date().toISOString(), name: name.trim(), email: email.trim().toLowerCase(), message: message.trim() };
        messages.push(newMessage);
        writeData(MSG_FILE, messages);
        console.log("New Message Received from:", email);
        res.json({ status: 'success', message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error in /api/contact:', error);
        res.status(500).json({ status: 'error', message: 'Failed to send message. Please try again.' });
    }
});

// 8. LOGOUT
app.post('/api/logout', (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ status: 'error', message: 'Token is required' });
        }
        const users = readData(DB_FILE);
        const userIndex = users.findIndex(u => u.token === token);
        if (userIndex !== -1) {
            users[userIndex].token = null;
            users[userIndex].tokenExpiry = null;
            writeData(DB_FILE, users);
            res.json({ status: 'success', message: 'Logged out successfully' });
        } else {
            res.json({ status: 'success', message: 'Already logged out' });
        }
    } catch (error) {
        console.error('Error in /api/logout:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Authentication enabled for subscribe/unsubscribe operations');
});
