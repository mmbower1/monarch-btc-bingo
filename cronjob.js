const express = require("express");
const cron = require("node-cron");
const fs = require("fs");
const mongoose = require('mongoose');
const RandomNumber = require('./models/RandomNumber');
const DrawnNumbers = require('./models/DrawnNumbers');

app = express();

// Approach 2)
// 1) Every n seconds retrieve random numbers array
// 2) Generate random number
// 3) Check if random number is in drawn numbers
// 4) If not add it
// 5) Regenerate until valid random number has been drawn
// 6) store into drawn numbers array where they cant be drawn again (1-75), then cycle starts over again once all 75 nubmners are drawn

const cronjob = () => {
  let originalArray = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22",
    "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43",
    "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64",
    "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75"
  ];
  cron.schedule("*/6 * * * * *", async () => {
    console.log(" ");
    console.log("================================================================");
    try {
      // in the cronjob every n seconds retrieve current set of available numbers
      let availableNumbersObj = await DrawnNumbers.findOne({}, {}, { sort: { 'created_at' : -1 } });
      let availableNumbers = [];
      // Check if available numbers have been exhausted
      if (!availableNumbersObj) {
        console.log("--> Create new DrawnNumbers");
        availableNumbersObj = new DrawnNumbers({ numbers: originalArray });
        availableNumbers = availableNumbersObj.numbers;
      } else if (availableNumbersObj.numbers.length === 0){
        console.log("--> RESET DRAWN NUMBERS");
        availableNumbers = originalArray;
      } else {
        availableNumbers = availableNumbersObj.numbers;
      }
      console.log("Drawn numbers retrieved: " + availableNumbers);
      console.log(" ");
      console.log("availableNumbers length is: " + availableNumbers.length);

      // Pick a random number from this set
      let index =  Math.floor(Math.random() * availableNumbers.length);
      let random = availableNumbers[index];
      console.log(" ");
      console.log("Random number picked: " + random);

      // Update / save available number set with the random number removed
      availableNumbers.splice(index, 1);
      console.log(" ");
      console.log(" ");
      console.log("--> Updated availableNumbers: " + availableNumbers);
      // Save updated array to database
       availableNumbersObj.numbers = availableNumbers;
       availableNumbersObj.save(function (err, num) {
        if (err) {
          return console.error(err)
        };
      });

      // Step 4)
      // Generate the set of number already picked
      // Send random number to backend so it can be saved in the db
      let randomNumberObj = await RandomNumber.findOne({}, {}, { sort: { 'created_at' : -1 } });
      randomNumberObj.random = random;
      randomNumberObj.save(function (err, num) {
        if (err) {
          return console.error(err)
        };
        console.log(" ");
        console.log("--> Updated Random Numbers: " + randomNumberObj.random);
      });

    } catch (err) {
      console.error(err.message);
      // res.status(500).send('Server error profile');
    }
  })
}



module.exports = cronjob;