import React, { useEffect } from 'react';
import Axios from 'axios'

import './Crisis.Styles.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateScoreCrisis } from '../../Redux/User/UserActions';

const Crisis = ({ heading, crisis, question, options, redirect, currentUser, updateScoreCrisis, currentPath }) => {

    const response = []
    let score = 0

    const onchange = (e) => {
        const { name, value } = e.target;
        const data = { name, value }
        response.push(data)
    }
    useEffect(() => {
        Axios.get('http://localhost:5000/user/' + currentUser.currentUser._id)
            .then(response => {
                if (response.status === 200) {
                    score = response.data.score3;
                }
            })
            .catch((error) => {
                console.log(error);
            })

        const route = {
            path: currentPath,
        }
        Axios.post('http://localhost:5000/user/path/' + currentUser.currentUser._id, route)
        window.history.pushState(null, null, '/')
    })
    const onsubmit = (e) => {
        e.preventDefault();
        document.getElementById('redirect').click()
        if (response.length > 0) {
            const respons = response[response.length - 1];
            updateScoreCrisis({ currentScore: currentUser.score, addScore: respons.value })
            score = score + parseInt(respons.value)
            const points = {

                score3: currentUser.score + currentUser.currentUser.score3 + parseInt(respons.value),

            }
            var id = currentUser.currentUser._id;
            Axios.post('http://localhost:5000/user/score3/' + id, points)
        }
    }

    function rankToScore(rank) {
        switch (rank) {
            case 1:
                return 10000;
            case 2:
                return 6000;
            case 3:
                return 4000;
            case 4:
                return 0;
            default:
                return 0;
        }

    }

    return (
        <div className='crisis-container' onChange={onchange}>
            <h1>{heading.toUpperCase()}</h1>
            <div className='crisis'>
                {
                    crisis.split('#').map((para, index) => <p key={index}>{para}</p>)
                }
                <p className='question'>{question}</p>
            </div>
            <form onSubmit={onsubmit}>
                {
                    options.map((option, index) => <div className='options' key={index + 1}><input type='radio' name='prod-crisis-1' value={rankToScore(option.rank)} /><label>{option.option}</label></div>)
                }
                <button type='submit' id='submit'>Submit</button>
            </form>
            <Link to={redirect}><button id='redirect'></button></Link>
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentUser: state.user
});

const mapDispatchToProps = dispatch => ({
    updateScoreCrisis: score => dispatch(updateScoreCrisis(score))
});

export default connect(mapStateToProps, mapDispatchToProps)(Crisis);