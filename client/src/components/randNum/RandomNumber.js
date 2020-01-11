import React, { useEffect, useState } from 'react';
// styles
import { RandomNumberContainer, RandNum } from './RandomNumber.styles';
import axios from 'axios';

const originalNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
  35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
  51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66,
  67, 68, 69, 70, 71, 72, 73, 74, 75];

  


const RandomNumber = () => {
  const createOriginalNumbers = () => {
    let numbers = []
    for (let i = 1; i <= 75; i++) {
      numbers.push(<span className='number' id={`number_${i}`}>{i}</span>)
      if(i % 15 == 0){
        numbers.push(<div></div>);
      }
    }
    return numbers
  }

  const updateNumber = (i) => {
    // Get number element i
    document.getElementById('number_' + i).classList.toggle("red-strike-through");
  }

  const setupOriginalNumbers = (drawnNumbers) => {
    console.log("---------> setupOriginalNumbers ----------------------");
    console.log("---------> drawnNumbers ----------------------" + drawnNumbers.length);
    for(let i = 0; i < drawnNumbers.length; i++){
      console.log("---------> updating " + drawnNumbers[i] + " ----------------------");
      updateNumber(drawnNumbers[i]);
    }
  }

  const [randomNumber, setRandomNumber] = useState(0);
  const [availableNumbers, setavailableNumbers] = useState([]);

  useEffect( () => {
    const grabRandomNumber = async () => {
      const randomObj = await axios.get('/api/randomNumber');
      const currentRandomNumber = randomObj.data.random;
      if (currentRandomNumber) {
        // console.log("setting randomNumber to " + currentRandomNumber);
        setRandomNumber(currentRandomNumber);
        // console.log("currentRandomNumber state: " + randomNumber);
      }
      // console.log("currentRandomNumber state after if: " + randomNumber);
      return currentRandomNumber;
    }
    // availableNumbersObj will be disguised as a red cross out line on its according number in the UI
    const grabAvailableNumbers = async () => {
      const availableNumbersObj = await axios.get('/api/drawnNumbers');
      const currentAvailableNumbers = availableNumbersObj.data.numbers;
      let drawnNumbers = [];
      if (currentAvailableNumbers) {
        for (let i = 1; i < 75; i++) {
          if (currentAvailableNumbers.indexOf(i) === -1) {
            // push red cross-out line
            drawnNumbers.push(i);
          }
        }
      console.log("---------> 1) setavailableNumbers length ----------------------" + drawnNumbers.length);
      setavailableNumbers(drawnNumbers);
      }
      console.log("---------> 2) setavailableNumbers length ----------------------" + drawnNumbers.length);
      setupOriginalNumbers(drawnNumbers);
      return drawnNumbers;
    }
    grabRandomNumber();
    grabAvailableNumbers();
    
    
    // console.log("Random number is set to the following: " + randomNumber);
  }, [])

  return (
    <RandomNumberContainer>
      <RandNum>
        <i className="fas fa-hashtag fa-sm"></i>{' '}{randomNumber}
      </RandNum>
      <h3>Drawn numbers - </h3>
      <div className="already-drawn">
        {/* {availableNumbers.toString('').replace(/,/g, ', ')} */}
            {createOriginalNumbers()}
      </div>
    </RandomNumberContainer>
  )
}

export default RandomNumber
