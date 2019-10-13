const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  btc: {
    type: Number
  }
});

module.exports = Profile = mongoose.model('Profile', ProfileSchema);