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
        res.send(forum);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.query.categoryId)) {
        return res.sendStatus(404);
    }

    const fora = await Forum.find({ categoryId: req.query.categoryId });
    res.json(fora);
});

router.get('/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.sendStatus(404).send('Invalid object id');
    }

    const fora = await Forum.findById(req.params.id);
    res.send(fora);
});

module.exports = router;
