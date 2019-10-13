const express = require('express');
const router = express.Router();
const RandomNumber = require('../../models/RandomNumber');

router.get('/', async (req, res) => {
  try {
    //const random_number = await Number.find();
    const randomNumber = await RandomNumber.findOne({}, {}, { sort: { 'created_at' : -1 } });
    res.json(randomNumber);

  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;