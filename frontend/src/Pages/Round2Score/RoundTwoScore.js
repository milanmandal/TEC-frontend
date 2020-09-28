import Axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import url from '../../Components/Url/Url';

import './RoundTwoScore.Styles.css'

class RoundTwoScore extends Component {
    constructor() {
        super()
        this.state = {
            control: 0
        }
    }

    componentDidMount() {
        const route = {
            path: '/round2/score',
        }
        Axios.post(url + 'user/path/' + this.props.currentUser.currentUser._id, route)
        Axios.get(url + 'admin/control')
            .then(response => {
                if (response.data[0].round3 === '1') {
                    this.setState({ control: 1 });
                }
            })
    }

    nextRound = () => {
        if (this.state.control === 1) {
            sessionStorage.setItem('round', 'round3')
            window.location = '/round3/rules/' + this.props.currentUser.currentUser._id
        }
        else {
            toast.error("Round 3 is yet to start!", { className: 'round2-toast', position: toast.POSITION.TOP_CENTER })
            Axios.get(url + 'admin/control')
                .then(response => {
                    if (response.data[0].round3 === '1') {
                        this.setState({ control: 1 });
                    }
                })
        }
    }

    render() {
        if (sessionStorage.usertoken && this.props.currentUser.currentUser) {
            return (
                <div className='round2_score'>
                    <button onClick={this.nextRound}>Round 3</button>
                </div>
            )
        }
        else {
            window.location = '/';
        }
    }
}


const mapStateToProps = (state) => ({
    currentUser: state.user
})

export default connect(mapStateToProps)(RoundTwoScore);