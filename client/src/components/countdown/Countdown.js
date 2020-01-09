import React, { Component } from 'react';
// styles
import { CountdownContainer, ClockContainer } from './Countdown.styles';

class Countdown extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            count: 5
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState(prevState => ({
                count: prevState.count - 1
            }))
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { count } = this.state;
        return (
            <CountdownContainer>
                Next Game Begins!: {count}
            </CountdownContainer>
        )
    }
}

export default Countdown;
