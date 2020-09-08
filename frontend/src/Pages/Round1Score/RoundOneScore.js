import React, { Component } from 'react'
import { connect } from 'react-redux';
import Axios from 'axios'

import ScoreCard from '../../Components/ScoreCard/ScoreCard';



class RoundOneScore extends Component{



    componentDidMount(){
        const route = {
          path:'/round1/score',
        }
        Axios.post('http://localhost:5000/path/'+this.props.currentUser.currentUser.id,route)
    }


    render(){
        if(sessionStorage.usertoken){
            return (
                <React.Fragment>
                    <ScoreCard
                        redirect={'/round2/rules/'+this.props.currentUser.currentUser._id}
                        score={this.props.currentUser.score}
                        round="Round-1"
                        nextRound="Round-2" />
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

export default connect(mapStateToProps)(RoundOneScore);