import React from 'react';
import { Link } from 'react-router-dom';

import './Comprehension.Styles.css';

import Header from '../Header/Header';
import Body from '../Body/Body';

 const Comprehension = ({comprehensionName, redirect, comprehension}) => {
    return (
        <div className='comprehension-page'>
            <div className='comprehension-image' >
                <img src={require('../../Assets/'+comprehensionName+'.svg')} alt='ComprehensionImage'/>
            </div>
            <div className='comprehension'>
                <Header heading={comprehensionName+' Comprehension'} />
                <Body body={comprehension} />
                <div className='button'>
                    <Link to={redirect}><button>Questions</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Comprehension;
