import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import './QuestionCard.Styles.css';
import { setScore, updateScore } from '../../Redux/User/UserActions';
import Axios from 'axios';
import url from '../Url/Url';

const QuestionCard = ({ questionDetails, index, currentUser, updateScore, questions, setScore }) => {
    useEffect(() => {
        if (eval('currentUser.currentUser.q' + (index + 1)) === 1) {
            var div = document.getElementById(questions[index]._id)
            div.classList.remove('hover')
            var form = document.getElementById(questions[index]._id + 'form')
            var elements = form.elements
            for (var i = 0; i < elements.length; i++) {
                elements[i].disabled = true
            }
        }
    })
    const { _id, question, answer } = questionDetails;

    const options = [questionDetails.option1, questionDetails.option2, questionDetails.option3, questionDetails.option4]

    const response = []

    const result = []

    const onChangeMcqs = (e) => {
        const { name, value } = e.target;
        const data = { name, value }
        response.push(data)
    }

    const onSubmitMcqs = (e) => {
        e.preventDefault();
        const respons = response[response.length - 1];
        if (respons) {
            respons.value === answer ? result.push(true) : result.push(false)
            const question = {
                flag: 1  //answered
            }
            Axios.post(url + 'user/question/' + parseInt(index + 1) + '/' + currentUser.currentUser._id, question)
            if (result[result.length - 1] === true) {
                updateScore(currentUser.score)
                const points = currentUser.score === 0 ?
                    {
                        score1: currentUser.currentUser.score1 + 1000
                    } : {
                        score1: currentUser.score + 1000
                    }
                var id = currentUser.currentUser._id;
                Axios.post(url + 'user/score1/' + id, points)
            }
            var div = document.getElementById(respons.name)
            var form = document.getElementById(respons.name + 'form')
            var elements = form.elements
            div.classList.remove('hover')
            for (var i = 0; i < elements.length; i++) {
                elements[i].disabled = true
                if (elements[i].value === respons.value) {
                    elements[i].style.opacity = 0.2
                } else {
                    elements[i].style.opacity = 0.7
                }
            }
        }
    }
    return (
        <div>
            <div id={_id} className='mcq-container hover'>
                <div className='mcq' onChange={onChangeMcqs}>
                    {index < 9 ? <h2>0{index + 1}</h2> : <h2>{index + 1}</h2>}
                    <h3>{question}</h3>
                    <form id={_id + 'form'} onSubmit={onSubmitMcqs}>
                        {
                            options.map((option, index) =>
                                <div className='options' key={index + 1}>
                                    <label htmlFor={_id + index}><input type='radio' id={_id + index} name={_id} value={String.fromCharCode(97 + index)} />{option.toUpperCase()}</label>
                                </div>)
                        }
                        <button type='submit' id='submit-btn'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentUser: state.user
});

const mapDispatchToProps = dispatch => ({
    updateScore: score => dispatch(updateScore(score)),
    setScore: score => dispatch(setScore(score))
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);