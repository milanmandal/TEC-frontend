import React from 'react';

import './ComprehensionQuestions.Styles.css';

import QuestionCard from '../QuestionCard/QuestionCard'

const ComprehensionQuestions = ({ questions }) => {
    return (
        <div className='mcqs-container'>
            <div className='mcq-questions'>
                {questions.map((que, ind) => <QuestionCard questions={questions} key={que._id} index={ind} questionDetails={que}></QuestionCard>)}
            </div>
        </div>
    )
}

export default ComprehensionQuestions;