const { check, validationResult } = require('express-validator/check');
const { ObjectId } = require('mongodb');

const validationRules = [
    check('id')
      .exists(),
    check('name')
      .isLength({ min: 3 }),
    check('association')
      .isIn(['Jedi', 'Sith', 'Other'])
  ];

async function handler(db, req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const character = {
        name: req.body.name,
        association: req.body.association
    };
    
    const result = await db.collection('characters').deleteOne({ _id: ObjectId(req.params.id) });

    if (result.n !== 0) {
        res.status(204).send({});
      } else {
        res.status(404).send({});
      }
}

module.exports = {
    handler,
    validationRules
}