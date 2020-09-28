import React, { Component } from 'react';
import { ReactComponent as Logo } from '../../Assets/business.svg';
import axios from 'axios';
import url from '../../Components/Url/Url'

import './Homepage.Styles.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Axios from 'axios';
toast.configure()

export default class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            redirectTo: false,
            company: '',
            index: '',
            token: 'null',
            other: 0,
            path: '',
            redirect: '/'
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePass = this.handlePass.bind(this);
    }

    componentDidMount() {
        if (sessionStorage.round) {
            sessionStorage.clear()
            window.location.reload(false)
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        document.getElementsByName('email')[0].value = ''
        document.getElementsByName('password')[0].value = ''

        axios.get(url + 'admin/control')
            .then(response => {

                this.setState({ control: response.data[0].round1 });
                if (response.data[0].round1 === '1') {

                    axios.post(url + 'user/login', user)
                        .then(res => {
                            if (res.status === 200) {
                                if (res.data.value) {
                                    console.log("Team Member Login");
                                    this.setState({
                                        other: res.data.value,
                                        company: res.data.company,
                                        index: res.data._id,
                                        token: res.data.token,
                                        path: res.data.page,
                                    })

                                }
                                else {
                                    this.setState({
                                        redirectTo: true,
                                        company: res.data.company,
                                        index: res.data._id,
                                        token: res.data.token,
                                        path: res.data.page
                                    })
                                    Axios.get(url + 'admin/gettimer')
                                        .then(res => sessionStorage.setItem('round', res.data[0].round))
                                    sessionStorage.setItem('usertoken', this.state.token);
                                    window.location = '/setRound/' + this.state.index;
                                }
                            }

                        })
                        .catch(error => {
                            toast.error("Invalid User Credentials", { className: 'round2-toast', position: toast.POSITION.TOP_CENTER })
                            console.log(error)
                        })
                }
                else {
                    toast.error("Round 1 is yet to start", { className: 'round2-toast', position: toast.POSITION.TOP_CENTER })
                }

            })


    }

    handleEmail(e) {
        e.preventDefault();
        this.setState({
            email: e.target.value
        })
    }


    handlePass(e) {
        e.preventDefault();
        this.setState({
            password: e.target.value
        })
    }

    render() {
        if (!sessionStorage.round) {
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
                                    <label>Team Id</label>
                                    <input name='email' placeholder='John@gmail.com' type='email' onChange={this.handleEmail} required />
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
        } else { return (<div className='loading'>Loading...</div>) }
    }
}
