import React from 'react';

import './Header.Styles.css';

const Header = ({ heading }) => {
    return(
        <div className='header'>
            <h1 className='title'>{heading.toUpperCase()}</h1>
        </div>
    )
}

export default Header;