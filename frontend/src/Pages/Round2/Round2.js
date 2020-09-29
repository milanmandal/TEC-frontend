import React, { Component } from 'react'
import CompanyCard from '../../Components/CompanyCard/CompanyCard'
import Modal from 'react-modal';
import url from '../../Components/Url/Url'

import './Round2.Styles.css'
import Axios from 'axios';
import Graph from '../../Components/Graph/Graph';
import { connect } from 'react-redux';
import { updateInvestedCompanies, updateInvestmentScore } from '../../Redux/User/UserActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom';
toast.configure()

class StockMarket extends Component {
    constructor() {
        super()
        this.state = {
            capital: 0,
            companies: null,
            selectedCompany: null,
            isPopUpOpen: false,
            investedAmount: 0,
            investedCompanies: [],
            news: []
        }
    }

    componentDidMount() {
        if (this.props.currentUser.currentUser) {

            const { company1, company2, invest1, invest2, score1 } = this.props.currentUser.currentUser
            const { investedCompanies } = this.state
            Axios.get(url + 'stock/companylist',
                {
                    headers: {
                        "authorization": "Bearer " + sessionStorage.usertoken
                    }
                })
                .then(res => {
                    res.data.map((company) => {
                        if (company.name === company1) {
                            investedCompanies.push({
                                name: company.name,
                                investedAmount: invest1,
                                returns: (company.profitpercent + 100) * invest1 / 100,
                                data: company.data
                            })
                        }
                        if (company.name === company2) {
                            investedCompanies.push({
                                name: company.name,
                                investedAmount: invest2,
                                returns: (company.profitpercent + 100) * invest2 / 100,
                                data: company.data
                            })
                        }
                    })
                })

            Axios.get(url + 'stock/companylist',
                {
                    headers: {
                        "authorization": "Bearer " + sessionStorage.usertoken
                    }
                })
                .then(res => this.setState({ companies: res.data }))

            this.setState({ capital: score1 - invest1 - invest2 })

            const route = {
                path: this.props.match.url,
            }
            Axios.post(url + 'user/path/' + this.props.currentUser.currentUser._id, route)

            window.history.pushState(null, null, '/')

            Axios.get(url + 'admin/control')
                .then(response => {
                    if (response.data[0].round3 === '1') {
                        this.setState({ control: 1 });
                    }
                })
        } else { window.location = '/' }
    }

    onclick = (e) => {
        e.stopPropagation()
        this.setState({
            selectedCompany: this.state.companies[e.currentTarget.id],
            isPopUpOpen: true
        })
        const { newsone, newstwo, newsthree } = this.state.companies[e.currentTarget.id]
        const firstNews = {
            headline: newsone.split('#')[0],
            news: newsone.split('#')[1]
        }
        const secondNews = {
            headline: newstwo.split('#')[0],
            news: newstwo.split('#')[1]
        }
        const thirdNews = {
            headline: newsthree.split('#')[0],
            news: newsthree.split('#')[1]
        }
        this.state.news.push(firstNews, secondNews, thirdNews)
    }

    onInvestAmtChanged = (e) => {
        e.preventDefault()
        if (e.target.value * this.state.selectedCompany.data[this.state.selectedCompany.data.length - 1].price <= this.state.capital) {
            this.setState({ investedAmount: e.target.value * this.state.selectedCompany.data[this.state.selectedCompany.data.length - 1].price })
        } else {
            toast.error("Investment canNOT be greater than capital", { className: 'round2-toast', position: toast.POSITION.TOP_CENTER })
            e.target.value = 0
        }
    }

    onInvest = (e) => {
        e.preventDefault()
        const { selectedCompany, investedAmount, capital, investedCompanies } = this.state
        const numberOfShares = investedAmount / selectedCompany.data[this.state.selectedCompany.data.length - 1].price
        this.setState({ isPopUpOpen: false })
        if (investedAmount > 0) {
            if (numberOfShares >= selectedCompany.min) {
                if (investedCompanies.length < 2) {
                    this.setState({ capital: capital - investedAmount })
                    const existingCompany = investedCompanies.find((company) => company.name === selectedCompany.name)
                    if (existingCompany) {
                        toast.error("You have already invested in this company, canNOT invest again", { className: 'round2-toast', position: toast.POSITION.TOP_CENTER })
                    } else {
                        investedCompanies.push({
                            name: selectedCompany.name,
                            investedAmount: investedAmount,
                            returns: (selectedCompany.profitpercent + 100) * investedAmount / 100,
                            data: selectedCompany.data
                        })

                    }
                    this.props.updateInvestmentScore(this.score())
                    this.props.updateInvestedCompanies(investedCompanies)

                    const points = {
                        companyName1: investedCompanies[0] ? investedCompanies[0].name : "",
                        companyName2: investedCompanies[1] ? investedCompanies[1].name : "",
                        invest1: investedCompanies[0] ? investedCompanies[0].investedAmount : 0,
                        invest2: investedCompanies[1] ? investedCompanies[1].investedAmount : 0
                    }
                    var id = this.props.currentUser.currentUser._id;
                    Axios.post(url + 'user/company1/' + id, points)
                    Axios.post(url + 'user/company2/' + id, points)
                    Axios.post(url + 'user/invest1/' + id, points)
                    Axios.post(url + 'user/invest2/' + id, points)
                } else {
                    toast.error("Cannot invest in more than 2 stocks", { className: 'round2-toast', position: toast.POSITION.TOP_CENTER })
                }
            } else {
                toast.error("Minimum no of shares are not purchased", { className: 'round2-toast', position: toast.POSITION.TOP_CENTER })
            }
        } else {
            toast.error("Enter Valid Amount", { className: 'round2-toast', position: toast.POSITION.TOP_CENTER })
        }
    }

    score = () => {
        const { investedCompanies } = this.state
        const returns = investedCompanies.reduce((a, b) => a + b.returns, 0).toFixed(2)
        return (parseFloat(returns) + parseFloat(this.state.capital.toFixed(2)) - parseFloat(this.state.investedAmount.toFixed(2)))
    }

    render() {
        if (sessionStorage.usertoken && this.props.currentUser) {
            console.log(this.state)
            return (
                this.state.companies ?
                    <div className='round2-page'>
                        <h1 className='page-heading'>STOCK MARKET</h1>
                        <div className='stockmarket'>
                            <div className='company-cards-container'>
                                {
                                    this.state.companies.map((company, index) => <CompanyCard index={index} company={company} onclick={this.onclick} key={company.name} />)
                                }
                            </div>
                            <div className='my-portfolio'>
                                <h1 className='heading'>My Portfolio</h1>
                                <h3 className='capital'>Capital Left: {this.state.capital.toFixed(2)}</h3>
                                <div className='investment-details'>
                                    {
                                        this.state.investedCompanies.map((investedCompany, index) =>
                                            <p key={index}>You have invested <strong>&#8377; {investedCompany.investedAmount.toFixed(2)}</strong> in <strong>{investedCompany.name}</strong></p>
                                        )
                                    }
                                </div>
                            </div>
                            <Link to='/round2/score'><button>Next</button></Link>
                            <Modal isOpen={this.state.isPopUpOpen} onRequestClose={() => this.setState({ isPopUpOpen: false })}>
                                {
                                    this.state.selectedCompany ?
                                        <div className='popup'>
                                            <div className='popup-details'>
                                                <h1 className='heading-primary'>{this.state.selectedCompany.name.toUpperCase()}</h1>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>Price:</td>
                                                            <td>&#8377; {this.state.selectedCompany.data[this.state.selectedCompany.data.length - 1].price}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Last Updated:</td>
                                                            <td>{this.state.selectedCompany.data[this.state.selectedCompany.data.length - 1].date}</td>
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
                                                {
                                                    this.state.news.map((news, index) =>
                                                        <div key={index} className='news'>
                                                            <strong>{news.headline}</strong>
                                                            <p>{news.news}</p>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        : <div className='loading'>Loading...</div>
                                }
                            </Modal>
                        </div>
                    </div>
                    : <div className='loading'>Loading...</div>
            )
        } else { window.location = '/'; }
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
