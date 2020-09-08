import React, { Component } from 'react';
import Axios from 'axios';
import Questions from '../../Components/Questions/Questions';
import { connect } from 'react-redux';



class SalesQuestions extends Component {
    constructor(){
        super()
        this.state = {
            salesQuestions: []
        }
    }

    componentDidMount(){
        const route = {
            path:`/comprehension/${this.props.currentUser.currentUser.companyName}/SalesQuestions`,
          }
          Axios.post('http://localhost:5000/path/'+this.props.currentUser.currentUser.id,route)


        Axios.get('http://localhost:5000/'+this.props.match.params.companyName+'/getsales',
        {
          headers:{
            "authorization":"Bearer "+sessionStorage.usertoken
          }
        })
        .then(res => this.setState({salesQuestions: res.data}))
    }

    render() {
        if(sessionStorage.usertoken)
        {
            return (
                this.state.salesQuestions ?
                <div>
                    <Questions redirect={'/round1/score'} questions={this.state.salesQuestions} questionsName='Sales Questions' />
                </div>
                : <div className='loading'>Loading...</div>
            )
        }
        else{window.location='/';}
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user
})

export default connect(mapStateToProps)(SalesQuestions);