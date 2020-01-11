const express = require("express");
const cron = require("node-cron");
const fs = require("fs");
const mongoose = require('mongoose');
const RandomNumber = require('./models/RandomNumber');
const DrawnNumbers = require('./models/DrawnNumbers');
const Cycles = require('./models/Cycles');
app = express();

// Regenerate until valid random number has been drawn
// store into drawn numbers array where they cant be drawn again (1-75), then cycle starts over again once all 75 nubmners are drawn
const cronjob = () => {
  let originalArray = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22",
    "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43",
    "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64",
    "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75"
  ];

  

  let cronJob = cron.schedule("*/1 * * * * *", async () => {
    try {
      // in the cronjob every n seconds retrieve current set of available numbers
      let availableNumbersObj = await DrawnNumbers.findOne({}, {}, { sort: { 'created_at' : -1 } });
      let availableNumbers = [];
      availableNumbers = availableNumbersObj.numbers;
      // cronjob timeout
      if (availableNumbers.length === 0) {
        console.log(' ')
        console.log(' ')
        console.log('--> 1) CRONJOB TIMEOUT');
        pauseCronJob();
        setTimeout(() => {
          startCronJob();
        }, 4000)
        
      } else {
        processNumbers();
      }
      
      async function startCronJob(){
        console.log('--> 2) Start cron job');
        await processNumbers();
        cronJob.start();
      }
    
      function pauseCronJob(){
        console.log('--> 3) Pause cron job');
        cronJob.stop();
      }

      async function processNumbers() {
        // Check if available numbers have been exhausted
        if (!availableNumbersObj) {
          console.log("--> 4) Create new DrawnNumbers");
          availableNumbersObj = new DrawnNumbers({ numbers: originalArray });
          availableNumbers = availableNumbersObj.numbers;

        } else if (availableNumbersObj.numbers.length === 0) {
          console.log('============================================');
          console.log("--> 4) RESET DRAWN NUMBERS");
          console.log('============================================');
          // prevents numbers from decreasing by one in each cycle after reset
          originalArray.forEach((num, i) => {
            availableNumbers[i] = num;
          });
          // reset cycle
          let cycles = await Cycles.findOne({}, {}, { sort: { 'created_at' : -1 } });
          // creates new field in mongo
          if (!cycles) {
            cycles = new Cycles({ winners: [] });
          }
          cycles.winners = [];
          cycles.save((err) => {
            if (err) {
              console.log('Couldnt save cycles in cronjob');
              return console.error(err);
            };
            console.log('============================================');
            console.log('--> CYCLE SAVED');
            console.log('============================================');
          });
        } else {
          availableNumbers = availableNumbersObj.numbers;
        }
        console.log(' ')
        console.log("availableNumbers length is: " + availableNumbers.length);

        // Pick a random number from this set
        let index =  Math.floor(Math.random() * availableNumbers.length);
        let random = availableNumbers[index];
        
        console.log("Random number picked: " + random);

        // Update / save available number set with the random number removed
        availableNumbers.splice(index, 1);
        // Save updated array to database
        availableNumbersObj.numbers = availableNumbers;
        availableNumbersObj.save((err, num) => {
          if (err) {
            return console.error(err)
          };
        });

        // Step 4)
        // Generate the set of number already picked
        // Send random number to backend so it can be saved in the db
        let randomNumberObj = await RandomNumber.findOne({}, {}, { sort: { 'created_at' : -1 } });
        // create new field in mongo
        if (!randomNumberObj) {
          randomNumberObj = new RandomNumber({
            random
          });
        }
        randomNumberObj.random = random;
        randomNumberObj.save((err, num) => {
          if (err) {
            return console.error(err)
          };
        });
      }

    } catch (err) {
      console.error(err.message);
      // res.status(500).send('Server error profile');
    }
  })
}



module.exports = cronjob;