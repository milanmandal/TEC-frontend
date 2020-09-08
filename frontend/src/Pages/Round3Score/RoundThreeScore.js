import React, { Component } from 'react'
import { connect } from 'react-redux';

import ScoreCard from '../../Components/ScoreCard/ScoreCard';

class RoundThreeScore extends Component{
    render(){
        if(sessionStorage.usertoken){
            return (
                <React.Fragment>
                    <ScoreCard
                        redirect={'/scoresheet/'+this.props.currentUser.currentUser._id}
                        score={this.props.currentUser.score}
                        round="Round-3"
                        nextRound="ScoreSheet" />
                </React.Fragment>
            )
        }
        else{
            window.location='/';
        }
    }
}


const mapStateToProps = (state) => ({
    currentUser: state.user
})

export default connect(mapStateToProps)(RoundThreeScore);