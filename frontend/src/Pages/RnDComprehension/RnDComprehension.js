import React, { Component } from 'react'
import Comprehension from '../../Components/Comprehension/Comprehension';

import './RnDComprehension.Styles.css'
import Axios from 'axios';

export default class RnDComprehension extends Component {
    constructor(){
        super()
        this.state={
            rndComprehension: ''
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
                this.setState({rndComprehension: company.rnd})
                : console.log()
            ))
    }

    render() {
        if(sessionStorage.usertoken)
        {
        return (
            this.state.rndComprehension ? 
            <div className='rnd-comprehension-page'>
               <Comprehension comprehensionName='r&d' comprehension={this.state.rndComprehension} redirect={this.props.match.url+'Questions'} />
            </div>
            : <div className='loading'>Loading...</div>
        )
        }
        else{window.location='/';}
    }
}
