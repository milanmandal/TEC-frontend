import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Comprehension.Styles.css';

import Header from '../Header/Header';
import Body from '../Body/Body';
import { connect } from 'react-redux';
import Axios from 'axios';

import { setCurrentUser } from '../../Redux/User/UserActions';
import url from '../Url/Url';

const Comprehension = ({ currentPath, comprehensionName, redirect, comprehension, currentUser, company }) => {
    useEffect(() => {
        const route = {
            path: currentPath,
        }
        Axios.post(url + 'user/path/' + currentUser.currentUser._id, route)
        const question = {
            flag: 0 //Unanswered
        }
        Axios.post(url + 'user/reset/' + currentUser.currentUser._id, question)
        window.history.pushState(null, null, '/')
    })

    useEffect(() => {
        Axios.get(url + 'user/' + currentUser.currentUser._id)
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
        <div className='comprehension-page'>
            <div className='comprehension-image' >
                <img src={require('../../Assets/' + comprehensionName + '.svg')} alt='ComprehensionImage' />
            </div>
            <div className='comprehension'>
                <Header heading={comprehensionName + ' Comprehension'} />
                <Body body={comprehension} name={comprehensionName} company={company} />
                <div className='button'>
                    <Link to={redirect}><button>Questions</button></Link>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Comprehension);
