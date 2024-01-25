const express = require('express');
const Reply = require('../models/Reply');

const router = express.Router();

router.get('/', async (req, res) => {
    const replies = await Reply.find({ threadId: req.query.threadId }).populate('author', 'name');
    res.json(replies);
});

router.post('/', async (req, res) => {
    const reply = new Reply({
        ...req.body,
        author: req.user._id, // set 'author' to the '_id' of the User document of the author
    });
    await reply.save();
    res.json(reply);
});

module.exports = router;