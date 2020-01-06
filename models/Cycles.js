const mongoose = require('mongoose');

const CyclesSchema = new mongoose.Schema({
    winners: {
        type: [String]
    }
});

module.exports = Cycles = mongoose.model('CyclesSchema', CyclesSchema);