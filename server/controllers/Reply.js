const express = require('express');
const Reply = require('../models/Reply');

const router = express.Router();

router.get('/', async (req, res) => {
    const replies = await Reply.find({ threadId: req.query.threadId });
    res.json(replies);
});

router.post('/', async (req, res) => {
    const reply = new Reply(req.body);
    await reply.save();
    res.json(reply);
});

module.exports = router;