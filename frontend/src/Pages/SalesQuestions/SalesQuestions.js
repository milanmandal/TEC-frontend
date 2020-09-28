import React, { Component } from 'react';
import Axios from 'axios';
import Questions from '../../Components/Questions/Questions';
import { connect } from 'react-redux';
import url from '../../Components/Url/Url';

class SalesQuestions extends Component {
    constructor() {
        super()
        this.state = {
            salesQuestions: []
        }
    }

    componentDidMount() {
        Axios.get(url + this.props.match.params.companyName + '/getsales',
            {
                headers: {
                    "authorization": "Bearer " + sessionStorage.usertoken
                }
            })
            .then(res => {
                

                this.setState({ 
                    salesQuestions: res.data 
                })
            })
    }

    render() {
        if (sessionStorage.usertoken && this.props.currentUser.currentUser) {
            return (
                this.state.salesQuestions ?
                    <div className='questions-page-container'>
                        <Questions
                            redirect={'/round1/score'}
                            questions={this.state.salesQuestions}
                            questionsName='Sales Questions'
                            domain = 'sales'
                            company = {this.props.match.params.companyName}
                            currentPath={this.props.match.url}
                        />
                    </div>
                    : <div className='loading'>Loading...</div>
            )
        }
        else { window.location = '/'; }
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user
})

export default connect(mapStateToProps)(SalesQuestions);