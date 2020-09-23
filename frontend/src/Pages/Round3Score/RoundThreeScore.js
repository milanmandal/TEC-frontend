import Axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux';

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
        Axios.post('http://localhost:5000/user/path/' + this.props.currentUser.currentUser._id, route)
    }

    render() {
        Axios.get('http://localhost:5000/user/' + this.props.currentUser.currentUser._id)
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
        if (sessionStorage.usertoken && this.props.currentUser.currentUser) {
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