import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import { loadUser } from '../../../actions/auth';
import PropTypes from 'prop-types';
import axios from 'axios';
// import RandomNumber from '../randNum/RandomNumber';
import Winner from '../winner/Winner';

const Gameboard = ({ auth: { user } }) => {
  let elements = document.getElementsByClassName("bingo-square");
  var currentNumber = 0;
  const [redMarker, setRedMarker] = useState(false);
  const [winner, setWinner] = useState(false);

  const didPlayerWin = async (markers) => {
    for (var i = 0; i < markers.length; i++) {
      // 0 1 2 3 4
      // 5 6..
      // 10 ...
      // 15 ...
      // 20
      //
      // Checking horizontally
      if ((i % 5 === 0) && markers[i] && markers[i + 1] && markers[i + 2] && markers[i + 3] && markers[i + 4]) {
        console.log("Winner! horizontal " + i);
        setWinner(true);
        localStorage.setItem('winner', true);
        try {
          const res = await axios.post('/api/cycles/addWinner', { id: 5 });
          console.log('res', res);

        } catch (err) {
          console.log(err)
        }
      }
      // Check Vertically
      if ((i < 5) && markers[i] && markers[i + 5] && markers[i + 10] && markers[i + 15] && markers[i + 20]) {
        // console.log("Winner! vertical " + i);
        setWinner(true);
        try {
          const res = await axios.post('/api/cycles/addWinner', { id: 5 });
          console.log('res', res);

        } catch (err) {
          console.log(err)
        }
      }
      // Check Diagonally
      if ((i === 0) && markers[i] && markers[i + 6] && markers[i + 12] && markers[i + 18] && markers[i + 24]) {
        console.log("Winner! diagonal " + i);
        setWinner(true);
        try {
          const res = await axios.post('/api/cycles/addWinner', { id: 5 });
          console.log('res', res);

        } catch (err) {
          console.log(err)
        }
      } else if ((i === 4) && markers[i] && markers[i + 8] && markers[i + 12] && markers[i + 16] && markers[i + 20]) {
        console.log('Winner! Diagonal ' + i);
        setWinner(true);
        try {
          const res = await axios.post('/api/cycles/addWinner', { id: 5 });
          console.log('res', res);

        } catch (err) {
          console.log(err)
        }
      }
    }
  }

  // fills gameboard
  useEffect(() => {
      const setMarker = async () => {
      const randomObj = await axios.get('/api/randomNumber');
      const cycles = await axios.get('/api/cycles');
      let availableNumbers = await axios.get('/api/drawnNumbers');
      let currentElement;
      let markers = [];
      elements = document.getElementsByClassName("bingo-square");
      elements.className = "bingo-square";
      for (var i = 0; i < elements.length; i++) {
        elements[i].className = "bingo-square";
      }
      availableNumbers = availableNumbers.data.numbers;
      console.log("-----> availableNumbers: " + availableNumbers);
      // console.log("-----> elements: " + elements);
      // console.log("-----> elements.length: " + elements.length);
      if (!winner) {
        for (var i = 0; i < elements.length; i++) {
          currentElement = elements[i];
          currentNumber = Number(currentElement.innerHTML);
          // console.log("currentNumber: " + currentNumber);
          // console.log("availableNumbers.include: " + availableNumbers.includes(currentNumber));
          if (!availableNumbers.includes(currentNumber)) {
            elements[i].classList.add("redCell");
            setRedMarker(true);
            markers[i] = true;
          }
        }
      }
      // check winning condition
      didPlayerWin(markers);
    }
    setMarker();
  }, [redMarker])

  const isWinner = winner;
  let winnerMessage;
  if (isWinner) {
    winnerMessage = <Winner />
  }

  return (
    <div>
      <span>
        <br />
        {winnerMessage}
      </span>
      <div className="gameboard">
        <table>
          <tbody>
            <tr>
              <th className="gameboard-top-row"><h2>B</h2></th>
              <th className="gameboard-top-row"><h2>I</h2></th>
              <th className="gameboard-top-row"><h2>N</h2></th>
              <th className="gameboard-top-row"><h2>G</h2></th>
              <th className="gameboard-top-row"><h2>O</h2></th>
            </tr>
            <tr className="b-column">
              <th id="b1" className="bingo-square">{user && user.cardNumbers[0]}</th>
              <th id="i1" className="bingo-square">{user && user.cardNumbers[5]}</th>
              <th id="n1" className="bingo-square">{user && user.cardNumbers[10]}</th>
              <th id="g1" className="bingo-square">{user && user.cardNumbers[15]}</th>
              <th id="o1" className="bingo-square">{user && user.cardNumbers[20]}</th>
            </tr>
            <tr className="i-column">
              <th id="b2" className="bingo-square">{user && user.cardNumbers[1]}</th>
              <th id="i2" className="bingo-square">{user && user.cardNumbers[6]}</th>
              <th id="n2" className="bingo-square">{user && user.cardNumbers[11]}</th>
              <th id="g2" className="bingo-square">{user && user.cardNumbers[16]}</th>
              <th id="o2" className="bingo-square">{user && user.cardNumbers[21]}</th>
            </tr>
            <tr className="n-column">
              <th id="b3" className="bingo-square">{user && user.cardNumbers[2]}</th>
              <th id="i3" className="bingo-square">{user && user.cardNumbers[7]}</th>
              <th id="n3" className="bingo-square">Free</th>
              <th id="g3" className="bingo-square">{user && user.cardNumbers[17]}</th>
              <th id="o3" className="bingo-square">{user && user.cardNumbers[22]}</th>
            </tr>
            <tr className="g-column">
              <th id="b4" className="bingo-square">{user && user.cardNumbers[3]}</th>
              <th id="i4" className="bingo-square">{user && user.cardNumbers[8]}</th>
              <th id="n4" className="bingo-square">{user && user.cardNumbers[13]}</th>
              <th id="g4" className="bingo-square">{user && user.cardNumbers[18]}</th>
              <th id="o4" className="bingo-square">{user && user.cardNumbers[23]}</th>
            </tr>
            <tr className="o-column">
              <th id="b5" className="bingo-square">{user && user.cardNumbers[4]}</th>
              <th id="i5" className="bingo-square">{user && user.cardNumbers[9]}</th>
              <th id="n5" className="bingo-square">{user && user.cardNumbers[14]}</th>
              <th id="g5" className="bingo-square">{user && user.cardNumbers[19]}</th>
              <th id="o5" className="bingo-square">{user && user.cardNumbers[24]}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

Gameboard.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps, {})(Gameboard)

