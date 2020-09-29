import React, { useEffect, useState } from 'react';

import './Body.Styles.css';

const Body = ({ body, company, name }) => {
    const paragraphs = body.split('#')
    const [image1, setImage1] = useState(null)
    const [image2, setImage2] = useState(null)
    useEffect(() => {
        try {
            const imageOne = require('../../Assets/' + company + name + '1.png')
            setImage1(imageOne)
        }
        catch (err) { }
        try {
            const imageTwo = require('../../Assets/' + company + name + '2.png')
            setImage2(imageTwo)
        }
        catch (err) { }

        window.history.pushState(null, null, '/')
    }, [])

    if (company && name) {
        const set1 = paragraphs.slice(0, 1)
        const set2 = paragraphs.slice(1, 3)
        const set3 = paragraphs.slice(3, paragraphs.length)
        return (
            <div className='body'>
                {set1.map((para, ind) => <p key={ind}>{para}</p>)}
                {image1 ?
                    <p>
                        <img id='img1' src={image1} alt='ComprehensionImage' />
                        {set2[0]}
                    </p>
                    :
                    <p>{set2[0]}</p>
                }
                {set2.slice(1).map((para, ind) => <p key={ind}>{para}</p>)}
                {image2 ?
                    <p>
                        <img id='img2' src={image2} alt='ComprehensionImage' />
                        {set3[0]}
                    </p>
                    :
                    <p>{set3[0]}</p>
                }
                {set3.slice(1).map((para, ind) => <p key={ind}>{para}</p>)}
            </div>
        )
    } else {
        return (
            <div className='body'>
                {paragraphs.map((para, ind) => <p key={ind}>{para}</p>)}
            </div>
        )
    }
}

export default Body;