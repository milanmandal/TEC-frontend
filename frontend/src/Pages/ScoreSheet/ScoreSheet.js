import React, { Component } from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import { setCurrentUser } from '../../Redux/User/UserActions';

import './ScoreSheet.Styles.css'
import FinalGraph from '../../Components/FinalGraph/FinalGraph';

class ScoreSheet extends Component {
    constructor() {
        super()
        this.state = {
            companies: []
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:5000/user/' + this.props.match.params.id,
            {
                headers: {
                    "authorization": "Bearer " + sessionStorage.usertoken
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

        Axios.get('http://localhost:5000/stock/companylist',
            {
                headers: {
                    "authorization": "Bearer " + sessionStorage.usertoken
                }
            })
            .then(res => this.setState({ companies: res.data }))

        const route = {
            path: this.props.match.url
        }
        Axios.post('http://localhost:5000/user/path/' + this.props.match.params.id, route)
    }

    checkGainOrLoss(value) {
        return (value >= 0 ? 'green' : 'red')
    }

    render() {
        if (this.props.currentUser) {
            const { ...properties } = this.props.currentUser
            const investedCompanies = []
            this.state.companies.map((company) => {
                company.name === properties.company1 ? investedCompanies.push({
                    ...company,
                    investedAmount: properties.invest1,
                    returns: (company.profitpercent + 100) * properties.invest1 / 100
                }) : console.log()
                company.name === properties.company2 ? investedCompanies.push({
                    ...company,
                    investedAmount: properties.invest2,
                    returns: (company.profitpercent + 100) * properties.invest2 / 100
                }) : console.log()
                return null
            })

            const totalRound2Returns = () => {
                var total = 0
                for (let i = 0; i < investedCompanies.length; i++) {
                    total = total + (investedCompanies[i].returns - investedCompanies[i].investedAmount)
                }
                return total
            }
            return (
                <div className='scoresheet-page'>
                    <div className='round1'>
                        <h1>Round 1</h1>
                        <h3>Earnings: Rs. {properties.score1}</h3>
                    </div>
                    {
                        investedCompanies.length ?
                            <div className='round2'>
                                <h1>Round 2</h1>
                                <div className='companies'>
                                    {
                                        investedCompanies.map(company =>
                                            <div key={company.name} className='company'>
                                                <h3>{company.name.toUpperCase()}</h3>
                                                <p>Invested Amount: {company.investedAmount.toFixed(2)}</p>
                                                <p>Total Returns: {company.returns.toFixed(2)}</p>
                                                <p className={this.checkGainOrLoss(company.returns - company.investedAmount)}>
                                                    Profit: {(company.returns - company.investedAmount).toFixed(2)}
                                                </p>
                                                <p className={this.checkGainOrLoss(company.returns - company.investedAmount)}>
                                                    Returns Percentage: {((company.returns - company.investedAmount) * 100 / company.investedAmount).toFixed(2)}%
                                                </p>
                                                <FinalGraph stockData={company.data} color={this.checkGainOrLoss(company.returns - company.investedAmount)} />
                                            </div>
                                        )
                                    }
                                    <h1 className='total-round2'>Total Profit: Rs. {totalRound2Returns().toFixed(2)}</h1>
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
                        <h3>Score: {properties.score3}</h3>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='loading'>Loading...</div>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(ScoreSheet);