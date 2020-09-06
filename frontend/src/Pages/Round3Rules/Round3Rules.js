import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../Components/Header/Header';
import { setCurrentUser } from '../../Redux/User/UserActions';
import { connect } from 'react-redux';
import Axios from 'axios';

class Round3Rules extends Component {

    componentDidMount(){
        Axios.get('http://localhost:5000/user/'+this.props.match.params.id,
        {
          headers:{
            "authorization":"Bearer "+sessionStorage.usertoken
          }
        })
        .then(response => {
          if (response.status === 200) {
            this.props.setCurrentUser(response.data)
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }

    render(){
        if(sessionStorage.usertoken){
            return(
                <div className='comprehension-rules-container'>
                    <div className='comprehesion-rules'>
                        <Header heading='Round-3 Rules' />
                        <div className='rules'>
                            <ol>
                                <li>A crisis on all the four domains/verticals would be given.</li>
                                <li>
                                    Four/verticals domain are as follow: 
                                    <ul>
                                        <li>Finance</li>
                                        <li>Sales</li>
                                        <li>Production</li>
                                        <li>Research and Development</li>
                                    </ul>
                                </li>
                                <li>1 Questions will be asked on each domain/vertical and answering them is acompulsion. Thus making a total of 4 questions for this round.</li>
                                <li>4 choices will be their for each question. However all 4 would be correct ranging from good to best answer.</li>
                                <li>
                                    Capital investment(rupees)/(points) will be given as follows:
                                    <ul>
                                        <li>Best answer- <strong>4000 Rs</strong></li>
                                        <li>2nd Best answer- <strong>3000 Rs</strong></li>
                                        <li>3rd Best answer- <strong>2000 Rs</strong></li>
                                        <li>4th Best answer- <strong>1000 Rs</strong></li>
                                    </ul>
                                </li>
                                <li><strong>No eliminations</strong> for this round.</li>
                                <li>Time duration :<strong>1 Hr</strong>.</li>
                                <li>Sum of 1st and 2nd round i.e. the comprehension and crisis round would be considered as total in beginning of 3rd round.</li>
                            </ol>
                        </div>
                        <div className='button'>
                            <Link to='/crisis/production/1'><button>Crisis</button></Link>
                        </div>
                    </div>
                </div>
            )
        }else{
            window.location='/';
        }
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Round3Rules);