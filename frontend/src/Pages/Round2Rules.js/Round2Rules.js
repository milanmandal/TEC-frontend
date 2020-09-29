import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../Components/Header/Header';
import { setCurrentUser } from '../../Redux/User/UserActions';
import { connect } from 'react-redux';
import Axios from 'axios';
import url from '../../Components/Url/Url'

class Round2Rules extends Component {

    componentDidMount() {
        Axios.get(url + 'user/' + this.props.match.params.id,
            {
                headers: {
                    "authorization": "Bearer " + sessionStorage.usertoken
                }
            })
            .then(response => {
                if (response.status === 200) {
                    this.props.setCurrentUser(response.data)
                    const route = {
                        path: this.props.match.url,
                    }
                    Axios.post(url + 'user/path/' + response.data._id, route)
                }
            })
            .catch((error) => {
                console.log(error);
            })
        localStorage.setItem("Round", "Round2")
    }

    render() {
        if (sessionStorage.usertoken) {
            return (
                <div className='comprehension-rules-container'>
                    <div className='comprehesion-rules'>
                        <Header heading='Round-2 Rules' />
                        <div className='rules'>
                            <ol>
                                <li>You will be given portfolios of 8 leading companies and you need to invest your capital in <strong>at most two</strong> companies (make your choice properly).</li>
                                <li>Don’t Be Rushed into Making A Decision Out Of A Fear Of Missing Out.</li>
                                <li>The company portfolio includes a news clipping and a graph of the stock pertaining to the company as shown below. The news clipping serves to give you an idea of how the graph might proceed in the future.</li>
                                <li>The capital that you can invest is calculated from the number of correct answers provided in round 1. </li>
                                <li>You can invest your capital in any combination but you are not allowed to invest more money than you earned in the previous round</li>
                                <li>There will be a minimum no. of stocks for each company in which a participant can invest. The number of minimum stocks will be different for each company.
                                For example, Min shares for Reliance is 4. Once you will fulfil the above criterion, you’ll be eligible to buy any (greater than 4) no. of stocks for Reliance.
                                </li>
                                <li>Say for example you have invested in a stock which is listed at ₹100 and the graph gains 2% subsequently then you will receive a return of ₹102 and make a gain of ₹2.</li>
                                <li>If instead of gaining, the graph falls by 2% subsequently, you will lose ₹2 from your initial investment and be returned ₹98.</li>
                                <li>Time limit for selecting a company and investing in it is set to 45 minutes. This means that you must commit your capital to a company (or at max 2 companies) within forty five minutes.</li>
                                <li>There is no elimination in this round.</li>
                            </ol>
                        </div>
                        <div className='button'>
                            <Link to='/stockmarket'><button>Stock Market</button></Link>
                        </div>
                    </div>
                </div>
            )
        } else {
            window.location = '/';
        }
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Round2Rules);