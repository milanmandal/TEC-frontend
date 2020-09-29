import React, { Component } from 'react';
import Axios from 'axios';
import Questions from '../../Components/Questions/Questions';
import { connect } from 'react-redux';
import url from '../../Components/Url/Url'

class FinanceQuestions extends Component {
    constructor() {
        super()
        this.state = {
            financeQuestions: []
        }
    }

    componentDidMount() {
        Axios.get(url + '' + this.props.match.params.companyName + '/getfinance',
            {
                headers: {
                    "authorization": "Bearer " + sessionStorage.usertoken
                }
            })
            .then(res => this.setState({ financeQuestions: res.data }))
    }

    render() {
        if (sessionStorage.usertoken && this.props.currentUser.currentUser) {
            return (

                this.state.financeQuestions ?
                    <div className='questions-page-container'>
                        <Questions
                            redirect={'/comprehension/' + this.props.match.params.companyName + '/Resdev'}
                            questions={this.state.financeQuestions}
                            questionsName='Finance Questions'
                            currentPath={this.props.match.url}
                        />
                    </div>
                    : <div className='loading'>Loading...</div>
            )
        }
        else { window.location = '/' }
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user
})

export default connect(mapStateToProps)(FinanceQuestions);
