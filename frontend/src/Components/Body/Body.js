import React from 'react';

import './Body.Styles.css';

const Body = ({ body }) => {
    const paragraphs = body.split('#')
    return(
        <div className='body'>
            {paragraphs.map((para, ind) => <p key={ind}>{para}</p>)}
        </div>
    )
}

export default Body;