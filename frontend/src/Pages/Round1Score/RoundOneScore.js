import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'

import './RoundOneScore.Styles.css'

class RoundOneScore extends Component{
    onclick = () => {
        window.location = '/round3/rules/'+this.props.currentUser.currentUser._id
    }

    createSquare = () => {
        const section = document.getElementById('root');
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

        section.appendChild(square)

        setTimeout(() => {
            square.remove() 
        }, 5000)
    }
    
    render(){
        setInterval(() => {this.createSquare()}, 150);
        if(sessionStorage.usertoken){
            return (
                <div className='round-one-score-page'>
                    <div className='round-one-score'>
                        <p className='round-text'>Round-1 Completed!!</p>
                        <p className='score-text'>Your score is</p>
                        <p className='score'>Rs. {this.props.currentUser.score-1000}</p>
                        <button ><Link to={'/round3/rules/'+this.props.currentUser.currentUser._id}>Round-2</Link></button>
                    </div>
                </div>
            )
        }
        else{
            window.location='/';
        }
    }
}


const mapStateToProps = (state) => ({
    currentUser: state.user
})

export default connect(mapStateToProps)(RoundOneScore);