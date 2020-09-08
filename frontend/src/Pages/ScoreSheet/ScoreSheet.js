import React, { Component } from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import { setCurrentUser } from '../../Redux/User/UserActions';

import './ScoreSheet.Styles.css'
import FinalGraph from '../../Components/FinalGraph/FinalGraph';

class ScoreSheet extends Component {

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

    checkGainOrLoss(value){
        return(value >= 0 ? 'green' : 'red') 
    }

    render() {
        return (
            <div className='scoresheet-page'>
                <div className='round1'>
                    <h1>Round 1</h1>
                    <h3>Earnings: Rs.{this.state.round1Score}</h3>
                </div>
                {
                    this.state.investedCompanies.length ? 
                    <div className='round2'>
                        <h1>Round 2</h1>
                        <div className='companies'>
                        {
                            this.state.investedCompanies.map(company => 
                                <div key={company.name} className='company'>
                                    <h3>{company.name.toUpperCase()}</h3>
                                    <p>Invested Amount: {company.investedAmount}</p>
                                    <p>Total Returns: {company.returns}</p>
                                    <p className={this.checkGainOrLoss(company.returns - company.investedAmount)}>Profit: {company.returns - company.investedAmount}</p>
                                    <p className={this.checkGainOrLoss(company.returns - company.investedAmount)}>Returns Percentage: {(company.returns - company.investedAmount)*100/company.investedAmount}%</p>
                                    <FinalGraph stockData={company.data} color={this.checkGainOrLoss(company.returns - company.investedAmount)} />
                                </div>
                            )
                        }
                        </div>
                    </div>
                    : 
                    <div className='round2'>
                        <h1>Round 2</h1>
                        <p>You haven't invested in any company.</p>
                    </div>
                }
                <div className='round3'>
                    <h1>Round 3</h1>
                    <h3>Score: {this.state.round3Score}</h3>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(ScoreSheet);