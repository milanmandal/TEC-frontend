import React, { Component } from 'react'
import Comprehension from '../../Components/Comprehension/Comprehension';

import './RnDComprehension.Styles.css'
import Axios from 'axios';
import { connect } from 'react-redux';


class RnDComprehension extends Component {
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
        if(sessionStorage.usertoken && this.props.currentUser.currentUser)
        {
        return (
            this.state.rndComprehension ? 
            <div className='rnd-comprehension-page'>
               <Comprehension comprehensionName='r&d' comprehension={this.state.rndComprehension} currentPath={this.props.match.url} redirect={this.props.match.url+'Questions'} />
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

export default connect(mapStateToProps)(RnDComprehension);