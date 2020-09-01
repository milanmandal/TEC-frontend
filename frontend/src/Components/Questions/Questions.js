import React from 'react';
import { Link } from 'react-router-dom';

import './Questions.Styles.css';

import Header from '../Header/Header';
import ComprehensionQuestions from '../ComprehensionQuestions/ComprehensionQuestions';

const Questions = ({redirect, questions, questionsName}) => {
    return(
        <div className='questions-page'>
            <Header heading={questionsName} />
            <ComprehensionQuestions questions={questions} />
            <div className='button'>
                <Link to={redirect}><button>Next</button></Link>
            </div>
        </div>
    )
}

export default Questions;