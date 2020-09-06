import React, { Component } from 'react'
import { connect } from 'react-redux';

import ScoreCard from '../../Components/ScoreCard/ScoreCard';

class RoundTwoScore extends Component{
    render(){
        if(sessionStorage.usertoken){
            return (
                <React.Fragment>
                    <ScoreCard
                        redirect={'/round3/rules/'+this.props.currentUser.currentUser._id}
                        score={this.props.currentUser.score}
                        round="Round-2"
                        nextRound="Round-3" />
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

export default connect(mapStateToProps)(RoundTwoScore);