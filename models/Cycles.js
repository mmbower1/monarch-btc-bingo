const mongoose = require('mongoose');

const CyclesSchema = new mongoose.Schema({
    winners: {
        type: [Number]
    }
});

module.exports = Cycles = mongoose.model('CyclesSchema', CyclesSchema);