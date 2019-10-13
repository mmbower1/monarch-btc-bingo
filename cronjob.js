const express = require("express");
const cron = require("node-cron");
const fs = require("fs");
const mongoose = require('mongoose');
const RandomNumber = require('./models/RandomNumber');
const DrawnNumbers = require('./models/DrawnNumbers');

app = express();

// available numbers
// ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75"]

// drawn numbers so far
//[5,71,4,]

// Numbers available to draw from
//[1,2,3..75]
// we pick 3
// update the available numbers set
//[1,2,4,5...75]

// Approach 1)
// 1) in the cronjob every n seconds retrieve current set of available numbers
// 1.5) Check if available numbers have been exhausted
// 2) Pick a random number from this set
// 3) Update / save available number set with the random number removed
// 4) Generate the set of number already picked
// 5) Display it on the front-end

// Approach 2)
// 1) Every n seconds retrieve random numbers array 
// 2) Generate random number
// 3) Check if random number is in drawn numbers
// 4) If not add it
// 5) Regenerate until valid random number has been drawn 
// 6) store into drawn numbers array where they cant be drawn again (1-75), then cycle starts over again once all 75 nubmners are drawn


const cronjob = () => {
  let originalArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75"]
  cron.schedule("*/5 * * * * *", async () => {
    console.log(" ");
    console.log(" ");
    console.log(" ");
    console.log(" ");
    console.log(" ");
    console.log(" ");
    console.log("================================================================");
    try {
      // Step 1)
      let availableNumbersObj = await DrawnNumbers.findOne({}, {}, { sort: { 'created_at' : -1 } });
      let availableNumbers = [];
      // Step 1.5)
      if (!availableNumbersObj) {
        console.log("--> Create new DrawnNumbers");
        availableNumbersObj = new DrawnNumbers({ numbers: originalArray});
        availableNumbers = availableNumbersObj.numbers;
       
      }else if(availableNumbersObj.numbers.length === 0){
        console.log("--> Reset DrawnNumbers");
        availableNumbers = originalArray;
      }else {
        availableNumbers = availableNumbersObj.numbers;
      }

      console.log("Length: " + availableNumbers.length);
      console.log("--> Drawn numbers retrieved: " + availableNumbers);
      

      // Step 2)
      console.log("Length: " + availableNumbers.length);
      console.log("--> availableNumbers length is: " + availableNumbers.length);
      

      console.log("--> availableNumbers type : " + typeof availableNumbers);
      let index =  Math.floor(Math.random() * availableNumbers.length);
      console.log("--> Random index picked: " + index);
      let random = availableNumbers[index];
      console.log("--> Random number picked: " + random);


      // Step 3)
      availableNumbers.splice(index, 1);
      console.log("--> Updated availableNumbers: " + availableNumbers);
      // TODO
      // Save updated array to database
       availableNumbersObj.numbers = availableNumbers;
       availableNumbersObj.save(function (err, num) {
        if (err) {
          return console.error(err)
        };
        console.log("--> Updated Drawn Numbers Array");
      });

      console.log(" ");
      console.log(" ");
      console.log(" ");
      console.log(" ");
      console.log(" ");
      console.log(" ");

      // Step 4)
      // Send random number to backend so it can be saved in the db
      let randomNumberObj = await RandomNumber.findOne({}, {}, { sort: { 'created_at' : -1 } });
      randomNumberObj.random = random;
      randomNumberObj.save(function (err, num) {
        if (err) {
          return console.error(err)
        };
        console.log("--> Updated Random Numbers: " + randomNumberObj.random);
      });  

      // if(availableNumbers == null || availableNumbers.numbers.length == 75){
      //   console.log("--> No array found or array is full");
      //   // Create an array, add number and then add to database
      //   let tempArray = [];
      //   tempArray.push(random);
      //   availableNumbers = new DrawnNumbers({ numbers: tempArray});
      // }else {
      //   //console.log("---> availableNumbers: " + availableNumbers);
      //   //console.log("--> JSON..availableNumbers: " + JSON.stringify(availableNumbers));
      //   // 3) Check if random number is in drawn numbers
      //   while(availableNumbers.numbers.indexOf(random) == -1){
      //     random =  Math.floor(Math.random() * 75) + 1;
      //   }
      //   console.log("--> Inserting random number: " + random);
      //   availableNumbers.numbers.push(random);
      // }

      



      // let randomNumber = await RandomNumber.findOne({}, {}, { sort: { 'created_at' : -1 } });
      // // update
      // if (randomNumber) {
      //   console.log("Found a random number in the database with ID: " + randomNumber._id);
      //   console.log("random number value: " + randomNumber.random);
      //   randomNumber = await RandomNumber.findOneAndUpdate(
      //     { _id: randomNumber._id  },
      //     { $set: {random:random}  }
      //   )
      //   console.log("random number value: id after update - " + randomNumber._id);

      // } else {
      //   // create
      //   randomNumber = new RandomNumber({random:random});
      // }
      // await randomNumber.save();

    } catch (err) {
      console.error(err.message);
      // res.status(500).send('Server error profile');
    }
// --------------------------------------- END of random Number ----------------------

  })
}



module.exports = cronjob;