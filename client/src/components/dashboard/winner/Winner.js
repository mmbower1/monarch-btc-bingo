import React from 'react'
import moment from 'moment'

const Winner = () => {
    return (
        <div className="bingo-winner">
            <i className="fas fa-trophy"></i> BINGO WINNER
            @ {moment().format('MMMM Do YYYY, h:mm:ss a')}
        </div>
    )
}

export default Winner
