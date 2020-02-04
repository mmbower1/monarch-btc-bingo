import React from 'react';
// styles
import { CountdownContainer } from './Countdown.styles';
// import axios from 'axios';

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
        if (count === -1) {
            this.setState({ count: 5 });
        }

        return (
            <CountdownContainer>
                Next Game Begins!: {count}
            </CountdownContainer>
        )
    }
}

export default Countdown;
