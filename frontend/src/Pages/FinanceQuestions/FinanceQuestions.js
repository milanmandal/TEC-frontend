import React, { Component } from 'react';
import Axios from 'axios';
import Questions from '../../Components/Questions/Questions';
import { connect } from 'react-redux';





class FinanceQuestions extends Component {
    constructor(){
        super()
        this.state = {
            financeQuestions: []
        }
    }

    componentDidMount(){

        const route = {
            path:`/comprehension/${this.props.currentUser.currentUser.companyName}/FinanceQuestions`
          }
          Axios.post('http://localhost:5000/path/'+this.props.currentUser.currentUser.id,route)
        
        
        Axios.get('http://localhost:5000/'+this.props.match.params.companyName+'/getfinance',
        {
          headers:{
            "authorization":"Bearer "+sessionStorage.usertoken
          }
        })
        .then(res => this.setState({financeQuestions: res.data}))
        
       
    }

    render() {
        if(sessionStorage.usertoken)
        {
        return (
            
            this.state.financeQuestions ?
            <div>
                <Questions redirect={'/comprehension/'+this.props.match.params.companyName+'/Resdev'} questions={this.state.financeQuestions} questionsName='Finance Questions' />
            </div>
            : <div className='loading'>Loading...</div>
        )
        }
        else{window.location='/'}
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user
})

export default connect(mapStateToProps)(FinanceQuestions);
