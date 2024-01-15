const express = require('express');
const router = express.Router();
const Thread = require('../models/Thread');
const mongoose = require('mongoose');
const protected = require('../middleware/Protected');

router.post('/create', protected, async (req, res) => {
    try {
        const thread = new Thread({
            title: req.body.title,
            content: req.body.content,
            forumId: req.body.forumId,
        });

        await thread.save();
        res.json(thread);
    } catch (error) {
        console.error('Error creating thread:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.query.forumId)) {
            return res.sendStatus(404);
        }

        const threads = await Thread.find({ forumId: req.query.forumId });
        res.json(threads);
    } catch (error) {
        console.error('Error retrieving threads:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ error: 'Invalid object id' });
        }

        const thread = await Thread.findById(req.params.id);
        if (!thread) {
            return res.status(404).json({ error: 'Thread not found' });
        }

        res.json(thread);
    } catch (error) {
        console.error('Error retrieving thread by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;