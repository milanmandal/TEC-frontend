import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { setCurrentUser } from '../../Redux/User/UserActions';

import './Questions.Styles.css';

import Header from '../Header/Header';
import ComprehensionQuestions from '../ComprehensionQuestions/ComprehensionQuestions';
import { connect } from 'react-redux';
import Axios from 'axios';

const Questions = ({ redirect, questions, questionsName, currentUser, currentPath, setCurrentUser }) => {
    useEffect(() => {
        const route = {
            path: currentPath,
        }
        Axios.post('http://localhost:5000/user/path/' + currentUser.currentUser._id, route)
        window.history.pushState(null, null, '/')
    })

    useEffect(() => {
        Axios.get('http://localhost:5000/user/' + currentUser.currentUser._id)
            .then(response => {
                if (response.status === 200) {
                    setCurrentUser(response.data)
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }, [])

    return (
        <div className='questions-page'>
            <Header heading={questionsName} />
            <ComprehensionQuestions questions={questions} />
            <div className='button'>
                <Link to={redirect}><button>Next</button></Link>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentUser: state.user
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);