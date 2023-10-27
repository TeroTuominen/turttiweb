const express = require('express'); // Express web server framework joken avulla voidaan luoda serveri
/**
 * Middleware that parses incoming request bodies and makes them available under the req.body property.
 * @module body-parser
 */
const bodyParser = require('body-parser'); // Body parser middleware joka parsii requestin bodyn ja tekee siitä käytettävissä olevan req.body propertyn
const mongoose = require('mongoose'); // Mongoose on MongoDB:n ODM (Object Document Mapper) joka mahdollistaa MongoDB:n käytön Node.js:ssä
const path = require('path'); // Path on Node.js:n moduuli joka mahdollistaa tiedostojen polkujen luomisen ja muokkaamisen
require('dotenv').config(); // Dotenv on moduuli joka mahdollistaa .env tiedostojen käytön

mongoose.connect(process.env.MONGODB_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));

const app = express(); // Luodaan express appi joka on käytännössä serveri
app.use(bodyParser.json()); // Käytetään body-parseria parsimaan requestin body jsoniksi

app.use(express.static(path.join(__dirname, "..", "client/build"))); // Tämä on tärkeä, jotta saadaan reactin buildi toimimaan

app.use('/api/user', require('./controllers/User')); // Käytetään User controlleria kun mennään /api/user polkuun


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client/build/index.html")); //This is the important line. We will send the react build index.html file to the client
});

app.listen(5000, () => console.log('Server started on port 5000')); // Luodaan serveri porttiin 5000 ja tulostetaan konsoliin kun serveri on käynnistynyt