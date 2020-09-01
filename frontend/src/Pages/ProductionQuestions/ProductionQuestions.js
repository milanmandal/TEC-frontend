import React, { Component } from 'react';
import Axios from 'axios';
import Questions from '../../Components/Questions/Questions';
import { toast, ToastContainer } from 'react-toastify';

import './ProductionQuestion.Styles.css'

export default class ProductionQuestions extends Component {
    constructor(){
        super()
        this.state = {
            productionQuestions: []
        }
    }

    componentDidMount(){
        toast.warn("You are NOT allowed to CHANGE the answer after submitting")
        Axios.get('http://localhost:5000/'+this.props.match.params.companyName+'/getproduction')
        .then(res => this.setState({productionQuestions: res.data}))
    }

    render() {
        if(sessionStorage.usertoken)
        {
        return (
            this.state.productionQuestions ?
            <div>
                <ToastContainer className='alert' />
                <Questions redirect={'/comprehension/'+this.props.match.params.companyName+'/Finance'} questions={this.state.productionQuestions} questionsName='Production Questions' />
            </div>
            : <div className='loading'>Loading...</div>
        )
        }
        else{window.location='/';}
    }
}
