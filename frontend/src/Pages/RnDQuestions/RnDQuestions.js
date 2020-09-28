import React, { Component } from 'react';
import Axios from 'axios';
import Questions from '../../Components/Questions/Questions';
import { connect } from 'react-redux';
import url from '../../Components/Url/Url'

class RnDQuestions extends Component {
    constructor() {
        super()
        this.state = {
            rndQuestions: []
        }
    }

    componentDidMount() {
        Axios.get(url + this.props.match.params.companyName + '/getresdev',
            {
                headers: {
                    "authorization": "Bearer " + sessionStorage.usertoken
                }
            })
            .then(res => {
               

                this.setState({ 
                    rndQuestions: res.data 
                })
            })
    }

    render() {
        if (sessionStorage.usertoken && this.props.currentUser.currentUser) {
            return (
                this.state.rndQuestions ?
                    <div className='questions-page-container'>
                        <Questions
                            redirect={'/comprehension/' + this.props.match.params.companyName + '/Sales'}
                            questions={this.state.rndQuestions}
                            questionsName='R&D Questions'
                            domain='resdev'
                            company = {this.props.match.params.companyName}
                            currentPath={this.props.match.url}
                        />
                    </div>
                    : <div className='loading'>Loading...</div>
            )
        }
        else {
            window.location = '/'
            return (null)
        }
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user
})

export default connect(mapStateToProps)(RnDQuestions);