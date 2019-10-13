import React from 'react'

const Gameboard = () => {
  return (
    <table className="gameboard">
      <tbody>
        <tr>
          <th className="gameboard-top-row"><h2>B</h2></th>
          <th className="gameboard-top-row"><h2>I</h2></th>
          <th className="gameboard-top-row"><h2>N</h2></th>
          <th className="gameboard-top-row"><h2>G</h2></th>
          <th className="gameboard-top-row"><h2>O</h2></th>
        </tr>
        <tr className="b-column">
          <th id="b1" className="bingo-square">4</th>
          <th id="i1" className="bingo-square">16</th>
          <th id="n1" className="bingo-square">31</th>
          <th id="g1" className="bingo-square">46</th>
          <th id="o1" className="bingo-square">75</th>
        </tr>
        <tr className="i-column"> 
          <th id="b2" className="bingo-square">5</th>
          <th id="i2" className="bingo-square">18</th>
          <th id="n2" className="bingo-square">34</th>
          <th id="g2" className="bingo-square">50</th>
          <th id="o2" className="bingo-square">73</th>
        </tr>
        <tr className="n-column">
          <th id="b3" className="bingo-square">12</th>
          <th id="i3" className="bingo-square">29</th>
          <th id="n3" className="bingo-square">Free</th>
          <th id="g3" className="bingo-square">55</th>
          <th id="o3" className="bingo-square">68</th>
        </tr>
        <tr className="g-column">
          <th id="b4" className="bingo-square">6</th>
          <th id="i4" className="bingo-square">26</th>
          <th id="n4" className="bingo-square">38</th>
          <th id="g4" className="bingo-square">59</th>
          <th id="o4" className="bingo-square">63</th>
        </tr>
        <tr className="o-column">
          <th id="b5" className="bingo-square">1</th>
          <th id="i5" className="bingo-square">20</th>
          <th id="n5" className="bingo-square">42</th>
          <th id="g5" className="bingo-square">52</th>
          <th id="o5" className="bingo-square">64</th>
        </tr>
      </tbody>
    </table>
  )
}

export default Gameboard
