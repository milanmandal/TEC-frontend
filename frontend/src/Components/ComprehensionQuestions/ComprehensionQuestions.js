import React from 'react';

import './ComprehensionQuestions.Styles.css';

import QuestionCard from '../QuestionCard/QuestionCard'

const ComprehensionQuestions = ({ questions, company, domain }) => {
    return (
        <div className='mcqs-container'>
            <div className='mcq-questions'>
                {questions.map((que, ind) => <QuestionCard questions={questions} key={que._id} index={ind} questionDetails={que}  company = {company} domain={domain}></QuestionCard>)}
            </div>
        </div>
    )
}

export default ComprehensionQuestions;