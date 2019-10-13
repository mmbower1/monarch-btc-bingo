const mongoose = require('mongoose');

const RandomNumberSchema = new mongoose.Schema({
  random: {
    type: Number
  }
});

module.exports = RandomNumber = mongoose.model('RandomNumber', RandomNumberSchema);