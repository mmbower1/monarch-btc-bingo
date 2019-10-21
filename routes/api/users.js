const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const generateCardNumbers = require('../../helpers/generateCardNumbers');


// @route    POST api/users
// @desc     Register User
// @access   Public
router.post(
  '/', 
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('erc20', 'ERC20 Address required').isLength({ min: 40 }),
    check('phoneNumber', 'Phone number is required').isLength({ min: 10 }),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ], 
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { name, email, erc20, phoneNumber, password } = req.body;
    try {
      // see if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        name,
        email,
        erc20,
        phoneNumber,
        password
      });

      // // bcrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Generate random card numbers before saving
      let cardNumbers = generateCardNumbers();
      user.cardNumbers = cardNumbers;
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
        })
      console.log(req.body); // object of data sent to the route

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error users')
    }
});

module.exports = router;