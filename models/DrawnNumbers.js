const mongoose = require('mongoose');

const DrawnNumbersSchema = new mongoose.Schema({
  numbers: {
    type: [Number]
  }
});

module.exports = DrawnNumbers = mongoose.model('DrawnNumbers', DrawnNumbersSchema);