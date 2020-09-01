import React, { Component } from 'react'
import Comprehension from '../../Components/Comprehension/Comprehension';

import './FinanceComprehension.Styles.css'
import Axios from 'axios';

export default class FinanceComprehension extends Component {
    constructor(){
        super()
        this.state={
            financeComprehension: ''
        }
    }

    componentDidMount(){
        Axios.get('http://localhost:5000/company/info')
        .then(res => res.data.map( company => company.name === this.props.match.params.companyName ?
                this.setState({financeComprehension: company.finance})
                : console.log()
            ))
    }

    render() {
        if(sessionStorage.usertoken)
        {
        return (
            this.state.financeComprehension ? 
            <div className='finance-comprehension-page'>
               <Comprehension comprehensionName='finance' comprehension={this.state.financeComprehension} redirect={this.props.match.url+'Questions'} />
            </div>
            : <div className='loading'>Loading...</div>
        )
        }
        else{window.location='/';}
    }
}
