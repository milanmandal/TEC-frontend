import React, { Component } from 'react'
import Comprehension from '../../Components/Comprehension/Comprehension';

import './ProductionComprehension.Styles.css'
import Axios from 'axios';
import { connect } from 'react-redux';

var id;

class ProductionComprehension extends Component {
    constructor(){
        super()
        this.state={
            productionComprehension: '',
            ID:''
        }
    }

    

    componentDidMount(){

        this.setState({ID:this.props.currentUser.currentUser._id})

        id = this.state.ID;
        const route = {
            path:`/comprehension/${this.props.currentUser.currentUser.companyName}/Production`,
          }
          Axios.post('http://localhost:5000/path/'+id,route)

        Axios.get('http://localhost:5000/company/info',
        {
          headers:{
            "authorization":"Bearer "+sessionStorage.usertoken
          }
        }
        )
        .then(res => res.data.map( company => company.name === this.props.match.params.companyName ?
                this.setState({productionComprehension: company.production})
                : console.log()
            ))
        
    }

    render() {
        if(sessionStorage.usertoken)
        {
        return (
            this.state.productionComprehension ? 
            <div className='production-comprehension-page'>
               <Comprehension comprehensionName='production' comprehension={this.state.productionComprehension} redirect={this.props.match.url+'Questions'} />
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

export default connect(mapStateToProps)(ProductionComprehension)