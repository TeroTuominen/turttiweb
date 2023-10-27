const express = require('express'); // tämä on express moduuli, joka auttaa meitä luomaan reittejä
const router = express.Router(); // tämä on uusi instanssi routerista, router on expressin sisäänrakennettu moduuli jonka avulla voidaan luoda reittejä
const jwt = require('jsonwebtoken'); // tämä on jsonwebtoken moduuli, joka auttaa meitä luomaan tokenin,  token on pieni palanen dataa, joka voidaan lähettää palvelimelta asiakkaalle ja takaisin
const User = require('../models/User'); // tämä on User modeli, jonka avulla voidaan luoda uusi käyttäjä tietokantaan
const bcrypt = require('bcryptjs'); // tämä on bcryptjs moduuli, joka auttaa meitä salasanojen kryptaamisessa

router.get('/init', async (req, res) => {
    const token = req.query.token;
    let user = null;
    let response;

    try {
        const userData = jwt.verify(token, 'app');
        user = await User.findById(userData.userId);

    } catch (e) {
        response = null;
    }

    if (user){
        response = user;
    }

    res.send({user: response});
});

router.post('/register', async (req, res) => {
    const userExists = await User.find({email: req.body.email});
    if (!userExists) {
        return res.status(400).send({
            message: 'User with this email does not exist'
        });
    }

    const newUser = User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: 'user'
    });

    await newUser.save();

    return res.sendStatus(201);
    });

    router.post('/login', async (req, res) => {
        const user = await User.find({email: req.body.email});
        if (!user) {
            return res.status(400).send({
                message: 'User with this email does not exist'
            });
        }

        const passwordIsEqual = await bcrypt.compare(req.body.password, user.password);
        if (!passwordIsEqual) {
            return res.status(401).send({
                message: 'Password is incorrect'
            });
        }

        const token = jwt.sign({userId: user._id},'app');

        res.send({
            user,
            token
        })
    });

module.exports = router;
