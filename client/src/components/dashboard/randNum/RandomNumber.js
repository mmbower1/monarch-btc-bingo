import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RandomNumber = (props) => {
  const [randomNumber, setRandomNumber] = useState(0);
  const [availableNumbers, setavailableNumbers] = useState([]);

  const setMarker = async () => {
    const randomObj = await axios.get('/api/randomNumber');
    let elements = document.getElementsByClassName("bingo-square");
    // for (var i = 0; i <= elements.length; i++) {
    //   if (elements.innerHTML === randomObj) {
    //     elements.push('hello');
    //   }
    // }
    console.log("elements[1]: " + elements[1]);
    console.log("elements.length: " + elements.length);
    console.log("elements[1].innerHTML: " + elements[1].innerHTML);
  }

  useEffect(() => {
    const grabAvailableNumbers = async () => {
      const availableNumbersObj = await axios.get('/api/drawnNumbers');
      //console.log("---> randomObj: " + JSON.stringify(randomObj));
      const currentAvailableNumbers = availableNumbersObj.data.numbers;
      let drawnNumbers = [];
      // console.log("Post grabRandomNumber")
      // console.log("Current Available Numbers Number: " + currentAvailableNumbers);
      if (currentAvailableNumbers) {
        // console.log("Current Available Numbers Number is being updated...")
        for (let i = 1; i < 75; i++){
          if (currentAvailableNumbers.indexOf(i) == -1){
            drawnNumbers.push(i);
          }
        }
        setavailableNumbers(drawnNumbers);
      }
      return drawnNumbers;
    }
    setRandomNumber(props.randomNumber);
    console.log("Random number is set to the following: " + randomNumber);
    grabAvailableNumbers();
    setMarker();
  }, [])

  return (
    <div className="random-number-container">
      <div className="random-number">
        {randomNumber}
      </div>
      <div className="already-drawn">
        Numbers drawn - {availableNumbers.toString()}
      </div>
    </div>
  )
}

export default RandomNumber
