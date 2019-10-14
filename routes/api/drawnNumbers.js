const express = require('express');
const router = express.Router();
const DrawnNumbers = require('../../models/DrawnNumbers');


// root: api/drawnNumbers
// Return all drawn numbers
router.get('/', async (req, res) => {
  try {
    const drawnNumbers = await DrawnNumbers.findOne({}, {}, { sort: { 'created_at' : -1 } });
    res.json(drawnNumbers);

  } catch (err) {
    res.status(500).send('Server error');
  }
});


// Add new available numbers array to the database
// Can be used for reload the available numbers array
router.post('/', async (req, res) => {
  const numbersArray = req.body.numbers;
  console.log("=====> You are adding: " + numbersArray);

  //let drawnNumbers = await DrawnNumbers.findOne({}, {}, { sort: { 'created_at' : -1 } });
  let drawnNumbers = await DrawnNumbers.findOneAndUpdate(
    { numbers: numbersArray }
  )
  if(drawnNumbers == null){
    drawnNumbers = new DrawnNumbers({ numbers: numbersArray});
  }
  //res.json(drawnNumbers);

  //if(drawnNumbers == null){
    //drawnNumbers = new DrawnNumbers({ numbers: numbersArray});
  //}else {
    //drawnNumbers = new DrawnNumbers({ numbers: numbersArray});
  //}
  // save model to database
  drawnNumbers.save(function (err, num) {
    if (err) {
      return console.error(err)
    };
    console.log("=====> saved in db");
    res.json(drawnNumbers);
  });
  console.log("=====> Done with saving");
});


router.post('/addNumber', async (req, res) => {
  const number = req.body.number;
  console.log("--> You are adding: " + number + " to the drawn numbers array");

  let drawnNumbers = await DrawnNumbers.findOne({}, {}, { sort: { 'created_at' : -1 } });
  if(drawnNumbers == null){
    console.log("--> No array found");
    // Create an array, add number and then add to database
    let tempArray = [];
    tempArray.push(number);
    drawnNumbers = new DrawnNumbers({ numbers: tempArray});
  } else {
    console.log("---> drawnNumbers: " + drawnNumbers);
    console.log("--> JSON..drawnNumbers: " + JSON.stringify(drawnNumbers));
    drawnNumbers.numbers.push(number);
  }
  // save model to database
  drawnNumbers.save(function (err, num) {
    if (err) {
      return console.error(err)
    };
    console.log("--> Created new Array");
  });
  console.log("--> drawn numbers are: " + drawnNumbers);
  res.json(drawnNumbers);
});


module.exports = router;