import React from 'react'
import moment from 'moment'

const Winner = () => {
    return (
        <div>
            BINGO WINNER! @ {moment().format('MMMM Do YYYY, h:mm:ss a')}
        </div>
    )
}

export default Winner
