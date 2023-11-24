const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const auth = require('./middleware/Auth');
const protected = require('./middleware/Protected');

mongoose.connect(process.env.MONGODB_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

const app = express();
app.use(bodyParser.json());
app.use(auth);

app.use(express.static(path.join(__dirname, '..', 'client/public')));

// Apply auth middleware after serving static files

app.use('/api/user', require('./controllers/User'));
app.use('/api/category', protected, require('./controllers/Category'));
app.use('/api/forum', require('./controllers/Forum'));

// Send the React build index.html file for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client/public/index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
