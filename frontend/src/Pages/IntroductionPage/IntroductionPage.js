import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { setCurrentUser } from '../../Redux/User/UserActions';

import './IntroductionPage.Styles.css';

import Header from '../../Components/Header/Header';
import Body from '../../Components/Body/Body';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ComprehensionRules from '../ComprehensionRules/ComprehensionRules';
import Axios from 'axios';


const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

const mapStateToProps = (state) => ({
  setCurrentUser: state.user.currentUser
})

class IntroductionPage extends Component {
    constructor(){
        super()
        this.state = {
            
            CompanyName:'',
            info:'',
            page:1,
           
        }
    }

    componentDidMount(){

        Axios.get('http://localhost:5000/user/'+this.props.match.params.id)
        .then(response => {
          if (response.status === 200) {
            this.setState({
              CompanyName: response.data.company,
              
            })
            if(response.data.page==2)
            {
              return <ComprehensionRules/>
             
            }
            this.props.setCurrentUser(response.data)
            toast.success('You are alloted with the company '+response.data.company.toUpperCase())
          }
        })
        .catch((error) => {
          console.log(error);
        })


        Axios.get('http://localhost:5000/company/info',
        {
          headers:{
            "authorization":"Bearer "+sessionStorage.usertoken
          }
        }
        )
        .then(res => res.data.map( company => company.name.toUpperCase() === this.state.CompanyName.toUpperCase() ?
                this.setState({info: company.info})
                : console.log()
            ))
        
    }
    
    render(){
      if(sessionStorage.usertoken)  
      {
        return (
            this.state.CompanyName?
            <div className='introduction-page'>
            <ToastContainer className='alert' />
                <div className='company-introduction'>
                    <Header heading={this.state.CompanyName} />
                    <Body body={this.state.info} />
                    <div className='button'>
                      <Link to={'/comprehensionRules/'+this.state.CompanyName}><button>Comprehensions &#8594;</button></Link>
                    </div>
                </div>
            </div>
            :
            <div>
                LOADING....
            </div>
            
        )
      }
      else
      {window.location='/';}
    }
    
}



export default connect(mapStateToProps , mapDispatchToProps)(IntroductionPage);