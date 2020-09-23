import React, { Component } from 'react';

import './NavBar.Styles.css';
import Timer from '../Timer/Timer';

class NavBar extends Component {
    render() {
        return (
            <div className='navbar'>
                <button onClick={() => window.location = '/'} className='logout-btn'>LogOut</button>
                <div className='timer'>
                    {window.location.pathname.substr(1, 5) === 'intro' ? <Timer time={3600} currentPath='round1' /> : null}
                    {window.location.pathname.substr(1, 6) === 'round2' ? <Timer time={2700} currentPath='round2' /> : null}
                    {window.location.pathname.substr(1, 6) === 'round3' ? <Timer time={3600} currentPath='round3' /> : null}
                </div>
            </div>
        )
    }
}

export default NavBar