import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CompanyCard from '../../Components/CompanyCard/CompanyCard'
import Modal from 'react-modal';

import './Round2.Styles.css'
import Axios from 'axios';
import Graph from '../../Components/Graph/Graph';
import { connect } from 'react-redux';
import { updateInvestedCompanies, updateInvestmentScore } from '../../Redux/User/UserActions';

class StockMarket extends Component {
    constructor(){
        super()
        this.state = {
            capital: 0,
            companies: null,
            selectedCompany: null,
            isPopUpOpen: false,
            investedAmount: 0,
            investedCompanies: []
        }
    }

    componentDidMount(){
        Axios.get('http://localhost:5000/stock/companylist',
        {
          headers:{
            "authorization":"Bearer "+sessionStorage.usertoken
          }
        })
        .then(res => this.setState({companies: res.data}))

        this.setState({capital: this.props.currentUser.currentUser.score})
    }

    onclick = (e) => {
        e.stopPropagation()
        this.setState({
            selectedCompany: this.state.companies[e.currentTarget.id],
            isPopUpOpen: true
        })
    }

    onInvestAmtChanged = (e) => {
        e.preventDefault()
        if(e.target.value*this.state.selectedCompany.data[this.state.selectedCompany.data.length-1].price <= this.state.capital){
            this.setState({investedAmount: e.target.value*this.state.selectedCompany.data[this.state.selectedCompany.data.length-1].price})
        }else{
            alert('Investment Cannot be greater than Capital')
            e.target.value=0
        }
    }

    onInvest = (e) => {
        e.preventDefault()
        const {selectedCompany, investedAmount, capital, investedCompanies} = this.state
        const numberOfShares = investedAmount/selectedCompany.data[this.state.selectedCompany.data.length-1].price
        this.setState({isPopUpOpen: false})
        if(investedAmount > 0){
            if(numberOfShares >= selectedCompany.min){
                if(investedCompanies.length < 2){
                    this.setState({capital: capital-investedAmount})
                    const existingCompany = investedCompanies.find((company) => company.name === selectedCompany.name)
                    if(existingCompany){
                        existingCompany.investedAmount = existingCompany.investedAmount + investedAmount
                        existingCompany.returns = (selectedCompany.profitpercent+100)*existingCompany.investedAmount/100
                    }else{
                        investedCompanies.push({name: selectedCompany.name, investedAmount: investedAmount, returns: (selectedCompany.profitpercent+100)*investedAmount/100, data: selectedCompany.data})
                    }
                    this.props.updateInvestmentScore(this.score())
                    this.props.updateInvestedCompanies(investedCompanies)
                }else{
                    alert('Cannot invest in more than 2 stocks')
                }
            }else{
                alert('Minimum no of shares are not purchased')
            }
        }else{
            alert('Enter Valid Amount')
        }
    }

    score = () => {
        const {investedCompanies} = this.state
        const returns = investedCompanies.reduce((a,b) => a + b.returns, 0).toFixed(2)
        return(parseFloat(returns)+parseFloat(this.state.capital.toFixed(2))-parseFloat(this.state.investedAmount.toFixed(2)))
    }

    render() {
        if(sessionStorage.usertoken){
            return (
                this.state.companies ?
                <div className='round2-page'>
                    <h1 className='page-heading'>STOCK MARKET</h1>
                    <div className='stockmarket'>
                        <div className='company-cards-container'>
                        {
                            this.state.companies.map( (company,index) => <CompanyCard index={index} company={company} onclick={this.onclick} key={company.name} />)
                        }
                        </div>
                        <div className='my-portfolio'>
                            <h1 className='heading'>My Portfolio</h1>
                            <h3 className='capital'>Capital: {this.state.capital.toFixed(2)}</h3>
                            <div className='investment-details'>
                            {
                                this.state.investedCompanies.map((investedCompany, index) => 
                                    <p key={index}>You have invested <strong>Rs. {investedCompany.investedAmount.toFixed(2)}</strong> in <strong>{investedCompany.name}</strong></p>
                                )
                            }
                            </div>
                        </div>
                        <Link to={'/round3/rules/'+this.props.currentUser.currentUser._id}><button>Round 3</button></Link>
                        <Modal isOpen={this.state.isPopUpOpen} onRequestClose={() => this.setState({isPopUpOpen: false})}>
                        {
                            this.state.selectedCompany ? 
                            <div className='popup'>
                                <div className='popup-details'>
                                    <h1 className='heading-primary'>{this.state.selectedCompany.name.toUpperCase()}</h1>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Price:</td>
                                                <td>Rs. {this.state.selectedCompany.data[this.state.selectedCompany.data.length-1].price}</td>
                                            </tr>
                                            <tr>
                                                <td>Last Updated:</td>
                                                <td>{this.state.selectedCompany.data[this.state.selectedCompany.data.length-1].date}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <p>Minimum <strong>{this.state.selectedCompany.min}</strong> shares should be purchased</p>
                                    <form onSubmit={this.onInvest}>
                                        <input
                                            type='number'
                                            placeholder='No. of Shares'
                                            onChange={this.onInvestAmtChanged}
                                        />
                                        <button type='submit'>Invest</button>
                                    </form>
                                </div>
                                <div className='popup-contents'>
                                    <h1 className='heading-secondary'>Graph</h1>
                                    <Graph stockData={this.state.selectedCompany.data.slice(0, 8)} />
                                    <h1 className='heading-secondary'>News</h1>
                                    <p className='news'>{this.state.selectedCompany.newsone}</p>
                                    <p className='news'>{this.state.selectedCompany.newstwo}</p>
                                    <p className='news'>{this.state.selectedCompany.newsthree}</p>
                                </div>
                            </div>
                            : <div className='loading'>Loading...</div>
                        }
                        </Modal>
                    </div>
                </div>
                : <div className='loading'>Loading...</div>
            )
        }else{window.location='/';}
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user
})

const mapDispatchToProps = dispatch => ({
    updateInvestedCompanies: investedCompanies => dispatch(updateInvestedCompanies(investedCompanies)),
    updateInvestmentScore: score => dispatch(updateInvestmentScore(score))
});

export default connect(mapStateToProps, mapDispatchToProps)(StockMarket);