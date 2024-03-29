const express = require('express');
const router = express.Router();
const Forum = require('../models/Forum');
const mongoose = require('mongoose');
const protected = require('../middleware/Protected');

router.post('/create', protected, async (req, res) => {
    try {
        const forum = new Forum({
            name: req.body.name,
            categoryId: req.body.categoryId,
        });

        await forum.save();
        res.json(forum);
    } catch (error) {
        console.error('Error creating forum:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.query.categoryId)) {
            return res.sendStatus(404);
        }

        const fora = await Forum.find({ categoryId: req.query.categoryId });
        res.json(fora);
    } catch (error) {
        console.error('Error retrieving forums:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ error: 'Invalid object id' });
        }

        const fora = await Forum.findById(req.params.id);
        if (!fora) {
            return res.status(404).json({ error: 'Forum not found' });
        }

        res.json(fora);
    } catch (error) {
        console.error('Error retrieving forum by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
