import React, { Component } from 'react'
import Comprehension from '../../Components/Comprehension/Comprehension';

import './FinanceComprehension.Styles.css'
import Axios from 'axios';
import { connect } from 'react-redux';

class FinanceComprehension extends Component {
    constructor(){
        super()
        this.state={
            financeComprehension: ''
        }
    }

    componentDidMount(){
        Axios.get('http://localhost:5000/company/info',
        {
          headers:{
            "authorization":"Bearer "+sessionStorage.usertoken
          }
        })
        .then(res => res.data.map( company => company.name === this.props.match.params.companyName ?
                this.setState({financeComprehension: company.finance})
                : console.log()
            ))
    }

    render() {
        if(sessionStorage.usertoken && this.props.currentUser.currentUser)
        {
        return (
            this.state.financeComprehension ? 
            <div className='finance-comprehension-page'>
               <Comprehension comprehensionName='finance' comprehension={this.state.financeComprehension} currentPath={this.props.match.url} redirect={this.props.match.url+'Questions'} />
            </div>
            : <div className='loading'>Loading...</div>
        )
        }
        else{window.location='/';}
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user
})

export default connect(mapStateToProps)(FinanceComprehension);
