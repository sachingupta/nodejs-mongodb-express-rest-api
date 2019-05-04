// server.js

const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const { check } = require('express-validator/check');
const create = require('./create');
const retrieve = require('./retrieve');

const port = 8000;
const app = express();
dbUrl = 'mongodb://localhost:27017';
const dbName = 'star_wards_db';

const validationRules = [
    check('association')
        .isIn(['sachin', 'Jedi', 'Sith', 'Rebel', 'Other'])
];

app.use(bodyParser.json());

MongoClient.connect(dbUrl, { useNewUrlParser: true })
    .then((client) => {
        const db = client.db(dbName);
        app.post('/characters', validationRules, create.createHandler.bind(this, db));

        app.get('/characters', retrieve.collectionHandler.bind(this, db));

        app.get('/characters/:id', retrieve.createValidationRules, retrieve.singleHandler.bind(this, db));
    })
    .catch((err) => {
        console.log('Error getting db connection');
    });

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});