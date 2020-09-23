import React, { Component } from 'react';
import Axios from 'axios';
import Questions from '../../Components/Questions/Questions';
import { toast, ToastContainer } from 'react-toastify';

import './ProductionQuestion.Styles.css';
import { connect } from 'react-redux';

class ProductionQuestions extends Component {
    constructor(){
        super()
        this.state = {
            productionQuestions: []
        }
    }

    componentDidMount(){
        toast.warn("You are NOT allowed to CHANGE the answer after submitting")
        Axios.get('http://localhost:5000/'+this.props.match.params.companyName+'/getproduction',
        {
          headers:{
            "authorization":"Bearer "+sessionStorage.usertoken
          }
        })
        .then(res => this.setState({productionQuestions: res.data}))
    }

    render() {
        if(sessionStorage.usertoken && this.props.currentUser.currentUser)
        {
        return (
            this.state.productionQuestions ?
            <div className='questions-page-container'>
                <ToastContainer className='alert' />
                <Questions
                    redirect={'/comprehension/'+this.props.match.params.companyName+'/Finance'}
                    questions={this.state.productionQuestions}
                    questionsName='Production Questions'
                    currentPath={this.props.match.url}
                />
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

export default connect(mapStateToProps)(ProductionQuestions);