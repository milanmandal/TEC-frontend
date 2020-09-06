import React from 'react'
import { connect } from 'react-redux';

import './ScoreCard.Styles.css'


const ScoreCard = ({redirect, score, round, nextRound}) => {
    const onclick = () => {
        window.location = redirect
    }

    const createSquare = () => {
        const section = document.getElementById('round_score');
        const square = document.createElement('span');
        square.setAttribute('class', 'square')

        var size = Math.random() * 50;
        const colors = [
            '#2ba15f',
            '#f7db69',
            '#f26a44',
            '#ec1b4b',
            '#4cbb17'
        ]

        const bg = colors[Math.floor(Math.random() * colors.length)];

        square.style.width = 20 + size + 'px';
        square.style.height = 20 + size + 'px';

        square.style.top = (Math.random() * window.innerHeight)-100 +'px';
        square.style.bottom = (Math.random() * window.innerHeight)-100 +'px';
        square.style.left = (Math.random() * window.innerWidth)-70 +'px';
        square.style.right = (Math.random() * window.innerWidth)-100 +'px';

        square.style.background = bg;

        if(document.getElementById('round_score')){
            section.appendChild(square)
        }

        setTimeout(() => {
            square.remove() 
        }, 5000)
    }

    setInterval(() => {createSquare()}, 150);
    return (
        <div className='round-one-score-page' id='round_score'>
            <div className='round-one-score'>
                <p className='round-text'>{round} Completed!!</p>
                <p className='score-text'>Your score is</p>
                <p className='score'>Rs. {score}</p>
                <button onClick={onclick}>{nextRound}</button>
            </div>
        </div>
    )
    }

const mapStateToProps = (state) => ({
    currentUser: state.user
})

export default connect(mapStateToProps)(ScoreCard);