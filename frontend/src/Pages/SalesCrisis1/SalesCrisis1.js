import React, { Component } from 'react'
import Crisis from '../../Components/Crisis/Crisis'
import Axios from 'axios'
import { connect } from 'react-redux'

class SalesCrisis1 extends Component {
    constructor() {
        super()
        this.state = {
            crisis: null,
            question: null,
            options: null
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:5000/' + this.props.currentUser.currentUser.company + '/getcrisissales',
            {
                headers: {
                    "authorization": "Bearer " + sessionStorage.usertoken
                }
            })
            .then(res => this.setState({
                crisis: res.data[0].passage,
                question: res.data[0].question,
                options: [res.data[0].option1, res.data[0].option2, res.data[0].option3, res.data[0].option4]
            })
            )
    }

    render() {
        if (sessionStorage.usertoken && this.props.currentUser.currentUser) {
            return (
                this.state.crisis && this.state.question && this.state.options ?
                    <div className='crisis-page'>
                        <Crisis
                            heading='Sales 01'
                            crisis={this.state.crisis}
                            question={this.state.question}
                            options={this.state.options}
                            redirect='/crisis/sales/2'
                            currentPath={this.props.match.url}
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
});

export default connect(mapStateToProps)(SalesCrisis1);
