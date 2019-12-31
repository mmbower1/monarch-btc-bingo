const mongoose = require('mongoose');
const crypto = require('crypto')
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  btcAddress: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String
  },
  avatar: {
    type: String
  },
  cardNumbers: {
    type: Array
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpire: {
    type: Date
  },
  winner: {
    type: Date
  }
});

// sign jwt and return
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
  })
}

// generate and hash password token
UserSchema.methods.getResetPasswordToken = function() {
  // generate token
  const resetToken = crypto.randomBytes(20).toString('hex')
  // hash token and set to resetPassword field
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
  // set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
}

module.exports = User = mongoose.model('user', UserSchema);