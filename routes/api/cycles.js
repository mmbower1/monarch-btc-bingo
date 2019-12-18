const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Cycles = require('../../models/Cycles');

// @route    GET api/cycles
// @desc
// @access   Public
router.get('/', async (req, res) => {
    try {
        const cycles = await Cycles.findOne({}, {}, { sort: { 'created_at': -1 } });
        res.json(cycles);

    } catch (err) {
        res.status(500).send('Server error auth');
    }
});

// @route    POST api/cycles/addWinner
// @desc     Post to winner element in User collection
// @access   Public
router.post('/addWinner', async (req, res) => {
    const id = req.body.id;
    console.log(' ');
    console.log("--> You are adding: " + id + " to cycles winner array");
    console.log(' ');

    let cycles = await Cycles.findOne({}, {}, { sort: { 'created_at': -1 } });
    let winners = cycles;
    if (cycles == null) {
        console.log("--> No array found");
        // Create an array, add number and then add to database
        let tempArray = [];
        tempArray.push(id);
        cycles = new Cycles({ winners: tempArray });
    } else {
        console.log(' ');
        console.log("---> winners: " + winners);
        console.log(' ');
        console.log("--> JSON..cycles: " + JSON.stringify(cycles));
        cycles.winners.push(id);
    }

    // save model to database
    cycles.save(function (err, num) {
        if (err) {
            return console.error(err)
        };
        console.log("--> Created new Cycle");
    });
    console.log("--> drawn numbers are: " + winners);
    res.json(cycles);
});

// @route    PUT api/cycles/addWinner/:id
// @desc     Update winner element in User collection
// @access   Public
// router.put('/addWinner/:id', async (req, res) => {

// });

module.exports = router;