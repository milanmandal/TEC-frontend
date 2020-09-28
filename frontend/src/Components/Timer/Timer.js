import React, { Component } from 'react';

import Countdown from 'react-countdown';

import './Timer.Styles.css'
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import url from '../Url/Url';

class Timer extends Component {
    constructor() {
        super()
        this.state = {
            round1Time: '',
            round2Time: '',
            round3Time: ''
        }
    }
    componentDidMount() {
        Axios.get(url + 'admin/gettimer')
            .then(res => this.setState({
                round1Time: res.data[0].round1,
                round2Time: res.data[0].round2,
                round3Time: res.data[0].round3
            }))
    }
    render() {
        if (sessionStorage.round === 'round1' && this.state.round1Time) {
            const date = Date.parse(new Date(this.state.round1Time))
            return (
                <Countdown Countdown date={date} daysInHours={true}>
                    {
                        <Redirect to='/round1/score' />
                    }
                </Countdown>
            )
        }

        if (sessionStorage.round === 'round2' && this.state.round2Time) {
            const date = Date.parse(new Date(this.state.round2Time))
            return (
                <Countdown Countdown date={date} daysInHours={true}>
                    {
                        <Redirect to='/round2/score' />
                    }
                </Countdown>
            )
        }

        if (sessionStorage.round === 'round3' && this.state.round3Time) {
            const date = Date.parse(new Date(this.state.round3Time))
            return (
                <Countdown Countdown date={date} daysInHours={true} >
                    {
                        <Redirect to='/round3/score' />
                    }
                </Countdown>
            )
        }
        else {
            return (null)
        }
    }
}


export default Timer;