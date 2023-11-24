const express = require('express'); // tämä on express moduuli, joka auttaa meitä luomaan reittejä
const router = express.Router(); // tämä on uusi instanssi routerista, router on expressin sisäänrakennettu moduuli jonka avulla voidaan luoda reittejä
const jwt = require('jsonwebtoken'); // tämä on jsonwebtoken moduuli, joka auttaa meitä luomaan tokenin,  token on pieni palanen dataa, joka voidaan lähettää palvelimelta asiakkaalle ja takaisin
const User = require('../models/User'); // tämä on User modeli, jonka avulla voidaan luoda uusi käyttäjä tietokantaan
const bcrypt = require('bcryptjs'); // tämä on bcryptjs moduuli, joka auttaa meitä salasanojen kryptaamisessa

router.get('/init', async (req, res) => {
    console.log('User ID:', req.userId);
    const user = await User.findById(req.userId);
    res.send({user});
});

router.post('/register', async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (user) {
        return res.status(400).send({
            message: 'User with this email already exists'
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
        const user = await User.findOne({email: req.body.email});
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
    
    router.post("/change-name", async (req, res) => {
        const user = await User.findById(req.body.userId);

        user.name = req.body.name;
        await user.save();
        return res.sendStatus(200);
    });

    router.post("/change-email", async (req, res) => {
        const emailExists = await User.findOne({email: req.body.email});
        if (emailExists) {
            return res.status(400).send({
                message: 'User with this email already exists'
            });
        }

        const user = await User.findById(req.body.userId);

        user.email = req.body.email;
        await user.save();
        return res.sendStatus(200);
    });

    router.post("/change-password", async (req, res) => {
        console.log('Request body:', req.body);
    
        const user = await User.findById(req.body.userId);
    
        // Log the user object to see if it's retrieved successfully
        console.log('User object:', user);
    
        const passwordIsEqual = await bcrypt.compare(req.body.currentPassword, user.password);
        if (!passwordIsEqual) {
            return res.status(401).send({
                message: 'Current password is incorrect'
            });
        }
    
        user.password = req.body.password;
        await user.save();
        return res.sendStatus(200);
    


        // Rest of the code
    });
    

    
    
    


module.exports = router;
