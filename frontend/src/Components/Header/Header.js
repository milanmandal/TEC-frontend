import React from 'react';

import './Header.Styles.css';

const Header = ({ heading }) => {
    return (
        <div className='header'>
            {
                heading.toUpperCase() === 'LNT' ?
                    <h1 className='title'>L&T</h1> :
                    <h1 className='title'>{heading.toUpperCase()}</h1>
            }
        </div>
    )
}

export default Header;