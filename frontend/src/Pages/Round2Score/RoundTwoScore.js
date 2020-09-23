import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios'
import ScoreCard from '../../Components/ScoreCard/ScoreCard';
var control;
class RoundTwoScore extends Component{

    componentDidMount()
    {
        axios.get('http://localhost:5000/admin/control')
        .then(response => {

            console.log(response.data);
            if(response.data[0].round3==='1')
            {
                control = 1;
            }
        }
    }
    render(){
        if(sessionStorage.usertoken && this.props.currentUser.currentUser){
            return (
                <React.Fragment>
                    <ScoreCard
                        redirect={'/round3/rules/'+this.props.currentUser.currentUser._id}
                        score={this.props.currentUser.score}
                        round="Round-2"
                        nextRound="Round-3"
                        control = {control} />
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