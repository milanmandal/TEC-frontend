import React, { Component } from 'react'
import Comprehension from '../../Components/Comprehension/Comprehension';

import './SalesComprehension.Styles.css'
import Axios from 'axios';
import { connect } from 'react-redux';
import url from '../../Components/Url/Url'


class SalesComprehension extends Component {
    constructor() {
        super()
        this.state = {
            salesComprehension: ''
        }
    }

    componentDidMount() {
        Axios.get(url + 'company/info',
            {
                headers: {
                    "authorization": "Bearer " + sessionStorage.usertoken
                }
            })
            .then(res => res.data.map(company => company.name === this.props.match.params.companyName ?
                this.setState({ salesComprehension: company.sales })
                : console.log()
            ))
    }

    render() {
        if (sessionStorage.usertoken && this.props.currentUser.currentUser) {
            return (
                this.state.salesComprehension ?
                    <div className='sales-comprehension-page'>
                        <Comprehension
                            comprehensionName='sales'
                            comprehension={this.state.salesComprehension}
                            currentPath={this.props.match.url}
                            redirect={this.props.match.url + 'Questions'}
                            company={this.props.match.params.companyName}
                        />
                    </div>
                    : <div className='loading'>Loading...</div>
            )
        }
        else { window.location = '/'; }
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user
})

export default connect(mapStateToProps)(SalesComprehension);
