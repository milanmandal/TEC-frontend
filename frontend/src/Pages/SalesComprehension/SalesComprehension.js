import React, { Component } from 'react'
import Comprehension from '../../Components/Comprehension/Comprehension';

import './SalesComprehension.Styles.css'
import Axios from 'axios';

export default class SalesComprehension extends Component {
    constructor(){
        super()
        this.state={
            salesComprehension: ''
        }
    }

    componentDidMount(){
        Axios.get('http://localhost:5000/company/info')
        .then(res => res.data.map( company => company.name === this.props.match.params.companyName ?
                this.setState({salesComprehension: company.sales})
                : console.log()
            ))
    }

    render() {
        if(sessionStorage.usertoken)
        {
            return (
                this.state.salesComprehension ? 
                <div className='sales-comprehension-page'>
                <Comprehension comprehensionName='sales' comprehension={this.state.salesComprehension} redirect={this.props.match.url+'Questions'} />
                </div>
                : <div className='loading'>Loading...</div>
            )
        }
        else{window.location='/';}
    }
}
