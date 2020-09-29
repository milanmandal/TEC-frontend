import React, { Component } from 'react';

import './NavBar.Styles.css';
import Timer from '../Timer/Timer';

class NavBar extends Component {
    render() {
        if (sessionStorage.round) {
            return (
                <div className='navbar'>
                    <img src={require('../../Assets/logo.png')} alt='logo' />
                    <div className='text'>BUSINESS IDEAS 2.0</div>
                    <button onClick={() => {
                        window.location = '/';
                        sessionStorage.clear()
                    }} className='logout-btn'>LogOut</button>
                    <div className='timer'>
                        <Timer />
                    </div>
                </div>
            )
        }
        else return (null)
    }
}

export default NavBar