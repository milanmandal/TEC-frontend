import React, { Component } from 'react';
import { ReactComponent as Logo } from '../../Assets/business.svg';
import axios from 'axios';

import './Homepage.Styles.css';

export default class HomePage extends Component {
    constructor(){
        super();
        this.state={
            email: '',
            password: '',
            redirectTo: false,
            company:'',
            index:'',
            token:'null',
            
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePass = this.handlePass.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
            
          }
      
          
      
          axios.post('http://localhost:5000/user/login', user)
            .then(res =>{
                
                if(res.status===200)
                {
                    console.log(res.data)

                    this.setState({
                        redirectTo:true,
                        company:res.data.company,
                        index:res.data._id,
                        token:res.data.token,
                    })
                    sessionStorage.setItem('usertoken', this.state.token);
                    window.location=`/intro/`+this.state.index;
                }
                
            } )
            .catch(error => {
                window.location ='/';
                window.alert('invalid credentials')
                console.log(error)
                })
    }

    handleEmail(e) {
        e.preventDefault();
        this.setState({
            email:e.target.value
        })
    }


    handlePass(e)
    {
        e.preventDefault();
        this.setState({
            password:e.target.value
        })
    }

    render() {
        
        return (
            <div className='container'>
                <div className='logo-container'>
                    <Logo className='logo' />
                </div>
                <div className='login'>
                    <div className='login-form'>
                        <h2 className='title'>Login</h2>

                        <form className='input' onSubmit={this.handleSubmit}>
                            <div className='input-box'>
                                <label>Email</label>
                                <input name='email' placeholder='John@gmail.com' type='email'  onChange={this.handleEmail} required />
                            </div>
                            <div className='input-box'>
                                <label>Password</label>
                                <input name='password' placeholder='******' type='password' onChange={this.handlePass} required />
                            </div>
                            <div className='button'>
                                <button type='submit' onClick={this.handleSubmit}>LOGIN</button>
                            </div>
                        </form>

                    </div>    
                </div>
            </div>
        )
    }
}
