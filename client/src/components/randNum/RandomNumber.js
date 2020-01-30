import React, { useEffect, useState } from 'react';
// styles
import { RandomNumberContainer, RandNum } from './RandomNumber.styles';
import axios from 'axios';

const RandomNumber = () => {
  const [randomNumber, setRandomNumber] = useState(0);
  const [availableNumbers, setavailableNumbers] = useState([]);

  const createOriginalNumbers = () => {
    let numbers = []
    for (let i = 1; i <= 75; i++) {
      numbers.push(<span key={i} className='number' id={`number_${i}`}>{i}</span>)
      if(i % 15 == 0) {
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
    for (let i = 0; i < drawnNumbers.length; i++) {
      updateNumber(drawnNumbers[i]);
    }
  }

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
      setupOriginalNumbers(drawnNumbers);
      return drawnNumbers;
    }
    grabRandomNumber();
    grabAvailableNumbers();
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
