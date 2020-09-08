import React, { Component } from 'react';
import Axios from 'axios';
import Questions from '../../Components/Questions/Questions';
import { connect } from 'react-redux';


const mapStateToProps = (state) => ({
    currentUser: state.user
})
class RnDQuestions extends Component {
    constructor(){
        super()
        this.state = {
            rndQuestions: []
        }
    }

    componentDidMount(){
        const route = {
            path:`/comprehension/${this.props.currentUser.currentUser.companyName}/ResdevQuestions`,
          }
          Axios.post('http://localhost:5000/path/'+this.props.currentUser.currentUser.id,route)


        Axios.get('http://localhost:5000/'+this.props.match.params.companyName+'/getresdev',
        {
          headers:{
            "authorization":"Bearer "+sessionStorage.usertoken
          }
        })
        .then(res => this.setState({rndQuestions: res.data}))
    }

    render() {
        if(sessionStorage.usertoken)
        {
        return (
            this.state.rndQuestions ?
            <div>
                <Questions redirect={'/comprehension/'+this.props.match.params.companyName+'/Sales'} questions={this.state.rndQuestions} questionsName='R&D Questions' />
            </div>
            : <div className='loading'>Loading...</div>
        )
        }
        else{
            window.location='/'
            return(null)
        }
    }
}



export default connect(mapStateToProps)(RnDQuestions);