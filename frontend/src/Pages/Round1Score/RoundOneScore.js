import React, { Component } from 'react'
import { connect } from 'react-redux';
import Axios from 'axios'

import ScoreCard from '../../Components/ScoreCard/ScoreCard';

import url from '../../Components/Url/Url'

class RoundOneScore extends Component {
    constructor() {
        super()
        this.state = {
            round1Score: 0,
            control: 0
        }
    }
    componentDidMount() {
        sessionStorage.setItem('round', 'round2')
        const route = {
            path: '/round1/score',
        }
        Axios.post(url + 'user/path/' + this.props.currentUser.currentUser._id, route)

        Axios.get(url + 'user/' + this.props.currentUser.currentUser._id)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        round1Score: response.data.score1
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })

        Axios.get(url + 'admin/control')
            .then(response => {
                if (response.data[0].round2 === '1') {
                    this.setState({ control: 1 });
                }
            }
            )
    }


    render() {
        if (sessionStorage.usertoken && this.props.currentUser.currentUser) {
            return (
                <React.Fragment>
                    <ScoreCard
                        redirect={'/round2/rules/' + this.props.currentUser.currentUser._id}
                        score={this.state.round1Score}
                        round="Round-1"
                        nextRound="Round-2"
                        control={this.state.control} />
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

export default connect(mapStateToProps)(RoundOneScore);