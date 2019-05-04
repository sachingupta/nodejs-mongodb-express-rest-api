const { check, validationResult } = require('express-validator/check');

const validationRules = [
    check('association')
        .isIn(['sachin', 'Jedi', 'Sith', 'Rebel', 'Other'])
];

async function createHandler(db, req, res) {
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
}


module.exports = {
    createHandler,
    validationRules
}