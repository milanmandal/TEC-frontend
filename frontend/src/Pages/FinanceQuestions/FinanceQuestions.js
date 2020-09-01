import React, { Component } from 'react';
import Axios from 'axios';
import Questions from '../../Components/Questions/Questions';

export default class FinanceQuestions extends Component {
    constructor(){
        super()
        this.state = {
            financeQuestions: []
        }
    }

    componentDidMount(){
        
        
        Axios.get('http://localhost:5000/'+this.props.match.params.companyName+'/getfinance')
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
