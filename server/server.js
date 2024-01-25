const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
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

// Use cors middleware here
app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.static(path.join(__dirname, '..', 'client/public')));

// Apply auth middleware after serving static files
app.use(auth);

app.use(bodyParser.json());

app.use('/api/user', require('./controllers/User'));
app.use('/api/category', protected, require('./controllers/Category'));
app.use('/api/forum', protected, require('./controllers/Forum'));
app.use('/api/thread', protected, require('./controllers/Thread'));
app.use('/api/reply', protected, require('./controllers/Reply'));

// Send the React build index.html file for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client/public/index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});