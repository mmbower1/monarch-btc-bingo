import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RandomNumber = () => {
  const [randomNumber, setRandomNumber] = useState(0);
  const [availableNumbers, setavailableNumbers] = useState([]);

  const grabRandomNumber = async () => {
    const randomObj = await axios.get('/api/randomNumber');
    //console.log("---> randomObj: " + JSON.stringify(randomObj));
    const currentRandomNumber = randomObj.data.random;

    //console.log("Post grabRandomNumber")
    // console.log("Random Number: " + currentRandomNumber);

    if (currentRandomNumber) {
      // console.log("Random number is being updated...")
      setRandomNumber(currentRandomNumber);
    }
    return currentRandomNumber;
  }

  const grabAvailableNumbers = async () => {
    const availableNumbersObj = await axios.get('/api/drawnNumbers');
    //console.log("---> randomObj: " + JSON.stringify(randomObj));
    const currentAvailableNumbers = availableNumbersObj.data.numbers;
    let drawnNumbers = [];

    //console.log("Post grabRandomNumber")
    // console.log("Current Available Numbers Number: " + currentAvailableNumbers);

    if (currentAvailableNumbers) {
      // console.log("Current Available Numbers Number is being updated...")
      for(let i = 1; i < 75; i++){
        if (currentAvailableNumbers.indexOf(i) == -1){
          drawnNumbers.push(i);
        }
      }
      setavailableNumbers(drawnNumbers);
    }
    return drawnNumbers;
  }

  grabRandomNumber();
  // console.log("--> isRandomNumber: " + randomNumber);
  grabAvailableNumbers();
  // console.log("--> AvailableNumbers: " + randomNumber);

  // Call to the randomNumber endpoint

  
  // Set results to 'random'
  
  return (
    <div className="random-number-container">
      <div className="random-number">
        {randomNumber}
      </div>
      <br />
      <div className="already-drawn">
        Numbers drawn {availableNumbers.toString()}
      </div>
    </div>
  )
}

export default RandomNumber
