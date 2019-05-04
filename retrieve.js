const { check, validationResult } = require('express-validator/check');

const { ObjectId } = require('mongodb');

const createValidationRules = [
    check('id')
        .exists()
];


async function collectionHandler(db, req, res) {
    const result = await db.collection('characters').find({}).toArray();

    res.send(result);
}

async function singleHandler(db, req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const results = await db.collection('characters').find({ _id: ObjectId(req.params.id) }).toArray();
    res.send(results);
}

module.exports = {
    singleHandler,
    collectionHandler,
    createValidationRules
}