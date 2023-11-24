const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const mongoose = require('mongoose');
const protected = require('../middleware/Protected');


router.post('/create', protected, async (req, res) => {
    const category = Category({
        name: req.body.name,
    });

    await category.save();
    res.send(category);
    });

router.get('/', async (req, res) => {
    const categories = await Category.find({});
    res.json(categories);
});

router.get('/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.sendStatus(404).send('Invalid object id');
    }
    const category = await Category.findById(req.params.id);
    res.send(category);
});


module.exports = router;