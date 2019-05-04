// server.js

const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator/check');

const port = 8000;
const app = express();
dbUrl = 'mongodb://localhost:27017';
const dbName = 'star_wards_db';

const validationRules = [
    check('association')
        .isIn(['sachin', 'Jedi', 'Sith', 'Rebel', 'Other'])
];

const fetchCharValidationRules = [
    check('id')
        .exists()
];

app.use(bodyParser.json());

MongoClient.connect(dbUrl, { useNewUrlParser: true })
    .then((client) => {
        const db = client.db(dbName);
        app.post('/characters', validationRules, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const character = {
                name: req.body.name,
                association: req.body.association
            };
            const result = await db.collection('characters').insertOne(character);
            res.status(201).send(character);
        });

        app.get('/characters', async (req, res) => {
            const result = await db.collection('characters').find({}).toArray();

            res.send(result);
        });

        app.get('/characters/:id', fetchCharValidationRules, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const results = await db.collection('characters').find({ _id: ObjectId(req.params.id) }).toArray();
            res.send(results);
        });
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