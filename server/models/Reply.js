const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({
    content: String,
    threadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Reply', ReplySchema);