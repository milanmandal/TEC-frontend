import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { setCurrentUser, setScore } from '../../Redux/User/UserActions';

import './Questions.Styles.css';

import Header from '../Header/Header';
import ComprehensionQuestions from '../ComprehensionQuestions/ComprehensionQuestions';
import { connect } from 'react-redux';
import Axios from 'axios';
import url from '../Url/Url';

const Questions = ({ redirect, questions, questionsName, currentUser, currentPath, setCurrentUser, setScore }) => {
    useEffect(() => {
        const route = {
            path: currentPath,
        }
        Axios.post(url + 'user/path/' + currentUser.currentUser._id, route)
        window.history.pushState(null, null, '/')
    })

    useEffect(() => {
        window.scrollTo(0, 0)
        Axios.get(url + 'user/' + currentUser.currentUser._id)
            .then(response => {
                if (response.status === 200) {
                    setCurrentUser(response.data)
                    setScore(response.data.score1)
                }
            })
            .catch((error) => {
                console.log(error);
            })

        window.history.pushState(null, null, '/')
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
    setCurrentUser: user => dispatch(setCurrentUser(user)),
    setScore: score => dispatch(setScore(score))
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);