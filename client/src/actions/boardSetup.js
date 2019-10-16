//import axios from 'axios';
// import { setAlert } from './alert';
//import { GET_PROFILE, PROFILE_ERROR } from './types';

// get current users profile
export const boardSetup = () => {
  let availableNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75"];
  let cellsIdNames = ["b1" , "i1" , "n1" , "g1" , "o1" , "b2" , "i2" , "n2" , "g2" , "o2" , "b3" , "i3" , "n3" , "g3" , "o3" , "b4" , "i4" , "n4" , "g4" , "o4" , "b5" , "i5" , "n5" , "g5" , "o5"];
  let cellValues = [];
  try {
    console.log("boardSetup loaded");
    // 1) Go through all the cells and fill in with a valid random number
    for (var i = 0; i < cellsIdNames.length; i++) {
      let index =  Math.floor(Math.random() * availableNumbers.length);
      let randomString = availableNumbers[index];
      let randomInt = randomString;
      availableNumbers.splice(index, 1);
      let element = document.getElementById(cellsIdNames[i]);
      element.innerHTML = randomString; 
      cellValues[i] = randomString;
    }
  } catch (err) {
    
  }

  function markCell(cellValue){
    console.log("Marking... " + cellValue);
  }
}