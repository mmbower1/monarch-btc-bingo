import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RandomNumber = () => {
  const [randomNumber, setRandomNumber] = useState(0);
  const [availableNumbers, setavailableNumbers] = useState([]);

  //
  const grabRandomNumber = async () => {
    const randomObj = await axios.get('/api/randomNumber');
    const currentRandomNumber = randomObj.data.random;
    if (currentRandomNumber) {
      console.log("setting randomNumber to " + currentRandomNumber);
      setRandomNumber(currentRandomNumber);
      console.log("currentRandomNumber state: " + randomNumber);
    }
    console.log("currentRandomNumber state after if: " + randomNumber);
    return currentRandomNumber;
  }

  //
  useEffect(() => {
    const grabAvailableNumbers = async () => {
      const availableNumbersObj = await axios.get('/api/drawnNumbers');
      const currentAvailableNumbers = availableNumbersObj.data.numbers;
      let drawnNumbers = [];
      if (currentAvailableNumbers) {
        for (let i = 1; i < 75; i++) {
          if (currentAvailableNumbers.indexOf(i) === -1) {
            drawnNumbers.push(i);
          }
        }
        setavailableNumbers(drawnNumbers);
      }
      return drawnNumbers;
    }
    grabRandomNumber();
    grabAvailableNumbers();
    console.log("Random number is set to the following: " + randomNumber);
  }, [])

  return (
    <div className="random-number-container">
      <div className="random-number">
        {randomNumber}
      </div>
      Numbers drawn -
      <div className="already-drawn">
        {availableNumbers.toString()}
      </div>
    </div>
  )
}

export default RandomNumber
