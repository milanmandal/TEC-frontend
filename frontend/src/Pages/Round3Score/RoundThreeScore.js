import Axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import url from '../../Components/Url/Url'

import ScoreCard from '../../Components/ScoreCard/ScoreCard';

class RoundThreeScore extends Component {
    constructor() {
        super()
        this.state = {
            round3Score: 0
        }
    }

    componentDidMount() {
        const route = {
            path: '/round3/score',
        }
        Axios.post(url + 'user/path/' + this.props.currentUser.currentUser._id, route)
    }

    render() {
        if (sessionStorage.usertoken && this.props.currentUser.currentUser) {
            Axios.get(url + 'user/' + this.props.currentUser.currentUser._id)
                .then(response => {
                    if (response.status === 200) {
                        this.setState({
                            round3Score: response.data.score3
                        })
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
            return (
                <React.Fragment>
                    <ScoreCard
                        redirect={'/scoresheet/' + this.props.currentUser.currentUser._id}
                        score={this.state.round3Score}
                        round="Round-3"
                        nextRound="ScoreSheet" />
                </React.Fragment>
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

export default connect(mapStateToProps)(RoundThreeScore);