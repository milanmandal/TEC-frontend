import React from 'react';

import './CompanyCard.Styles.css'

const CompanyCard = ({onclick, company, index}) => {
    const {name, data} = company
    return(
        <div id={index} onClick={onclick} className='company-card'>
            <h1 className='heading'>{name.toUpperCase()}</h1>
            <h3>Rs. {data[data.length-1].price}</h3>
        </div>
    )
}

export default CompanyCard;