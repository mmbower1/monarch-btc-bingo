const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const User = require('../../models/User');
const generateCardNumbers = require('../../helpers/generateCardNumbers');
const ErrorResponse = require('../../middleware/error');
const request = require('request');

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ user: req.user }).populate('user', ['name']);
    if (!user) {
      return res.status(400).json({ msg: 'There is no user for this id' });
    }
    res.json(user);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error users');
  }
});


// @route    POST api/users
// @desc     Register User
// @access   Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('btcAddress', 'BTC Address needs atleast 40 characters').isLength({ min: 40 }),
    check('phoneNumber', 'Phone number is required').isLength({ min: 10 }),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { name, email, btcAddress, phoneNumber, password } = req.body;
    try {
      // see if user exists
      let user = await User.findOne({ email }, { unqiue: true });
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'Email already taken!' }] });
      }

      // gravatar
      const avatar = gravatar.url(email, {
        s: '100',
        r: 'pg',
        d: 'mm'
      });

      user = new User({
        name,
        email,
        btcAddress,
        phoneNumber,
        password,
        avatar
      });

      // // bcrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Generate random card numbers before saving
      let cardNumbers = generateCardNumbers();
      user.cardNumbers = cardNumbers;
      // save to mongo
      await user.save();

      // return json webtoken
      const payload = {
        user: {
          id: user.id
        }
      }
      // set to 3600 (1 hr) in production
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        });
        console.log(' ');
        console.log('REGISTER: ', req.body); // object of data sent to the route

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error users')
    }
});

// @route    PUT api/users
// @desc     Update User
// @access   Private
router.put('/:id', async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!user) {
    // using errorResponse instead of: return res.status(400).json({ success: false });
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({ success: true });
  console.log(' ')
  console.error('>>> UPDATED USER');
});

module.exports = router;