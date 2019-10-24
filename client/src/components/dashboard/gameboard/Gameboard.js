import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import { loadUser } from '../../../actions/auth';
import PropTypes from 'prop-types';
import axios from 'axios';
// import RandomNumber from '../randNum/RandomNumber';
import Winner from '../winner/Winner';

const Gameboard = ({ auth: { user } }) => {
  const elements = document.getElementsByClassName("bingo-square");
  var currentNumber = 0;
  const [redMarker, setRedMarker] = useState(false);

  // fills gameboard
  useEffect(() => {
    const setMarker = async () => {
      let availableNumbers = await axios.get('/api/drawnNumbers');
      let currentElement;
      availableNumbers = availableNumbers.data.numbers;
      // const randomObj = await axios.get('/api/randomNumber');
      console.log("-----> setMarker")
      console.log("-----> availableNumbers: " + availableNumbers);
      for (var i = 0; i < elements.length; i++) {
        currentElement = elements[i];
        currentNumber = Number(currentElement.innerHTML);
        if (!availableNumbers.includes(currentNumber)) {
          elements[i].className = "redCell";
          setRedMarker(true);
        }
      }
    }
    setMarker();
  }, [])


  // alert winner and send exact time to db
  const setWinner = () => {
    if (elements) {

    }
  }

  return (
    <table className="gameboard">
      <tbody>
        <tr>
          <th className="gameboard-top-row" open={redMarker} onClose={() => setRedMarker(false)}><h2>B</h2></th>
          <th className="gameboard-top-row"><h2>I</h2></th>
          <th className="gameboard-top-row"><h2>N</h2></th>
          <th className="gameboard-top-row"><h2>G</h2></th>
          <th className="gameboard-top-row"><h2>O</h2></th>
        </tr>
        <tr className="b-column">
          <th id="b1" className="bingo-square">{ user && user.cardNumbers[0] }</th>
          <th id="i1" className="bingo-square">{ user && user.cardNumbers[5] }</th>
          <th id="n1" className="bingo-square">{ user && user.cardNumbers[10] }</th>
          <th id="g1" className="bingo-square">{ user && user.cardNumbers[15] }</th>
          <th id="o1" className="bingo-square">{ user && user.cardNumbers[20] }</th>
        </tr>
        <tr className="i-column">
          <th id="b2" className="bingo-square">{ user && user.cardNumbers[1] }</th>
          <th id="i2" className="bingo-square">{ user && user.cardNumbers[6] }</th>
          <th id="n2" className="bingo-square">{ user && user.cardNumbers[11] }</th>
          <th id="g2" className="bingo-square">{ user && user.cardNumbers[16] }</th>
          <th id="o2" className="bingo-square">{ user && user.cardNumbers[21] }</th>
        </tr>
        <tr className="n-column">
          <th id="b3" className="bingo-square">{ user && user.cardNumbers[2] }</th>
          <th id="i3" className="bingo-square">{ user && user.cardNumbers[7] }</th>
          <th id="n3" className="bingo-square">Free</th>
          <th id="g3" className="bingo-square">{ user && user.cardNumbers[17] }</th>
          <th id="o3" className="bingo-square">{ user && user.cardNumbers[22] }</th>
        </tr>
        <tr className="g-column">
          <th id="b4" className="bingo-square">{ user && user.cardNumbers[3] }</th>
          <th id="i4" className="bingo-square">{ user && user.cardNumbers[8] }</th>
          <th id="n4" className="bingo-square">{ user && user.cardNumbers[13] }</th>
          <th id="g4" className="bingo-square">{ user && user.cardNumbers[18] }</th>
          <th id="o4" className="bingo-square">{ user && user.cardNumbers[23] }</th>
        </tr>
        <tr className="o-column">
          <th id="b5" className="bingo-square">{ user && user.cardNumbers[4] }</th>
          <th id="i5" className="bingo-square">{ user && user.cardNumbers[9] }</th>
          <th id="n5" className="bingo-square">{ user && user.cardNumbers[14] }</th>
          <th id="g5" className="bingo-square">{ user && user.cardNumbers[19] }</th>
          <th id="o5" className="bingo-square">{ user && user.cardNumbers[24] }</th>
        </tr>
      </tbody>
    </table>
  )
}

Gameboard.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps, {})(Gameboard)

