// server.js

const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const { check } = require('express-validator/check');
const create = require('./create');
const retrieve = require('./retrieve');
const update = require('./update');
const destroy = require('./destroy');

const port = 8000;
const app = express();
dbUrl = 'mongodb://localhost:27017';
const dbName = 'star_wards_db';

app.use(bodyParser.json());

MongoClient.connect(dbUrl, { useNewUrlParser: true })
    .then((client) => {
        const db = client.db(dbName);
        app.post('/characters', create.validationRules, create.createHandler.bind(this, db));

        app.get('/characters', retrieve.collectionHandler.bind(this, db));

        app.get('/characters/:id', retrieve.createValidationRules, retrieve.singleHandler.bind(this, db));
      
        app.put('/characters/:id', update.validationRules, update.handler.bind(this, db));
    
        app.delete('/characters/:id', destroy.validationRules, destroy.handler.bind(this, db));
    })
    .catch((err) => {
        console.log('Error getting db connection' + err);
    });

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});